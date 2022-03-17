import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import LogOutBtn from '../auth/LogOutBtn'


export default function Navbar() {

    // get global variable
    const { loggedIn } = useContext(AuthContext)
    return (
        <div>
            {loggedIn === false && (
                <>
                    <Link to='/'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            )}
            {loggedIn === true &&
                <>
                    <Link to='/journal'>Journal</Link>
                    <LogOutBtn />
                </>

            }

        </div>
    )
}
