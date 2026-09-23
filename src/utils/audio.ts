// Web Audio API Procedural Synthesizer for Realistic Chemistry Laboratory Sound Effects
class LabSoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientSource: AudioBufferSourceNode | null = null;
  private isAmbientPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with autoplay policy
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 1. Subtle UI Button Click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // 2. Realistic Glass Clink / Tap
  public playGlassClink() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const fundamental = 2600 + Math.random() * 200;
    const partials = [1.0, 2.76, 5.4, 8.9];

    partials.forEach((p, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * p, this.ctx.currentTime);

      const amp = 0.25 / (idx + 1);
      const decay = 0.25 / (idx * 0.5 + 1);

      gain.gain.setValueAtTime(amp, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + decay);
    });
  }

  // 3. Liquid Pouring / Trickle Sound
  public playLiquidPour(durationSec: number = 1.6) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1900, this.ctx.currentTime + durationSec);
    filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime + durationSec - 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  // 4. Gas Bubbling / Effervescence
  public playBubbling(durationSec: number = 2.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const numBubbles = Math.floor(durationSec * 15);

    for (let i = 0; i < numBubbles; i++) {
      const bubbleTime = now + (i / numBubbles) * durationSec + Math.random() * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startFreq = 400 + Math.random() * 400;
      const endFreq = startFreq + 300 + Math.random() * 300;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, bubbleTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, bubbleTime + 0.04);

      gain.gain.setValueAtTime(0.12, bubbleTime);
      gain.gain.exponentialRampToValueAtTime(0.001, bubbleTime + 0.045);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(bubbleTime);
      osc.stop(bubbleTime + 0.05);
    }
  }

  // 5. Bunsen Burner Flame Hiss
  public playBurnerHiss(durationSec: number = 2.5) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(800, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime + durationSec - 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);

    noise.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  // 6. Dazzling Combustion (Magnesium Ribbon)
  public playCombustion(durationSec: number = 2.8) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Crackle bursts + white noise
      const crackle = Math.random() > 0.96 ? (Math.random() * 2 - 1) * 1.5 : (Math.random() * 2 - 1) * 0.2;
      data[i] = crackle;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.45, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.45, this.ctx.currentTime + durationSec - 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  // 7. Hydrogen Gas 'Pop' Sound Test
  public playHydrogenPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  // 8. Boiling Hiss / Steam Release (Quicklime Slaking)
  public playSteamHiss(durationSec: number = 2.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.35;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3500, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime + durationSec - 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  // 9. Success Chime (Educational completion & balancing)
  public playSuccessChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const noteTime = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.25, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.65);
    });
  }

  // 10. Ambient Laboratory Ventilation / Background Hum
  public toggleAmbientLab(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientSource) {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
        this.ambientSource = null;
      }
      this.isAmbientPlaying = false;
      return false;
    } else {
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Smooth low frequency pink/brown noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.04;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      noise.connect(lowpass);
      lowpass.connect(this.ambientGain);
      if (this.masterGain) {
        this.ambientGain.connect(this.masterGain);
      }

      noise.start();
      this.ambientSource = noise;
      this.isAmbientPlaying = true;
      return true;
    }
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }
}

export const labAudio = new LabSoundEngine();
