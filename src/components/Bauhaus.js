import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import '../style/Bauhaus.css';

const bauhausColors = [
  { name: 'Red', hex: '#E63946' },
  { name: 'Blue', hex: '#1D3557' },
  { name: 'Yellow', hex: '#F4A261' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
];

const gridPatterns = [
  { cols: 3, rows: 3, filled: [0, 4, 8] },
  { cols: 4, rows: 4, filled: [1, 3, 6, 9, 11, 14] },
  { cols: 3, rows: 4, filled: [0, 2, 3, 5, 6, 8, 9, 11] },
  { cols: 4, rows: 3, filled: [0, 5, 7, 10] },
];

function DraggableShape({ type, color, accent }) {

  const shapeStyles = {
    circle: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      backgroundColor: color,
    },
    square: {
      width: 110,
      height: 110,
      backgroundColor: color,
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeft: '60px solid transparent',
      borderRight: '60px solid transparent',
      borderBottom: `110px solid ${color}`,
      backgroundColor: 'transparent',
    },
  };

  return (
    <motion.div
      className="draggable-shape"
      style={shapeStyles[type]}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${accent}60` }}
      whileDrag={{ scale: 1.15, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="shape-label">{type}</span>
    </motion.div>
  );
}

function GridPattern({ pattern, accent, index }) {
  const total = pattern.cols * pattern.rows;

  return (
    <motion.div
      className="grid-pattern"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${pattern.cols}, 1fr)`,
          gap: '4px',
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className="grid-cell"
            style={{
              backgroundColor: pattern.filled.includes(i) ? accent : '#e0e0e0',
              aspectRatio: '1',
            }}
            whileHover={{ backgroundColor: accent, scale: 1.1 }}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Bauhaus() {
  const [accent, setAccent] = useState('#E63946');

  const handleColorClick = (hex) => {
    setAccent(hex);
  };

  const letters = 'BAUHAUS'.split('');

  return (
    <div className="bauhaus-page">
      <Navigation variant="nav-bauhaus" />

      <section className="bauhaus-hero">
        <div className="hero-shapes">
          <motion.div
            className="hero-circle"
            style={{ backgroundColor: '#E63946' }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-square"
            style={{ backgroundColor: '#1D3557' }}
            animate={{ rotate: [0, 90, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-triangle"
            animate={{ x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />
        </div>

        <div className="hero-content">
          <h1 className="bauhaus-title">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                className="bauhaus-letter"
                style={{
                  color: i % 2 === 0 ? '#000000' : accent,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="bauhaus-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Art &amp; Technology — A New Unity
          </motion.p>
        </div>
      </section>

      <section className="bauhaus-section">
        <h2 className="bauhaus-section-title">Color Palette</h2>
        <p className="bauhaus-section-desc">
          Click a color to change the page accent.
        </p>
        <div className="color-palette">
          {bauhausColors.map((c) => (
            <motion.button
              key={c.hex}
              className={`color-swatch ${accent === c.hex ? 'active' : ''}`}
              style={{
                backgroundColor: c.hex,
                border: c.hex === '#FFFFFF' ? '2px solid #ccc' : '2px solid transparent',
              }}
              onClick={() => handleColorClick(c.hex)}
              whileHover={{ scale: 1.15, y: -8 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="swatch-name"
                style={{ color: c.hex === '#000000' || c.hex === '#1D3557' ? '#fff' : '#000' }}
              >
                {c.name}
              </span>
              <span
                className="swatch-hex"
                style={{ color: c.hex === '#000000' || c.hex === '#1D3557' ? '#fff' : '#000' }}
              >
                {c.hex}
              </span>
            </motion.button>
          ))}
        </div>
        <div
          className="accent-indicator"
          style={{ backgroundColor: accent }}
        >
          <span style={{ color: accent === '#FFFFFF' || accent === '#F4A261' ? '#000' : '#fff' }}>
            Current Accent: {accent}
          </span>
        </div>
      </section>

      <section className="bauhaus-section">
        <h2 className="bauhaus-section-title">Geometric Composition</h2>
        <p className="bauhaus-section-desc">
          Drag the shapes to compose your own arrangement.
        </p>
        <div className="composition-area" style={{ borderColor: accent }}>
          <DraggableShape type="circle" color="#E63946" accent={accent} />
          <DraggableShape type="square" color="#1D3557" accent={accent} />
          <DraggableShape type="triangle" color="#F4A261" accent={accent} />
          <motion.div
            className="composition-bg-shape"
            style={{
              width: 200,
              height: 200,
              border: `3px solid ${accent}`,
              borderRadius: '50%',
              position: 'absolute',
              bottom: 20,
              right: 20,
              opacity: 0.15,
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          />
        </div>
      </section>

      <section className="bauhaus-section">
        <h2 className="bauhaus-section-title">Modular Grid</h2>
        <p className="bauhaus-section-desc">
          Bauhaus-inspired grid compositions. Hover to interact.
        </p>
        <div className="grid-patterns">
          {gridPatterns.map((pattern, i) => (
            <GridPattern key={i} pattern={pattern} accent={accent} index={i} />
          ))}
        </div>
      </section>

      <section className="bauhaus-footer" style={{ borderTopColor: accent }}>
        <motion.div
          className="footer-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-shapes">
            <motion.div
              style={{ width: 30, height: 30, backgroundColor: '#E63946', borderRadius: '50%' }}
              whileHover={{ scale: 1.5 }}
            />
            <motion.div
              style={{ width: 30, height: 30, backgroundColor: '#1D3557' }}
              whileHover={{ scale: 1.5 }}
            />
            <motion.div
              style={{
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom: '30px solid #F4A261',
              }}
              whileHover={{ scale: 1.5 }}
            />
          </div>
          <p className="bauhaus-footer-text">
            Form follows function — Less is more — Unity of art and craft
          </p>
        </motion.div>
      </section>
    </div>
  );
}
