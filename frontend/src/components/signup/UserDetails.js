import {
    Box,
    Button,
    Container,
    TextField
} from '@mui/material';
import { useState } from "react";

const UserDetails = (props) => {
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.password !== props.confirmPassword) {
            setError(true);
            return;
        }
        setError(false);
        props.setActiveStep(1);
    }

    return (
        <>
        </>
    );
};

export default UserDetails;
