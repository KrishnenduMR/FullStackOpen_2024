import React from 'react';
import './message.css';

const Error = ({ text }) => {
    return (
        <div className='error'>{text}</div>)
}

export default Error;