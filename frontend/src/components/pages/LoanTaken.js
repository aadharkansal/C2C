import { Box, Container, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import AuthContext from '../../context/AuthContext';
import LoanTakenResult from '../loan/LoanTakenResult';

const LoanTaken = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    let { authTokens, logoutUser } = useContext(AuthContext)

    let getLoansList = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/loans?applied=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            }
        })
        let data = await response.json()

        if (response.status === 200) setLoanRequests(data);
        else {
            alert("AUTHENTICATION ERROR, Please login again");
            logoutUser();
        }
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
                Loans Taken
            </Typography>
            <Container maxWidth={false}>

                <Box sx={{ mt: 3 }}>
                    <LoanTakenResult customers={loanRequests} want_give_loan_button={true} />
                </Box>
            </Container>
        </Box>
    </>
};


export default LoanTaken;
