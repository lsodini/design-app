import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import '../style/Minimalism.css';

const principles = [
  {
    title: 'Whitespace',
    desc: 'Space is not empty. It is a powerful design element that gives content room to breathe.',
  },
  {
    title: 'Typography',
    desc: 'One typeface, multiple weights. Let the hierarchy speak through size and weight alone.',
  },
  {
    title: 'Color',
    desc: 'A restrained palette of 2-3 colors. Each hue chosen with intention and purpose.',
  },
  {
    title: 'Grid',
    desc: 'Invisible structure that creates order. The best grid is the one you never notice.',
  },
];

const gallery = [
  { bg: '#fafafa', accent: '#333', label: 'Light' },
  { bg: '#1a1a1a', accent: '#f0f0f0', label: 'Dark' },
  { bg: '#f5f0eb', accent: '#8b7355', label: 'Warm' },
  { bg: '#f0f4f8', accent: '#4a6fa5', label: 'Cool' },
];

export default function Minimalism() {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [activeGallery, setActiveGallery] = useState(0);

  return (
    <div className="minimalism-page">
      <Navigation light />

      <div className="minimal-hero">
        <motion.h1
          className="minimal-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Less is More
        </motion.h1>
        <motion.div
          className="minimal-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        />
        <motion.p
          className="minimal-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          The art of intentional restraint
        </motion.p>
      </div>

      <div className="minimal-section">
        <div className="minimal-principles">
          <div className="principle-nav">
            {principles.map((p, i) => (
              <motion.button
                key={i}
                className={`principle-btn ${activePrinciple === i ? 'active' : ''}`}
                onClick={() => setActivePrinciple(i)}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <span className="principle-num">0{i + 1}</span>
                {p.title}
              </motion.button>
            ))}
          </div>
          <div className="principle-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePrinciple}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="principle-detail"
              >
                <h3>{principles[activePrinciple].title}</h3>
                <p>{principles[activePrinciple].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="minimal-section">
        <h2 className="minimal-section-title">Gallery</h2>
        <div className="gallery-grid">
          {gallery.map((g, i) => (
            <motion.div
              key={i}
              className={`gallery-item ${activeGallery === i ? 'active' : ''}`}
              style={{ backgroundColor: g.bg }}
              onClick={() => setActiveGallery(i)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveGallery(i)}
              role="button"
              tabIndex={0}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="gallery-content" style={{ color: g.accent }}>
                <div className="gallery-mock">
                  <div className="mock-nav" style={{ backgroundColor: g.accent, opacity: 0.2 }} />
                  <div className="mock-hero" style={{ backgroundColor: g.accent, opacity: 0.1 }} />
                  <div className="mock-text">
                    <div style={{ backgroundColor: g.accent, opacity: 0.3, width: '60%' }} />
                    <div style={{ backgroundColor: g.accent, opacity: 0.15, width: '80%' }} />
                  </div>
                </div>
                <span className="gallery-label">{g.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="minimal-section">
        <motion.div
          className="minimal-quote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."</p>
          <span>— Antoine de Saint-Exupéry</span>
        </motion.div>
      </div>
    </div>
  );
}
