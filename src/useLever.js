import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { bandFor, FAST_PATH_TIME, HARM_ITEMS, HOPELESS_FLAG_AT, INSTRUMENTS, PROFILE_STEPS, QUESTIONS, RULE_BLOCK } from './data';
import { UI } from './i18n';
import { track } from './analytics';

const STORAGE_KEY = 'the-lever:v1';

const EMPTY_PROFILE = { subs: [], triggers: [], worked: [], style: [], ruledOut: [], treatment: [], conditions: [] };

const PROFILE_ROW_KEYS = ['subs', 'triggers', 'worked', 'style', 'ruledOut', 'treatment', 'conditions'];

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function clock(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function findProfileOption(stepKey, id) {
  const step = PROFILE_STEPS.find((s) => s.key === stepKey);
  return step?.options.find((o) => o.id === id);
}

function findQuestionOption(qKey, id) {
  const q = QUESTIONS.find((qq) => qq.key === qKey);
  return q?.options?.find((o) => o.id === id);
}

// Answers are stored per question key: an option id for option questions, a
// raw 0–10 number for sliders. Matching always compares band/option ids, so
// slider values are resolved through bandFor first.
function matchValue(qKey, answer) {
  if (answer == null) return null;
  const q = QUESTIONS.find((qq) => qq.key === qKey);
  return q?.type === 'slider' ? bandFor(q, answer) : answer;
}

const MATCH_KEYS = QUESTIONS.map((q) => q.key);

// Tonight's answers are the dominant signal, but they shouldn't all shout at
// the same volume: intensity and available time constrain what is even
// possible, clarity gates whole classes of instrument, and the rest colour
// the choice.
const ANSWER_WEIGHT = { mag: 3, time: 3, clarity: 3, access: 2, body: 2, emotion: 2, place: 2, withdrawal: 2, shame: 2, recent: 1, stressor: 1, satisfaction: 1, hopeless: 1 };

export function useLever() {
  const stored = useMemo(loadStored, []);

  const [screen, setScreen] = useState(stored?.onboarded ? 'home' : 'welcome');
  const [lang, setLang] = useState(stored?.lang === 'ru' ? 'ru' : 'en');
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState(stored?.profile || EMPTY_PROFILE);
  const [answers, setAnswers] = useState({});
  const [qIndex, setQIndex] = useState(0);
  const [instId, setInstId] = useState(null);
  const [rejected, setRejected] = useState([]);
  const [runStep, setRunStep] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [frameworkOpen, setFrameworkOpen] = useState(false);
  const [matchTick, setMatchTick] = useState(0);
  const [harmChecked, setHarmChecked] = useState([]);
  const [fastPath, setFastPath] = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState(null);
  const [fromShelf, setFromShelf] = useState(false);
  const [coords, setCoords] = useState(null);
  const [shareState, setShareState] = useState('idle');
  const [scores, setScores] = useState(stored?.scores || {});
  const [history, setHistory] = useState(stored?.history || []);
  const [onboarded, setOnboarded] = useState(!!stored?.onboarded);

  const t = UI[lang];

  const tickTimer = useRef(null);
  const matchTimer = useRef(null);

  useEffect(
    () => () => {
      clearInterval(tickTimer.current);
      clearInterval(matchTimer.current);
    },
    []
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, scores, history, onboarded, lang }));
    } catch {
      // best-effort persistence only
    }
  }, [profile, scores, history, onboarded, lang]);

  useEffect(() => {
    track('screen_view', { screen });
  }, [screen]);

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next = l === 'en' ? 'ru' : 'en';
      track('language_toggled', { lang: next });
      return next;
    });
  }, []);

  const currentInst = useCallback(() => INSTRUMENTS.find((i) => i.id === instId) || INSTRUMENTS[0], [instId]);

  const goHome = useCallback(() => {
    clearInterval(tickTimer.current);
    clearInterval(matchTimer.current);
    setScreen('home');
  }, []);

  const startProfile = useCallback(() => {
    track('profile_setup_started');
    setStepIndex(0);
    setScreen('profile');
  }, []);

  const skipToHome = useCallback(() => {
    track('profile_setup_skipped');
    setOnboarded(true);
    setScreen('home');
  }, []);

  // "None of these" style options are exclusive: picking one clears the rest
  // and greys them out, because "nothing yet" plus three somethings is not an
  // answer anyone means.
  const toggleProfileOption = useCallback((key, id) => {
    const step = PROFILE_STEPS.find((s) => s.key === key);
    const opt = step?.options.find((o) => o.id === id);
    const exclusiveIds = (step?.options || []).filter((o) => o.exclusive).map((o) => o.id);
    setProfile((p) => {
      const list = (p[key] || []).slice();
      const i = list.indexOf(id);
      if (i >= 0) return { ...p, [key]: list.filter((x) => x !== id) };
      if (opt?.exclusive) return { ...p, [key]: [id] };
      // An exclusive option is selected, so the others are inactive.
      if (list.some((x) => exclusiveIds.indexOf(x) >= 0)) return p;
      return { ...p, [key]: list.concat([id]) };
    });
  }, []);

  const backStep = useCallback(() => {
    setStepIndex((i) => {
      if (i === 0) {
        setScreen('welcome');
        return 0;
      }
      return i - 1;
    });
  }, []);

  const nextStep = useCallback(() => {
    // Every step needs an answer — an empty profile teaches the matcher nothing.
    const currentKey = PROFILE_STEPS[stepIndex].key;
    if (!(profile[currentKey] || []).length) return;
    if (stepIndex === PROFILE_STEPS.length - 1) {
      // Seed a 50% prior for instruments the user just told us have worked
      // before, so the shelf isn't cold on day one — but never touch an
      // instrument that already has real attempts logged against it.
      const worked = profile.worked || [];
      setScores((prev) => {
        let changed = false;
        const next = { ...prev };
        INSTRUMENTS.forEach((inst) => {
          if (!inst.worksForKey || worked.indexOf(inst.worksForKey) < 0) return;
          const existing = next[inst.id];
          if (existing && existing[1] > 0) return;
          next[inst.id] = [1, 2];
          changed = true;
        });
        return changed ? next : prev;
      });
      track('profile_completed');
      setOnboarded(true);
      setScreen('home');
    } else {
      setStepIndex((i) => i + 1);
    }
  }, [stepIndex, profile]);

  const pickInstrument = useCallback(
    (exclude, ans) => {
      const ruled = profile.ruledOut || [];
      const blocked = {};
      ruled.forEach((r) => (RULE_BLOCK[r] || []).forEach((id) => (blocked[id] = true)));
      const triggers = profile.triggers || [];
      const subs = profile.subs || [];
      const style = profile.style || [];
      let bestScore = -1;
      let candidates = [];
      INSTRUMENTS.forEach((inst) => {
        if (blocked[inst.id] || (exclude || []).indexOf(inst.id) >= 0) return;
        let s = 0;
        const tags = inst.tags;
        // Tier 2 — situational: tonight's answers. Dominant signal. Questions
        // after the time branch may be unanswered on a fast-path run; those
        // simply contribute nothing rather than penalising anyone.
        MATCH_KEYS.forEach((k) => {
          const v = matchValue(k, ans[k]);
          if (tags[k] && v && tags[k].indexOf(v) >= 0) s += ANSWER_WEIGHT[k] || 1;
        });
        // Tier 3 — structural affinity: background profile pattern. Capped low so
        // it nudges rather than competes with tonight's situational answers.
        const triggerMatches = (inst.triggerTags || []).filter((tag) => triggers.indexOf(tag) >= 0).length;
        s += Math.min(triggerMatches, 2);
        const substanceMatches = (inst.substanceRelevance || []).filter((sub) => subs.indexOf(sub) >= 0).length;
        s += Math.min(substanceMatches, 1);
        // Stated coping style is a stronger signal than an inferred trigger
        // overlap — it's what the person told us they actually respond to —
        // so it gets a flatter, larger bonus than the two above, but is still
        // just one more addend on top of tonight's situational score, never
        // a replacement for it.
        const styleMatches = (inst.styleTags || []).filter((tag) => style.indexOf(tag) >= 0).length;
        s += styleMatches > 0 ? 2 : 0;
        // Tier 4 — learned: real outcomes (and the profile.worked seed at
        // onboarding) reinforce what has actually held for this person.
        const sc = scores[inst.id] || [0, 0];
        s += sc[1] ? (sc[0] / sc[1]) * 1.5 : 0;
        if (s > bestScore) {
          bestScore = s;
          candidates = [inst];
        } else if (s === bestScore) {
          candidates.push(inst);
        }
      });
      if (!candidates.length) return INSTRUMENTS[0].id;
      if (candidates.length === 1) return candidates[0].id;
      // Tie-break: a plain "first in the array wins" rule would make every
      // instrument added after an existing tie permanently unreachable, no
      // matter how well it fits. Prefer the least-tried among the tied
      // leaders instead — surfaces unexplored options — then break any
      // remaining tie at random rather than by definition order.
      let minAttempts = Infinity;
      candidates.forEach((c) => {
        const attempts = (scores[c.id] || [0, 0])[1];
        if (attempts < minAttempts) minAttempts = attempts;
      });
      const leastTried = candidates.filter((c) => (scores[c.id] || [0, 0])[1] === minAttempts);
      return leastTried[Math.floor(Math.random() * leastTried.length)].id;
    },
    [profile.ruledOut, profile.triggers, profile.subs, profile.style, scores]
  );

  const runMatch = useCallback(
    (ans) => {
      clearInterval(matchTimer.current);
      setMatchTick(0);
      setScreen('matching');
      let n = 0;
      matchTimer.current = setInterval(() => {
        n += 1;
        if (n > 2) {
          clearInterval(matchTimer.current);
          const matchedId = pickInstrument(rejected, ans);
          track('instrument_matched', { instrument: matchedId });
          setInstId(matchedId);
          setFrameworkOpen(false);
          setScreen('instrument');
        } else {
          setMatchTick(n);
        }
      }, 620);
    },
    [pickInstrument, rejected]
  );

  const startSOS = useCallback(() => {
    track('sos_started');
    setQIndex(0);
    setAnswers({});
    setRejected([]);
    setFromShelf(false);
    setFastPath(false);
    setPendingAnswers(null);
    setScreen('question');
  }, []);

  const answerQuestion = useCallback(
    (key, id) => {
      const next = { ...answers, [key]: id };
      setAnswers(next);
      // The time question is a branch point: someone with a couple of minutes
      // gets matched now rather than answering six more questions.
      if (key === 'time' && FAST_PATH_TIME.indexOf(id) >= 0) {
        // Only the fact of the fast path — the time answer itself is an SOS
        // answer, and those never leave the device.
        track('sos_fast_path');
        setFastPath(true);
        runMatch(next);
        return;
      }
      if (qIndex === QUESTIONS.length - 1) {
        // A high hopelessness score gets a pointer to real help before the
        // technique — collecting the number and ignoring it would be worse
        // than never asking.
        if (typeof next.hopeless === 'number' && next.hopeless >= HOPELESS_FLAG_AT) {
          track('hopelessness_flagged');
          setPendingAnswers(next);
          setScreen('hopelessFlag');
          return;
        }
        runMatch(next);
      } else {
        setQIndex((i) => i + 1);
      }
    },
    [answers, qIndex, runMatch]
  );

  const dismissHopelessFlag = useCallback(() => {
    runMatch(pendingAnswers || answers);
  }, [runMatch, pendingAnswers, answers]);

  const backQuestion = useCallback(() => {
    if (qIndex === 0) goHome();
    else setQIndex((i) => i - 1);
  }, [qIndex, goHome]);

  const toggleFramework = useCallback(() => setFrameworkOpen((v) => !v), []);

  const swapInstrument = useCallback(() => {
    const inst = currentInst();
    const rej = rejected.concat([inst.id]);
    setRejected(rej);
    const nextId = pickInstrument(rej, answers);
    track('instrument_swapped', { instrument: nextId });
    setInstId(nextId);
    setFrameworkOpen(false);
  }, [currentInst, rejected, pickInstrument, answers]);

  const tick = useCallback(() => {
    clearInterval(tickTimer.current);
    tickTimer.current = setInterval(() => {
      setRemaining((r) => {
        if (r - 1 <= 0) {
          clearInterval(tickTimer.current);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }, []);

  const startRun = useCallback(() => {
    const inst = currentInst();
    track('run_started', { instrument: inst.id });
    setRunStep(0);
    setRemaining(inst.steps[0].t);
    setScreen('run');
    tick();
  }, [currentInst, tick]);

  const nextRunStep = useCallback(() => {
    const inst = currentInst();
    if (runStep === inst.steps.length - 1) {
      clearInterval(tickTimer.current);
      setScreen('after');
    } else {
      const next = runStep + 1;
      setRunStep(next);
      setRemaining(inst.steps[next].t);
      tick();
    }
  }, [currentInst, runStep, tick]);

  const bail = useCallback(() => {
    clearInterval(tickTimer.current);
    setScreen('after');
  }, []);

  const itHeld = useCallback(() => {
    const inst = currentInst();
    track('instrument_held', { instrument: inst.id });
    setScores((prev) => {
      const cur = prev[inst.id] || [0, 0];
      return { ...prev, [inst.id]: [cur[0] + 1, cur[1] + 1] };
    });
    setHistory((prev) => [{ when: 'today', instId: inst.id, mag: answers.mag, place: answers.place, emotion: answers.emotion, ok: true }, ...prev]);
    setOnboarded(true);
    setScreen('held');
  }, [currentInst, answers]);

  const itFailed = useCallback(() => {
    const inst = currentInst();
    track('instrument_failed', { instrument: inst.id });
    setScores((prev) => {
      const cur = prev[inst.id] || [0, 0];
      return { ...prev, [inst.id]: [cur[0], cur[1] + 1] };
    });
    setHistory((prev) => [{ when: 'today', instId: inst.id, mag: answers.mag, place: answers.place, retried: true, ok: false }, ...prev]);
    setOnboarded(true);
    setScreen('home');
  }, [currentInst, answers]);

  const openHistory = useCallback(() => setScreen('history'), []);
  const openProfileView = useCallback(() => setScreen('profileView'), []);

  const clearAllData = useCallback(() => {
    track('data_cleared');
    clearInterval(tickTimer.current);
    clearInterval(matchTimer.current);
    // Profile and the learned shelf scores.
    setProfile(EMPTY_PROFILE);
    setScores({});
    // The private log.
    setHistory([]);
    setOnboarded(false);
    // This session's in-progress SOS state.
    setAnswers({});
    setQIndex(0);
    setInstId(null);
    setRejected([]);
    setRunStep(0);
    setRemaining(0);
    setFrameworkOpen(false);
    setMatchTick(0);
    setFromShelf(false);
    setStepIndex(0);
    setScreen('welcome');
  }, []);

  const fetchCoords = useCallback(() => {
    if (!navigator.geolocation) {
      setShareState('failed');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords({ la: p.coords.latitude.toFixed(5), lo: p.coords.longitude.toFixed(5) }),
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const openHarm = useCallback(() => {
    track('harm_screen_opened');
    setScreen('harm');
    fetchCoords();
  }, [fetchCoords]);

  const toggleHarmItem = useCallback((i) => {
    setHarmChecked((prev) => {
      const at = prev.indexOf(i);
      if (at >= 0) return prev.filter((x) => x !== i);
      return [...prev, i];
    });
  }, []);

  const sendLocation = useCallback(() => {
    const c = coords;
    const loc = UI[lang].location;
    const text = c ? loc.withCoordsPrefix + c.la + ', ' + c.lo : loc.noCoords;
    const shareData = { title: loc.shareTitle, text };
    if (c) shareData.url = 'https://maps.google.com/?q=' + c.la + ',' + c.lo;
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => setShareState('shared'))
        .catch((err) => setShareState(err && err.name === 'AbortError' ? 'idle' : 'failed'));
      return;
    }
    const payload = text + (c ? ' https://maps.google.com/?q=' + c.la + ',' + c.lo : '');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(payload)
        .then(() => setShareState('copied'))
        .catch(() => setShareState('failed'));
    } else {
      setShareState('failed');
    }
  }, [coords, lang]);

  const logRelapse = useCallback(() => {
    track('relapse_logged');
    const done = harmChecked.length;
    setHistory((prev) => [{ when: 'today', isHarm: true, precautionsCount: done, ok: 'relapse' }, ...prev]);
    setOnboarded(true);
    goHome();
  }, [harmChecked, goHome]);

  const openInstrumentFromShelf = useCallback((id) => {
    track('instrument_opened_from_shelf', { instrument: id });
    setInstId(id);
    setFromShelf(true);
    setFrameworkOpen(false);
    setScreen('instrument');
  }, []);

  // ---- derived, template-shaped view data ----

  const inst = currentInst();
  const step = PROFILE_STEPS[stepIndex] || PROFILE_STEPS[0];
  const q = QUESTIONS[qIndex] || QUESTIONS[0];
  const runStepData = inst.steps[Math.min(runStep, inst.steps.length - 1)];

  const ranked = INSTRUMENTS.map((i) => {
    const sc = scores[i.id] || [0, 0];
    return { i, rate: sc[1] ? sc[0] / sc[1] : 0, sc };
  })
    .filter((r) => r.sc[1] > 0)
    .sort((x, y) => y.rate - x.rate || y.sc[1] - x.sc[1])
    .slice(0, 5);

  const questionLabel = (qKey, id) => findQuestionOption(qKey, id)?.[lang] || id;
  const profileLabel = (stepKey, id) => findProfileOption(stepKey, id)?.[lang] || id;

  const readbackBits = [];
  if (answers.place) readbackBits.push(questionLabel('place', answers.place).toLowerCase());
  // mag is a slider now, so it reads back as the number the person chose.
  if (typeof answers.mag === 'number') readbackBits.push(t.readback.magPrefix + answers.mag + '/10');
  if (answers.emotion) readbackBits.push(questionLabel('emotion', answers.emotion).toLowerCase() + t.readback.emotionSuffix);
  // Time is deliberately left out: the instrument's own duration is shown a
  // few lines below, so repeating it here only costs a wrapped line — which
  // in Russian is enough to push the screen into scrolling.

  const heldStats = scores[inst.id] || [0, 0];

  const derived = {
    frameDark:
      screen === 'welcome' || screen === 'question' || screen === 'matching' || screen === 'run' || screen === 'after' || screen === 'harm' || screen === 'hopelessFlag',
    lang,
    ui: t,
    registerLabel: t.welcome.registerLabel,

    step: {
      counter: t.stepCounter(stepIndex + 1, PROFILE_STEPS.length),
      kicker: step.kicker[lang],
      title: step.title[lang],
      hint: step.hint[lang],
      note: step.note?.[lang],
      hasNote: !!step.note,
      cta: stepIndex === PROFILE_STEPS.length - 1 ? t.held.done : { en: 'Continue', ru: 'Далее' }[lang],
      canProceed: (profile[step.key] || []).length > 0,
      pickOne: t.profileStep.pickOne,
      back: t.profileStep.back,
      options: step.options.map((o) => {
        const selected = profile[step.key] || [];
        const exclusiveChosen = step.options.some((x) => x.exclusive && selected.indexOf(x.id) >= 0);
        return {
          id: o.id,
          label: o[lang],
          checked: selected.indexOf(o.id) >= 0,
          disabled: exclusiveChosen && !o.exclusive,
          toggle: () => toggleProfileOption(step.key, o.id),
        };
      }),
    },

    q: {
      counter: t.questionCounter(qIndex + 1, QUESTIONS.length),
      title: q.title[lang],
      type: q.type,
      options: (q.options || []).map((o) => ({ id: o.id, label: o[lang], sub: o.sub[lang], pick: () => answerQuestion(q.key, o.id) })),
      slider:
        q.type === 'slider'
          ? {
              min: q.min,
              max: q.max,
              initial: q.initial,
              emojis: q.emojis || null,
              lowLabel: q.scale.low[lang],
              highLabel: q.scale.high[lang],
              cta: t.question.sliderCta,
              submit: (value) => answerQuestion(q.key, value),
            }
          : null,
    },

    fastPath,
    hopelessFlag: { ...t.hopelessFlag, dismiss: dismissHopelessFlag },

    matchLine: t.matching.lines[matchTick] || t.matching.lines[t.matching.lines.length - 1],

    frameworkOpen,

    inst: {
      kicker: fromShelf ? t.inst.fromShelf : t.inst.fresh,
      name: inst.name[lang],
      framework: inst.framework[lang] + ' ↗',
      frameworkNote: inst.frameworkNote[lang],
      why: inst.why[lang],
      does: inst.does[lang],
      duration: inst.duration[lang],
      stepCount: inst.steps.length + t.instrument.stepCountSuffix,
      cta: t.instrument.startPrefix + inst.duration[lang],
    },
    readback: readbackBits.length ? t.readback.prefix + readbackBits.join(', ') + '.' : t.readback.fallback,

    run: {
      counter: t.stepCounter(runStep + 1, inst.steps.length),
      pct: Math.round(((runStep + 1) / inst.steps.length) * 100) + '%',
      clock: clock(remaining),
      label: runStepData.label[lang],
      body: runStepData.body[lang],
      cta: runStep === inst.steps.length - 1 ? t.run.finished : t.run.nextStep,
    },

    heldLine: t.heldLine(inst.name[lang], heldStats[0], heldStats[1]),

    harmItems: HARM_ITEMS.map((h, i) => ({ label: h.label[lang], sub: h.sub[lang], checked: harmChecked.indexOf(i) >= 0, toggle: () => toggleHarmItem(i) })),
    locationCta: t.location.cta[shareState] || t.location.cta.idle,
    // Coordinates are never shown on screen — they are only carried into the
    // share sheet. Someone in this state doesn't need to read their own
    // latitude back, and it's one more thing on a screen that has to stay short.
    locationNote: coords ? t.location.ready : shareState === 'failed' ? t.location.unavailable : t.location.instant,

    shelf: ranked.map((r, i) => ({
      rank: '0' + (i + 1),
      name: r.i.name[lang],
      dur: t.shelfDur(r.i.duration[lang]),
      framework: r.i.framework[lang],
      open: () => openInstrumentFromShelf(r.i.id),
    })),

    history: history.map((h) => {
      let name;
      let detail;
      if (h.instId) {
        const histInst = INSTRUMENTS.find((i) => i.id === h.instId);
        name = histInst ? histInst.name[lang] : h.name || '—';
        const magL = h.mag ? questionLabel('mag', h.mag) : '—';
        const placeL = h.place ? questionLabel('place', h.place).toLowerCase() : '—';
        if (h.retried) {
          detail = magL + ' · ' + placeL + ' · ' + t.history.retried;
        } else {
          const emotionL = h.emotion ? questionLabel('emotion', h.emotion).toLowerCase() : '—';
          detail = magL + ' · ' + placeL + ' · ' + emotionL;
        }
      } else if (h.isHarm) {
        name = t.harm.harmLogName;
        detail = h.precautionsCount ? t.history.precautionsTaken(h.precautionsCount) : t.history.noPrecautions;
      } else {
        // Legacy entry from before this shape existed — render its frozen text as-is.
        name = h.name || '—';
        detail = h.detail || '—';
      }
      const outcome = h.ok === 'relapse' ? t.history.outcomes.relapse : h.ok ? t.history.outcomes.success : t.history.outcomes.failure;
      return {
        when: h.when === 'today' ? t.history.today : h.when,
        name,
        detail,
        outcome,
        color: h.ok === 'relapse' ? '#f3f2f2' : h.ok ? 'var(--success)' : '#ec3013',
        bg: h.ok === 'relapse' ? '#201e1d' : 'transparent',
        chip: h.ok === 'relapse',
      };
    }),

    profileRows: PROFILE_ROW_KEYS.map((key) => ({
      label: PROFILE_STEPS.find((s) => s.key === key).kicker[lang].replace(/^\d+\s*—\s*/, ''),
      value: (profile[key] || []).map((id) => profileLabel(key, id)).join(', ') || (key === 'ruledOut' ? t.profileView.nothingRuledOut : t.profileView.notSet),
    })),
  };

  return {
    screen,
    derived,
    actions: {
      goHome,
      startProfile,
      skipToHome,
      nextStep,
      backStep,
      startSOS,
      backQuestion,
      openHistory,
      openProfileView,
      clearAllData,
      openHarm,
      toggleFramework,
      swapInstrument,
      startRun,
      nextRunStep,
      bail,
      itHeld,
      itFailed,
      sendLocation,
      logRelapse,
      redoProfile: startProfile,
      toggleLang,
    },
  };
}
