import { motion } from 'framer-motion';
import Navigation from './Navigation';
import '../style/Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

const EMAIL = 'lucasodini5@gmail.com';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="grain-overlay" />
      <Navigation variant="nav-light" />

      <section className="contact-hero">
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          CONTACT
        </motion.h1>
        <motion.div
          className="contact-hero-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        />
        <motion.p
          className="contact-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Let's create something together
        </motion.p>
      </section>

      <section className="contact-body">
        <div className="contact-content-center">
          <motion.div
            className="contact-email-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="contact-email-label">Get in touch</span>
            <motion.a
              href={`mailto:${EMAIL}`}
              className="contact-email-link"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {EMAIL}
            </motion.a>
            <p className="contact-email-hint">
              Click to open your email client
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
