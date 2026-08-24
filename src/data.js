export const PROFILE_STEPS = [
  {
    kicker: '01 — The substance',
    title: 'What are we working against?',
    hint: 'Pick every one that applies.',
    key: 'subs',
    note: "If you don't find yours, choose Other. More substances and instruments tailored to them will be added soon.",
    options: ['Alcohol', 'Opioids (Heroin, Fentanyl)', 'Stimulants (Meth, Cocaine)', 'Benzos (Xanax, Valium)', 'Nicotine', 'Other'],
  },
  {
    kicker: '02 — The trigger',
    title: 'What sets it off?',
    hint: 'Pick the ones that show up most.',
    key: 'triggers',
    options: ['Hunger', 'Anger', 'Loneliness', 'Tiredness', 'Boredom', 'Wanting a reward', 'Sexual arousal', 'Easy money', 'Environment cues', 'Physical pain', 'Withdrawal'],
  },
  {
    kicker: '03 — What works for you',
    title: 'What has actually worked before?',
    hint: 'Even once counts.',
    key: 'worked',
    options: ['Calling someone', 'Getting outside', 'Cold water', 'Waiting it out', 'Writing it down', 'Nothing yet'],
  },
  {
    kicker: '04 — Never suggest this',
    title: 'What should the app never hand you?',
    hint: 'This is a hard filter. It will be obeyed.',
    key: 'ruledOut',
    options: ['Religious or spirituality talk', 'Anything over ten minutes', 'Talking to a person', 'Outdoor or sport activities', 'Tough love', 'Nothing — try me!'],
  },
  {
    kicker: '05 — Medication and health',
    title: 'What are you on, and what are you dealing with?',
    hint: 'This tells us which techniques are safe for you.',
    key: 'treatment',
    options: ['Suboxone or methadone', 'Naltrexone', 'Antidepressants', 'In therapy', 'Anxiety treatment', 'ADHD', 'Trauma', 'Insomnia'],
  },
];

export const QUESTIONS = [
  {
    key: 'place',
    title: 'Where are you right now?',
    options: [
      { label: 'Home alone', sub: '' },
      { label: 'Home with other people', sub: '' },
      { label: 'Out in public', sub: '' },
      { label: 'At work', sub: '' },
      { label: 'Outdoors alone', sub: '' },
      { label: 'Somewhere I used to use', sub: '' },
      { label: 'Other', sub: '' },
    ],
  },
  {
    key: 'mag',
    title: 'How loud is it?',
    options: [
      { label: '1–3', sub: 'background noise' },
      { label: '4–6', sub: 'distracting' },
      { label: '7–8', sub: 'hard to think' },
      { label: '9–10', sub: 'madness' },
    ],
  },
  {
    key: 'emotion',
    title: 'Which emotion is strongest right now?',
    options: [
      { label: 'Anxiety', sub: '' },
      { label: 'Anger', sub: '' },
      { label: 'Shame', sub: '' },
      { label: 'Emptiness', sub: '' },
      { label: 'Grief', sub: '' },
      { label: 'Boredom', sub: '' },
      { label: 'Anticipation', sub: '' },
      { label: 'Loneliness', sub: '' },
      { label: 'Guilt', sub: '' },
      { label: 'Fear', sub: '' },
      { label: 'Restlessness', sub: '' },
    ],
  },
  {
    key: 'body',
    title: 'How does your body feel right now?',
    options: [
      { label: 'Wired', sub: '' },
      { label: 'Shaky or sick', sub: '' },
      { label: 'Numb', sub: '' },
      { label: 'Exhausted', sub: '' },
      { label: 'Tense', sub: '' },
      { label: 'In pain', sub: '' },
      { label: 'Nauseous', sub: '' },
      { label: 'Sweating', sub: '' },
      { label: 'Heart racing', sub: '' },
      { label: 'Normal', sub: '' },
    ],
  },
  {
    key: 'time',
    title: 'How long have you got?',
    options: [
      { label: 'Two minutes', sub: '' },
      { label: 'Five minutes', sub: '' },
      { label: 'Ten minutes', sub: '' },
      { label: 'Thirty minutes', sub: '' },
      { label: 'As long as it takes', sub: '' },
    ],
  },
];

