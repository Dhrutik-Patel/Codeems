import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { login } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [loginMutation, { data, error, isLoading }] = useLoginMutation();

    const { search } = useLocation();
    const redirect = new URLSearchParams(search).get('redirect') || '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [user, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const data = await loginMutation({ email, password }).unwrap();

            dispatch(login(data));

            toast.success('Login successful');
        } catch (error) {
            console.log(error);
            toast.error(error.data.error.details);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>

                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    className='mt-2'
                    disabled={isLoading}
                >
                    Sign In
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : '/register'
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginPage;
