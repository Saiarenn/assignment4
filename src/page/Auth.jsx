import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, INVENTORY_ROUTE } from "../utils/consts";

const Auth = observer(() => {
    const { userStorage } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(name, password)
            } else {
                data = await registration(name, password)
            }
            userStorage.setUser(data)
            userStorage.setIsAuth(true)
            navigate(INVENTORY_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? "Authorization" : "Registraion"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Container className="d-flex justify-content-between align-items-center mt-3 p-0">
                        {isLogin ?
                            <div>Does not have an account? <NavLink to={REGISTRATION_ROUTE}>Sign Up</NavLink></div>
                            :
                            <div>Have an account? <NavLink to={LOGIN_ROUTE}>Log In</NavLink></div>
                        }
                        <Button
                            className=""
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? "Log In" : "Sign Up"}
                        </Button>
                    </Container>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;
