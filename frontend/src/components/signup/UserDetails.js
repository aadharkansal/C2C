import {
    Box,
    Button,
    Container,
    TextField
} from '@mui/material';
import { useState } from "react";

const UserDetails = (props) => {
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.password !== props.confirmPassword) {
            setError(true);
            return;
        }
        setError(false);
        props.setActiveStep(1);
    }

    return (
        <>
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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            label="First Name"
                            margin="normal"
                            name="firstName"
                            onChange={(e) => props.setFirstName(e.target.value)}
                            value={props.firstName}
                            variant="outlined"
                            type="text"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Last Name"
                            margin="normal"
                            name="lastName"
                            onChange={(e) => props.setLastName(e.target.value)}
                            type="text"
                            value={props.lastName}
                            variant="outlined"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onChange={(e) => props.setEmail(e.target.value)}
                            type="email"
                            value={props.email}
                            variant="outlined"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            onChange={(e) => props.setPassword(e.target.value)}
                            type="password"
                            value={props.password}
                            variant="outlined"
                            error={error}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Confirm Password"
                            margin="normal"
                            name="confirm password"
                            onChange={(e) => props.setConfirmPassword(e.target.value)}
                            type="password"
                            value={props.confirmPassword}
                            variant="outlined"
                            error={error}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                color="primary"
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Next
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default UserDetails;
