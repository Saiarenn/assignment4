import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Spinner} from "react-bootstrap";
import CreateBook from "../components/modals/createBook";
import {fetchBooks} from "../http/bookAPI";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useBooks} from "../hooks/useBooks";
import BookFilter from "../components/BookFilter";

function Admin() {
    const [bookVisible, setBookVisible] = useState(false);
    const { userStorage, bookStorage } = useContext(Context);
    const [localization, setLocalization] = useState("en");
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const sortedAndSearchedBooks = useBooks(bookStorage.books, filter.sort, filter.query);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 2;

    useEffect(() => {
        fetchBooks().then((data) => bookStorage.setBooks(data)).finally(() => setLoading(false));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAndSearchedBooks.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <Spinner className={'d-flex m-auto'} animation={"grow"}/>
    }

    return (
        <Container className="d-flex flex-column">
            <h1 className="mt-4 mb-3">Admin Page</h1>
            <Button className="my-4 p-2" variant={"outline-dark"} onClick={() => setBookVisible(true)}>
                Add book
            </Button>
            <BookFilter filter={filter} setFilter={setFilter} localization={localization} setLocalization={setLocalization}/>
            <CreateBook show={bookVisible} onHide={() => setBookVisible(false)} />
            <div className="list-group">
                {currentItems.map((book) => (
                    <a
                        key={book._id}
                        href={`http://localhost:3000/admin/${book._id}`}
                        className="list-group-item list-group-item-action"
                    >
                        <h5 className="mb-1">{book.titles[localization]}</h5>
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

export default Admin;
