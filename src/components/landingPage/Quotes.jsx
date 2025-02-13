import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as Arrow } from "../../assets/arrow-down.svg";
import "../../style/Quotes.css";

const quotes = [
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "The design process is a journey of discovery, where the solution is not always obvious, but the experience should always be clear.", author: "Aaron Walter" },
  { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
];

export default function Quotes() {
  const [index, setIndex] = useState(0);
  const [firstRender, setFirstRender] = useState(true); 

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setFirstRender(false);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quotes-section ">
      
      {/* Div contenente le citazioni */}
      <div className="quotes-wrapper ">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="quotes-container"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 1,
              delay: firstRender ? 1.5 : 0,
            }}
          >
            <blockquote className="quote text-center">
              "{quotes[index].text}"  
              <br /> <strong>– {quotes[index].author}</strong>
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Div contenente la scritta Scroll Down + freccia */}
      <motion.div className="scroll-down-container"
      initial={{ opacity: 0, y: -50 }} 
      animate={{
        opacity: 1, y: 0, }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
          delay: 2.5,
        }}>
        <span className="scroll-text">Scroll Down</span>
        <motion.div
          className="arrow"
          animate={{
            y: [0, 10, 0], // La freccia si muove su e giù
          }}
          transition={{
            repeat: Infinity, 
            duration: 1, 
            ease: "easeInOut",
          }}
        >
         <Arrow fill="white" className="arrow-icon" />
        </motion.div>
      </motion.div>
    </div>
  );
}
