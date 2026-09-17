import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import '../style/ArtDeco.css';

const ArtDeco = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const fanVariants = {
    hidden: { rotate: -90, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' }
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    })
  };

  const zigzagVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 2, ease: 'easeInOut' }
    }
  };

  return (
    <div className="art-deco-page">
      <Navigation variant="nav-deco" />

      <section className="deco-hero-section">
        <div className="hero-ornament top-ornament">
          <svg viewBox="0 0 400 40" className="ornament-svg">
            <path d="M0 20 L50 0 L100 20 L150 0 L200 20 L250 0 L300 20 L350 0 L400 20" stroke="#C9A84C" strokeWidth="2" fill="none" />
            <circle cx="0" cy="20" r="4" fill="#C9A84C" />
            <circle cx="100" cy="20" r="4" fill="#C9A84C" />
            <circle cx="200" cy="20" r="4" fill="#C9A84C" />
            <circle cx="300" cy="20" r="4" fill="#C9A84C" />
            <circle cx="400" cy="20" r="4" fill="#C9A84C" />
          </svg>
        </div>

        <motion.h1
          className="deco-hero-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          ART DECO
        </motion.h1>

        <motion.p
          className="deco-hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Luxury · Geometric · Symmetry
        </motion.p>

        <div className="hero-ornament bottom-ornament">
          <svg viewBox="0 0 400 40" className="ornament-svg">
            <path d="M0 20 L50 40 L100 20 L150 40 L200 20 L250 40 L300 20 L350 40 L400 20" stroke="#C9A84C" strokeWidth="2" fill="none" />
            <circle cx="0" cy="20" r="4" fill="#C9A84C" />
            <circle cx="100" cy="20" r="4" fill="#C9A84C" />
            <circle cx="200" cy="20" r="4" fill="#C9A84C" />
            <circle cx="300" cy="20" r="4" fill="#C9A84C" />
            <circle cx="400" cy="20" r="4" fill="#C9A84C" />
          </svg>
        </div>
      </section>

      <section className="sunburst-section">
        <div className="sunburst-container">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="sunburst-ray"
              style={{ transform: `rotate(${i * 20}deg)` }}
              variants={fanVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            />
          ))}
          <div className="sunburst-center" />
        </div>
      </section>

      <section className="borders-section">
        <div className="ornamental-borders">
          <motion.div
            className="border-panel"
            whileHover={{ scale: 1.05, borderColor: '#D4AF37' }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-corner tl" />
            <div className="border-corner tr" />
            <div className="border-corner bl" />
            <div className="border-corner br" />
            <span>Corner Accents</span>
          </motion.div>

          <motion.div
            className="border-panel double-border"
            whileHover={{ scale: 1.05, borderColor: '#D4AF37' }}
            transition={{ duration: 0.3 }}
          >
            <div className="inner-frame" />
            <span>Double Frame</span>
          </motion.div>

          <motion.div
            className="border-panel stepped-border"
            whileHover={{ scale: 1.05, borderColor: '#D4AF37' }}
            transition={{ duration: 0.3 }}
          >
            <div className="step-corner tl" />
            <div className="step-corner tr" />
            <div className="step-corner bl" />
            <div className="step-corner br" />
            <span>Stepped Pattern</span>
          </motion.div>
        </div>
      </section>

      <section className="pattern-section">
        <h2 className="deco-section-title">Geometric Motifs</h2>
        <div className="pattern-grid">
          <div className="pattern-item chevron">
            <svg viewBox="0 0 120 120" className="pattern-svg">
              {[0, 1, 2, 3, 4].map((i) => (
                <polyline
                  key={i}
                  points={`${20 + i * 5},${20 + i * 15} ${60},${35 + i * 15} ${100 - i * 5},${20 + i * 15}`}
                  stroke="#C9A84C"
                  strokeWidth="2"
                  fill="none"
                />
              ))}
            </svg>
            <p>Chevron</p>
          </div>

          <div className="pattern-item zigzag">
            <svg viewBox="0 0 120 120" className="pattern-svg">
              <polyline
                points="10,60 30,30 50,60 70,30 90,60 110,30"
                stroke="#C9A84C"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points="10,80 30,50 50,80 70,50 90,80 110,50"
                stroke="#C9A84C"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <p>Zigzag</p>
          </div>

          <div className="pattern-item diamond">
            <svg viewBox="0 0 120 120" className="pattern-svg">
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={35 + i * 5}
                  y={35 + i * 5}
                  width={50 - i * 10}
                  height={50 - i * 10}
                  transform={`rotate(45 60 60)`}
                  stroke="#C9A84C"
                  strokeWidth="2"
                  fill="none"
                />
              ))}
            </svg>
            <p>Diamond</p>
          </div>

          <div className="pattern-item sunburst-small">
            <svg viewBox="0 0 120 120" className="pattern-svg">
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="60"
                  y1="60"
                  x2={60 + 40 * Math.cos((i * 30 * Math.PI) / 180)}
                  y2={60 + 40 * Math.sin((i * 30 * Math.PI) / 180)}
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                />
              ))}
              <circle cx="60" cy="60" r="8" stroke="#C9A84C" strokeWidth="2" fill="none" />
            </svg>
            <p>Sunburst</p>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <h2 className="deco-section-title">Gallery</h2>
        <div className="deco-gallery-grid">
          {[
            { title: 'Architecture', desc: 'Towering skyscrapers with geometric precision' },
            { title: 'Typography', desc: 'Bold letterforms with elegant serifs' },
            { title: 'Textiles', desc: 'Rich patterns and luxurious fabrics' },
            { title: 'Metalwork', desc: 'Gilded accents and ornate details' }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="gallery-panel"
              custom={i}
              variants={panelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="panel-image">
                <div className="panel-placeholder">
                  <svg viewBox="0 0 200 150" className="panel-svg">
                    <rect x="10" y="10" width="180" height="130" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.3" />
                    {[0, 1, 2].map((j) => (
                      <line
                        key={j}
                        x1={40 + j * 30}
                        y1="40"
                        x2={40 + j * 30}
                        y2="110"
                        stroke="#C9A84C"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    ))}
                    <polygon points="100,30 150,100 50,100" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
                  </svg>
                </div>
              </div>
              <div className="panel-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="panel-border-overlay" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="zigzag-decoration-section">
        <svg viewBox="0 0 1200 100" className="zigzag-svg">
          <motion.path
            d="M0 50 L100 10 L200 50 L300 10 L400 50 L500 10 L600 50 L700 10 L800 50 L900 10 L1000 50 L1100 10 L1200 50"
            stroke="#C9A84C"
            strokeWidth="3"
            fill="none"
            variants={zigzagVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          <motion.path
            d="M0 70 L100 30 L200 70 L300 30 L400 70 L500 30 L600 70 L700 30 L800 70 L900 30 L1000 70 L1100 30 L1200 70"
            stroke="#C9A84C"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            variants={zigzagVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </svg>
      </section>

      <footer className="art-deco-footer">
        <div className="footer-ornament">
          <svg viewBox="0 0 200 60" className="footer-svg">
            <line x1="0" y1="30" x2="60" y2="30" stroke="#C9A84C" strokeWidth="2" />
            <polygon points="100,5 115,25 100,25 85,25" stroke="#C9A84C" strokeWidth="2" fill="none" />
            <polygon points="100,55 115,35 100,35 85,35" stroke="#C9A84C" strokeWidth="2" fill="none" />
            <line x1="140" y1="30" x2="200" y2="30" stroke="#C9A84C" strokeWidth="2" />
          </svg>
        </div>
        <p className="deco-footer-text">Art Deco Design Movement</p>
        <p className="footer-year">circa 1920 — 1939</p>
      </footer>
    </div>
  );
};

export default ArtDeco;
