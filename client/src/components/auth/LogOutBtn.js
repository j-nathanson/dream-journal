import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

export default function LogOutBtn() {
    const navigate = useNavigate()
    // update global loggedIn variable
    const { getLoggedIn } = useContext(AuthContext)

    // clear the cookie
    const logOut = async () => {
        await axios.get('http://localhost:3001/auth/logout')
        await getLoggedIn()
        navigate('/')

    }

    return (
        <button onClick={logOut}>Log out</button>
    )
}
