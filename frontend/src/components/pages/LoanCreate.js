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

const LoanCreate = () => {
    let { authTokens } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        // console.log(isNan(+e.target.amount.value));
        // console.log(isNan(+e.target.tenure.value));
        // console.log(isNan(+e.target.interest.value));
        e.preventDefault();
        if (isNaN(+e.target.amount.value) == true
            || isNaN(+e.target.tenure.value) == true
            || isNaN(+e.target.interest.value) == true) {
            alert("Please enter valid value");
            return;
        }

        let response = await fetch('http://127.0.0.1:8000/loans/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            },
            body: JSON.stringify({ 'amount': e.target.amount.value, 'tenure': e.target.tenure.value, 'interest': e.target.interest.value, 'applied_by': String(authTokens.id) })
        })

        let data = await response
        console.log(data);
        if (data.status === 201) {
            alert("Loan Request Created");
        } else {
            alert('Something went wrong!');
        }
    }

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
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ my: 3 }}>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    Create loan request
                                </Typography>
                            </Box>
                            <TextField
                                fullWidth
                                label="Amount"
                                margin="normal"
                                name="amount"
                                type="text"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Tenure in months"
                                margin="normal"
                                name="tenure"
                                type="text"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Interest per month"
                                margin="normal"
                                name="interest"
                                type="text"
                                variant="outlined"
                            />
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Create Request
                                </Button>
                            </Box>
                        </form>
                    </Paper>

                </Container>
            </Box>
        </>
    );
};

export default LoanCreate;
