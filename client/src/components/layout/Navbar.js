import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'


export default function Navbar() {

    // get global variable
    const { loggedIn } = useContext(AuthContext)
    console.log(loggedIn)
    return (
        <div>
            <Link to='/'>Home</Link>
            {loggedIn === false && (
                <>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Login</Link>
                </>
            )}
            {loggedIn === true && <Link to='/customers'>Customers</Link>}

        </div>
    )
}
