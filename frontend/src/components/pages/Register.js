import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Button,
    Container,
    Link,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography
} from '@mui/material';
import { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import UploadDocument from '../signup/UploadDocument';
import UserDetails from '../signup/UserDetails';
import NotFound from './NotFound';

const steps = ['User Details', 'Upload Documents'];

const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [ctc, setCtc] = useState(0);

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <UserDetails
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    setActiveStep={setActiveStep}
                />
            case 1:
                return <UploadDocument
                    checked={checked}
                    setChecked={setChecked}
                    setActiveStep={setActiveStep}
                    ctc={ctc}
                    setCtc={setCtc}
                />
            default:
                return <NotFound />
        }
    }

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
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {getStepContent(activeStep)}
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default Register;
