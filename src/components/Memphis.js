import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import '../style/Memphis.css';

const MEMPHIS_COLORS = ['#FF6B9D', '#FFE66D', '#4ECDC4', '#FF6B6B', '#95E86E', '#C44AFF'];

const MOBILE_SHAPE_OFFSETS = {
  1: { x: 50, y: 100 },
  2: { x: 150, y: 80 },
  3: { x: 250, y: 130 },
  4: { x: 350, y: 90 },
  5: { x: 100, y: 200 },
  6: { x: 300, y: 180 },
  7: { x: 200, y: 150 },
  8: { x: 80, y: 250 },
};

const initialShapes = [
  { id: 1, type: 'circle', x: 100, y: 200, color: '#FF6B9D', size: 40 },
  { id: 2, type: 'triangle', x: 300, y: 150, color: '#FFE66D', size: 50 },
  { id: 3, type: 'square', x: 500, y: 250, color: '#4ECDC4', size: 35 },
  { id: 4, type: 'squiggle', x: 700, y: 180, color: '#FF6B6B', size: 60 },
  { id: 5, type: 'dots', x: 200, y: 400, color: '#95E86E', size: 45 },
  { id: 6, type: 'zigzag', x: 600, y: 350, color: '#C44AFF', size: 55 },
  { id: 7, type: 'circle', x: 850, y: 300, color: '#FFE66D', size: 30 },
  { id: 8, type: 'triangle', x: 150, y: 500, color: '#4ECDC4', size: 40 },
];

const furnitureItems = [
  { title: 'Carlton Bookcase', desc: 'Sottsass iconic shelving unit with bold geometric forms', color: '#FF6B9D' },
  { title: 'Tahiti Lamp', desc: 'Whimsical lighting with bird-like tropical forms', color: '#FFE66D' },
  { title: 'Casablanca Sideboard', desc: 'Vibrant storage with asymmetrical compartments', color: '#4ECDC4' },
  { title: 'Oceanic Table', desc: 'Playful dining table with terrazzo-inspired top', color: '#FF6B6B' },
  { title: 'Ginza Chair', desc: 'Stackable chair with bold graphic patterns', color: '#95E86E' },
  { title: 'Milano Sofa', desc: 'Curved seating with Memphis signature color blocking', color: '#C44AFF' },
];

const shapeVariants = {
  animate: (i) => ({
    y: [0, -15, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 2 + i * 0.3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

function DraggableShape({ shape, index }) {

  const renderShape = () => {
    switch (shape.type) {
      case 'circle':
        return (
          <div
            className="memphis-shape-circle"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            className="memphis-shape-triangle"
            style={{
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
          />
        );
      case 'square':
        return (
          <div
            className="memphis-shape-square"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
            }}
          />
        );
      case 'squiggle':
        return (
          <svg width={shape.size * 1.5} height={shape.size} viewBox="0 0 60 30">
            <path
              d="M5,15 Q15,5 25,15 Q35,25 45,15 Q55,5 55,15"
              stroke={shape.color}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        );
      case 'dots':
        return (
          <div className="memphis-shape-dots">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="memphis-dot"
                style={{
                  backgroundColor: shape.color,
                  width: shape.size / 4,
                  height: shape.size / 4,
                }}
              />
            ))}
          </div>
        );
      case 'zigzag':
        return (
          <svg width={shape.size * 1.5} height={shape.size} viewBox="0 0 60 30">
            <polyline
              points="5,25 15,5 25,25 35,5 45,25 55,5"
              stroke={shape.color}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="memphis-draggable-shape"
      style={{ left: shape.x, top: shape.y }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      custom={index}
      variants={shapeVariants}
      animate="animate"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {renderShape()}
    </motion.div>
  );
}

function SquigglyLine({ color, delay = 0 }) {
  return (
    <motion.svg
      className="squiggly-line"
      width="200"
      height="30"
      viewBox="0 0 200 30"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration: 1.5, ease: 'easeInOut' }}
    >
      <motion.path
        d="M10,15 Q30,5 50,15 Q70,25 90,15 Q110,5 130,15 Q150,25 170,15 Q190,5 190,15"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 1.5, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

export default function Memphis() {
  const [shapes, setShapes] = useState(initialShapes);
  const [activeColor, setActiveColor] = useState(0);
  const [patterns, setPatterns] = useState([]);
  const patternIdRef = useRef(0);
  const patternAreaRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setShapes(initialShapes.map((s) => ({
        ...s,
        ...(MOBILE_SHAPE_OFFSETS[s.id] || {}),
      })));
    }
  }, []);

  const generatePattern = useCallback((e) => {
    if (!patternAreaRef.current) return;
    const rect = patternAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPatterns = [];
    const count = 5 + Math.floor(Math.random() * 5);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const distance = 30 + Math.random() * 60;
      const colorIndex = Math.floor(Math.random() * MEMPHIS_COLORS.length);
      const types = ['circle', 'triangle', 'square', 'dots'];
      const type = types[Math.floor(Math.random() * types.length)];

      newPatterns.push({
        id: patternIdRef.current++,
        type,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        color: MEMPHIS_COLORS[colorIndex],
        size: 10 + Math.random() * 25,
      });
    }

    setPatterns((prev) => [...prev.slice(-50), ...newPatterns]);
  }, []);

  const heroBgShapes = useMemo(
    () =>
      [...Array(20)].map((_, i) => {
        const seed = (i * 137.508 + 7.3) % 1;
        return {
          left: `${((i * 51.17) % 100)}%`,
          top: `${((i * 73.91 + 13) % 100)}%`,
          width: 20 + ((i * 17.3) % 40),
          height: 20 + ((i * 23.7) % 40),
          opacity: 0.15 + (seed * 0.2),
          duration: 3 + ((i * 11.1) % 4),
          delay: ((i * 1.7) % 2),
        };
      }),
    [],
  );

  const furnitureRotations = useMemo(
    () => furnitureItems.map((_, i) => (i % 2 === 0 ? 3 : -3)),
    [],
  );

  const LIGHT_COLORS = ['#FFE66D', '#95E86E', '#4ECDC4'];

  return (
    <div className="memphis-page">
      <Navigation variant="nav-memphis" />

      <div className="memphis-hero">
        <div className="memphis-hero-bg">
          {heroBgShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="hero-bg-shape"
              style={{
                left: shape.left,
                top: shape.top,
                backgroundColor: MEMPHIS_COLORS[i % MEMPHIS_COLORS.length],
                width: shape.width,
                height: shape.height,
                opacity: shape.opacity,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: shape.delay,
              }}
            />
          ))}
        </div>

        <div className="memphis-hero-content">
          <motion.h1
            className="memphis-title"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {'MEMPHIS'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="memphis-letter"
                style={{ color: MEMPHIS_COLORS[i % MEMPHIS_COLORS.length] }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="memphis-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Bold. Playful. Anti-Design.
          </motion.p>

          <div className="squiggly-decorations">
            <SquigglyLine color="#FF6B9D" delay={1} />
            <SquigglyLine color="#FFE66D" delay={1.2} />
            <SquigglyLine color="#4ECDC4" delay={1.4} />
          </div>
        </div>
      </div>

      <div className="memphis-section">
        <h2 className="section-title memphis-section-title">
          Drag the Shapes!
        </h2>
        <div className="shapes-playground">
          {shapes.map((shape, i) => (
            <DraggableShape key={shape.id} shape={shape} index={i} />
          ))}
        </div>
      </div>

      <div className="memphis-section">
        <h2 className="section-title memphis-section-title">
          Pattern Generator
        </h2>
        <p className="section-desc">Click anywhere to create Memphis patterns</p>
        <div
          className="pattern-area"
          ref={patternAreaRef}
          onClick={generatePattern}
        >
          {patterns.map((p) => (
            <motion.div
              key={p.id}
              className="pattern-shape"
              style={{ left: p.x, top: p.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {p.type === 'circle' && (
                <div
                  style={{
                    width: p.size,
                    height: p.size,
                    borderRadius: '50%',
                    backgroundColor: p.color,
                  }}
                />
              )}
              {p.type === 'triangle' && (
                <div
                  style={{
                    borderLeft: `${p.size / 2}px solid transparent`,
                    borderRight: `${p.size / 2}px solid transparent`,
                    borderBottom: `${p.size}px solid ${p.color}`,
                  }}
                />
              )}
              {p.type === 'square' && (
                <div
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    transform: `rotate(${(p.id * 37) % 45}deg)`,
                  }}
                />
              )}
              {p.type === 'dots' && (
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: p.size / 3,
                        height: p.size / 3,
                        borderRadius: '50%',
                        backgroundColor: p.color,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="memphis-section">
        <h2 className="section-title memphis-section-title">
          Color Palette
        </h2>
        <div className="color-switcher">
          {MEMPHIS_COLORS.map((color, i) => (
            <motion.button
              key={i}
              className={`color-btn ${activeColor === i ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(i)}
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
        <motion.div
          className="active-color-display"
          style={{ backgroundColor: MEMPHIS_COLORS[activeColor] }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span style={{ color: LIGHT_COLORS.includes(MEMPHIS_COLORS[activeColor]) ? '#1a1a1a' : 'inherit' }}>{MEMPHIS_COLORS[activeColor]}</span>
        </motion.div>
      </div>

      <div className="memphis-section">
        <h2 className="section-title memphis-section-title">
          Memphis Inspiration
        </h2>
        <div className="furniture-grid">
          {furnitureItems.map((item, i) => (
            <motion.div
              key={i}
              className="furniture-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                rotate: furnitureRotations[i],
                boxShadow: `0 10px 40px ${item.color}50`,
              }}
            >
              <div
                className="furniture-card-top"
                style={{ backgroundColor: item.color }}
              >
                <motion.div
                  className="furniture-shape"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {i % 3 === 0 && (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        border: `4px solid white`,
                        borderRadius: '50%',
                      }}
                    />
                  )}
                  {i % 3 === 1 && (
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '20px solid transparent',
                        borderRight: '20px solid transparent',
                        borderBottom: '35px solid white',
                      }}
                    />
                  )}
                  {i % 3 === 2 && (
                    <div
                      style={{
                        width: 35,
                        height: 35,
                        border: `4px solid white`,
                        transform: 'rotate(45deg)',
                      }}
                    />
                  )}
                </motion.div>
              </div>
              <div className="furniture-card-content">
                <h3 style={{ color: item.color }}>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <motion.div
                className="furniture-card-accent"
                style={{ backgroundColor: item.color }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="memphis-footer">
        <div className="footer-shapes">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="footer-shape"
              style={{
                backgroundColor: MEMPHIS_COLORS[i % MEMPHIS_COLORS.length],
                left: `${(i / 12) * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <motion.p
          className="memphis-footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Memphis Milano 1981 — Breaking the Rules Ever Since
        </motion.p>
      </div>
    </div>
  );
}
