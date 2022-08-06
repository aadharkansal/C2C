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
                                <TableCell>
                                    Loan Date
                                </TableCell>
                                <TableCell>
                                    Loan Repayment Date
                                </TableCell>
                                <TableCell>
                                    Loan Tenure (in Months)
                                </TableCell>
                                <TableCell>
                                    Interest (Per Month)
                                </TableCell>
                                <TableCell>
                                    Amount loaned(INR)
                                </TableCell>
                                <TableCell>
                                    Amount to be paid (INR)
                                </TableCell>
                                <TableCell>
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
                                    <TableCell>
                                        {customer.loan_approved_date ? get_date(customer.loan_approved_date) : "--"}
                                        {console.log(customer.loan_approved_date)}
                                        {console.log(new Date(customer.loan_approved_date))}
                                    </TableCell>
                                    <TableCell>
                                        {customer.loan_repayment_date ? get_date(customer.loan_repayment_date) : "--"}
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
                                        {customer.loan_bid_accepted.amount_to_pay !== null ? customer.loan_bid_accepted.amount_to_pay : "--"}
                                    </TableCell>
                                    <TableCell>
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
