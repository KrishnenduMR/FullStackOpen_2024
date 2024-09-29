import React from "react"

const Error = (props) => { 
    return (
        <div className="alert alert-danger" role="alert">
        {props.message}
        </div>
    );
    }

const Info = (props) => {  
    return (
        <div className="alert alert-info" role="alert">
        {props.message}
        </div>
    );
    }

const Success = (props) => {
    return (
        <div className="alert alert-success" role="alert">
        {props.message}
        </div>
    );
    }

const Warning = (props) => {    
    return (
        <div className="alert alert-warning" role="alert">
        {props.message}
        </div>
    );
    }

export { Error, Info, Success, Warning };