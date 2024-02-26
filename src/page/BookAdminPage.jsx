import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteBookById, fetchBookById, updateBookById} from "../http/bookAPI";
import {Context} from "../index";
import {ADMIN_ROUTE, INVENTORY_ROUTE} from "../utils/consts";
import {Button, Card, Container, FormControl} from "react-bootstrap";

const BookAdminPage = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState(null);
    const [editedBook, setEditedBook] = useState(null);
    const {userStorage} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookById(bookId).then((data) => {
            setBook(data);
            setEditedBook({...data});
        });
    }, []);

    const handleDelete = async () => {
        deleteBookById(bookId).then(navigate(ADMIN_ROUTE));
    };

    const handleEdit = async () => {
        try {
            await updateBookById(bookId, editedBook);
            navigate(INVENTORY_ROUTE);
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedBook({...editedBook, [name]: value});
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Book Detail Page</h1>
            <Card>
                <Card.Body>
                    <FormControl
                        type="text"
                        name="title"
                        value={editedBook.titles.en}
                        onChange={e =>
                            setEditedBook({...editedBook, titles: {...editedBook.titles, en: e.target.value}})}
                        placeholder="Title"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="title"
                        value={editedBook.titles.ru}
                        onChange={e =>
                            setEditedBook({...editedBook, titles: {...editedBook.titles, ru: e.target.value}})}
                        placeholder="Title"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="title"
                        onChange={e =>
                            setEditedBook({...editedBook, descriptions: {...editedBook.descriptions, en: e.target.value}})}
                        placeholder="Title"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="title"
                        value={editedBook.descriptions.ru}
                        onChange={e =>
                            setEditedBook({...editedBook, descriptions: {...editedBook.descriptions, ru: e.target.value}})}
                        placeholder="Title"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="author"
                        value={editedBook.author}
                        onChange={handleInputChange}
                        placeholder="Author"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="genre"
                        value={editedBook.genre}
                        onChange={handleInputChange}
                        placeholder="Genre"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="publicationYear"
                        value={editedBook.publicationYear}
                        onChange={handleInputChange}
                        placeholder="Publication Year"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="quantityAvailable"
                        value={editedBook.quantityAvailable}
                        onChange={handleInputChange}
                        placeholder="Quantity Available"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="price"
                        value={editedBook.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className={"mb-3"}
                    />
                    <Button className="mt-3" variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                    <Button className="mt-3 ms-2" variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BookAdminPage;
