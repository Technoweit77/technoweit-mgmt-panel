// src/components/DashboardLayout.js
import React, { useState, useEffect, useMemo } from 'react';
import { AppBar, Typography, Toolbar, MenuItem, IconButton, Menu, Drawer, Box, ListItemIcon, Divider, Paper, MenuList, Avatar, Tooltip, Modal, TextField, Button, Badge, CircularProgress, List } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import { useLocation, useNavigate, Routes, Route, Navigate } from "react-router-dom";

import { ListItem, ListItemButton, ListItemText, ListItemIcon as MuiListItemIcon } from "@mui/material"; // Renamed to avoid conflict


const InternalSidebar = ({ menus }) => {


    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };


    return (
        <List>
            {menus?.map((item, index) => (
                item.allowedRole.includes("Admin") && (
                    <ListItem key={index} dense >
                        <ListItemButton
                            disableRipple
                            selected={location.pathname === item.path}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                borderRadius: 1,
                                transition: 'background-color 0.2s ease',
                                '&.Mui-selected': {
                                    backgroundColor: "#007fff",
                                    borderRadius: 1,
                                    color: "#ffff",
                                    '&:hover': {
                                        backgroundColor: "rgba(0, 127, 255, 0.3)",
                                    },
                                },
                            }}
                        >
                            <MuiListItemIcon sx={{
                                minWidth: "40px",
                                color: location.pathname === item.path ? "#ffff" : "#cccc"
                            }}>
                                {item.icon}
                            </MuiListItemIcon>
                            <ListItemText primary={item.name} sx={{
                                color: location.pathname === item.path ? "#ffff" : "#cccc",
                            }} />
                            {item.badgeContent ? (
                                <Badge
                                    badgeContent={item.badgeContent}
                                    color='success'
                                    sx={{ ml: 2 }}
                                />
                            ) : null}
                        </ListItemButton>
                    </ListItem>
                )
            ))}
        </List>
    );
};


const DashboardLayout = ({ routes = [],
    menus = [],
    toggleTheme, themeMode,
    userData = {
        userName: "Technoweit",
        userRole: "Admin",
        userAvatar: "",
        userMobile: "3454543543"
    },
    appBarDrawerTitle = "Technoweit Softwares",
    loginPath = '/',
    onLogoutClick = () => { alert('Logout Clicked') },
    sideBarType = "drawer",
}) => {

    const [open, setOpen] = useState(false);
    const [profileBox, setProfileBox] = useState(null);
    const openProfile = Boolean(profileBox);
    const [openModal, setOpenModal] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const isLoginPage = true;
    const isAuthenticated = true; // Assuming UserData has a userId when authenticated


    const toggleDrawer = (newOpen) => () => setOpen(newOpen);
    const handleClick = (event) => setProfileBox(event.currentTarget);

    const handleClose = () => setProfileBox(null);
    const handleOpenModal = () => setOpenModal(true);

    useEffect(() => {
        const handleOnlineStatus = () => setIsOnline(true);
        const handleOfflineStatus = () => setIsOnline(false);

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOfflineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOfflineStatus);
        };
    }, []);

    return (
        <Box>
            {isLoginPage && (
                <AppBar position="fixed" sx={{ bgcolor: "#007fff" }}>
                    <Toolbar variant="dense">
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="inherit" component="div" sx={{ flexGrow: 1, fontSize: "16px" }}>
                            {appBarDrawerTitle}
                        </Typography>
                        <div>
                            <Tooltip>
                                <IconButton onClick={toggleTheme}>
                                    {themeMode === 'dark' ? <LightModeRoundedIcon color='warning' /> : <NightsStayRoundedIcon color='disabled' />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={isOnline ? "Internet access" : "No internet access"}>
                                <IconButton>
                                    {isOnline ? <WifiIcon /> : <WifiOffIcon color='error' />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Bug">
                                <IconButton onClick={handleOpenModal}>
                                    <BugReportRoundedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Notification">
                                <IconButton>
                                    <NotificationsActiveRoundedIcon />
                                </IconButton>
                            </Tooltip>
                            <IconButton sx={{
                                backgroundColor: "green", width: 35, height: 35, ml: 1,
                                '&:hover': {
                                    backgroundColor: 'green',
                                }
                            }}
                                onClick={handleClick}
                            >
                                <Typography sx={{ fontSize: "14px" }}>{userData?.userName?.charAt(0).toUpperCase()}</Typography>
                            </IconButton>
                            <Menu
                                anchorEl={profileBox}
                                open={openProfile}
                                onClose={handleClose}
                                MenuListProps={{
                                    disablePadding: true
                                }}
                            >
                                <Paper sx={{ width: 270 }}>
                                    <MenuList dense>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 39, height: 39, fontSize: "16px", mr: 1, bgcolor: "pink" }}>{"A"}</Avatar>
                                            </ListItemIcon>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography>{userData.userName}</Typography>
                                                <Typography variant='body1' sx={{ flexGrow: 1 }}>
                                                    {userData.userRole}
                                                </Typography>
                                            </Box>
                                            <Box sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: '#1FFF0F',
                                                ml: 1,
                                                '@keyframes heartbeat': {
                                                    '0%': {
                                                        transform: 'scale(1)',
                                                    },
                                                    '25%': {
                                                        transform: 'scale(1.2)',
                                                    },
                                                    '50%': {
                                                        transform: 'scale(1)',
                                                    },
                                                    '75%': {
                                                        transform: 'scale(1.2)',
                                                    },
                                                    '100%': {
                                                        transform: 'scale(1)',
                                                    },
                                                },
                                                animation: 'heartbeat 1.5s infinite',
                                            }} />
                                        </MenuItem>

                                        <Divider />

                                        <MenuItem>
                                            <ListItemIcon>
                                                <MarkEmailReadRoundedIcon />
                                            </ListItemIcon>
                                            Mail
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <SettingsRoundedIcon />
                                            </ListItemIcon>
                                            Setting
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <LockOpenRoundedIcon />
                                            </ListItemIcon>
                                            Privacy and Security
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={() => onLogoutClick()}>
                                            <ListItemIcon>
                                                <LogoutRoundedIcon />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            )}

            {
                sideBarType === "drawer" ? (
                    <Drawer open={open} onClose={toggleDrawer(false)} >
                        <Box sx={{ width: 240, height: "100%" }} role="presentation" onClick={toggleDrawer(false)}>
                            <Box sx={{ p: 2, textAlign: "center" }}>
                                <Typography>
                                    {appBarDrawerTitle}
                                </Typography>
                            </Box>
                            <Divider />
                            <InternalSidebar menus={menus} />
                        </Box>
                    </Drawer>

                ) : (
                    <Box
                        sx={{
                            width: 240,
                            height: '100vh',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bgcolor: '#fff',
                            borderRight: '1px solid #ccc',
                            pt: 6, // Push content below AppBar
                        }}
                    >
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography>{appBarDrawerTitle}</Typography>
                        </Box>
                        <Divider />
                        <InternalSidebar menus={menus} />
                    </Box>
                )
            }

            <Box sx={{ mt: 6, ml: sideBarType === 'fixed' ? '240px' : 0, p: 2 }}>
                <Routes>
                    {/* <Route path={loginPath} element={React.cloneElement(routes.find(r => r.path === loginPath).element, { toggleTheme, themeMode })} /> */}
                    {routes.map((item, index) => (
                        <Route
                            exact
                            key={index}
                            path={item.path}
                            element={isAuthenticated ? item.element : <Navigate to={loginPath} />}
                        />
                    ))}
                </Routes>
            </Box>
        </Box>
    );
};

export default DashboardLayout;