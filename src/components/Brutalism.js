import { useState, useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import '../style/Brutalism.css';

const examples = [
  {
    title: 'Raw Typography',
    desc: 'Bold, oversized type that demands attention. No refinement, pure impact.',
    color: '#ff4d00',
    bg: '#1a1a1a',
  },
  {
    title: 'Concrete Grid',
    desc: 'Asymmetric layouts that break conventions. Structure through chaos.',
    color: '#ffe100',
    bg: '#0d0d0d',
  },
  {
    title: 'Exposed Structure',
    desc: 'Borders, grids, and wireframes visible by design. Nothing is hidden.',
    color: '#ff003c',
    bg: '#111',
  },
  {
    title: 'High Contrast',
    desc: 'Extreme contrast between elements. Black, white, and raw accent colors.',
    color: '#ffffff',
    bg: '#000000',
  },
  {
    title: 'Brutal Forms',
    desc: 'Geometric shapes with hard edges. No rounded corners, no softness.',
    color: '#00ff88',
    bg: '#0a0a0a',
  },
  {
    title: 'Intentional Roughness',
    desc: 'Overlapping elements, misaligned text, and deliberate imperfection.',
    color: '#ff6b00',
    bg: '#151515',
  },
];

const palettes = [
  { name: 'Industrial', colors: ['#1a1a1a', '#ff4d00', '#ffe100', '#ffffff', '#333333'] },
  { name: 'Concrete', colors: ['#2c2c2c', '#808080', '#c0c0c0', '#ff003c', '#000000'] },
  { name: 'Neon Brutal', colors: ['#0d0d0d', '#00ff88', '#ff003c', '#ffe100', '#ff6b00'] },
];

const letterAnimations = 'BRUTALISM'.split('').map((l, i) => ({ letter: l, delay: i * 0.08 }));

export default function Brutalism() {
  const [activePalette, setActivePalette] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const cardRotations = useMemo(
    () => examples.map((_, i) => ((i * 137.508) % 2 === 0 ? 2 : -2)),
    [],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    });
  };

  return (
    <div className="brutalism-page" ref={containerRef} onMouseMove={handleMouseMove}>
      <Navigation variant="nav-brutal" />

      <div className="brutal-hero">
        <div className="brutal-hero-content">
          <h1 className="brutal-title">
            {letterAnimations.map(({ letter, delay }, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotate: -15 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay, duration: 0.4, ease: 'easeOut' }}
                className="brutal-letter"
                style={{
                  transform:
                    hoveredCard !== null
                      ? `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`
                      : 'none',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="brutal-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Raw. Bold. Unfiltered.
          </motion.p>
        </div>
      </div>

      <div className="brutal-section">
        <h2 className="section-title brutal-section-title">Examples</h2>
        <div className="brutal-grid">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              className="brutal-card"
              style={{ backgroundColor: ex.bg, borderColor: ex.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{
                scale: 1.05,
                rotate: cardRotations[i],
                boxShadow: `0 0 30px ${ex.color}40`,
              }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div
                className="brutal-card-accent"
                style={{ backgroundColor: ex.color }}
              />
              <h3 style={{ color: ex.color }}>{ex.title}</h3>
              <p>{ex.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="brutal-section">
        <h2 className="section-title brutal-section-title">Color Palettes</h2>
        <div className="palette-switcher">
          {palettes.map((p, i) => (
            <motion.button
              key={i}
              className={`palette-btn ${activePalette === i ? 'active' : ''}`}
              onClick={() => setActivePalette(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {p.name}
            </motion.button>
          ))}
        </div>
        <motion.div
          className="palette-display"
          key={activePalette}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {palettes[activePalette].colors.map((color, i) => (
            <motion.div
              key={i}
              className="palette-swatch"
              style={{ backgroundColor: color }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              whileHover={{ scaleY: 1.2, zIndex: 10 }}
            >
              <span className="swatch-label">{color}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="brutal-section brutal-cta">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, rotate: -3 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Embrace the Raw</h2>
          <p>Brutalism isn't about being ugly. It's about being honest.</p>
          <motion.div
            className="cta-border"
            animate={{ borderWidth: ['2px', '6px', '2px'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
