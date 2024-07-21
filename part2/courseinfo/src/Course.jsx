import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
    return (
        <div>
            {
                props.course.map(course => (
                    <div key={course.id}>
                        <Header course={course.name} />
                        <Content parts={course.parts} />
                        <Total total={course.parts} />
                    </div>
                ))
            }

        </div>
    )
}

export default Course;