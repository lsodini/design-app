import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from './Navigation';
import '../style/DeStijl.css';

const COLORS = ['#FF0000', '#0000FF', '#FFD700', '#FFFFFF'];
const COLOR_NAMES = ['Red', 'Blue', 'Yellow', 'White'];

const mondrianGrid = [
  [0, 1, 1, 0],
  [2, 3, 0, 1],
  [3, 2, 2, 3],
  [1, 0, 3, 0],
];

const compositions = [
  { x: 0, y: 0, w: 3, h: 2, color: '#FF0000' },
  { x: 3, y: 0, w: 1, h: 3, color: '#0000FF' },
  { x: 0, y: 2, w: 2, h: 2, color: '#FFD700' },
  { x: 2, y: 2, w: 2, h: 1, color: '#FFFFFF' },
  { x: 2, y: 3, w: 2, h: 1, color: '#FF0000' },
];

const colorBlocks = [
  { color: '#FF0000', label: 'Red', meaning: 'Energy & Passion' },
  { color: '#0000FF', label: 'Blue', meaning: 'Calm & Depth' },
  { color: '#FFD700', label: 'Yellow', meaning: 'Light & Joy' },
];

export default function DeStijl() {
  const [grid, setGrid] = useState(mondrianGrid);
  const [hoveredComp, setHoveredComp] = useState(null);
  const gridRef = useRef(null);
  const compRef = useRef(null);
  const blocksRef = useRef(null);

  const gridInView = useInView(gridRef, { once: true, margin: '-100px' });
  const compInView = useInView(compRef, { once: true, margin: '-100px' });
  const blocksInView = useInView(blocksRef, { once: true, margin: '-100px' });

  const toggleCell = (row, col) => {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = (next[row][col] + 1) % COLORS.length;
      return next;
    });
  };

  return (
    <div className="destijl-page">
      <Navigation variant="nav-destijl" />

      <div className="destijl-hero">
        <motion.h1
          className="destijl-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          DE STIJL
        </motion.h1>
        <motion.p
          className="destijl-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Neoplasticism &middot; Pure Abstraction &middot; Universal Harmony
        </motion.p>
        <motion.div
          className="hero-grid-line h-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="hero-grid-line v-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
        />
      </div>

      <section className="destijl-section" ref={gridRef}>
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Interactive Composition
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Click cells to cycle through primary colors
          </motion.p>
        </div>

        <div className="mondrian-container">
          <div className="mondrian-grid">
            {grid.map((row, ri) =>
              row.map((cell, ci) => (
                <motion.button
                  key={`${ri}-${ci}`}
                  className="mondrian-cell"
                  style={{ backgroundColor: COLORS[cell] }}
                  onClick={() => toggleCell(ri, ci)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={gridInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: (ri * 4 + ci) * 0.05, duration: 0.3 }}
                >
                  <span className="cell-label">{COLOR_NAMES[cell]}</span>
                </motion.button>
              ))
            )}
          </div>

          <motion.div
            className="grid-line h-grid-line"
            initial={{ scaleX: 0 }}
            animate={gridInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="grid-line h-grid-line-2"
            initial={{ scaleX: 0 }}
            animate={gridInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="grid-line v-grid-line"
            initial={{ scaleY: 0 }}
            animate={gridInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="grid-line v-grid-line-2"
            initial={{ scaleY: 0 }}
            animate={gridInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </section>

      <section className="destijl-section" ref={compRef}>
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Balanced Asymmetry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hover over rectangles to transform the composition
          </motion.p>
        </div>

        <div className="composition-container">
          <div className="composition-canvas">
            {compositions.map((rect, i) => (
              <motion.div
                key={i}
                className="composition-rect"
                style={{
                  gridColumn: `${rect.x + 1} / span ${rect.w}`,
                  gridRow: `${rect.y + 1} / span ${rect.h}`,
                  backgroundColor:
                    hoveredComp === i
                      ? COLORS[(COLORS.indexOf(rect.color) + 1) % COLORS.length]
                      : rect.color,
                }}
                onMouseEnter={() => setHoveredComp(i)}
                onMouseLeave={() => setHoveredComp(null)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={compInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ zIndex: 10 }}
              />
            ))}
          </div>

          <motion.div
            className="comp-line comp-h-line"
            initial={{ scaleX: 0 }}
            animate={compInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="comp-line comp-v-line"
            initial={{ scaleY: 0 }}
            animate={compInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </section>

      <section className="destijl-section" ref={blocksRef}>
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Primary Color Blocking
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The three primaries as pure, irreducible elements
          </motion.p>
        </div>

        <div className="color-blocks-grid">
          {colorBlocks.map((block, i) => (
            <motion.div
              key={i}
              className="color-block-card"
              initial={{ opacity: 0, y: 40 }}
              animate={blocksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <div
                className="color-block-swatch"
                style={{ backgroundColor: block.color }}
              />
              <div className="color-block-info">
                <h3>{block.label}</h3>
                <p>{block.meaning}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="destijl-footer-section">
        <div className="footer-lines">
          <motion.div
            className="footer-line fl-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            className="footer-line fl-2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            className="footer-line fl-3"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          />
        </div>
        <motion.p
          className="destijl-footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          "The position of the artist is humble. He is essentially a channel."
          <br />
          <span>&mdash; Piet Mondrian</span>
        </motion.p>
      </section>
    </div>
  );
}
