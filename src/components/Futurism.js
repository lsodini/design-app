import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import '../style/Futurism.css';

const features = [
  {
    title: 'Neon Interfaces',
    desc: 'Glowing elements that pulse with energy, creating depth and hierarchy through light.',
    icon: '◈',
  },
  {
    title: 'Glass Morphism',
    desc: 'Frosted glass effects that blur the boundary between content and background.',
    icon: '◇',
  },
  {
    title: 'Kinetic Type',
    desc: 'Typography that moves, morphs, and responds to user interaction in real-time.',
    icon: '△',
  },
  {
    title: 'Spatial Design',
    desc: '3D environments and parallax depth that make interfaces feel tangible.',
    icon: '⬡',
  },
];

const techWords = ['AI', 'AR', 'VR', 'IoT', 'ML', 'XR', 'WebGL', '3D', 'Neural', 'Quantum'];

const kineticWords = ['DESIGN', 'CREATE', 'INNOVATE', 'EVOLVE', 'TRANSCEND', 'BUILD'];

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const count = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff25';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `#00f0ff${Math.round((1 - dist / 100) * 12).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

function TiltCard({ children, className }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -20, y: (x - 0.5) * 20 });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function KineticWord({ word, index }) {
  return (
    <motion.span
      className="kinetic-word"
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      whileHover={{
        scale: 1.2,
        color: '#00f0ff',
        textShadow: '0 0 20px #00f0ff80, 0 0 40px #00f0ff40',
      }}
    >
      {word}
    </motion.span>
  );
}

function SpatialGrid() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [60, 30]);
  const springX = useSpring(rotateX, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className="spatial-grid-wrapper">
      <motion.div
        className="spatial-grid"
        style={{ rotateX: springX }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="grid-line-h" style={{ top: `${i * 10}%` }} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="grid-line-v" style={{ left: `${i * 10}%` }} />
        ))}
        <div className="grid-glow" />
      </motion.div>
    </div>
  );
}

function FloatingOrbs() {
  const orbs = [
    { size: 80, x: '10%', y: '20%', color: '#00f0ff', delay: 0 },
    { size: 60, x: '80%', y: '30%', color: '#ff00ff', delay: 0.5 },
    { size: 100, x: '60%', y: '70%', color: '#00ff88', delay: 1 },
    { size: 50, x: '25%', y: '75%', color: '#ff4d00', delay: 1.5 },
    { size: 70, x: '85%', y: '60%', color: '#ffe100', delay: 0.8 },
  ];

  return (
    <div className="floating-orbs">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}30, transparent 70%)`,
            boxShadow: `0 0 ${orb.size}px ${orb.color}20`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + i,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function GlassPanel({ children, className = '' }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`glass-panel ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      animate={{ rotateY: mouse.x * 0.3, rotateX: -mouse.y * 0.3 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default function Futurism() {
  const [typedText, setTypedText] = useState('');
  const [activeWord, setActiveWord] = useState(0);
  const fullText = 'THE FUTURE IS NOW';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % kineticWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="futurism-page">
      <Particles />
      <Navigation variant="nav-neon" />

      {/* HERO */}
      <div className="futur-hero">
        <FloatingOrbs />
        <motion.h1
          className="futur-title neon-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {typedText}
          <span className="cursor">|</span>
        </motion.h1>
        <motion.p
          className="futur-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          Where Design Meets Technology
        </motion.p>

        <motion.div
          className="tech-marquee"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <div className="marquee-track">
            {[...techWords, ...techWords, ...techWords].map((word, i) => (
              <span key={i} className="tech-word">
                {word}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SPATIAL GRID */}
      <SpatialGrid />

      {/* GLASS MORPHISM SHOWCASE */}
      <div className="futur-section">
        <motion.h2
          className="futur-section-title neon-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Glass Morphism
        </motion.h2>
        <div className="glass-showcase">
          <GlassPanel className="glass-demo glass-lg">
            <div className="glass-content">
              <span className="glass-icon neon-text">◇</span>
              <h3>Frosted Depth</h3>
              <p>Background blur creates layered depth without heaviness</p>
            </div>
          </GlassPanel>
          <GlassPanel className="glass-demo glass-md">
            <div className="glass-content">
              <span className="glass-icon neon-text">◈</span>
              <h3>Light Refraction</h3>
              <p>Subtle transparency reveals what lies beneath</p>
            </div>
          </GlassPanel>
          <GlassPanel className="glass-demo glass-sm">
            <div className="glass-content">
              <span className="glass-icon neon-text">△</span>
              <h3>Soft Borders</h3>
              <p>Glass edges dissolve into the environment</p>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* KINETIC TYPE */}
      <div className="futur-section">
        <motion.h2
          className="futur-section-title neon-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Kinetic Typography
        </motion.h2>
        <div className="kinetic-stage">
          <div className="kinetic-words">
            {kineticWords.map((word, i) => (
              <KineticWord key={word} word={word} index={i} />
            ))}
          </div>
          <div className="kinetic-live">
            <span className="kinetic-label">LIVE</span>
            <AnimatePresence mode="wait">
              <motion.span
                className="kinetic-current neon-text"
                key={activeWord}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.5 }}
              >
                {kineticWords[activeWord]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CORE FEATURES with TILT */}
      <div className="futur-section">
        <motion.h2
          className="futur-section-title neon-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Core Concepts
        </motion.h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <TiltCard key={i} className="feature-card glass-panel">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="feature-icon neon-text">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* NEON RINGS */}
      <div className="futur-section">
        <motion.div
          className="neon-showcase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="neon-ring" />
          <div className="neon-ring ring-2" />
          <div className="neon-ring ring-3" />
          <div className="neon-center">
            <span className="neon-text">∞</span>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="futur-section futur-cta">
        <GlassPanel className="cta-container">
          <h2 className="neon-text">Ready to Evolve?</h2>
          <p>The future of design is interactive, immersive, and intelligent.</p>
          <motion.button
            className="neon-btn"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00f0ff80' }}
            whileTap={{ scale: 0.95 }}
          >
            Enter the Future
          </motion.button>
        </GlassPanel>
      </div>
    </div>
  );
}
