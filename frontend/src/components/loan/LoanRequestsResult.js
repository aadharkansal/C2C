import {
    Box,
    Button, Modal, Paper, Table,
    TableBody,
    TableCell,
    TableContainer,
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
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const LoanRequestsResult = ({ customers, want_give_loan_button }) => {
    const [bids, setBids] = useState([]);
    const [loanID, setLoanID] = useState("");
    const handleClose = () => setBids([]);
    const handleCloseBid = () => setLoanID("");
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

        if (isNaN(e.target.tenure.value)) {
            alert("Please enter a valid tenure value");
            return;
        }
        if (isNaN(e.target.interest.value)) {
            alert("Please enter a valid interest value");
            return;
        }

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/loans/bid/${String(loanID)}`, {
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
            alert("BID Created Successfully");
            window.location.reload();
        }
        else alert('Something went wrong!');
    }

    const getBids = async (loanID) => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/loans/bid/${String(loanID)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            },
        })
        let data = await response.json()

        if (response.status === 200) {
            setBids(data);
            console.log(data)
            console.log(bids)
        }
        else alert('Something went wrong!');
    }

    const bids_list = bids.length ? <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">tenure</TableCell>
                    <TableCell align="center">interest</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bids.map((bid) => (
                    <TableRow
                        key={bid.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center">{bid.tenure}</TableCell>
                        <TableCell align="center">{bid.offered_interest}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer> : <p>No BIDS</p>

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
                                <TableCell>

                                </TableCell>
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
                                    <TableCell align="center"><Button variant="contained" onClick={() => { getBids(customer.id) }}> View My Bids </Button>
                                    </TableCell>
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
                onClose={handleCloseBid}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {bidding_form}
                </Box>
            </Modal>
            <Modal
                open={bids.length}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {bids_list}
                </Box>
            </Modal>
        </Paper>
    )
};

export default LoanRequestsResult;
