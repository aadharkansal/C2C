import {
    Box,
    Button,
    Container, Paper,
    TextField,
    Typography
} from '@mui/material';
import { useContext } from "react";
import { Helmet } from "react-helmet";
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoanCreate = () => {
    let { authTokens } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isNaN(+e.target.amount.value) == true
            || isNaN(+e.target.tenure.value) == true
            || isNaN(+e.target.interest.value) == true) {
            alert("Please enter valid value");
            return;
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/loans/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            },
            body: JSON.stringify({ 'amount': e.target.amount.value, 'tenure': e.target.tenure.value, 'interest': e.target.interest.value, 'applied_by': String(authTokens.id) })
        })

        let data = await response
        if (data.status === 201) {
            alert("Loan Request Created");
            window.location.reload();
        }
        else if (data.status === 400) alert("Loan Limit exceeded!");
        else {
            alert('INTERNAL SERVER ERROR');
            navigate("/login");
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
                                label="Amount (INR)"
                                margin="normal"
                                name="amount"
                                type="text"
                                variant="outlined"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Tenure (In Months)"
                                margin="normal"
                                name="tenure"
                                type="text"
                                variant="outlined"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Interest (Per Annum)"
                                margin="normal"
                                name="interest"
                                type="text"
                                variant="outlined"
                                required
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
