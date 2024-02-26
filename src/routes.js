import {ADMIN_ROUTE, INVENTORY_ROUTE, LOGIN_ROUTE, QUIZ_ROUTE, REGISTRATION_ROUTE, STORE_ROUTE} from "./utils/consts"
import Auth from "./page/Auth"
import BookPage from "./page/BookPage"
import Store from "./page/Store"
import Inventory from "./page/Inventory";
import Admin from "./page/Admin";
import BookAdminPage from "./page/BookAdminPage";
import QuizPage from "./page/QuizPage";

export const authRoutes = [
    {
        path: STORE_ROUTE,
        component: Store
    },
    {
        path: ADMIN_ROUTE,
        component: Admin
    },
    {
        path: ADMIN_ROUTE + '/:bookId',
        component: BookAdminPage
    },
    {
        path: INVENTORY_ROUTE,
        component: Inventory
    },
    {
        path: INVENTORY_ROUTE + '/:bookId',
        component: Inventory
    },
    {
        path: QUIZ_ROUTE,
        component: QuizPage
    }
]

export const publicRoutes = [

    {
        path: LOGIN_ROUTE,
        component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth
    },
    {
        path: STORE_ROUTE,
        component: Store
    },
    {
        path: STORE_ROUTE + '/:bookId',
        component: BookPage
    },
]