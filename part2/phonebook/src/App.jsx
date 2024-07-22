import React, { useState } from 'react';
import Filter from './Filter';
import Form from './Form';
import Numbers from './Numbers';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNo, setNewNo] = useState('0');
    const [newFilter, setNewFilter] = useState('');

    const handlechangeName = (event) => {
        setNewName(event.target.value);
    };

    const handlechangeNo = (event) => {
        setNewNo(event.target.value);
    };

    const handleChangeFilter = (event) => {
        setNewFilter(event.target.value);
    };

    const handlesubmit = (event) => {
        event.preventDefault();
        const new_person = {
            name: newName,
            phone: newNo
        };
        if ((newName === '') || JSON.stringify(persons).includes(JSON.stringify(new_person)) || newNo === '0') {
            alert(`${newName} and ${newNo} has already added to phonebook or contains no characters`);
            setNewName('');
            setNewNo(0);
            return;
        }
        setPersons(persons.concat(new_person));
        setNewName('');
        setNewNo(0);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
            <h2>add a new</h2>
            <Form
                newName={newName}
                newNo={newNo}
                handlechangeName={handlechangeName}
                handlechangeNo={handlechangeNo}
                handlesubmit={handlesubmit}
            />
            <h2>Numbers</h2>
            <Numbers persons={persons} newFilter={newFilter} />
        </div>
    );
};

export default App;
