import React from 'react';
import {Container, Form} from "react-bootstrap";

const Categories = () => {
    return (
        <Container>
            <h5>Categories</h5>
            <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </Container>
    );
};

export default Categories;
