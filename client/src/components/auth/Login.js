import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async (e) => {
        e.preventDefault()
        try {
            const loginData = {
                email, password
            }
            await axios.post("http://localhost:3001/auth/login", loginData)
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
