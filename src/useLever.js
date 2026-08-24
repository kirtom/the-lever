import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HARM_ITEMS, INSTRUMENTS, PROFILE_STEPS, QUESTIONS, RULE_BLOCK } from './data';
import { UI } from './i18n';

const STORAGE_KEY = 'the-lever:v1';

const EMPTY_PROFILE = { subs: [], triggers: [], worked: [], style: [], ruledOut: [], treatment: [] };

const PROFILE_ROW_KEYS = ['subs', 'triggers', 'worked', 'style', 'ruledOut', 'treatment'];

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
  return q?.options.find((o) => o.id === id);
}

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

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'ru' : 'en')), []);

  const currentInst = useCallback(() => INSTRUMENTS.find((i) => i.id === instId) || INSTRUMENTS[0], [instId]);

  const goHome = useCallback(() => {
    clearInterval(tickTimer.current);
    clearInterval(matchTimer.current);
    setScreen('home');
  }, []);

  const startProfile = useCallback(() => {
    setStepIndex(0);
    setScreen('profile');
  }, []);

  const skipToHome = useCallback(() => {
    setOnboarded(true);
    setScreen('home');
  }, []);

  const toggleProfileOption = useCallback((key, id) => {
    setProfile((p) => {
      const list = (p[key] || []).slice();
      const i = list.indexOf(id);
      if (i >= 0) list.splice(i, 1);
      else list.push(id);
      return { ...p, [key]: list };
    });
  }, []);

  const nextStep = useCallback(() => {
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
      setOnboarded(true);
      setScreen('home');
    } else {
      setStepIndex((i) => i + 1);
    }
  }, [stepIndex, profile.worked]);

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
        // Tier 2 — situational: tonight's five answers. Dominant signal.
        ['place', 'mag', 'emotion', 'body', 'time'].forEach((k) => {
          if (tags[k] && ans[k] && tags[k].indexOf(ans[k]) >= 0) s += k === 'mag' || k === 'time' ? 3 : 2;
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
          setInstId(pickInstrument(rejected, ans));
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
    setQIndex(0);
    setAnswers({});
    setRejected([]);
    setFromShelf(false);
    setScreen('question');
  }, []);

  const answerQuestion = useCallback(
    (key, id) => {
      const next = { ...answers, [key]: id };
      setAnswers(next);
      if (qIndex === QUESTIONS.length - 1) {
        runMatch(next);
      } else {
        setQIndex((i) => i + 1);
      }
    },
    [answers, qIndex, runMatch]
  );

  const backQuestion = useCallback(() => {
    if (qIndex === 0) goHome();
    else setQIndex((i) => i - 1);
  }, [qIndex, goHome]);

  const toggleFramework = useCallback(() => setFrameworkOpen((v) => !v), []);

  const swapInstrument = useCallback(() => {
    const inst = currentInst();
    const rej = rejected.concat([inst.id]);
    setRejected(rej);
    setInstId(pickInstrument(rej, answers));
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
    const done = harmChecked.length;
    setHistory((prev) => [{ when: 'today', isHarm: true, precautionsCount: done, ok: 'relapse' }, ...prev]);
    setOnboarded(true);
    goHome();
  }, [harmChecked, goHome]);

  const openInstrumentFromShelf = useCallback((id) => {
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
  if (answers.mag) readbackBits.push(t.readback.magPrefix + questionLabel('mag', answers.mag));
  if (answers.emotion) readbackBits.push(questionLabel('emotion', answers.emotion).toLowerCase() + t.readback.emotionSuffix);
  if (answers.time) readbackBits.push(questionLabel('time', answers.time).toLowerCase() + t.readback.timeSuffix);

  const heldStats = scores[inst.id] || [0, 0];

  const derived = {
    frameDark: screen === 'welcome' || screen === 'question' || screen === 'matching' || screen === 'run' || screen === 'after' || screen === 'harm',
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
      options: step.options.map((o) => ({
        id: o.id,
        label: o[lang],
        checked: (profile[step.key] || []).indexOf(o.id) >= 0,
        toggle: () => toggleProfileOption(step.key, o.id),
      })),
    },

    q: {
      counter: t.questionCounter(qIndex + 1, QUESTIONS.length),
      title: q.title[lang],
      options: q.options.map((o) => ({ id: o.id, label: o[lang], sub: o.sub[lang], pick: () => answerQuestion(q.key, o.id) })),
    },

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
    locationNote: coords ? t.location.pinnedPrefix + coords.la + ', ' + coords.lo : shareState === 'failed' ? t.location.unavailable : t.location.instant,

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
