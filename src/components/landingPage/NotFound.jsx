import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import '../../style/NotFound.css';
import '../../style/LandingPage.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="grain-overlay" />

      <Navigation />

      <div className="not-found-content">
        <motion.div
          className="not-found-enso"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="0 1"
              initial={{ pathLength: 0, opacity: 0.08 }}
              animate={{ pathLength: 0.85, opacity: 0.08 }}
              transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="not-found-kanji"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          無
        </motion.div>

        <motion.div
          className="not-found-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="not-found-code">404</span>
          <p className="not-found-text">Page not found</p>
          <Link to="/" className="not-found-link">
            <span className="not-found-link-jp">家に帰る</span>
            <span className="not-found-link-en">Return home</span>
          </Link>
        </motion.div>

        <motion.div
          className="not-found-vertical"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span>見</span>
          <span>つ</span>
          <span>か</span>
          <span>な</span>
          <span>い</span>
        </motion.div>
      </div>
    </div>
  );
}
