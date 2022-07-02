import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Button,
    Container,
    Link,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const Login = () => {
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
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Dashboard
                        </Button>
                    </NavLink>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <form onSubmit={handleSubmit}>
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
                                    ful
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <NavLink
                                to="/register"
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Don&apos;t have an account?
                                    {' '}
                                    <NavLink
                                        to="/register"
                                    >
                                        <Link>
                                            Sign Up
                                        </Link>
                                    </NavLink>
                                </Typography>
                            </NavLink>
                        </form>
                    </Paper>

                </Container>
            </Box>
        </>
    );
};

export default Login;
