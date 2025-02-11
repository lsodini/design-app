import { motion } from 'framer-motion';

export default function Brutalism() {
  return (
    <section id="brutalism" className="container my-5">
      <h2 className="text-center display-3">Brutalism</h2>
      <p>
        Il **Brutalismo** è un movimento architettonico che ha preso piede negli anni '50. Si caratterizza per l'uso di materiali grezzi come il cemento, la mancanza di decorazioni, e un design che appare "non rifinito".
      </p>
      <motion.div
        className="bg-light p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3>Un Esempio di Brutalism</h3>
        <p>Esempio di un design brutalista moderno.</p>
      </motion.div>
    </section>
  );
}
