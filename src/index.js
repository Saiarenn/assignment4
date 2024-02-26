import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStorage from './storage/UserStorage';
import BookStorage from "./storage/BookStorage";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        userStorage: new UserStorage(),
        bookStorage: new BookStorage()
    }}>
        <App/>
    </Context.Provider>
);
