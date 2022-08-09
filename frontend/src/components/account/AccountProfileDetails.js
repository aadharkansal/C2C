import {
    Box,
    Button,
    Card,
    CardContent, Divider, Typography
} from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export const AccountProfileDetails = ({ user }) => {
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
        else alert("INTERNAL SERVER ERROR");
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
                    Total Loan Given: {user.first_name + " " + user.last_name}
                </Typography>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    Total Loan Taken: {user.first_name + " " + user.last_name}
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
