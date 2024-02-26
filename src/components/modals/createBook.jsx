import React, {useContext, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {createBook} from "../../http/bookAPI";
import {getPhoto} from "../../http/externalAPI";

const CreateBook = ({show, onHide}) => {
    const [book, setBook] = useState({
        titles: {
            en: "",
            ru: ""
        },
        descriptions: {
            en: "",
            ru: ""
        },
        pictures: [],
        author: "",
        genre: "",
        publicationYear: 0,
        quantityAvailable: 0,
        price: 0
    });

    const addBook = async () => {
        const data = await getPhoto({title: book.titles.en});
        if (data)
            data.map(pic => book.pictures.push(pic));


        createBook(book).then(data => {
            setBook({
                titles: {
                    en: "",
                    ru: ""
                },
                descriptions: {
                    en: "",
                    ru: ""
                },
                pictures: [],
                author: "",
                genre: "",
                publicationYear: 0,
                quantityAvailable: 0,
                price: 0
            });
            onHide();
        });
    };


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
                        placeholder={"Enter the book title in English"}
                        value={book.titles.en}
                        onChange={e => setBook({...book, titles: {...book.titles, en: e.target.value}})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book title in Russian"}
                        value={book.titles.ru}
                        onChange={e => setBook({...book, titles: {...book.titles, ru: e.target.value}})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book description in English"}
                        value={book.descriptions.en}
                        onChange={e => setBook({...book, descriptions: {...book.descriptions, en: e.target.value}})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book description in Russian"}
                        value={book.descriptions.ru}
                        onChange={e => setBook({...book, descriptions: {...book.descriptions, ru: e.target.value}})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book author"}
                        value={book.author}
                        onChange={e => setBook({...book, author: e.target.value})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book genre"}
                        value={book.genre}
                        onChange={e => setBook({...book, genre: e.target.value})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book publication year"}
                        value={book.publicationYear}
                        onChange={e => setBook({...book, publicationYear: parseInt(e.target.value) || null})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book quantity"}
                        value={book.quantityAvailable}
                        onChange={e => setBook({...book, quantityAvailable: parseInt(e.target.value) || null})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the book price"}
                        value={book.price}
                        onChange={e => setBook({...book, price: parseFloat(e.target.value) || null})}
                        className={'mb-3'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addBook}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBook;
