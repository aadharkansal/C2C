import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import CreditScoreSharpIcon from '@mui/icons-material/CreditScoreSharp';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';
import MenuIcon from '@mui/icons-material/Menu';
import MoneyIcon from '@mui/icons-material/Money';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { useState } from "react";
import { NavLink } from 'react-router-dom';

const drawerWidth = 200;

const SideBarItems = [
    {
        name: "Dashboard",
        to: "/",
        icon: <DashboardCustomizeSharpIcon />
    },
    {
        name: "Loan Requests",
        to: "loans",
        icon: <CreditScoreSharpIcon />
    },
    {
        name: "Account",
        to: "account",
        icon: <AccountCircleSharpIcon />
    },
    {
        name: "Settings",
        to: "settings",
        icon: <SettingsApplicationsSharpIcon />
    },
    {
        name: "Loans Given",
        to: "loans/given",
        icon: <CurrencyRupeeSharpIcon />
    },
    {
        name: "Loans Taken",
        to: "loans/taken",
        icon: <MoneyIcon />
    }
];

const ResponsiveDrawer = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {SideBarItems.map((item, index) => {
                    return <ListItem key={index}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <NavLink to={`/${item.to}`} style={{ textDecoration: "none", color: "black" }}>
                            <ListItemText primary={item.name} />
                        </NavLink>
                    </ListItem>
                })}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        C2C
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;
