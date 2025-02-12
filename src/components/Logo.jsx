import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Logo({ scrollY }) {
  return (
    <div className="logo pt-2 text-white d-flex justify-content-between ">
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
          initial={{ opacity: 0, x: '-200%' }} // Inizia fuori a sinistra
          animate={{
            opacity: 1,
            x: `${-scrollY * 0.2 - 100}%`, // Muove il testo da sinistra a destra con il movimento dello scroll
          }}
          transition={{
            type: 'tween', // Usa un tween per un movimento più lineare
            ease: 'easeOut', // Rende il movimento più fluido
            duration: 0.5,
          }}
        >
          "優れたデザインは美しさだけでなく、機能性、使いやすさ、そして意味のある体験を生み出すことが重要です。"
        </motion.p>
      </div>

      <Link to="/" id="logo" className="d-flex text-white text-decoration-none"> 
        <motion.h1
          className="display-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1.3 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          |
        </motion.h1>
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
        <motion.h1
          className="display-1 "
          initial={{ scale: 0 }}
          animate={{ scale: 1.3 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          |
        </motion.h1>
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
            x: `${scrollY * 0.2 - 100}%`, // Muove il testo da destra a sinistra con il movimento dello scroll
          }}
          transition={{
            type: 'tween', 
            ease: 'easeOut', 
            duration: 0.5, 
          }}
        >
          "Good design is not just about aesthetics; it’s about functionality, usability, and creating meaningful experiences."
        </motion.p>
      </div>
    </div>
  );
}
