import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import '../style/Navigation.css'; 

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <motion.ul className="navbar-nav mx-auto"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'tween',
              ease: 'easeOut',
              duration: 0.5,
            }}>
            <motion.li className="nav-item"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.5,
              }}>
              <Link className="nav-link" to="/brutalism">
                Brutalism
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
            <motion.li className="nav-item"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.5,
              }}>
              <Link className="nav-link" to="/minimalism">
                Minimalism
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
            <motion.li className="nav-item"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.5,
              }}>
              <Link className="nav-link" to="/futurism">
                Futurism
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
