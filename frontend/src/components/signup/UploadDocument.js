import {
    Box,
    Button,
    Checkbox,
    Container,
    Link,
    TextField,
    Typography
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const UserDetails = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.checked === true) {
            alert("REGISTERED");
            return;
        }
        alert("TERMS AND CONDITIONS");
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autofocus
                            required
                            fullWidth
                            label="Current Annual CTC"
                            margin="normal"
                            name="ctc"
                            onChange={(e) => props.setCtc(e.target.value)}
                            value={props.ctc}
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            helperText="Aadhar Card"
                            margin="normal"
                            name="aadharCard"
                            variant="outlined"
                            type="file"
                        />
                        <TextField
                            fullWidth
                            helperText="Pan Card"
                            margin="normal"
                            name="panCard"
                            variant="outlined"
                            type="file"
                        />
                        <TextField
                            fullWidth
                            helperText="Salary Slip"
                            margin="normal"
                            name="salarySlip"
                            variant="outlined"
                            type="file"
                        />
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >
                            <Checkbox
                                checked={props.checked}
                                name="policy"
                                onChange={() => props.setChecked(!props.checked)}
                            />
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                I have read the
                                {' '}
                                <Link>
                                    Terms and Conditions
                                </Link>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                color="primary"
                                sx={{ mt: 3, ml: 1 }}
                                onClick={() => props.setActiveStep(0)}
                            >
                                Back
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Register
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default UserDetails;
