import React, {useContext, useState} from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {createBook} from "../../http/bookAPI";
import {Context} from "../../index";

const CreateBook = ({ show, onHide }) => {
    const { user } = useContext(Context);
    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        publicationYear: null,
        quantityAvailable: null,
        price: null
    })
    const addBook = () => {
        createBook(user.user.id, book).then(data => {
            setBook({
                title: "",
                author: "",
                genre: "",
                publicationYear: null,
                quantityAvailable: null,
                price: null
            })
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Enter the book title"}
                        value={book.title}
                        onChange={e => setBook({...book, title: e.target.value})}
                        className={'mb-3'}
                    />
                </Form>
                <Form>
                    <Form.Control
                        placeholder={"Enter the book author"}
                        value={book.author}
                        onChange={e => setBook({...book, author: e.target.value})}
                        className={'mb-3'}
                    />
                </Form>
                <Form>
                    <Form.Control
                        placeholder={"Enter the book genre"}
                        value={book.genre}
                        onChange={e => setBook({...book, genre: e.target.value})}
                        className={'mb-3'}
                    />
                </Form>
                <Form>
                    <Form.Control
                        placeholder={"Enter the book publication year"}
                        value={book.publicationYear}
                        onChange={e => setBook({...book, publicationYear: parseInt(e.target.value)})}
                        className={'mb-3'}
                    />
                </Form>
                <Form>
                    <Form.Control
                        placeholder={"Enter the book quantity"}
                        value={book.quantityAvailable}
                        onChange={e => setBook({...book, quantityAvailable: parseInt(e.target.value)})}
                        className={'mb-3'}
                    />
                </Form>
                <Form>
                    <Form.Control
                        placeholder={"Enter the book price"}
                        value={book.price}
                        onChange={e => setBook({...book, price: parseFloat(e.target.value)})}
                        className={'mb-3'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addBook}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBook;