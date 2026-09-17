import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from './Navigation';
import '../style/Constructivism.css';

const diagonalLines = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: -35 + i * 8,
  x: -10 + i * 18,
  delay: i * 0.08,
}));

const gears = [
  { id: 1, size: 120, x: 75, y: 15, speed: 12 },
  { id: 2, size: 80, x: 20, y: 70, speed: 8 },
  { id: 3, size: 60, x: 60, y: 55, speed: 16 },
  { id: 4, size: 100, x: 85, y: 75, speed: 10 },
];

const propagandaBlocks = [
  { text: 'WORK', rotate: -12, color: '#D32F2F' },
  { text: 'BUILD', rotate: 8, color: '#000000' },
  { text: 'CREATE', rotate: -5, color: '#D32F2F' },
  { text: 'PRODUCE', rotate: 15, color: '#000000' },
  { text: 'FORGE', rotate: -20, color: '#D32F2F' },
];

function GearSVG({ size }) {
  const teeth = 12;
  const outerR = size / 2;
  const innerR = outerR * 0.7;
  const toothDepth = outerR * 0.15;
  const points = [];

  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.35) / teeth) * Math.PI * 2;
    const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
    const a4 = ((i + 0.85) / teeth) * Math.PI * 2;

    points.push(`${outerR + Math.cos(a1) * innerR},${outerR + Math.sin(a1) * innerR}`);
    points.push(`${outerR + Math.cos(a2) * (innerR + toothDepth)},${outerR + Math.sin(a2) * (innerR + toothDepth)}`);
    points.push(`${outerR + Math.cos(a3) * (innerR + toothDepth)},${outerR + Math.sin(a3) * (innerR + toothDepth)}`);
    points.push(`${outerR + Math.cos(a4) * innerR},${outerR + Math.sin(a4) * innerR}`);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={points.join(' ')} fill="none" stroke="#000000" strokeWidth="2" />
      <circle cx={outerR} cy={outerR} r={innerR * 0.35} fill="none" stroke="#D32F2F" strokeWidth="2" />
      <circle cx={outerR} cy={outerR} r="4" fill="#D32F2F" />
    </svg>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function Constructivism() {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const heroRotate = useTransform(scrollY, [0, 600], [0, isMobile ? 0 : -15]);
  const heroX = useTransform(scrollY, [0, 600], [0, isMobile ? 0 : -80]);
  const heroY = useTransform(scrollY, [0, 600], [0, isMobile ? 0 : 60]);
  const diagonalOffset = useTransform(scrollY, [0, 800], [0, isMobile ? 0 : 200]);
  const beamRotate = useTransform(scrollY, [0, 500], [0, 25]);

  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="constructivism-page">
      <Navigation variant="nav-construct" />

      {/* Hero Section */}
      <section className="c-hero">
        <motion.div
          className="c-hero__title-wrap"
          style={isMobile ? {} : { rotate: heroRotate, x: heroX, y: heroY }}
        >
          <motion.h1
            className="c-hero__title"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {'CONSTRUCTIVISM'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="c-hero__letter"
                initial={{ opacity: 0, y: -100, rotate: -45 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -8 : 6 }}
                transition={{ delay: i * 0.06, duration: 0.5, type: 'spring' }}
                style={{ color: i % 3 === 0 ? '#D32F2F' : '#000000' }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p
          className="c-hero__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          ART INTO LIFE
        </motion.p>

        {/* Diagonal decorative lines */}
        {diagonalLines.map((line) => (
          <motion.div
            key={line.id}
            className="c-diagonal-line"
            style={{ left: `${line.x}%`, rotate: `${line.angle}deg` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: line.delay + 0.5, duration: 0.6 }}
          />
        ))}
      </section>

      {/* Industrial Shapes Section */}
      <section className="c-industrial">
        <motion.div className="c-industrial__grid">
          {gears.map((gear) => (
            <motion.div
              key={gear.id}
              className="c-gear-wrapper"
              style={{ left: `${gear.x}%`, top: `${gear.y}%` }}
              animate={{ rotate: 360 }}
              transition={{ duration: gear.speed, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 20px #D32F2F)' }}
            >
              <GearSVG size={gear.size} />
            </motion.div>
          ))}

          {/* Beams */}
          <motion.div
            className="c-beam c-beam--1"
            style={{ rotate: beamRotate }}
            whileHover={{ backgroundColor: '#D32F2F' }}
          />
          <motion.div
            className="c-beam c-beam--2"
            whileHover={{ backgroundColor: '#D32F2F' }}
          />
          <motion.div
            className="c-beam c-beam--3"
            whileHover={{ scaleX: 1.5 }}
          />

          {/* Angular forms */}
          <motion.div
            className="c-angular c-angular--1"
            whileHover={{ rotate: 45, backgroundColor: '#D32F2F' }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
          <motion.div
            className="c-angular c-angular--2"
            whileHover={{ rotate: -30, backgroundColor: '#000000' }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
          <motion.div
            className="c-angular c-angular--3"
            whileHover={{ scale: 1.5, borderColor: '#D32F2F' }}
          />
        </motion.div>
      </section>

      {/* Propaganda Poster Section */}
      <section className="c-propaganda">
        <motion.div
          className="c-propaganda__layout"
          style={{ x: diagonalOffset }}
        >
          <div className="c-propaganda__red-block">
            <h2 className="c-propaganda__heading">ART INTO LIFE</h2>
            <div className="c-propaganda__divider" />
            <p className="c-propaganda__text">
              The constructivist artist rejects the idea of autonomous art.
              Art must serve the revolution.
            </p>
          </div>

          <div className="c-propaganda__words">
            {propagandaBlocks.map((block, i) => (
              <motion.div
                key={i}
                className="c-propaganda__word"
                style={{ rotate: `${block.rotate}deg`, color: block.color }}
                whileHover={{
                  scale: 1.2,
                  rotate: 0,
                  textShadow: '4px 4px 0 #D32F2F',
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -200 : 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                {block.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="c-propaganda__stripe c-propaganda__stripe--1"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="c-propaganda__stripe c-propaganda__stripe--2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </section>

      {/* Typographic Experiments */}
      <section className="c-typography">
        <div className="c-typography__grid">
          <motion.div
            className="c-typo-block c-typo-block--1"
            initial={{ opacity: 0, rotate: -90 }}
            whileInView={{ opacity: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="c-typo-block__label">TECHNIQUE</span>
            <span className="c-typo-block__value">GEOMETRY</span>
          </motion.div>

          <motion.div
            className="c-typo-block c-typo-block--2"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="c-typo-block__label">MATERIAL</span>
            <span className="c-typo-block__value">STEEL</span>
          </motion.div>

          <motion.div
            className="c-typo-block c-typo-block--3"
            initial={{ opacity: 0, rotate: 90 }}
            whileInView={{ opacity: 1, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="c-typo-block__label">PURPOSE</span>
            <span className="c-typo-block__value">FUNCTION</span>
          </motion.div>

          <motion.div
            className="c-typo-block c-typo-block--4"
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="c-typo-block__label">FORM</span>
            <span className="c-typo-block__value">INDUSTRY</span>
          </motion.div>

          <motion.div
            className="c-typo-block c-typo-block--5"
            whileHover={{ rotate: 0, scale: 1.1 }}
            style={{ rotate: -18 }}
          >
            <span className="c-typo-block__label">POWER</span>
            <span className="c-typo-block__value">MACHINE</span>
          </motion.div>

          <motion.div
            className="c-typo-block c-typo-block--6"
            whileHover={{ rotate: 0, scale: 1.1 }}
            style={{ rotate: 12 }}
          >
            <span className="c-typo-block__label">ORDER</span>
            <span className="c-typo-block__value">SYSTEM</span>
          </motion.div>
        </div>

        <motion.div
          className="c-typography__cursor-circle"
          animate={{
            x: mousePos.x - 40,
            y: mousePos.y - 40,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
      </section>

      {/* Mechanical Motion Section */}
      <section className="c-mechanical">
        <motion.h2
          className="c-mechanical__heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          INDUSTRIAL MOTION
        </motion.h2>

        <div className="c-mechanical__stage">
          {/* Piston animation */}
          <div className="c-piston-group">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="c-piston"
                animate={{ y: [0, -60, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Conveyor belt */}
          <motion.div className="c-conveyor">
            <motion.div
              className="c-conveyor__belt"
              animate={{ x: [-200, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="c-conveyor__block"
                animate={{ x: [-200 + i * 120, 500] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'linear',
                }}
              />
            ))}
          </motion.div>

          {/* Rotating arm */}
          <motion.div
            className="c-arm"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <div className="c-arm__bar" />
            <div className="c-arm__joint" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="c-footer">
        <motion.div
          className="c-footer__stripe"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
        <p className="c-footer__text">
          CONSTRUCTIVISM &mdash; ART INTO LIFE &mdash; 1913
        </p>
      </footer>
    </div>
  );
}
