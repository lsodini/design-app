
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Quotes from './Quotes';
import Welcome from './Welcome';


export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  // Ascolta l'evento di scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); 
    };

    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  return (
    <div className="landing-page bg-black w-100 vh-100">
     
     
      <Logo scrollY={scrollY} />

      
      <Quotes />

      <Welcome />
    
    </div>
  );
}
