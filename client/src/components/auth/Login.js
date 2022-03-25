import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import CustomInput from '../form/CustomInput'

export default function Login() {

    const [error, setError] = useState('')
    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()


    const { control, handleSubmit, formState: { } } = useForm();


    const login = async (data) => {
        try {
            const loginData = {
                email: data.email,
                password: data.password
            }

            await axios.post("http://localhost:3001/auth/login", loginData)

            // update global then navigate to home
            const result = await getLoggedIn()
            console.log(result)
            navigate('/journal')
        } catch (err) {
            // console.log(err.message)
            setError('Please correct your email/password')

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
        <Container fluid className='d-flex flex-column align-items-center justify-content-center p-1 login-container'>

            <Row className='mb-5'>
                <h1 className='login-header p-0'>Welcome to dreamy...</h1>
            </Row>
            <Row >
                <Form onSubmit={handleSubmit(login)}>
                    <h2 className='mb-5'>Log in to your account</h2>
                    {error && <p>{error}</p>}
                    <CustomInput
                        name="email"
                        placeholder="Email"
                        control={control}
                        rules={{
                            required: "Email is Required",
                            pattern: { value: /(.+)@(.+){2,}\.(.+){2,}/, message: 'Please enter valid email.' }
                        }}
                    />
                    <CustomInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        control={control}
                        rules={{
                            required: "Password is Required"
                        }}
                    />
                    <Button className='w-100 mb-3' variant='success' type="submit">Log in</Button>


                    <Button className=" w-100 mb-3 btn-google" onClick={loginGoogle}>
                        Sign in with Google <span className='fa fa-google' />
                    </Button>

                    <div className='d-flex justify-content-center'>
                        <p>need an account? <Link className='auth-link' to='/register'>Sign Up</Link> </p>
                    </div>

                </Form>
            </Row>
        </Container>
    )
}


// <Form.Group className='mb-3'>
// <Form.Control
//     type="password"
//     placeholder='Password'
//     onChange={(e) => setPassword(e.target.value)}
//     value={password}
// />
// </Form.Group>
//  <Form.Group className='mb-3'>
// <Form.Control
// type="email"
// placeholder='Email'
// onChange={(e) => setEmail(e.target.value)}
// value={email}
// />
// </Form.Group>