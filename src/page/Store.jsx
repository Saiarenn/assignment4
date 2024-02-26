import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner, Carousel } from "react-bootstrap";
import { Context } from "../index";
import BookFilter from "../components/BookFilter";
import { useBooks } from "../hooks/useBooks";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../http/bookAPI";
import { addBook } from "../http/inventoryAPI";
import { getCurrency } from "../http/externalAPI";

function Store() {
    const [localization, setLocalization] = useState("en");
    const { userStorage, bookStorage } = useContext(Context);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const sortedAndSearchedBooks = useBooks(bookStorage.books, filter.sort, filter.query);
    const [currentPage, setCurrentPage] = useState(1);
    const [currency, setCurrency] = useState(1);
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 4;

    useEffect(() => {
        fetchBooks().then((data) => bookStorage.setBooks(data)).finally(() => setLoading(false));
        const fetchCurrency = async () => {
            try {
                const data = await getCurrency();
                setCurrency(data["KZT"]);
            } catch (error) {
                console.error("Error fetching currency:", error);
            }
        };
        fetchCurrency();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAndSearchedBooks.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <Spinner className={'d-flex m-auto'} animation={"grow"} />
    }

    const handleAddToInventory = (bookId) => {
        addBook(userStorage.user.id, bookId).then((data) => {
            alert(data.message)
        }).catch(e => alert(e.message));
    };

    return (
        <Container className="d-flex flex-column">
            <h1 className="mt-4 mb-3">Store</h1>
            <BookFilter filter={filter} setFilter={setFilter} localization={localization} setLocalization={setLocalization} />
            <Row>
                {currentItems.map((book) => (
                    <Col md={3} key={book._id}>
                        <Card className="h-100">
                            <Carousel>
                                {book.pictures.map((picture, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={picture}
                                            alt={`Slide ${index}`}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <Card.Body>
                                <Card.Title>{book.titles[localization]}</Card.Title>
                                <Card.Text>{book.descriptions[localization]}</Card.Text>
                                <Card.Text>Author: {book.author}</Card.Text>
                                <Card.Text>Genre: {book.genre}</Card.Text>
                                <Card.Text>Publication Year: {book.publicationYear}</Card.Text>
                                <Card.Text>Quantity Available: {book.quantityAvailable}</Card.Text>
                                <Card.Text>Price: {localization === 'en' ? "$ " + book.price : '₸ ' + (book.price * currency)}</Card.Text>
                                <Button variant="primary" onClick={() => handleAddToInventory(book._id)}>Add to Inventory</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <nav className={'mt-3 mx-auto'}>
                <ul className="pagination">
                    {[...Array(Math.ceil(sortedAndSearchedBooks.length / itemsPerPage)).keys()].map((number) => (
                        <li key={number + 1} className="page-item">
                            <a onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </Container>
    );
}

export default Store;
