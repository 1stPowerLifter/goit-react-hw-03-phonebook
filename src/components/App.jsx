import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { nanoid } from 'nanoid'
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { getContactFromLS, saveContactToLS } from 'LocalStorage/conatctsLS';



export class App extends Component {
  state = {
  contacts: [],
  filter: '',
  name: '',
  number: ''
  }

  
  componentDidMount() { 
    if (getContactFromLS()) {
      this.setState({contacts: getContactFromLS()})
    }
  }
  
  componentDidUpdate( _, prevState) {
    const { contacts } = this.state
    if (prevState.contacts !== contacts) {
      saveContactToLS(contacts)
    }
  }

  render() {
    const { contacts, filter } = this.state
    
    return (
      <>
        <Phonebook title="Phonebook"
          addContat={this.addNewContat}
        />
        {contacts.length > 0 && <Contacts title="Contacts"
          contactsList={contacts}
          filterChanger={this.filterChanger}
          filter={filter}
          deleter={this.deleteContact}
        />}
        <GlobalStyle />
      </>
    );
  }

  addNewContat = ({ name, number }) => { 
    this.state.contacts.some( contact => contact.name === name)
    ? alert(`${name} is alredy in contarts`)
    : this.setState(prevState =>
   ( { contacts: [...prevState.contacts , { id: `id-${nanoid()}`, name, number }] })
    )
  }

  filterChanger = (filter) => this.setState({ filter })
  
  deleteContact = (id) => this.setState(prevState => (
    { contacts: [...prevState.contacts.filter(contact => contact.id !== id)] })
  )
};
