import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import {Context} from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {jwtDecode} from "jwt-decode";
import './styles/App.css';
import {fetchBooks} from "./http/bookAPI";

const App = observer(() => {
    const {userStorage, bookStorage} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            userStorage.setUser(jwtDecode(token))
            userStorage.setIsAuth(true)
        }
        setLoading(false)
        fetchBooks().then((data) => bookStorage.setBooks(data));
    }, [token]);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App;
