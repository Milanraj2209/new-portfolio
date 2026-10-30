import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Layers, CheckCircle2 } from 'lucide-react';

const LOADING_PHASES = [
  { text: 'CALIBRATING CINEMATIC 3D ENGINE', icon: Layers },
  { text: 'RENDERING 3D AVATAR & NEON VOLUMETRICS', icon: Sparkles },
  { text: 'SYNTHESIZING AI & CREATIVE WORKSPACE', icon: Cpu },
  { text: 'SYSTEM READY — WELCOME TO MY UNIVERSE', icon: CheckCircle2 },
];

const TARGET_NAME = 'MILAN RAJ';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [shuffledName, setShuffledName] = useState('------- ---');

  // Progressive letter shuffle effect resolving into 'MILAN RAJ'
  useEffect(() => {
    let iteration = 0;
    const totalIterations = 36;

    const shuffleInterval = setInterval(() => {
      iteration++;
      const resolvedCount = Math.floor((iteration / totalIterations) * TARGET_NAME.length);

      const nextScramble = TARGET_NAME.split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < resolvedCount) return TARGET_NAME[index];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      setShuffledName(nextScramble);

      if (iteration >= totalIterations) {
        setShuffledName(TARGET_NAME);
        clearInterval(shuffleInterval);
      }
    }, 90);

    return () => clearInterval(shuffleInterval);
  }, []);

  useEffect(() => {
    // Slower, smooth progression (~4.4 seconds total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 700);
          return 100;
        }
        const step = Math.floor(Math.random() * 3) + 2; // 2-4% every 85ms
        const next = Math.min(prev + step, 100);

        if (next < 30) setPhaseIdx(0);
        else if (next < 65) setPhaseIdx(1);
        else if (next < 95) setPhaseIdx(2);
        else setPhaseIdx(3);

        return next;
      });
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  const CurrentIcon = LOADING_PHASES[phaseIdx].icon;

  // Avatar fade-in & clear focus progression
  const avatarOpacity = Math.min(0.25 + (progress / 100) * 0.75, 1);
  const avatarBlur = Math.max(0, 10 - (progress / 100) * 10);
  const avatarScale = 0.92 + (progress / 100) * 0.08;

  return (
    <motion.div
      className="cinematic-loader-wrap"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(10px)',
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="loader-ambient-glow" />
      <div className="loader-ambient-glow-secondary" />

      <motion.div
        className="loader-box"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Holographic 3D Avatar Portrait Preview with Glow */}
        <div className="loader-avatar-container">
          <div className="loader-avatar-ring-outer" />
          <div className="loader-avatar-ring-inner" />
          <img
            src="/avatar-portrait-square.png"
            alt="Milan Raj 3D Portrait"
            className="loader-avatar-pic"
            style={{
              opacity: avatarOpacity,
              filter: `blur(${avatarBlur}px) drop-shadow(0 0 25px rgba(168, 85, 247, 0.6))`,
              transform: `scale(${avatarScale})`,
            }}
          />
        </div>

        {/* Identity & Cyber Shuffle Name */}
        <div className="loader-meta">
          <span className="loader-badge">PORTFOLIO EXPERIENCE 2026</span>
          <h2 className="loader-main-title loader-scramble-name">
            {shuffledName}
          </h2>
          <p className="loader-main-subtitle">AI Engineer & Creative Full-Stack Developer</p>
          <p className="loader-tagline">“Transforming Bold Ideas Into Cinematic Digital Realities”</p>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="loader-bar-track">
          <motion.div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
          <div className="loader-bar-glow" style={{ left: `${Math.max(0, progress - 4)}%` }} />
        </div>

        {/* Dynamic Status / Readout */}
        <div className="loader-status-row">
          <span className="loader-status-text">
            <CurrentIcon size={13} className="loader-icon-pulse" />
            {LOADING_PHASES[phaseIdx].text}
          </span>
          <span className="loader-pct">{progress}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}


