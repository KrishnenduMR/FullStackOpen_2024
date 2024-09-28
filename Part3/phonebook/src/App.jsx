import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Numbers from './components/Numbers';
import servercalls from './servercalls';
import Error from './components/Error';
import Success from './components/Success';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNo, setNewNo] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [newError, setError] = useState('');
    const [newSuccess, setSuccess] = useState('');

    const handleChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handleChangeNo = (event) => {
        setNewNo(event.target.value);
    };

    const handleChangeFilter = (event) => {
        setNewFilter(event.target.value);
    };

    const handleError = (message) => {
        setError(message);
        setTimeout(() => setError(''), 5000);
    };

    const handleSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(''), 5000);
    };

    const handlesubmit = async (event) => {
        event.preventDefault();
        const new_person = { name: newName, number: newNo };
    
        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        
        if (existingPerson) {
            if (window.confirm(`${newName} already exists. Do you want to update the number?`)) {
                try {
                    const updatedPerson = await servercalls.update(existingPerson.id, new_person);
                    setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person));
                    handleSuccess(`${newName}'s number has been updated.`);
                } catch (error) {
                    console.error('Error updating person:', error);
                    handleError(`Error updating person: ${error.response?.data?.error || error.message}`);
                }
            }
        } else {
            try {
                const createdPerson = await servercalls.create(new_person);
                setPersons(persons.concat(createdPerson));
                handleSuccess(`${newName} has been added to the phonebook.`);
                setNewName('');
                setNewNo('');
            } catch (error) {
                console.error('Error adding person:', error);
                handleError(`Error adding person: ${error.response?.data?.error || error.message}`);
            }
        }
    };

    const handledelete = async (name) => {
        const existingPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase());
        
        if (existingPerson) {
            if (window.confirm(`Are you sure you want to delete ${name}?`)) {
                try {
                    await servercalls.remove(existingPerson.id);
                    setPersons(persons.filter(person => person.id !== existingPerson.id));
                    handleSuccess(`${name} has been deleted.`);
                } catch (error) {
                    console.error('Error deleting person:', error);
                    handleError(`Error deleting person: ${error.response?.data?.error || 'An unexpected error occurred.'}`);
                }
            }
        } else {
            handleError(`${name} not found in the phonebook.`);
        }
    };

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const initialNumbers = await servercalls.getAll();
                setPersons(initialNumbers);
            } catch (error) {
                console.error('Error fetching persons:', error);
                handleError('Error fetching persons.');
            }
        };

        fetchPersons();
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            {newError && <Error text={newError} />}
            {newSuccess && <Success text={newSuccess} />}
            <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
            <h2>Add a new</h2>
            <Form
                newName={newName}
                newNo={newNo}
                handleChangeName={handleChangeName}
                handleChangeNo={handleChangeNo}
                handlesubmit={handlesubmit}
            />
            <h2>Numbers</h2>
            <Numbers persons={persons} newFilter={newFilter} handledelete={handledelete} />
        </div>
    );
};

export default App;
