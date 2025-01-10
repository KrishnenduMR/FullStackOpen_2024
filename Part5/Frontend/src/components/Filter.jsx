import { forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";

const Filter = forwardRef((props, ref) => {

    const handleFilter = (event) => {
        props.setFilter(event.target.value);
    };

    useImperativeHandle(ref, () => {
        return {
            handleFilter,
        }
    })
    

    return (
        <div>
            <label htmlFor="filter" style={{margin:20}}>search for blogs: </label>
            <input
                type="text"
                id="filter"
                value={props.filter}
                onChange={handleFilter}
            />
            <Button variant="primary" style={{margin:10, padding:5, width:120}} onClick={() => props.setFilter("")}>
                Clear
            </Button>
        </div>
    );
});
Filter.displayName = 'Filter';

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default Filter;