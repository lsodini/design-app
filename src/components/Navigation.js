import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/Navigation.css';

const splitText = (text) => {
  return text.split('').map((letter, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, rotateX: -180, y: '-100%' }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{
        type: 'tween',
        delay: index * 0.1,
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {letter}
    </motion.span>
  ));
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: '-10%',
    transition: { type: 'tween', duration: 0.3, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, type: 'tween', duration: 0.3 },
  }),
};

const navLinks = [
  { to: '/brutalism', label: 'BRUTALISM' },
  { to: '/minimalism', label: 'MINIMALISM' },
  { to: '/futurism', label: 'FUTURISM' },
  { to: '/bauhaus', label: 'BAUHAUS' },
  { to: '/art-deco', label: 'ART DECO' },
  { to: '/memphis', label: 'MEMPHIS' },
  { to: '/art-nouveau', label: 'ART NOUVEAU' },
  { to: '/constructivism', label: 'CONSTRUCTIVISM' },
  { to: '/de-stijl', label: 'DE STIJL' },
  { to: '/about', label: 'ABOUT' },
  { to: '/contact', label: 'CONTACT' },
];

export default function Navigation({ light = false, variant }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 992 : false
  );
  const location = useLocation();
  const isHome = location.pathname === '/';
  const theme = variant || (light ? 'nav-light' : 'nav-dark');

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className={`navbar navbar-expand-lg ${theme}`}>
      <div className="container-fluid">
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="home-btn">
              {splitText('HOME')}
              <motion.div
                className="line"
                initial={{ scaleX: 1, visibility: 'visible' }}
                animate={{ scaleX: 0, visibility: 'hidden' }}
                transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
              />
            </Link>
          </motion.div>
        )}

        <button
          className={`hamburger ${mobileOpen ? 'is-open' : ''}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {!isMobile && (
          <div className="collapse navbar-collapse show" id="navbarNav">
            <motion.ul
              className={`navbar-nav mx-auto ${isHome ? '' : 'with-home'}`}
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  className="nav-item"
                  initial={{ opacity: 0, y: '-100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
                >
                  <Link className="nav-link" to={link.to}>
                    {splitText(link.label)}
                    <motion.div
                      className="line"
                      initial={{ scaleX: 1, visibility: 'visible' }}
                      animate={{ scaleX: 0, visibility: 'hidden' }}
                      transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
                    />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}

        <AnimatePresence>
          {isMobile && mobileOpen && (
            <motion.div
              className="mobile-menu-overlay"
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.ul
                className={`navbar-nav mx-auto ${isHome ? '' : 'with-home'}`}
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    className="nav-item"
                    variants={mobileItemVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link className="nav-link" to={link.to} onClick={closeMenu}>
                      {splitText(link.label)}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
