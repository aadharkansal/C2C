import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Button,
    Container, Paper,
    TextField,
    Typography
} from '@mui/material';
import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

const Login = () => {
    let { loginUser } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }).then(
            data => {
                console.log(data);
            }
        ).catch(err => console.error(err));

        alert(`username: ${email}\npassword: ${password}`);
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <NavLink
                        to="/"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            component="p"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Dashboard
                        </Button>
                    </NavLink>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <form onSubmit={loginUser}>
                            <Box sx={{ my: 3 }}>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    Sign in
                                </Typography>
                            </Box>
                            <TextField
                                fullWidth
                                label="Email Address"
                                margin="normal"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                type="email"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                margin="normal"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                type="password"
                                variant="outlined"
                            />
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                Don&apos;t have an account?
                                {' '}
                                <NavLink
                                    to="/register"
                                >
                                    Sign Up
                                </NavLink>
                            </Typography>
                        </form>
                    </Paper>

                </Container>
            </Box>
        </>
    );
};

export default Login;
