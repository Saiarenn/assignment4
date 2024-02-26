import React from "react";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import {Col, Row} from "react-bootstrap";

const BookFilter = ({filter, setFilter, localization, setLocalization}) => {
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Searching..."
                    value={filter.query}
                    onChange={e => setFilter({...filter, query: e.target.value})}
                />
            </InputGroup>
            <Row>
                <Col md={"6"}>
                    <select className="form-select mb-3 " value={filter.sort}
                            onChange={e => setFilter({...filter, sort: e.target.value})}>
                        <option value="" disabled={true}>Sort By</option>
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                    </select>
                </Col>
                <Col md={6}>
                    <select className="form-select mb-3 " value={localization}
                            onChange={e => setLocalization(e.target.value)}>
                        <option value="en">English</option>
                        <option value="ru">Russian</option>
                    </select>

                </Col>
            </Row>


        </div>
    );
};

export default BookFilter;
