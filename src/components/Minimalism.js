import { motion } from 'framer-motion';

export default function Minimalism() {
  return (
    <section id="minimalism" className="container my-5">
      <h2 className="text-center display-3">Minimalism</h2>
      <p>
        Il **Minimalismo** è un design semplice che enfatizza l'essenzialità. Meno è più, con l'uso di spazio bianco e una grafica essenziale.
      </p>
      <motion.div
        className="bg-light p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3>Esempio di Minimalismo</h3>
        <p>Un esempio perfetto di design minimalista.</p>
      </motion.div>
    </section>
  );
}
