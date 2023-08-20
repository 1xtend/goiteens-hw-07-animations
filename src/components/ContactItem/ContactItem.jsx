import styles from './ContactItem.module.css';

import { motion } from 'framer-motion';

function ContactItem({ id, name, number, onDelete }) {
  return (
    <motion.li
      id={id}
      className={styles.item}
      initial={{
        x: '-100%',
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: '-100%',
      }}
      transition={{
        duration: 0.3,
        type: 'spring',
      }}
    >
      <span>
        {name}: {number}
      </span>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </motion.li>
  );
}
export default ContactItem;
