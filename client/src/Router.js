import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Navbar from './components/layout/Navbar'
import AuthContext from './context/AuthContext'

function Home() {
    return (<div>home</div>)
}

function Customers() {
    return (<div>customers</div>)
}

export default function Router() {

    const { loggedIn } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                {loggedIn === false &&
                    <>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                    </>}
                {loggedIn === true &&
                    <>
                        <Route path='/customers' element={<Customers />} />
                    </>}
            </Routes>
        </BrowserRouter>
    )
}
