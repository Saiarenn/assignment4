import React from "react";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const BookFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Searching..."
                    value={filter.query}
                    onChange={e => setFilter({ ...filter, query: e.target.value })}
                />
            </InputGroup>
            <select className="form-select mb-3 " value={filter.sort} onChange={e => setFilter({ ...filter, sort: e.target.value })}>
                <option value="" disabled={true}>Sort By</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="title">Title</option>
            </select>

        </div>
    );
};

export default BookFilter;
