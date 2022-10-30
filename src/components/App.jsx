import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('storageContacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('storageContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => {
          return [...prevContacts, { name, number, id: nanoid() }];
        });
  };

  const onFilterContacts = () => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(item => item.id !== id);
    });
  };

  const onFindContact = e => {
    setFilter(e.target.value);
  };

  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={handleSubmit} />
      <h2>Contacts</h2>
      <Filter searchForm={onFindContact} filter={filter} />
      <ContactList
        formContactsList={onFilterContacts()}
        deleteContact={handleDeleteContact}
      />
    </div>
  );
}