export const INSTRUMENTS = [
  {
    id: 'tipp',
    name: 'Cold Water, Then One Breath',
    framework: 'Dialectical Behaviour Therapy — TIPP (distress tolerance)',
    frameworkNote:
      "Temperature, Intense exercise, Paced breathing, Paired muscle relaxation. Marsha Linehan's crash protocol for when the emotional system is past reasoning with.",
    why: 'At a 9 you cannot be talked out of anything, so this doesn\'t try. Cold on the face triggers the mammalian dive reflex and drops your heart rate inside sixty seconds. It buys the ninety seconds where a decision becomes possible again.',
    does: 'Physically interrupts the surge. It does not resolve anything, and it is not supposed to.',
    duration: '90 seconds',
    steps: [
      { t: 30, label: 'Cold water on your face', body: 'Sink, bottle, ice, snow. Face and the back of your neck. Hold it there while you count thirty.' },
      { t: 20, label: 'Breathe out longer than you breathe in', body: 'In for four. Out for eight. The long exhale is the part that works.' },
      { t: 40, label: 'Sit down and say the time out loud', body: 'Name the hour and where you are. You are coming back into the room.' },
    ],
    tags: {
      mag: ['9–10', '7–8'],
      time: ['Two minutes', 'Five minutes'],
      body: ['Wired', 'Shaky or sick', 'Heart racing', 'Sweating', 'Tense'],
      place: ['Home alone', 'Outdoors alone', 'Out in public', 'At work'],
    },
  },
  {
    id: 'surf',
    name: 'Urge Surfing',
    framework: 'Mindfulness-Based Relapse Prevention',
    frameworkNote:
      "Alan Marlatt's core technique. The urge is treated as a wave with a peak and a decline rather than a command; you time it instead of fighting it.",
    why: 'Cravings have a shape. Yours peaks and falls in about twenty minutes whether or not you act on it. This makes the falling part visible so the peak stops feeling permanent.',
    does: 'Turns an emergency into a weather event you are watching from the shore.',
    duration: '6 minutes',
    steps: [
      { t: 60, label: 'Find where it lives in your body', body: "Chest, jaw, stomach, hands. Don't describe it as wanting. Describe it as pressure, temperature, weight." },
      { t: 90, label: 'Rate it, then wait', body: "Give it a number out of ten. Keep watching the same spot. Don't argue with it." },
      { t: 90, label: 'Rate it again', body: 'Higher, lower, moved somewhere else? Whatever it did, it did without you doing anything.' },
      { t: 120, label: 'Ride it down', body: 'Stay with it until the number drops by two. It will. That is the whole trick.' },
    ],
    tags: {
      mag: ['4–6', '7–8'],
      time: ['Ten minutes', 'Thirty minutes'],
      emotion: ['Anxiety', 'Anticipation', 'Boredom', 'Restlessness'],
      place: ['Home alone', 'Home with other people'],
    },
  },
  {
    id: 'tape',
    name: 'Play The Tape Forward',
    framework: 'Cognitive Behavioural Therapy — decisional balance',
    frameworkNote:
      'Standard cognitive-behavioural relapse prevention: the craving only shows you the first frame, so you deliberately run the reel to the end.',
    why: 'It feels good right now — that is why this one is dangerous. The craving is showing you the first ten minutes and hiding the next fourteen hours. You are going to watch the whole thing.',
    does: 'Restores the missing consequences so the decision is made on complete information.',
    duration: '4 minutes',
    steps: [
      { t: 45, label: 'First ten minutes. Say it out loud', body: "Exactly what you'd get. Don't sanitise it — the relief is real and pretending otherwise breaks the exercise." },
      { t: 45, label: 'Hour three', body: 'Where are you, who have you texted, what is the count at?' },
      { t: 60, label: 'Tomorrow, 7am', body: 'First thought on waking. Who you have to look at. What you have to redo.' },
      { t: 60, label: 'Now the other reel', body: 'Same 7am, if you don\'t. Nothing dramatic. Just ordinary and intact.' },
    ],
    tags: {
      mag: ['4–6', '7–8'],
      time: ['Five minutes', 'Ten minutes'],
      emotion: ['Anticipation', 'Boredom', 'Emptiness', 'Guilt'],
      place: ['Somewhere I used to use', 'Home alone'],
    },
  },
  {
    id: 'leave',
    name: 'Leave The Room',
    framework: 'Stimulus control — behavioural',
    frameworkNote: 'Cue exposure is the strongest single predictor of use. The cheapest intervention available is distance, applied immediately.',
    why: 'You are standing in the place. No technique out-argues a cue this loud — everything else works better from two hundred metres away. Move first, think second.',
    does: 'Removes the trigger instead of managing it.',
    duration: '3 minutes',
    steps: [
      { t: 20, label: 'Stand up. Now', body: 'Before the next sentence. Coat, phone, door.' },
      { t: 60, label: 'Two hundred metres, any direction', body: 'Uphill if there is an uphill. Count the paces.' },
      { t: 60, label: 'Text one person that you left', body: "Three words is enough. It makes going back a decision you'd have to explain." },
    ],
    tags: {
      mag: ['7–8', '9–10'],
      time: ['Two minutes', 'Five minutes', 'Ten minutes'],
      place: ['Somewhere I used to use', 'Out in public'],
    },
  },
  {
    id: 'ground',
    name: '5–4–3–2–1',
    framework: 'Trauma-informed grounding',
    frameworkNote: 'Sensory orienting. Used to bring attention out of an internal loop and back into the present environment, silently and in public.',
    why: "You're in public and shaking. This one is invisible — nobody standing next to you will know you are doing it, and it works on anxiety faster than it works on craving.",
    does: 'Pulls attention out of your head and into the room.',
    duration: '3 minutes',
    steps: [
      { t: 45, label: 'Five things you can see', body: 'Small and specific. A scuff, a bolt, a price tag.' },
      { t: 40, label: 'Four you can feel', body: 'Fabric at your wrist, floor through your shoes, air on your face.' },
      { t: 35, label: 'Three you can hear', body: 'Nearest, then furthest.' },
      { t: 30, label: 'Two you can smell, one you can taste', body: 'Then breathe out slowly and look up.' },
    ],
    tags: {
      mag: ['4–6', '7–8'],
      time: ['Two minutes', 'Five minutes'],
      place: ['Out in public', 'At work'],
      emotion: ['Anxiety', 'Shame', 'Fear'],
      body: ['Wired', 'Shaky or sick', 'Nauseous', 'Tense'],
    },
  },
  {
    id: 'delay',
    name: 'The Fifteen-Minute Deal',
    framework: 'SMART Recovery — Deny, Escape, Avoid, Distract, Substitute',
    frameworkNote: 'Deny, Escape, Avoid, Distract, Substitute. You are not promising never; you are promising not yet, for a period short enough to be honest.',
    why: 'You never agreed to quit tonight. You agreed to fifteen minutes, which is a promise you can actually keep, and cravings rarely survive being made to wait with something in your hands.',
    does: "Converts an absolute into a delay you won't have to lie about.",
    duration: '15 minutes',
    steps: [
      { t: 30, label: 'Set fifteen minutes. Say the deal out loud', body: '"Not before this runs out." That\'s the whole contract.' },
      { t: 60, label: 'Put something in your hands', body: 'Food, shower, dishes, cigarette, cold drink. Hands busy, ideally wet or cold.' },
      { t: 90, label: 'When it runs out, re-rate it', body: 'If it dropped, take another fifteen. If it didn\'t, we change instrument.' },
    ],
    tags: {
      mag: ['4–6', '1–3'],
      time: ['Thirty minutes', 'As long as it takes'],
      emotion: ['Boredom', 'Emptiness'],
      body: ['Numb', 'Exhausted', 'In pain'],
    },
  },
  {
    id: 'call',
    name: 'One Call, Script Written',
    framework: 'Social support — twelve-step adjacent',
    frameworkNote: 'The reach-out, stripped of fellowship language. What carries over from AA and NA is only this: the odds change when someone else knows in real time.',
    why: "The reason this fails is never willingness, it's not knowing what to open with — so the opening line is written for you and you only have to press call.",
    does: 'Puts a second person inside the next hour.',
    duration: '5 minutes',
    steps: [
      { t: 20, label: 'Read the line', body: '"It\'s bad tonight and I\'m not asking you to fix it. Just stay on the phone."' },
      { t: 30, label: 'Press call before you edit it', body: 'Editing is how this gets abandoned.' },
      { t: 120, label: 'Say where you are', body: "Location first, feelings second. It's the part that matters if this goes wrong." },
    ],
    tags: {
      mag: ['7–8', '9–10'],
      time: ['Ten minutes', 'Thirty minutes', 'As long as it takes'],
      emotion: ['Shame', 'Grief', 'Emptiness', 'Loneliness'],
      place: ['Home alone', 'Outdoors alone'],
    },
  },
  {
    id: 'night',
    name: 'Cut The Night Short',
    framework: 'Behavioural — sleep as endpoint',
    frameworkNote: 'Late-night relapse is overwhelmingly a function of hours awake and alone. Ending the day early is a legitimate intervention, not a retreat.',
    why: "You're exhausted with the whole night ahead of you and no reason to still be awake. Nothing good is coming at 2am. Ending the day is a win, not a surrender.",
    does: 'Closes the window rather than defending it.',
    duration: '20 minutes',
    steps: [
      { t: 60, label: 'Phone on the far side of the room', body: 'Charging, screen down, out of arm\'s reach.' },
      { t: 90, label: 'Shower as hot as you can stand', body: 'Then let yourself get cold. The temperature drop is what makes you sleepy.' },
      { t: 120, label: 'Bed, lights off, something spoken', body: "Podcast or audiobook, volume low, timer on. Something you've heard before." },
    ],
    tags: {
      mag: ['1–3', '4–6'],
      time: ['Thirty minutes', 'As long as it takes'],
      body: ['Exhausted', 'Numb'],
      place: ['Home alone', 'Outdoors alone'],
    },
  },
];

