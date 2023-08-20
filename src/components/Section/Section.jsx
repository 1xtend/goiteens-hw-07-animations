import styles from './Section.module.css';
import { motion } from 'framer-motion';

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <motion.h2
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, type: 'spring' }}
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

export default Section;
