import {
    Box,
    Button,
    Card,
    CardContent, Divider, Typography
} from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AccountProfileDetails = ({ user }) => {
    const navigate = useNavigate();
    let { authTokens } = useContext(AuthContext);
    let updateSalary = async () => {
        let salary = prompt("Please enter your salary:");
        if (isNaN(salary) || salary <= 0) {
            alert("Please enter a valid number as salary");
            return;
        }
        if (salary % 1) {
            alert("Please enter salary as an integer");
            return;
        }
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/?id=${String(authTokens.id)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            },
            body: JSON.stringify({ 'salary': +salary })
        })
        if (response.status === 201) window.location.reload();
        else {
            alert("INTERNAL SERVER ERROR");
            navigate("/login");
        }
    }

    return <Card>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    Salary: {user.salary}
                </Typography>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    Total Loan Given: {user.total_loan_given} INR
                </Typography>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    Total Loan Taken: {user.total_loan_taken} INR
                </Typography>
                <Button
                    mt={1}
                    variant="contained"
                    onClick={updateSalary}
                >
                    Update Salary
                </Button>
            </Box>
        </CardContent>
        <Divider />
    </Card>
};
