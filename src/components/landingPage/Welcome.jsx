import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


export default function WelcomeSection() {
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
	
    <section className="welcome-section py-5 text-center text-white">
      <div className="container">
        <h1 className="display-4 mb-4">Welcome to our Design Exploration Hub</h1>
        <p className="lead mb-4">
          This website is dedicated to showcasing the diverse and dynamic world of web design. We explore the principles and aesthetics behind different design movements, from the raw, bold expressions of Brutalism, to the clean, minimalist elegance of Minimalism, and beyond.
        </p>
        <p className="mb-4">
          Our mission is to not only highlight the beauty of these styles but also to show how they influence the creation of functional, intuitive, and visually compelling websites. Whether you're a designer, developer, or enthusiast, this site offers an insightful journey through the various approaches that shape modern web experiences.
        </p>
        <p className="mb-5">
          Dive in and discover how design is not just about how things look, but how they work—each movement with its own unique approach to solving creative challenges.
        </p>
		</div>

		{/* sezione banner movimento */}
		
		<div 
        className=" py-4 mt-2 w-100"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <motion.p
          className="display-6"
          initial={{ opacity: 0, x: '-100%' }} // Inizia fuori a sinistra
          animate={{
            opacity: 1,
            x: `${-scrollY * 0.15 + 100}%`, // Muove il testo da sinistra a destra con il movimento dello scroll
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
     

        {/* Introduzione ai vari stili di design */}
		<div className='container'>
        <div className="design-style-section">
          <h2 className="mb-4">Our Design Styles</h2>
          <div className="row">
            <div className="col-lg-4">
              <h3>Brutalism</h3>
              <p>
                Brutalism in web design is characterized by its raw, unpolished, and bold aesthetic, often with large typography and high contrast colors. It breaks away from traditional polished design, making a statement with simplicity and functionality.
              </p>
            </div>
            <div className="col-lg-4">
              <h3>Minimalism</h3>
              <p>
                Minimalism embraces simplicity and functionality. It uses clean layouts, a limited color palette, and plenty of white space to make the design easy to navigate and visually pleasing.
              </p>
            </div>
            <div className="col-lg-4">
              <h3>Futurism</h3>
              <p>
                Futurism in web design incorporates bold geometric shapes, neon colors, and advanced interactive elements to evoke a sense of modernity and technological progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
