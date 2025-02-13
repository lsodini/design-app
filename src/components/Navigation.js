import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../style/Navigation.css';

// Funzione per separare ogni lettera in un elemento <span>
const splitText = (text) => {
  return text.split('').map((letter, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, rotateX: -180 }} // Le lettere sono capovolte inizialmente
      animate={{ opacity: 1, rotateX: 0 }} // Le lettere si ripristinano alla posizione originale
      transition={{
        delay: index * 0.1, // Ritardo crescente per ogni lettera
        duration: 0.3, // Durata dell'animazione
        ease: 'easeOut',
      }}
    >
      {letter}
    </motion.span>
  ));
};

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <motion.ul
            className="navbar-nav mx-auto"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'tween',
              ease: 'easeOut',
              duration: 0.5,
            }}
          >
            <motion.li
              className="nav-item"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.5,
              }}
            >
              <Link className="nav-link" to="/brutalism">
                {splitText('Brutalism')}
                <motion.div
                  className="line"
                  initial={{ scaleX: 1, visibility: 'visible' }}
                  animate={{ scaleX: 0, visibility: 'hidden' }}
                  transition={{
                    delay: 1,
                    duration: 1.2,
                    ease: 'easeOut',
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              className="nav-item"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.5,
              }}
            >
              <Link className="nav-link" to="/minimalism">
                {splitText('Minimalism')}
                <motion.div
                  className="line"
                  initial={{ scaleX: 1, visibility: 'visible' }}
                  animate={{ scaleX: 0, visibility: 'hidden' }}
                  transition={{
                    delay: 1,
                    duration: 1.2,
                    ease: 'easeOut',
                  }}
                />
              </Link>
            </motion.li>
            <motion.li
              className="nav-item"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.5,
              }}
            >
              <Link className="nav-link" to="/futurism">
                {splitText('Futurism')}
                <motion.div
                  className="line"
                  initial={{ scaleX: 1, visibility: 'visible' }}
                  animate={{ scaleX: 0, visibility: 'hidden' }}
                  transition={{
                    delay: 1,
                    duration: 1.2,
                    ease: 'easeOut',
                  }}
                />
              </Link>
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </nav>
  );
}
