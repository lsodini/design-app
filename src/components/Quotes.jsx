import { motion } from 'framer-motion';
import '../style/Quotes.css';
export default function Quotes() {
  return (
    <div className="quotes-wrapper ">
      <motion.div className="quotes-container">
        <motion.blockquote
          className="quote"
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: '-10%', y: '250%' }}  
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6, delay: 1.5 }}
        >
          "Design is not just what it looks like and feels like. Design is how it works." – Steve Jobs
        </motion.blockquote>

        <motion.blockquote
          className="quote"
          initial={{ opacity: 0, x: '+200%' }} 
          animate={{ opacity: 1, x: '+90%', y: +200 }}  
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6, delay: 2.5 }} 
        >
          "The design process is a journey of discovery, where the solution is not always obvious, but the experience should always be clear." – Aaron Walter
        </motion.blockquote>
      </motion.div>
    </div>
  );
}
