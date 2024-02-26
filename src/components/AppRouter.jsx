import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "../index";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
    const { userStorage } = useContext(Context)

    return (
        <Routes>
            {userStorage.isAuth && authRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.component />} />
            )}
            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.component />} />
            )}
        </Routes>
    );
}

export default AppRouter;
