const Synth = {
  arrayRotate (A, n, l = A.length) {
    const offset = ((n % l) + l) % l;
    return A.slice(offset).concat(A.slice(0, offset));
  },
  calcFrequency (pitch, octave = 3) {
    return Number(440 * Math.pow(2, octave - 4 + pitch / 12));
  }
};


// SYNTH base

Synth.chromaOptions = {
  gain: 1,
  portamento: 0,
  oscillator: {
    type: "triangle"
  },
  envelope: {
    attack: 0.15,
    decay: 0.4,
    sustain: 0.7,
    release: 1
  }
};

Synth.chromaSynth = new Tone.PolySynth(12, Tone.Synth);
Synth.analyser = new Tone.Analyser('fft',2048);
Synth.analyser.toMaster();
Synth.volume = new Tone.Volume(0).connect(Synth.analyser);
Synth.synthVolume = new Tone.Volume(1).connect(Synth.volume);
Synth.chromaSynth.connect(Synth.synthVolume);
Synth.mainSynth = Synth.mono;
Synth.quantization = "@32n";

export default Synth

function getDefault(duration = 16) {
  let setup = {
    instrument: this.name,
    pattern: [
      { active: true, num: 0 },
      { active: false, num: 1 },
      { active: false, num: 2 },
      { active: true, num: 3 },
      { active: false, num: 4 },
      { active: false, num: 5 },
      { active: true, num: 6 },
      { active: false, num: 7 }
    ],
    duration: duration + "n",
    gain: 0.6
  };
  setup.options = {};
  for (let option in this.options) {
    setup.options[option] = this.options[option].default;
  }
  if (this.envelope) {
    setup.envelope = {};
    for (let env in this.envelope) {
      setup.envelope[env] = this.envelope[env].default;
    }
  }
  return setup;
};

function connect(output) {
  this.vol.connect(output);
};
