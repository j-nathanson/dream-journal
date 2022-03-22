import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Form, Row } from 'react-bootstrap'

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
    const loginFB = async (e) => {
        e.preventDefault()
        try {

            await axios.get("http://localhost:3001/auth/facebook")

            // // update global then navigate to home
            // await getLoggedIn()
            // navigate('/journal')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Container fluid className='d-flex align-items-center justify-content-center login-container'>
            <Row>
                <Form onSubmit={login}>
                    <h1 className='mb-5'>Log in to your account</h1>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type="email"
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type="password"
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>

                    <Button className='w-100 mb-3' variant='success' type="submit">Log in</Button>

                    <div className='d-flex justify-content-center'>
                        <p>need an account? <Link to='/register'>Sign Up</Link> </p>
                    </div>

                </Form>
            </Row>
        </Container>
    )
}
