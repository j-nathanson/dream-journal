import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Journal from './components/journal/Journal'
import Navbar from './components/layout/Navbar'
import AuthContext from './context/AuthContext'

function Home() {
    return (<div>home</div>)
}


export default function Router() {

    const { loggedIn } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {loggedIn === false &&
                    <>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </>}
                {loggedIn === true &&
                    <>
                        <Route path='/journal' element={<Journal />} />
                    </>}
            </Routes>
        </BrowserRouter>
    )
}

