import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Typography } from '@mui/material';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => (
    <>
        <Helmet>
            <title>
                404 | Page Not Found
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
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                    <Link
                        to="/account"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            component="a"
                            startIcon={(<ArrowBackIcon fontSize="small" />)}
                            sx={{ mt: 3 }}
                            variant="contained"
                        >
                            Accounts
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    </>
);

export default NotFound;
