import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Brutalism from './components/Brutalism';
import Minimalism from './components/Minimalism';
import Futurism from './components/Futurism';
import Navigation from './components/Navigation';

import LandingPage from './components/landingPage/LandingPage.jsx';
import './App.css';

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  // Ascolta l'evento di scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Imposta la posizione di scroll
    };

    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  return (
    <>
    
      <div className="layout bg-black w-100 vh-100">
        
        <Router>
          <Navigation />
          
         
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/brutalism" element={<Brutalism />} />
              <Route path="/minimalism" element={<Minimalism />} />
              <Route path="/futurism" element={<Futurism />} />
            </Routes>
          
        </Router>
       
      </div>
    </>
  );
}
