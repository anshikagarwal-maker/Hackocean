import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    noiseNode: AudioWorkletNode | ScriptProcessorNode | null;
    filterNode: BiquadFilterNode | null;
    sonarOscillator: OscillatorNode | null;
    gainNode: GainNode | null;
    noiseGain: GainNode | null;
    sonarGain: GainNode | null;
  }>({
    noiseNode: null,
    filterNode: null,
    sonarOscillator: null,
    gainNode: null,
    noiseGain: null,
    sonarGain: null,
  });

  const sonarIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopAmbience();
    };
  }, []);

  const startAmbience = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthNodesRef.current.gainNode = masterGain;

      // 1. Synthesize Underwater Deep Ambient Drone (Low frequency noise)
      // Since AudioWorklet might need a separate file, we can use a ScriptProcessorNode or a combination of multiple low oscillators to synthesize a very deep hum
      // Multiple low sine wave oscillators modulating each other create a perfect rich ocean engine drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(45, ctx.currentTime); // 45Hz sub-bass

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz detuned

      osc3.type = "triangle";
      osc3.frequency.setValueAtTime(90, ctx.currentTime); // 90Hz harmonics

      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(100, ctx.currentTime);
      droneFilter.Q.setValueAtTime(1.0, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.5, ctx.currentTime);

      osc1.connect(droneGain);
      osc2.connect(droneGain);
      osc3.connect(droneGain);
      droneGain.connect(droneFilter);
      droneFilter.connect(masterGain);

      osc1.start();
      osc2.start();
      osc3.start();

      // Slow wave sweep modulator for filter cutoff (simulating water currents)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // 0.08Hz - very slow wave cycles
      lfoGain.gain.setValueAtTime(30, ctx.currentTime); // oscillate filter by +/- 30Hz

      lfo.connect(lfoGain);
      lfoGain.connect(droneFilter.frequency);
      lfo.start();

      // Save references so we can stop them
      (synthNodesRef.current as any).osc1 = osc1;
      (synthNodesRef.current as any).osc2 = osc2;
      (synthNodesRef.current as any).osc3 = osc3;
      (synthNodesRef.current as any).lfo = lfo;

      // 2. Scheduled Sonar Ping (Soft, melodic)
      const triggerSonarPing = () => {
        if (!audioContextRef.current || audioContextRef.current.state === "suspended") return;
        
        const now = audioContextRef.current.currentTime;
        const pingOsc = audioContextRef.current.createOscillator();
        const pingGain = audioContextRef.current.createGain();
        const pingFilter = audioContextRef.current.createBiquadFilter();

        pingOsc.type = "sine";
        pingOsc.frequency.setValueAtTime(940, now); // soft high frequency sonar chirp
        // Glide down slightly
        pingOsc.frequency.exponentialRampToValueAtTime(720, now + 1.2);

        pingFilter.type = "bandpass";
        pingFilter.frequency.setValueAtTime(800, now);
        pingFilter.Q.setValueAtTime(1.5, now);

        pingGain.gain.setValueAtTime(0.0, now);
        // Fade in rapidly, then decay slowly
        pingGain.gain.linearRampToValueAtTime(0.025, now + 0.1);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

        pingOsc.connect(pingFilter);
        pingFilter.connect(pingGain);
        pingGain.connect(masterGain);

        pingOsc.start(now);
        pingOsc.stop(now + 4.5);
      };

      // Periodic sonar sweep every 12 seconds
      triggerSonarPing();
      const sonarInterval = window.setInterval(triggerSonarPing, 12000);
      sonarIntervalRef.current = sonarInterval;

      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser environment.", e);
    }
  };

  const stopAmbience = () => {
    if (sonarIntervalRef.current) {
      clearInterval(sonarIntervalRef.current);
      sonarIntervalRef.current = null;
    }

    const refs = synthNodesRef.current as any;
    if (refs.osc1) { try { refs.osc1.stop(); } catch (e) {} refs.osc1 = null; }
    if (refs.osc2) { try { refs.osc2.stop(); } catch (e) {} refs.osc2 = null; }
    if (refs.osc3) { try { refs.osc3.stop(); } catch (e) {} refs.osc3 = null; }
    if (refs.lfo) { try { refs.lfo.stop(); } catch (e) {} refs.lfo = null; }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={handleToggle}
        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 focus:outline-none ${
          isPlaying
            ? "bg-neon-aqua/20 border-neon-aqua text-neon-aqua shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            : "bg-deep-black/60 backdrop-blur-md border-soft-white/10 text-soft-white/60 hover:text-neon-aqua hover:border-neon-aqua/50"
        }`}
        title={isPlaying ? "Mute Deep Sea Ambience" : "Enable Deep Sea Soundscape"}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 relative z-10" />
            <span className="absolute inset-0 rounded-full bg-neon-aqua/30 animate-ping"></span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
