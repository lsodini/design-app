import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Brutalism from './components/Brutalism';
import Minimalism from './components/Minimalism';
import Quotes from './components/Quotes';
import Navigation from './components/Navigation';

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  // Ascolta l'evento di scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Imposta la posizione di scroll
    };

    window.addEventListener('scroll', handleScroll); // Aggiungi l'evento scroll
    return () => window.removeEventListener('scroll', handleScroll); // Rimuovi l'evento quando il componente viene smontato
  }, []);

  return (
    <>
      <Router>
        <div className="bg-dark text-white">
          <Navigation />
          <div className="vh-100 d-flex justify-content-center align-items-center flex-row">

            <div 
              className="text-white bg-white mt-2"
              style={{
                fontSize: '1.5rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <motion.p
                className="text-black bg-white pt-2 display-6"
                initial={{ x: '-100%' }} // Inizia fuori a sinistra
                animate={{
                  x: `${scrollY * 0.2 - 100}%`, // Muove il testo da sinistra a destra
                }}
                transition={{
                  type: 'tween', // Usa un tween per un movimento più lineare
                  ease: 'easeOut', // Rende il movimento più fluido
                  duration: 0.5, // Puoi regolare la durata per controllare la velocità
                }}
              >
                Diseinu รูปแบบ Design 디자인 Diseño せっけい Disegno डिज़ाइन Progettazione デザイン Design 设计 Ontwerp تصميم Desenho 設計 Tasarım 설계 Disseny Дизайн
              </motion.p>
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="d-flex justify-content-center align-items-center bg-dark">
                      <motion.h1
                        className="text-white display-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        |
                      </motion.h1>
                      &nbsp;
                      <motion.h1
                        className="text-white display-1 fw-bold m-0 pt-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        Design
                      </motion.h1>
                      &nbsp;
                      <motion.h1
                        className="text-white display-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        |
                      </motion.h1>
                    </div>

                    <div
                      className="text-white bg-dark mt-2"
                      style={{
                        fontSize: '1.5rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <motion.p
                        className="text-white bg-dark pt-2 display-6"
                        initial={{ x: '-100%' }} // Inizia fuori a destra
                        animate={{
                          x: `${-scrollY * 0.2 - 100}%`, // Muove il testo da destra a sinistra
                        }}
                        transition={{
                          type: 'tween', // Usa un tween per un movimento più lineare
                          ease: 'easeOut', // Rende il movimento più fluido
                          duration: 0.5, // Puoi regolare la durata per controllare la velocità
                        }}
                      >
                        Дизайн Дisseny 설계 Tasarım 設計 Desenho تصميم Ontwerp 设计 Design デザイン Progettazione डिज़ाइन Disegno せっけい Diseño 디자인 Design
                      </motion.p>
                    </div>
                  </>
                }
              />
              <Route path="/brutalism" element={<Brutalism />} />
              <Route path="/minimalism" element={<Minimalism />} />
              <Route path="/quotes" element={<Quotes />} />
            </Routes>

          </div>
            <section id="quotes" className="container my-5">
              <blockquote>
                "Il design è il silenzioso ambasciatore del tuo brand." – Paul Rand
              </blockquote>
              <blockquote>
                "Il buon design è il miglior amico dell'utente." – Steve Jobs
              </blockquote>
            </section>
        </div>
      </Router>
    </>
  );
}
