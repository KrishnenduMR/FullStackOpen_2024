import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Form from './Form';
import Numbers from './Numbers';
import servercalls from './servercalls';

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

    const handlesubmit = async (event) => {
        event.preventDefault();
        const new_person = {
            name: newName,
            number: newNo
        };

        if (newName === '' || newNo === '0') {
            alert(`Name or number cannot be empty.`);
            setNewName('');
            setNewNo('');
            return;
        }

        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        if (existingPerson) {
            if (window.confirm(`${newName} already exists. Do you want to update the number?`)) {
                try {
                    const updatedPerson = await servercalls.update(existingPerson.id, new_person);
                    setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person));
                    alert(`${newName}'s number has been updated.`);
                } catch (error) {
                    console.error('Error updating person:', error);
                    alert('Error updating person.');
                }
            }
        } else {
            try {
                const createdPerson = await servercalls.create(new_person);
                setPersons(persons.concat(createdPerson));
                alert(`${newName} has been added to the phonebook.`);
            } catch (error) {
                console.error('Error adding person:', error);
                alert('Error adding person.');
            }
        }

        setNewName('');
        setNewNo('');
    };

    const handledelete = async (name) => {
        const existingPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase());
        if (existingPerson) {
            if (window.confirm(`Are you sure you want to delete ${name}?`)) {
                await servercalls.remove(existingPerson.id)
                    .then(() => {
                        setPersons(persons.filter(person => person.id !== existingPerson.id));
                        alert(`${name} has been deleted.`);
                    })
                    .catch(error => {
                        console.error('Error deleting person:', error);
                        alert('Error deleting person.');
                    });
            }
        } else {
            alert(`${name} not found in the phonebook.`);
        }
    };

    useEffect(() => {
        servercalls
            .getAll()
            .then(initialnumbers => {
                setPersons(initialnumbers)
            })
    }, [])

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
            <Numbers persons={persons} newFilter={newFilter} handledelete={handledelete} />
        </div>
    );
};

export default App;
