import { LOGIN_ROUTE, REGISTRATION_ROUTE, INVENTORY_ROUTE } from "./utils/consts"
import Auth from "./page/Auth"
import BookPage from "./page/BookPage"
import Inventory from "./page/Inventory";

export const authRoutes = [
    {
        path: INVENTORY_ROUTE,
        component: Inventory
    },
    {
        path: INVENTORY_ROUTE + '/:bookId',
        component: BookPage
    },
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
]