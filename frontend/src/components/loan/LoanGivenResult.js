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

const LoanGivenResult = ({ customers }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

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
                                    Amount loaned (INR)
                                </TableCell>
                                <TableCell align="center">
                                    Amount to be collected (INR)
                                </TableCell>
                                <TableCell align="center">
                                    Borrower's email
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
                                        {customer.loan_approved_date ? get_date(customer.loan_approved_date) : "--"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.loan_repayment_date ? get_date(customer.loan_repayment_date) : "--"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.tenure}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.loan_bid_accepted.offered_interest}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.amount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.loan_bid_accepted.amount_to_pay !== null ? customer.loan_bid_accepted.amount_to_pay : "--"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {customer.applied_by.email}
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
        </Paper>
    )
};

export default LoanGivenResult;
