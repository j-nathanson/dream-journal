import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

// allow for logged in boolean to be accessible by all components

const AuthContext = React.createContext();

export function AuthContextProvider(props) {
    // undefined since we haven't called to loggedIn route
    const [loggedIn, setLoggedIn] = useState(undefined)

    const getLoggedIn = async () => {
        const loggedInRes = await axios.get("http://localhost:3001/auth/loggedIn")
        setLoggedIn(loggedInRes.data)
    }

    useEffect(() => {
        getLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext