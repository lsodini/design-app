import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import Navigation from './Navigation';
import '../style/ArtNouveau.css';

const Flower = ({ x, y, size, color, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.ellipse
          key={i}
          cx="0"
          cy={-size * 0.6}
          rx={size * 0.3}
          ry={size * 0.6}
          fill={color}
          opacity="0.8"
          initial={{ scale: 0, rotate: angle }}
          animate={{
            scale: isHovered ? 1 : 0.3,
            rotate: angle + (isHovered ? 15 : 0),
          }}
          transition={{ duration: 0.6, delay: i * 0.05 + delay }}
          style={{ transformOrigin: '0 0' }}
        />
      ))}
      <motion.circle
        cx="0"
        cy="0"
        r={size * 0.25}
        fill="#B8860B"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1.2 : 0.5 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      />
    </motion.g>
  );
};

const Vine = ({ startX, startY, endX, endY, color, delay, isInView }) => {
  const controlOffset = (endX - startX) * 0.4;
  const d = `M ${startX} ${startY} Q ${startX + controlOffset} ${startY - 50}, ${endX} ${endY}`;

  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isInView ? 1 : 0 }}
      transition={{ duration: 2, delay, ease: 'easeInOut' }}
    />
  );
};

const ArtNouveau = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const svgRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const isInView = useInView(svgRef, { once: false, amount: 0.3 });

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

  const flowingLines = Array.from({ length: 8 }, (_, i) => {
    const baseY = 200 + i * 60;
    const offset = mousePos.x * 0.02 * (i % 2 === 0 ? 1 : -1);
    return `M 0 ${baseY} Q 250 ${baseY + offset}, 500 ${baseY - offset} T 1000 ${baseY + offset * 0.5}`;
  });

  return (
    <div className="art-nouveau-page">
      <Navigation variant="nav-nouveau" />

      <section className="nouveau-hero-section" ref={heroRef}>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <svg className="hero-swirl-left" viewBox="0 0 150 200" width="150" height="200">
            <motion.path
              d="M 75 200 Q 20 150 40 100 Q 60 50 75 10 Q 90 50 110 100 Q 130 150 75 200"
              stroke="#B8860B"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 75 180 Q 40 140 50 100 Q 60 60 75 30 Q 90 60 100 100 Q 110 140 75 180"
              stroke="#5B7553"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.3 }}
            />
          </svg>

          <h1 className="nouveau-hero-title">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              ART NOUVEAU
            </motion.span>
          </h1>

          <svg className="hero-swirl-right" viewBox="0 0 150 200" width="150" height="200">
            <motion.path
              d="M 75 200 Q 130 150 110 100 Q 90 50 75 10 Q 60 50 40 100 Q 20 150 75 200"
              stroke="#B8860B"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
            />
          </svg>

          <motion.p
            className="nouveau-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Nature · Elegance · Flow
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-decoration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <svg viewBox="0 0 800 400" className="hero-bg-pattern">
            <path
              d="M 0 300 Q 200 250 400 300 T 800 300"
              stroke="#C9A9A6"
              strokeWidth="40"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 0 350 Q 200 300 400 350 T 800 350"
              stroke="#5B7553"
              strokeWidth="30"
              fill="none"
              opacity="0.2"
            />
          </svg>
        </motion.div>
      </section>

      <section className="organic-elements-section" ref={svgRef}>
        <h2 className="nouveau-section-title">Organic Forms</h2>
        <svg viewBox="0 0 1000 500" className="organic-svg">
          <Vine startX={100} startY={400} endX={500} endY={100} color="#5B7553" delay={0} isInView={isInView} />
          <Vine startX={150} startY={450} endX={450} endY={150} color="#5B7553" delay={0.3} isInView={isInView} />
          <Vine startX={200} startY={420} endX={550} endY={120} color="#5B7553" delay={0.6} isInView={isInView} />

          <Vine startX={900} startY={400} endX={500} endY={100} color="#C9A9A6" delay={0.2} isInView={isInView} />
          <Vine startX={850} startY={450} endX={550} endY={150} color="#C9A9A6" delay={0.5} isInView={isInView} />

          <motion.path
            d="M 400 50 Q 450 100 500 50 Q 550 100 600 50 Q 650 100 700 50"
            stroke="#B8860B"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 3, delay: 1 }}
          />

          <motion.circle
            cx="500"
            cy="250"
            r="80"
            stroke="#2C3E50"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.circle
            cx="500"
            cy="250"
            r="60"
            stroke="#B8860B"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>
      </section>

      <section className="flowing-lines-section">
        <h2 className="nouveau-section-title">Whiplash Curves</h2>
        <p className="section-description">Move your mouse to interact with the flowing lines</p>
        <svg viewBox="0 0 1000 700" className="flowing-svg">
          {flowingLines.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke={i % 3 === 0 ? '#5B7553' : i % 3 === 1 ? '#C9A9A6' : '#B8860B'}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </section>

      <section className="botanical-section">
        <h2 className="nouveau-section-title">Botanical Illustrations</h2>
        <p className="section-description">Hover over the flowers to see them bloom</p>
        <svg viewBox="0 0 1000 500" className="botanical-svg">
          <Flower x={200} y={250} size={50} color="#C9A9A6" delay={0} />
          <Flower x={400} y={300} size={40} color="#E8B4B8" delay={0.2} />
          <Flower x={600} y={220} size={55} color="#D4A5A5" delay={0.1} />
          <Flower x={800} y={280} size={45} color="#C9A9A6" delay={0.3} />

          <Vine startX={100} startY={400} endX={300} endY={250} color="#5B7553" delay={0.5} isInView={isInView} />
          <Vine startX={300} startY={420} endX={500} endY={300} color="#5B7553" delay={0.7} isInView={isInView} />
          <Vine startX={500} startY={400} endX={700} endY={220} color="#5B7553" delay={0.9} isInView={isInView} />
          <Vine startX={700} startY={410} endX={900} endY={280} color="#5B7553" delay={1.1} isInView={isInView} />

          {[150, 350, 550, 750].map((x, i) => (
            <motion.g key={i}>
              <motion.path
                d={`M ${x} 450 Q ${x + 10} 400 ${x + 5} 380 Q ${x - 5} 360 ${x + 15} 340`}
                stroke="#5B7553"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
              />
              <motion.ellipse
                cx={x + 15}
                cy={330}
                rx="12"
                ry="20"
                fill="#5B7553"
                opacity="0.6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.2 }}
              />
            </motion.g>
          ))}
        </svg>
      </section>

      <section className="ornamental-section">
        <h2 className="nouveau-section-title">Ornamental Frames</h2>
        <div className="ornamental-frames">
          <motion.div
            className="ornamental-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 300 400" className="frame-svg">
              <motion.rect
                x="20"
                y="20"
                width="260"
                height="360"
                rx="15"
                stroke="#B8860B"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
              <motion.path
                d="M 20 50 Q 150 30 280 50"
                stroke="#5B7553"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M 20 350 Q 150 370 280 350"
                stroke="#5B7553"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.circle
                cx="150"
                cy="200"
                r="40"
                stroke="#C9A9A6"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              />
              <Flower x={150} y={200} size={25} color="#C9A9A6" delay={1.2} />
            </svg>
            <p className="frame-label">Frame I</p>
          </motion.div>

          <motion.div
            className="ornamental-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <svg viewBox="0 0 300 400" className="frame-svg">
              <motion.ellipse
                cx="150"
                cy="200"
                rx="130"
                ry="180"
                stroke="#B8860B"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
              <motion.path
                d="M 150 30 Q 100 100 150 170 Q 200 100 150 30"
                stroke="#5B7553"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M 150 370 Q 100 300 150 230 Q 200 300 150 370"
                stroke="#5B7553"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <Flower x={150} y={200} size={30} color="#E8B4B8" delay={1} />
            </svg>
            <p className="frame-label">Frame II</p>
          </motion.div>

          <motion.div
            className="ornamental-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <svg viewBox="0 0 300 400" className="frame-svg">
              <motion.path
                d="M 150 20 Q 280 20 280 200 Q 280 380 150 380 Q 20 380 20 200 Q 20 20 150 20"
                stroke="#B8860B"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5 }}
              />
              <motion.path
                d="M 80 50 Q 150 80 220 50"
                stroke="#C9A9A6"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.path
                d="M 80 350 Q 150 320 220 350"
                stroke="#C9A9A6"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <Flower x={150} y={200} size={28} color="#D4A5A5" delay={1.4} />
            </svg>
            <p className="frame-label">Frame III</p>
          </motion.div>
        </div>
      </section>

      <section className="vine-growth-section">
        <h2 className="nouveau-section-title">Growing Vines</h2>
        <svg viewBox="0 0 1000 400" className="vine-svg">
          <motion.path
            d="M 0 350 Q 100 300 150 320 Q 200 340 250 280 Q 300 220 350 250 Q 400 280 450 200 Q 500 120 550 160 Q 600 200 650 100 Q 700 0 750 50 Q 800 100 850 30 Q 900 -40 950 20"
            stroke="#5B7553"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />

          {[150, 350, 550, 750, 950].map((x, i) => (
            <motion.g key={i}>
              <motion.path
                d={`M ${x} ${320 - i * 60} Q ${x + 30} ${300 - i * 60} ${x + 20} ${280 - i * 60}`}
                stroke="#5B7553"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 2 + i * 0.3 }}
              />
              <motion.ellipse
                cx={x + 20}
                cy={270 - i * 60}
                rx="8"
                ry="15"
                fill="#5B7553"
                opacity="0.7"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.5 + i * 0.3 }}
              />
            </motion.g>
          ))}

          {[250, 450, 650, 850].map((x, i) => (
            <motion.g key={`leaf-${i}`}>
              <motion.path
                d={`M ${x} ${280 - i * 80} Q ${x - 25} ${260 - i * 80} ${x - 20} ${240 - i * 80}`}
                stroke="#5B7553"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 2.2 + i * 0.3 }}
              />
              <motion.ellipse
                cx={x - 20}
                cy={230 - i * 80}
                rx="10"
                ry="18"
                fill="#5B7553"
                opacity="0.6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.7 + i * 0.3 }}
              />
            </motion.g>
          ))}
        </svg>
      </section>

      <footer className="art-nouveau-footer">
        <div className="footer-decoration">
          <svg viewBox="0 0 400 60" width="400" height="60">
            <motion.path
              d="M 0 30 Q 100 10 200 30 Q 300 50 400 30"
              stroke="#B8860B"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
          </svg>
        </div>
        <p className="nouveau-footer-text">Art Nouveau Design Movement</p>
        <p className="footer-subtext">A celebration of organic beauty and natural forms</p>
      </footer>
    </div>
  );
};

export default ArtNouveau;
