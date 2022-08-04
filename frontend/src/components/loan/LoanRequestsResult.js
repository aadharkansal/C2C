import {
    Avatar,
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getInitials } from '../utils/get-initials';

const LoanRequestsResult = ({ customers, want_give_loan_button }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

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
                                    Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Loan Tenure
                                </TableCell>
                                <TableCell>
                                    Proposed Interest
                                </TableCell>
                                <TableCell>
                                    Loan Amount
                                </TableCell>
                                {want_give_loan_button &&
                                    <TableCell>

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
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={customer.avatarUrl}
                                                sx={{ mr: 2 }}
                                            >
                                                {getInitials(customer.name)}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {customer.applied_by.first_name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {customer.applied_by.email}
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
                                    {want_give_loan_button &&
                                        <TableCell>
                                            <Button
                                                variant="contained"
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
        </Paper>
    );
};

export default LoanRequestsResult;
