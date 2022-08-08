import { Box, Container, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import AuthContext from '../../context/AuthContext';
import { AccountProfile } from '../account/AccountProfile';
import { AccountProfileDetails } from '../account/AccountProfileDetails';

const Account = () => {
    const [user, setUser] = useState({});
    let { authTokens } = useContext(AuthContext);

    let getUserDetail = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/?id=` + String(authTokens.id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + String(authTokens.token)
            }
        })
        let data = await response.json();

        if (response.status === 200) setUser(data);
        else alert("Something went wrong");
    }

    useEffect(() => {
        getUserDetail();
    }, [])


    return <>
        <Helmet>
            <title>
                Account | Material Kit
            </title>
        </Helmet>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Account
                </Typography>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <AccountProfile user={user} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <AccountProfileDetails user={user} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
};

export default Account;
