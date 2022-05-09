import { Helmet } from "react-helmet";
import { Box, Container, Typography } from '@mui/material';
import LoanRequestsResult from '../loan/LoanRequestsResult';
import { loan_requests } from "../../dummy_data/loan_request";

const LoanRequests = () => (
    <>
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
                Loan Requests
            </Typography>
            <Container maxWidth={false}>

                <Box sx={{ mt: 3 }}>
                    <LoanRequestsResult customers={loan_requests} />
                </Box>
            </Container>
        </Box>
    </>
);


export default LoanRequests;
