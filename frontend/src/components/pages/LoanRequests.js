import { Box, Container, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import AuthContext from '../../context/AuthContext';
import LoanRequestsResult from '../loan/LoanRequestsResult';

const LoanRequests = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    let { authTokens } = useContext(AuthContext);

    let getLoansList = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/loans/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            },
        })
        let data = await response.json()

        if (response.status === 200) setLoanRequests(data);
        else alert("INTERNAL SERVER ERROR");
    }

    useEffect(() => {
        getLoansList();
    }, [])

    return <>
        <Helmet>
            <title>
                Loan Requests
            </title>
        </Helmet>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
            }}
        >
            <Typography variant="h3">
                Pending Loan Requests
            </Typography>
            <Container maxWidth={false}>

                <Box sx={{ mt: 3 }}>
                    <LoanRequestsResult customers={loanRequests} want_give_loan_button={true} />
                </Box>
            </Container>
        </Box>
    </>
};


export default LoanRequests;
