import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Journal from './components/journal/Journal'
import Navigation from './components/layout/Navigation'
import AuthContext from './context/AuthContext'

export default function Router() {
    const { loggedIn } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Navigation />
            <Routes className='h-100'>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/journal' element={<Journal />} />

            </Routes>
        </BrowserRouter>
    )
}

// TODO might include conditional routing but was getting 'not found warnings'
// //   {loggedIn === true &&
// <>
// <Route exact path='/journal' element={<Journal />} />
// </>
// }
// {loggedIn === false &&
// <>
// <Route exact path='/register' element={<Register />} />
// <Route exact path='/' element={<Login />} />
// </>
// }