import React from 'react';

const Form = ({ newName, newNo, handlechangeName, handlechangeNo, handlesubmit }) => {
    return (
        <form onSubmit={handlesubmit}>
            <div>
                name : <input value={newName} onChange={handlechangeName} />
            </div>
            <div>
                Phone : <input value={newNo} onChange={handlechangeNo} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default Form;
