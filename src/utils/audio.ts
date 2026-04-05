/** Tiny procedural bleeps — no asset files required */

let ctx: AudioContext | null = null;

function ac(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function playTone(freq: number, duration = 0.08, type: OscillatorType = "sine", gain = 0.08) {
  try {
    const c = ac();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    o.connect(g);
    g.connect(c.destination);
    o.start();
    o.stop(c.currentTime + duration);
  } catch {
    /* ignore */
  }
}

export const sfx = {
  train: () => playTone(440, 0.06, "triangle", 0.05),
  hit: () => playTone(120, 0.05, "square", 0.06),
  breakRock: () => {
    playTone(90, 0.12, "sawtooth", 0.07);
    playTone(55, 0.14, "sawtooth", 0.05);
  },
  coin: () => {
    playTone(880, 0.05, "sine", 0.05);
    playTone(1320, 0.06, "sine", 0.04);
  },
  ui: () => playTone(660, 0.04, "sine", 0.04),
};
