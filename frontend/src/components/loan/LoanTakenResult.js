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
    width: 700,
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

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleSubmit = async (bidID) => {
        let response = await fetch('http://127.0.0.1:8000/loans/bid/' + String(loanID) + '/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token),
                loan_request_id
            },
            body: JSON.stringify({ 'loan_request_id': bidID })
        })
        let data = await response

        if (data.status === 201) {
            alert("Bid Accepted");
        } else {
            alert('Something went wrong!');
        }
    }

    const bids_list = <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">tenure&nbsp;(g)</TableCell>
                    <TableCell align="right">interest&nbsp;(g)</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bids.map((bid) => (
                    <TableRow
                        key={bid.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">{bid.offered_by.email}</TableCell>
                        <TableCell align="right">{bid.tenure}</TableCell>
                        <TableCell align="right">{bid.interest}</TableCell>
                        <TableCell align="right">
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
    </TableContainer>

    return (
        <Paper>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 750 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Date of application
                                </TableCell>
                                <TableCell>
                                    Loan Tenure
                                </TableCell>
                                <TableCell>
                                    Interest
                                </TableCell>
                                <TableCell>
                                    Amount
                                </TableCell>
                                <TableCell>
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
                                    <TableCell>
                                        {customer.loan_approved_date}
                                    </TableCell>
                                    <TableCell>
                                        {customer.tenure}
                                    </TableCell>
                                    <TableCell>
                                        {customer.interest}
                                    </TableCell>
                                    <TableCell>
                                        {customer.amount}
                                    </TableCell>
                                    <TableCell>
                                        {customer.is_approved ? customer.approved_by.email
                                            : <Button variant="contained" onClick={() => {
                                                // setBids(customer.requests)
                                                setLoanID(customer.id)
                                            }}
                                            > Give Loan </Button>
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
