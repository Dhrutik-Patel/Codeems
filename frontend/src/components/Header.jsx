import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../slices/authSlice';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutMutation, { isLoading, error }] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(logout());
            navigate('/login');

            toast.success('Logged out successfully');
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                src={Logo}
                                alt='Codeems'
                                style={{
                                    mixBlendMode: 'multiply',
                                    width: 'auto',
                                    height: '2.5rem',
                                }}
                            />
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />

                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            bg='success'
                                            style={{
                                                marginLeft: '0.5rem',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            {cartItems.reduce(
                                                (acc, item) => acc + +item.qty,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>

                            {user ? (
                                <NavDropdown title={user.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <FaUser /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
