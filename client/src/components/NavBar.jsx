import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, INVENTORY_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const router = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        router(LOGIN_ROUTE)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={INVENTORY_ROUTE}>Inventory</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button onClick={() => logOut()} variant={"outline-light"} style={{ marginLeft: "10px" }}>Logout</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button variant={"outline-light"} onClick={() => router(LOGIN_ROUTE)} > Authorization</Button>
                    </Nav>}
            </Container>
        </Navbar >
    );
})

export default NavBar;
