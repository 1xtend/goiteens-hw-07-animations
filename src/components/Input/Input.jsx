import { motion } from 'framer-motion';
import styles from './Input.module.css';

function Input({ onChange, name, title, id, type = 'text' }) {
  return (
    <motion.input
      type={type}
      name={name}
      title={title}
      required
      id={id}
      onChange={onChange}
      style={{ transformOrigin: 'left', borderColor: 'rgba(0, 0, 0, 0.5)' }}
      whileHover={{ borderColor: '#0000ff' }}
      whileFocus={{ scale: 1.2, borderColor: '#0000ff' }}
      transition={{
        duration: 0.2,
        type: 'tween',
      }}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className={styles.input}
    />
  );
}
export default Input;
