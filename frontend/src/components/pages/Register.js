import {
    Box,
    Button,
    Container, Paper, TextField, Typography
} from '@mui/material';
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

const Register = () => {
    let { logoutUser } = AuthContext;

    return (
        <>
            <Helmet>
                <title>
                    Register
                </title>
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
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Box sx={{ my: 3 }}>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            Create a new account
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Have an account?
                            {' '}
                            <NavLink
                                to="/login"
                            >
                                Sign In
                            </NavLink>
                        </Typography>
                    </Box>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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
                                <form onSubmit={logoutUser}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        margin="normal"
                                        name="firstName"
                                        variant="outlined"
                                        type="text"
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        margin="normal"
                                        name="lastName"
                                        type="text"
                                        variant="outlined"
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email Address"
                                        margin="normal"
                                        name="email"
                                        type="email"
                                        variant="outlined"
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        margin="normal"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        label="Confirm Password"
                                        margin="normal"
                                        name="confirmPassword"
                                        type="password"
                                        variant="outlined"
                                    />
                                    <Button
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Next
                                    </Button>
                                </form>
                            </Container>
                        </Box>

                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default Register;