export const RULE_BLOCK = {
  'Talking to a person': ['call'],
  'Outdoor or sport activities': ['leave'],
  'Anything over ten minutes': ['delay', 'night', 'surf'],
};

export const HARM_ITEMS = [
  { label: "For opioids: make sure naloxone is at arm's length", sub: 'Not in a drawer. Not in a bag. Within sight.' },
  { label: 'Ensure someone is nearby and you are in reach of help', sub: 'Most overdoses are survivable with a witness.' },
  { label: 'Take nothing on top of it', sub: 'No benzos, no alcohol, no second thing.' },
  { label: 'Test it, then take a quarter first', sub: 'Tolerance is gone after a break. Wait ten minutes.' },
  { label: 'Stay hydrated and put something in your stomach', sub: "If it's alcohol: one glass of water between each." },
  { label: 'Make sure one person knows where you are', sub: "Give them the actual address, not just 'out tonight'." },
];

export const SEED_HISTORY = [
  { when: 'Aug 21', name: 'Urge Surfing', detail: '9/10 · home alone · anxiety', outcome: 'Success', ok: true },
  { when: 'Aug 19', name: 'The Fifteen-Minute Deal', detail: '6/10 · work · boredom', outcome: 'Success', ok: true },
  { when: 'Aug 16', name: 'One Call, Script Written', detail: '8/10 · home alone · shame', outcome: 'Success', ok: true },
  { when: 'Aug 14', name: 'Play The Tape Forward', detail: '7/10 · old bar · anticipation', outcome: 'Failure', ok: false },
  { when: 'Aug 14', name: 'Harm reduction', detail: "Naloxone out · told someone · didn't use alone", outcome: 'Relapse', ok: 'relapse' },
];

export const SEED_SCORES = {
  tipp: [4, 5],
  surf: [7, 9],
  tape: [3, 6],
  leave: [2, 5],
  ground: [5, 6],
  delay: [6, 8],
  call: [2, 3],
  night: [1, 4],
};
