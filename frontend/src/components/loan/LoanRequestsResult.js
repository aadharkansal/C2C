import {
    Box,
    Button, Modal, Paper, Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useContext, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AuthContext from '../../context/AuthContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const LoanRequestsResult = ({ customers, want_give_loan_button }) => {
    const [loanID, setLoanID] = useState("");
    const handleClose = () => setLoanID("");
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(0);
    let { authTokens } = useContext(AuthContext)

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("RAJJJ");

        let response = await fetch('http://127.0.0.1:8000/loans/bid/' + String(loanID), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            },
            body: JSON.stringify({ 'tenure': +e.target.tenure.value, 'offered_interest': +e.target.interest.value, 'email': authTokens.email })
        })
        let data = await response

        if (data.status === 201) {
            setLoanID("");
        } else {
            alert('Something went wrong!');
        }
    }

    const bidding_form = <form onSubmit={handleSubmit}>
        <Box sx={{ my: 3 }}>
            <Typography
                color="textPrimary"
                variant="h4"
            >
                Enter your proposal
            </Typography>
        </Box>
        <TextField
            fullWidth
            label="Tenure"
            margin="normal"
            name="tenure"
            type="number"
            variant="outlined"
            helperText="Use only integers. Decimal part will be truncated."
            required
        />
        <TextField
            fullWidth
            label="Interest Offered"
            margin="normal"
            name="interest"
            type="float"
            min="0"
            step="1"
            variant="outlined"
            required
        />
        <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
        >
            Submit
        </Button>
    </form>

    return (
        <Paper>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 750 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    Name
                                </TableCell>
                                <TableCell align="center">
                                    Loan Tenure (In Months)
                                </TableCell>
                                <TableCell align="center">
                                    Proposed Interest (Per Annum)
                                </TableCell>
                                <TableCell align="center">
                                    Loan Amount (INR)
                                </TableCell>
                                {want_give_loan_button &&
                                    <TableCell align="center">

                                    </TableCell>
                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.slice(limit * page, limit * page + limit).map((customer) => (
                                <TableRow
                                    hover
                                    key={customer.id}
                                >
                                    <TableCell align="center">
                                        {customer.applied_by.first_name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.tenure}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.interest + "%"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.amount.toFixed(2)}
                                    </TableCell>
                                    {want_give_loan_button &&
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                onClick={() => setLoanID(customer.id)}
                                            >
                                                Give Loan
                                            </Button>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={customers.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[3, 5, 8]}
            />
            <Modal
                open={loanID}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {bidding_form}
                </Box>
            </Modal>
        </Paper>
    )
};

export default LoanRequestsResult;
