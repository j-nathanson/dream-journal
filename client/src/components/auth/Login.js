import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()


    const login = async (e) => {
        e.preventDefault()
        try {
            const loginData = {
                email, password
            }
            await axios.post("http://localhost:3001/auth/login", loginData)

            // update global then navigate to home
            await getLoggedIn()
            navigate('/journal')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Log into your account</h1>
            <form onSubmit={login}>
                <input
                    type="email"
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
