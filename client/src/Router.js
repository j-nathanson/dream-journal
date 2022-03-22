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
                {loggedIn === false &&
                    <>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </>
                }
                {loggedIn === true &&
                    <>
                        <Route path='/journal' element={<Journal />} />
                    </>
                }
            </Routes>
        </BrowserRouter>
    )
}

