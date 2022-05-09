import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Button,
    Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { getInitials } from '../utils/get-initials';

const LoanRequestsResult = ({ customers }) => {
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
                                    CIBIL Score
                                </TableCell>
                                <TableCell>
                                    Mode of Payment
                                </TableCell>
                                <TableCell>
                                    Loan Amount
                                </TableCell>
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
                                                {customer.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {customer.email}
                                    </TableCell>
                                    <TableCell>
                                        {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                                    </TableCell>
                                    <TableCell>
                                        {customer.phone}
                                    </TableCell>
                                    <TableCell>
                                        {format(customer.createdAt, 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                        >
                                            Give Loan
                                        </Button>
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
    );
};

export default LoanRequestsResult;
