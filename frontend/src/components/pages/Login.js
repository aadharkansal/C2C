import { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
            <title>Login</title>
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
                    <Button
                        component="a"
                        startIcon={<ArrowBackIcon fontSize="small" />}
                    >
                        Dashboard
                    </Button>
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
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Don&apos;t have an account?
                            {' '}
                            Sign Up
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login;
