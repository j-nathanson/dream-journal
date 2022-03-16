import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Navbar from './components/layout/Navbar'

function Home() {
    return (<div>home</div>)
}

function Customers() {
    return (<div>customers</div>)
}

export default function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/customers' element={<Customers />} />
            </Routes>
        </BrowserRouter>
    )
}
