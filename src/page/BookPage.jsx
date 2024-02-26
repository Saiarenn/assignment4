import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Row, Col, Spinner, Carousel} from 'react-bootstrap';
import {fetchBookById} from "../http/bookAPI";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {removeBook} from "../http/inventoryAPI";
import {INVENTORY_ROUTE} from "../utils/consts";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {getCurrency} from "../http/externalAPI";

const BookPage = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState({});
    const [currency, setCurrency] = useState(1);
    const [localization, setLocalization] = useState("en");
    const {userStorage} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        fetchBookById(bookId).then((data) => {
            setBook(data);
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
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


    const removeFromInventory = () => {
        removeBook(userStorage.user.id, bookId).then((data) => {
            alert(data.message);
            navigate(INVENTORY_ROUTE)
        });
    };

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <div className="carousel-wrapper">
                        <Carousel>
                            {book.pictures.map((picture, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={picture}
                                        alt={book.titles.en}
                                        className="d-block w-100"
                                        style={{height: "400px", objectFit: "cover"}}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="book-details">
                        <h1>{book.titles[localization]}</h1>
                        <p><strong>Description:</strong> {book.descriptions[localization]}</p>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Publication Year:</strong> {book.publicationYear}</p>
                        <p>
                            <strong>Price:</strong> {localization === 'en' ? "$ " + book.price : '₸ ' + (book.price * currency)}
                        </p>

                        <Button onClick={removeFromInventory} variant="danger">
                            <FontAwesomeIcon icon={faTrash}/>
                            Remove from Inventory</Button>

                        <select className="form-select mt-3 " value={localization}
                                onChange={e => setLocalization(e.target.value)}>
                            <option value="en">English</option>
                            <option value="ru">Russian</option>
                        </select>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default BookPage;
