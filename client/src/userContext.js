import React, { useState, createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

        // Check if user is initially logged in and set the state accordingly.
        const initialLoginStateHandler = () => {
                if (localStorage.getItem('user')) return true;
                return false;
        };

        const [loggedIn, setLoginState] = useState(initialLoginStateHandler());

        const user = { loggedIn, setLoginState };

        return (
                <UserContext.Provider value={user}>
                        {props.children}
                </UserContext.Provider>
        );

};

export default UserContextProvider;
