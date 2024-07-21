import React from 'react';

const Result = (props) => {

    return (
        <tr>
            <td>{props.button}</td><td>{props.clicks} </td>
        </tr>
    );
};

export default Result;