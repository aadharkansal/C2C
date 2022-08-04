import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import LoanRequestsResult from '../loan/LoanRequestsResult';
import { loanRequests } from "../../dummy_data/loan_request";

const LoanGiven = () => {
    // const [loanRequests, setLoanRequests] = useState([]);

    useEffect(() => {
        const getLoansList = () => {
            const URL = "http://127.0.0.1:8000/loans?approved=true";

            fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    // setLoanRequests(data);
                })
        }
        // getLoansList();
        // console.log(getLoansList);
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
