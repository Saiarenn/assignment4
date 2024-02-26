import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBook from "../components/modals/createBook";
import { fetchBooks } from "../http/bookAPI";
import { Context } from "../index";
import BookFilter from "../components/BookFilter";
import { useBooks } from "../hooks/useBooks";
import { useNavigate } from "react-router-dom";

function Inventory() {
    const [bookVisible, setBookVisible] = useState(false);
    const [bookData, setBookData] = useState([]);
    const { user } = useContext(Context);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const sortedAndSearchedBooks = useBooks(bookData, filter.sort, filter.query);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        fetchBooks(user.user.id).then((data) => setBookData(data));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAndSearchedBooks.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container className="d-flex flex-column">
            <h1 className="mt-4 mb-3">Inventory</h1>
            <Button className="my-4 p-2" variant={"outline-dark"} onClick={() => setBookVisible(true)}>
                Add book
            </Button>
            <BookFilter filter={filter} setFilter={setFilter} />
            <CreateBook show={bookVisible} onHide={() => setBookVisible(false)} />
            <div className="list-group">
                {currentItems.map((book) => (
                    <a
                        key={book._id}
                        href={`http://localhost:3000/${book._id}`}
                        className="list-group-item list-group-item-action"
                    >
                        <h5 className="mb-1">{book.title}</h5>
                        <p className="mb-1">Author: {book.author}</p>
                        <p className="mb-1">Genre: {book.genre}</p>
                        <p className="mb-1">Publication Year: {book.publicationYear}</p>
                        <p className="mb-1">Quantity Available: {book.quantityAvailable}</p>
                        <p className="mb-1">Price: ${book.price}</p>
                    </a>
                ))}
            </div>
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

export default Inventory;
