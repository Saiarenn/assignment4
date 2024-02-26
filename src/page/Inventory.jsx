import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Context } from "../index";
import BookFilter from "../components/BookFilter";
import { useBooks } from "../hooks/useBooks";
import { useNavigate } from "react-router-dom";
import {fetchInventory} from "../http/inventoryAPI";
import {getCurrency} from "../http/externalAPI";

function Inventory() {
    const [localization, setLocalization] = useState("en");
    const [bookData, setBookData] = useState([]);
    const { userStorage } = useContext(Context);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const sortedAndSearchedBooks = useBooks(bookData, filter.sort, filter.query);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [currency, setCurrency] = useState(1);

    useEffect(() => {
        fetchInventory(userStorage.user.id).then((data) => setBookData(data));
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

    return (
        <Container className="d-flex flex-column">
            <h1 className="mt-4 mb-3">Inventory</h1>
            <BookFilter filter={filter} setFilter={setFilter} localization={localization} setLocalization={setLocalization} />
            <div className="list-group">
                {currentItems.map((book) => (
                    <a
                        key={book._id}
                        href={`http://localhost:3000/${book._id}`}
                        className="list-group-item list-group-item-action"
                    >
                        <h5 className="mb-1">{book.titles[localization]}</h5>
                        <p className="mb-1">Author: {book.descriptions[localization]}</p>
                        <p className="mb-1">Author: {book.author}</p>
                        <p className="mb-1">Genre: {book.genre}</p>
                        <p className="mb-1">Publication Year: {book.publicationYear}</p>
                        <p className="mb-1">Quantity Available: {book.quantityAvailable}</p>
                        <p className="mb-1">Price: {localization === 'en' ? "$ " + book.price : '₸ ' + (book.price * currency)}</p>
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
