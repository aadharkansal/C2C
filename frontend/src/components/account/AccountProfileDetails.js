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
    console.log(process.env.REACT_APP_BASE_URL);
    let updateSalary = async () => {
        let salary = prompt("Please enter your salary:");
        if (isNaN(salary)) {
            alert("Please enter a valid salary");
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
        console.log("RAJJJ");
        console.log(response)
        if (response.status === 201) window.location.reload();
        else alert("Something went wrong");
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
