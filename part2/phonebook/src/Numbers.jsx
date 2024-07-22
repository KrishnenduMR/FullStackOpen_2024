import React from 'react';

const Numbers = ({ persons, newFilter }) => {
    return (
        <div>
            <ul>
                {persons.filter(person =>
                    newFilter !== '' ? person.name.toLowerCase().includes(newFilter.toLowerCase()) : true
                )
                    .map(person => (
                        <li key={person.name}>{person.name} : {person.phone}</li>
                    ))}
            </ul>
        </div>
    );
};

export default Numbers;
