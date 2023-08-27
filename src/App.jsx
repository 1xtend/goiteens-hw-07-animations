import { useState, useEffect } from 'react';

import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

import {
  createContactService,
  getAllContactsService,
  removeContactService,
} from './services/contactsServices';

import { TailSpin } from 'react-loader-spinner';

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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAllContactsService()
      .then((data) => {
        setContacts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
      name,
      number,
    };

    setIsLoading(true);

    createContactService(contact)
      .then(() => {
        setContacts((prevContacts) => [contact, ...prevContacts]);
      })
      .finally(() => {
        setIsLoading(false);

        nameInput.value = '';
        numberInput.value = '';
      });
  }

  function deleteContact(id) {
    setIsLoading(true);

    removeContactService(id)
      .then(() => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          isLoading={isLoading}
        />
      </Section>
      {isLoading && <TailSpin />}
      <Section title="Contacts">
        <Filter onChange={filterContacts} />

        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      </Section>
    </Container>
  );
}

export default App;
