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
    const [newNo, setNewNo] = useState('0');
    const [newFilter, setNewFilter] = useState('');
    const [newError, setError] = useState('');
    const [newSuccess, setSuccess] = useState('');

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
        const new_person = { name: newName, number: newNo };
    
        // Check for empty fields
        if (newName === '' || newNo === '0') {
            setError('Name or Number cannot be empty.');
            setNewName('');
            setNewNo('');
            setTimeout(() => setError(''), 5000);
            return;
        }
    
        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    
        if (existingPerson) {
            if (window.confirm(`${newName} already exists. Do you want to update the number?`)) {
                try {
                    const updatedPerson = await servercalls.update(existingPerson.id, new_person);
                    setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person));
                    setSuccess(`${newName}'s number has been updated.`);
                    setTimeout(() => setSuccess(''), 5000);
                } catch (error) {
                    const errorMessage = error.response?.data?.error || 'An error occurred while updating the person.';
                    setError(`Error updating person: ${errorMessage}`);
                    setTimeout(() => setError(''), 5000);
                }
            }
        } else {
            try {
                const createdPerson = await servercalls.create(new_person);
                setPersons(persons.concat(createdPerson));
                setSuccess(`${newName} has been added to the phonebook.`);
                setTimeout(() => setSuccess(''), 5000);
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'An error occurred while adding the person.';
                setError(`Error adding person: ${errorMessage}`);
                setTimeout(() => setError(''), 5000);
            }
        }
    
        setNewName('');
        setNewNo('');
    };  

    const handledelete = async (name) => {
        const existingPerson = persons.find(person => person.name.toLowerCase() === name.toLowerCase());
    
        if (existingPerson) {
            if (window.confirm(`Are you sure you want to delete ${name}?`)) {
                try {
                    await servercalls.remove(existingPerson.id);
                    setPersons(persons.filter(person => person.id !== existingPerson.id));
                    setSuccess(`${name} has been deleted.`);
                    setTimeout(() => setSuccess(''), 5000);
                } catch (error) {
                    const errorMessage = error.response?.data?.error || 'An error occurred while deleting the person.';
                    setError(`Error deleting person: ${errorMessage}`);
                    setTimeout(() => setError(''), 5000);
                }
            }
        } else {
            setError(`${name} not found in the phonebook.`);
            setTimeout(() => setError(''), 5000);
        }
    };    

    useEffect(() => {
        servercalls.getAll().then(initialnumbers => {
            setPersons(initialnumbers);
        });
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

