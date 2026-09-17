import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../style/LandingPage.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function Logo({ scrollY }) {
  const isMobile = useIsMobile();

  return (
    <div className="logo pt-2 d-flex justify-content-between w-100">
      <div
        className="flex-grow-1 pt-4 mt-2"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <motion.p
          className="display-6"
          initial={{ opacity: 0, x: isMobile ? 0 : '-200%' }}
          animate={{
            opacity: 1,
            x: isMobile
              ? `${-scrollY * 0.1 - 20}%`
              : `${-scrollY * 0.2 - 100}%`,
          }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.5,
          }}
        >
          "優れたデザインは美しさだけでなく、機能性、使いやすさ、そして意味のある体験を生み出すことが重要です。"
        </motion.p>
      </div>

      <Link to="/" id="logo" className="d-flex text-decoration-none" aria-label="Home">
        <motion.span
          className="display-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1.3 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          aria-hidden="true"
        >
          |
        </motion.span>
        &nbsp;
        <motion.h1
          className="display-1 fw-bold m-0 pt-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          DESIGN
        </motion.h1>
        &nbsp;
        <motion.span
          className="display-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1.3 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          aria-hidden="true"
        >
          |
        </motion.span>
      </Link>

      <div
        className="pt-4 mt-2"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <motion.p
          className="display-6"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: isMobile
              ? `${scrollY * 0.1 - 20}%`
              : `${scrollY * 0.2 - 100}%`,
          }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.5,
          }}
        >
          "Good design is not just about aesthetics; it's about functionality, usability, and creating meaningful experiences."
        </motion.p>
      </div>
    </div>
  );
}
