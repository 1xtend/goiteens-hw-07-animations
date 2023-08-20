import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

function initContacts() {
  const persistedContacts = localStorage.getItem('contacts');

  if (persistedContacts) {
    return JSON.parse(persistedContacts);
  } else {
    return [];
  }
}

function App() {
  const [contacts, setContacts] = useState(initContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function handleNameInput(e) {
    setName(e.target.value);
  }

  function handleNumberInput(e) {
    setNumber(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    let existingContact = contacts.find((contact) => contact.name === name);

    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const nameInput = e.target.elements.name;
    const numberInput = e.target.elements.number;

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prevContacts) => [contact, ...prevContacts]);

    nameInput.value = '';
    numberInput.value = '';
  }

  function deleteContact(id) {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  }

  function filterContacts(e) {
    setFilter(e.target.value);
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm
          onNameChange={handleNameInput}
          onNumberChange={handleNumberInput}
          onSubmit={handleFormSubmit}
        />
      </Section>
      <Section title="Contacts">
        <Filter onChange={filterContacts} />

        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      </Section>
    </Container>
  );
}

export default App;
