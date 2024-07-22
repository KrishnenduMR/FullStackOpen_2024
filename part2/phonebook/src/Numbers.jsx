import React from 'react';

const Numbers = ({ persons, newFilter, handledelete }) => {
    return (
        <div>
            <ul>
                {persons.filter(person =>
                    newFilter !== '' ? person.name.toLowerCase().includes(newFilter.toLowerCase()) : true
                )
                    .map(person => (<div style={{ lineHeight: '3rem' }}>
                        <li key={person.name}>{person.name} : {person.number}
                            <button onClick={() => handledelete(person.name)} style={{ color: "yellow", backgroundColor: "red", position: 'absolute', left: '18rem' }}>delete</button>
                        </li>
                    </div>
                    ))}
            </ul>
        </div>
    );
};

export default Numbers;
