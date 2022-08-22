import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import shortid from 'shortid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const newContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };
    const isInName = newContact.name.toLowerCase();
    this.state.contacts.find(contact => contact.name.toLowerCase() === isInName)
      ? alert(data.name + ' is already in contacts')
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFiltredContakts = () => {
    const { contacts, filter } = this.state;
    const normalisedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('Contacts update');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filtredContacts = this.getFiltredContakts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        {contacts.length > 0 ? (
          <ContactList
            contacts={filtredContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>No any contact! add new</p>
        )}
      </div>
    );
  }
}
