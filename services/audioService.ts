let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playNote = (frequency: number) => {
  try {
    const context = getAudioContext();
    if (context.state === 'suspended') {
      context.resume();
    }

    const now = context.currentTime;
    
    // Master gain node for the overall envelope
    const masterGain = context.createGain();
    masterGain.connect(context.destination);

    // A more piano-like ADSR envelope. The peak volume is masterGain * sum of individual harmonic gains.
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.01); // Sharp attack
    // Exponential decay to simulate the note ringing out
    masterGain.gain.setTargetAtTime(0, now + 0.02, 0.4); 

    const totalDuration = 2.5; // Clean up oscillators after 2.5 seconds

    // Harmonics to create a richer, more piano-like tone using additive synthesis
    const harmonics = [
      { type: 'triangle', mul: 1, gain: 0.5 },   // Fundamental
      { type: 'sine', mul: 2, gain: 0.25 },    // Octave
      { type: 'sine', mul: 3, gain: 0.15 },    // Fifth above octave
      { type: 'sine', mul: 4, gain: 0.1 },     // Double octave
    ] as const;

    harmonics.forEach(harmonic => {
      const oscillator = context.createOscillator();
      const oscGain = context.createGain();
      
      oscillator.type = harmonic.type;
      // Set frequency for each harmonic
      oscillator.frequency.setValueAtTime(frequency * harmonic.mul, now);
      
      // Set individual gain for each harmonic
      oscGain.gain.setValueAtTime(harmonic.gain, now);

      // Route the sound
      oscillator.connect(oscGain);
      oscGain.connect(masterGain);
      
      oscillator.start(now);
      oscillator.stop(now + totalDuration);
    });

  } catch (e) {
    console.error("Web Audio API is not supported in this browser or there was an error.", e);
  }
};
