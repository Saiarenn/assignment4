import React, {useContext} from "react";
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, INVENTORY_ROUTE, STORE_ROUTE, QUIZ_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {userStorage} = useContext(Context)
    const router = useNavigate()

    const logOut = () => {
        userStorage.setUser({})
        userStorage.setIsAuth(false)
        router(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav style={{color: "white"}}>
                    <NavLink style={{color: 'white'}} to={STORE_ROUTE}>Store</NavLink>
                    {userStorage.isAuth &&
                        <div>
                            <NavLink style={{color: 'white'}} className={'mx-3'} to={INVENTORY_ROUTE}>Inventory</NavLink>
                            <NavLink style={{color: 'white'}} to={QUIZ_ROUTE}>Quiz</NavLink>
                        </div>
                    }
                </Nav>
                {userStorage.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {userStorage.user.role === "ADMIN" &&
                            <Button onClick={() => router(ADMIN_ROUTE)} variant={"outline-light"}>Admin Panel</Button>
                        }
                        <Button onClick={() => logOut()} variant={"outline-light"}
                                style={{marginLeft: "10px"}}>Logout</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => router(LOGIN_ROUTE)}> Authorization</Button>
                    </Nav>}
            </Container>
        </Navbar>
    );
})

export default NavBar;
