import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../Navigation';
import Logo from './Logo';
import Quotes from './Quotes';
import Welcome from './Welcome';
import useScrollY from '../../hooks/useScrollY';
import '../../style/LandingPage.css';

function Enso() {
  return (
    <motion.div
      className="enso"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#666666"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="0 1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.85 }}
          transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.8 }}
        />
      </svg>
    </motion.div>
  );
}

function VerticalText() {
  const chars = ['間', '美', '調', '和', '形'];
  return (
    <div className="vertical-text-group">
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="vertical-char"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 1 + i * 0.3, duration: 1 }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

function MaLines() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="ma-lines" style={{ opacity }}>
      <motion.div className="ma-line ma-line-1" style={{ y: y1 }} />
      <motion.div className="ma-line ma-line-2" style={{ y: y2 }} />
      <motion.div className="ma-line ma-line-3" style={{ y: y1 }} />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 0.8 }}
    >
      <div className="scroll-indicator-line">
        <motion.div
          className="scroll-indicator-fill"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const scrollY = useScrollY();

  return (
    <div className="landing-page">
      <div className="grain-overlay" />

      <div className="hero-section">
        <Navigation />

        <div className="hero-ma">
          <Enso />
          <VerticalText />
          <MaLines />
        </div>

        <Logo scrollY={scrollY} />
        <Quotes />
        <ScrollIndicator />
      </div>

      <Welcome />
    </div>
  );
}
