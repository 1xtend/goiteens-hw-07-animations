import { AnimatePresence, motion } from 'framer-motion';
import ContactItem from '../ContactItem/ContactItem';
import styles from './ContactList.module.css';

function ContactList({ contacts, onDelete }) {
  return (
    <div>
      <AnimatePresence mode="wait">
        {contacts.length > 0 ? (
          <ul className={styles.list}>
            <AnimatePresence>
              {contacts.map((contact) => (
                <ContactItem
                  id={contact.id}
                  name={contact.name}
                  number={contact.number}
                  key={contact.id}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <motion.p
            initial={{
              x: 300,
            }}
            animate={{ x: '0' }}
            exit={{ x: 300 }}
            transition={{
              duration: 0.3,
              type: 'spring',
            }}
            style={{
              display: 'inline-block',
            }}
          >
            Missing contacts
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ContactList;
