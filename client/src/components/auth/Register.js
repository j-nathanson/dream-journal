import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Form, Row } from 'react-bootstrap'

export default function Register() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()


    const register = async (e) => {
        e.preventDefault()
        try {
            const registerData = {
                email, name, password, passwordVerify
            }
            await axios.post("http://localhost:3001/auth/", registerData)

            // update global then navigate to home
            await getLoggedIn()
            navigate('/journal')
        } catch (err) {
            console.log(err)
        }
    }

    const loginGoogle = () => {
        window.open('http://localhost:3001/auth/google', '_self')
    }

    const getToken = async () => {
        try {
            const res = await axios.get('http://localhost:3001/auth/login/success')
            if (res.status === 200) {
                await getLoggedIn()
                navigate('/journal')
            }
            throw new Error('authentication has failed')
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getToken()
    }, [])

    return (
        <Container fluid className='d-flex align-items-center justify-content-center login-container'>
            <Row>
                <Form onSubmit={register}>
                    <h1 className='mb-5'>Register a new account</h1>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type="text"
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Form.Group>
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
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type="password"
                            placeholder='Verify your Password'
                            onChange={(e) => setPasswordVerify(e.target.value)}
                            value={passwordVerify}
                        />
                    </Form.Group>

                    <Button className='w-100 ' variant='success' type="submit">Log in</Button>

                    <hr />
                    <Button className=" w-100 mb-3 btn-google" onClick={loginGoogle}>
                        Register with Google <span className='fa fa-google' />
                    </Button>

                    <div className='d-flex justify-content-center'>
                        <p>have an account? <Link className='auth-link' to='/'>Log In</Link> </p>
                    </div>
                </Form>
            </Row>
        </Container>
    )
}
