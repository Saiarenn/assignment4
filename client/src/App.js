import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import {Context} from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {jwtDecode} from "jwt-decode";
import './styles/App.css';

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            user.setUser(jwtDecode(token))
            user.setIsAuth(true)
        }
        setLoading(false)
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
