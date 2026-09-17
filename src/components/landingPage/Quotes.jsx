import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../style/LandingPage.css";

const quotes = [
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "The design process is a journey of discovery, where the solution is not always obvious, but the experience should always be clear.", author: "Aaron Walter" },
  { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
];

export default function Quotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-quotes">
      <div className="hero-quotes-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="hero-quote"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="hero-quote-text">{quotes[index].text}</p>
            <span className="hero-quote-author">{quotes[index].author}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-quotes-nav">
        {quotes.map((_, i) => (
          <button
            key={i}
            className={`quote-mark ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Quote ${i + 1}`}
          >
            <span className="quote-mark-inner" />
          </button>
        ))}
      </div>
    </div>
  );
}
