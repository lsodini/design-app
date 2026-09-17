import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactComponent as HandFan } from '../../assets/japanese-hand-fan-svgrepo-com.svg';
import '../../style/LandingPage.css';

const styles = [
  {
    name: 'Brutalism',
    kanji: '暴',
    desc: 'Raw, unpolished, and bold aesthetic with large typography and high contrast.',
    to: '/brutalism',
  },
  {
    name: 'Minimalism',
    kanji: '簡',
    desc: 'Clean layouts, limited palette, and plenty of white space for visual clarity.',
    to: '/minimalism',
  },
  {
    name: 'Futurism',
    kanji: '未',
    desc: 'Bold geometric shapes, neon colors, and advanced interactive elements.',
    to: '/futurism',
  },
  {
    name: 'Bauhaus',
    kanji: '包',
    desc: 'Geometric purity, primary colors, and functional form follows function.',
    to: '/bauhaus',
  },
  {
    name: 'Art Deco',
    kanji: '装',
    desc: 'Luxurious ornamentation, gold accents, and geometric elegance.',
    to: '/art-deco',
  },
  {
    name: 'Memphis',
    kanji: '孟',
    desc: 'Playful pop colors, scattered shapes, and postmodern irony.',
    to: '/memphis',
  },
  {
    name: 'Art Nouveau',
    kanji: '芸',
    desc: 'Organic flowing lines, floral motifs, and natural elegance.',
    to: '/art-nouveau',
  },
  {
    name: 'Constructivism',
    kanji: '構',
    desc: 'Industrial forms, bold angles, and revolutionary geometric composition.',
    to: '/constructivism',
  },
  {
    name: 'De Stijl',
    kanji: '派',
    desc: 'Primary colors, horizontal-vertical grid, and asymmetric balance.',
    to: '/de-stijl',
  },
];

export default function WelcomeSection() {
  return (
    <section className="welcome-section">
      {/* Vertical decorative text */}
      <div className="welcome-vertical-left">
        <span>デザイン</span>
      </div>
      <div className="welcome-vertical-right">
        <span>探索する</span>
      </div>

      {/* Section header */}
      <div className="welcome-header">
        <motion.div
          className="welcome-fan"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <HandFan />
        </motion.div>

        <motion.h2
          className="welcome-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Explore Design Movements
        </motion.h2>

        <motion.p
          className="welcome-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Design movements to explore
        </motion.p>
      </div>

      {/* Style cards */}
      <div className="welcome-styles">
        {styles.map((s, i) => (
          <motion.div
            key={s.name}
            className="ma-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
          >
            <Link to={s.to} className="ma-card-link" onClick={() => window.scrollTo(0, 0)}>
              <div className="ma-card-kanji">{s.kanji}</div>
              <div className="ma-card-divider" />
              <h3 className="ma-card-title">{s.name}</h3>
              <p className="ma-card-desc">{s.desc}</p>
              <div className="ma-card-footer">
                <span className="ma-card-explore">View</span>
                <motion.span
                  className="ma-card-arrow"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="welcome-bottom">
        <div className="welcome-bottom-line" />
        <motion.span
          className="welcome-bottom-kanji"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          間
        </motion.span>
        <div className="welcome-bottom-line" />
      </div>
    </section>
  );
}
