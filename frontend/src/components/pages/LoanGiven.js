import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import LoanRequestsResult from '../loan/LoanRequestsResult';
import AuthContext from '../../context/AuthContext';

const LoanGiven = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    let { authTokens, logoutUser } = useContext(AuthContext)

    let getLoansList = async () => {
        let response = await fetch('http://127.0.0.1:8000/loans?approved=true', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            }
        })
        let data = await response.json()

        if (response.status === 200) setLoanRequests(data);
        else logoutUser()
    }

    useEffect(() => {
        getLoansList();
        console.log(authTokens)
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
                Loans Approved
            </Typography>
            <Container maxWidth={false}>

                <Box sx={{ mt: 3 }}>
                    <LoanRequestsResult customers={loanRequests} want_give_loan_button={true} />
                </Box>
            </Container>
        </Box>
    </>
};


export default LoanGiven;
