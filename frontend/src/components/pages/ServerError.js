import { Box, Container, Typography } from '@mui/material';
import { Helmet } from "react-helmet";


const ServerError = () => (
    <>
        <Helmet>
            <title>
                INTERNAL SERVER ERROR
            </title>
        </Helmet>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h1"
                    >
                        500: INTERNAL SERVER ERROR
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                    </Typography>
                </Box>
            </Container>
        </Box>
    </>
);

export default ServerError;
