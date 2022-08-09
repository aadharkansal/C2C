import {
    Box,
    Button,
    Container, Paper,
    TextField,
    Typography
} from '@mui/material';
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

const Login = () => {
    let { loginUser } = useContext(AuthContext);

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
                                type="email"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                margin="normal"
                                name="password"
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
