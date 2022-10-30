import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('storageContacts', JSON.stringify(nextContacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('storageContacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  handleSubmit = (name, number) => {
    if (this.state.contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name,
            number,
          },
        ],
      };
    });
  };

  onFilterContacts = () => {
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return { contacts: prevState.contacts.filter(item => item.id !== id) };
    });
  };

  onFindContact = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
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
        <ContactForm addContact={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter searchForm={this.onFindContact} filter={this.state.filter} />
        <ContactList
          formContactsList={this.onFilterContacts()}
          deleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
