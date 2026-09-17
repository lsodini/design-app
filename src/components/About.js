import { motion } from 'framer-motion';
import Navigation from './Navigation';
import '../style/About.css';

const principles = [
  {
    title: 'Form Follows Function',
    desc: 'Every element earns its place through purpose, not decoration. Design is an act of empathy — understanding the user before the canvas.',
  },
  {
    title: 'Less is More',
    desc: 'Restraint reveals intent. By stripping away the superfluous, what remains carries weight, clarity, and quiet confidence.',
  },
  {
    title: 'Beauty in Simplicity',
    desc: 'True elegance is not added — it is uncovered. Simplicity is the hardest thing to achieve, and the most rewarding when found.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

export default function About() {
  return (
    <div className="about-page">
      <div className="grain-overlay" />
      <Navigation variant="nav-light" />

      <section className="about-hero">
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          ABOUT
        </motion.h1>
        <motion.div
          className="about-hero-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        />
      </section>

      <section className="about-bio">
        <motion.div
          className="about-bio-inner"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="about-label">Designer</span>
          <p className="about-bio-text">
            A design enthusiast exploring the intersections of form, function,
            and emotion across movements. Driven by curiosity about how visual
            language shapes perception — from the precision of Bauhaus to the
            warmth of Art Nouveau, from the discipline of Minimalism to the
            rebellion of Brutalism.
          </p>
        </motion.div>
      </section>

      <section className="about-philosophy">
        <motion.h2
          className="about-section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Design Philosophy
        </motion.h2>
        <div className="about-principles">
          {principles.map((p, i) => (
            <motion.article
              key={i}
              className="about-principle-card"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
              transition={{ duration: 0.25 }}
            >
              <span className="about-principle-num">0{i + 1}</span>
              <h3 className="about-principle-title">{p.title}</h3>
              <p className="about-principle-desc">{p.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
