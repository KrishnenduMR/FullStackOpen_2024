import React from "react";
import Part from "./Part";

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => (
                <div key={part.id}>
                    <Part part={part} />
                </div>
            ))}
        </div>
    );
};

export default Content;
