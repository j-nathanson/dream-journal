import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()


    const register = async (e) => {
        e.preventDefault()
        try {
            const registerData = {
                email, password, passwordVerify
            }
            await axios.post("http://localhost:3001/auth/", registerData)

            // update global then navigate to home
            await getLoggedIn()
            navigate('/journal')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Register a new account</h1>
            <form onSubmit={register}>
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
                <input
                    type="password"
                    placeholder='Verify your Password'
                    onChange={(e) => setPasswordVerify(e.target.value)}
                    value={passwordVerify}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
