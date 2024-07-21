import React from "react";
const Total = (props) => {
    const total = props.total.reduce((sum, element) => sum + element.exercises, 0);

    return (
        <div>
            <p><b>
                Total = {total} </b>
            </p>
        </div>
    )
}
export default Total;