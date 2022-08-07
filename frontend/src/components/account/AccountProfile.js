import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from '@mui/material';


export const AccountProfile = ({ user }) => {
    return <Card>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                    }}
                />
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {user.first_name + " " + user.last_name}
                </Typography>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {user.email}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
    </Card>
};
