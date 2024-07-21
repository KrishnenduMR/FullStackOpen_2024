import React from "react";
import Part from "./Part";

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part, index) => (
                <div key={index}>
                    <Part part={part} />
                </div>
            ))}
        </div>
    );
};

export default Content;
