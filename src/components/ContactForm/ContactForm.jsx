import Input from '../Input/Input';
import styles from './ContactForm.module.css';

import { motion } from 'framer-motion';

function ContactForm({ onNameChange, onNumberChange, onSubmit, isLoading }) {
  return (
    <motion.form
      className={styles.form}
      onSubmit={onSubmit}
      initial={{ borderRadius: 0 }}
      animate={{ borderRadius: 20 }}
      transition={{
        duration: 0.3,
        type: 'tween',
      }}
    >
      <label htmlFor="nameInput">Name</label>
      <Input
        id="nameInput"
        name="name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={onNameChange}
        type="text"
      />

      <label htmlFor="numberInput">Number</label>
      <Input
        type="tel"
        name="number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        id="numberInput"
        onChange={onNumberChange}
      />

      <button type="submit" disabled={isLoading}>
        Add contact
      </button>
    </motion.form>
  );
}
export default ContactForm;
