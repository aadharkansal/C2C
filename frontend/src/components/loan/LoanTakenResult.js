import {
    Box,
    Button, Modal, Paper, Table,
    TableBody,
    TableCell, TableContainer, TableHead,
    TablePagination,
    TableRow
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

const LoanTakenResult = ({ customers }) => {
    const [bids, setBids] = useState([]);
    const [loanID, setLoanID] = useState("");
    const handleClose = () => setLoanID("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    let { authTokens } = useContext(AuthContext)

    const get_date = (date) => {
        let d = new Date(date);
        return d.toLocaleDateString();
    }

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleSubmit = async (bidID) => {
        console.log(bidID);
        console.log(loanID);
        let response = await fetch('http://127.0.0.1:8000/loans/bid/' + String(loanID) + '/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token),
            },
            body: JSON.stringify({ 'loan_request_id': bidID })
        })
        let data = await response

        if (data.status === 201) {
            alert("Bid Accepted");
            window.location.reload();
        } else {
            alert('Something went wrong!');
        }
    }

    const bids_list =
        bids.length ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Amount to be paid</TableCell>
                        <TableCell align="center">tenure</TableCell>
                        <TableCell align="center">interest</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bids.map((bid) => (
                        <TableRow
                            key={bid.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{bid.amount_to_pay}</TableCell>
                            <TableCell align="center">{bid.tenure}</TableCell>
                            <TableCell align="center">{bid.offered_interest}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    onClick={() => handleSubmit(bid.id)}
                                >
                                    Accept Bid
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <p>No BIDS</p>

    return (
        <Paper>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 750 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    Loan Date
                                </TableCell>
                                <TableCell align="center">
                                    Repayment Date
                                </TableCell>
                                <TableCell align="center">
                                    Tenure (In Months)
                                </TableCell>
                                <TableCell align="center">
                                    Interest (Per Annum)
                                </TableCell>
                                <TableCell align="center">
                                    Amount (INR)
                                </TableCell>
                                <TableCell align="center">
                                    Amount to be paid (INR)
                                </TableCell>
                                <TableCell align="center">
                                    Lender email
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
                                        {customer.is_approved ? get_date(customer.loan_approved_date) : ""}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.is_approved ? get_date(customer.loan_repayment_date) : "BIDS"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.is_approved ? customer.loan_bid_accepted.tenure : "IN"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.is_approved ? customer.loan_bid_accepted.offered_interest : "REVIEW"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.amount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.is_approved ? customer.loan_bid_accepted.amount_to_pay : ""}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.is_approved ? customer.approved_by.email
                                            : <Button variant="contained" onClick={() => {
                                                setBids(customer.bids)
                                                setLoanID(customer.id)
                                            }}
                                            > View Bids </Button>
                                        }
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

export default LoanTakenResult;
