
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
    
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'triangle'; // A softer, more pleasant tone than 'sine'
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);

    const now = context.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01); // Quick attack
    gainNode.gain.linearRampToValueAtTime(0, now + 0.75); // Slower decay for a pleasant sound

    oscillator.start(now);
    oscillator.stop(now + 1); // Clean up the oscillator after 1 second
  } catch (e) {
    console.error("Web Audio API is not supported in this browser or there was an error.", e);
  }
};
