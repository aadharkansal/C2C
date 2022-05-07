import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Link,
    TextField,
    Typography
} from '@mui/material';
import { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            alert("password and confirm password do not match");
        }
        else if (checked !== true) {
            alert("Please accept terms and conditions");
        }
        else {
            alert(`First Name: ${firstName}\nLast Name: ${lastName}\nemail: ${email}\nPassword: ${password}`);
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Create a new account
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Use your email to create a new account
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            label="First Name"
                            margin="normal"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            margin="normal"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            margin="normal"
                            name="confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            value={confirmPassword}
                            variant="outlined"
                        />
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >
                            <Checkbox
                                checked={checked}
                                name="policy"
                                onChange={() => setChecked(!checked)}
                            />
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                I have read the
                                {' '}
                                <NavLink
                                    to="/terms"
                                >
                                    <Link>
                                        Terms and Conditions
                                    </Link>
                                </NavLink>
                            </Typography>
                        </Box>
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Sign Up Now
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Have an account?
                            {' '}
                            <NavLink
                                to="/login"
                            >
                                <Link>
                                    Sign In
                                </Link>
                            </NavLink>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
