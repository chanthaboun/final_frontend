// src/components/UserLayout.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    createTheme,
    ThemeProvider,
    AppBar,
    Toolbar,
    IconButton,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Main navigation items for regular users
const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'ໜ້າຫຼັກ',
        icon: <DashboardIcon />,
        path: '/user/dashboard'
    },
    {
        segment: 'productslist',
        title: 'ລາຍການປະເພດສິນຄ້າ',
        icon: <ShoppingCartIcon />,
        path: '/user/productslist'
    },
    {
        segment: 'productdata',
        title: 'ຂໍ້ມູນສິນຄ້າ',
        icon: <DescriptionIcon />,
        path: '/user/productdata'
    },
];

const customTheme = (mode) => createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    palette: {
        mode,
        primary: {
            main: '#079578',
        },
        background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
        },
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const UserLayout = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mode, setMode] = useState('light');

    const theme = React.useMemo(() => customTheme(mode), [mode]);

    useEffect(() => {
        // ດຶງຂໍ້ມູນຜູ້ໃຊ້ຈາກ localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // ຖ້າບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ກັບໄປຍັງໜ້າ login
            navigate('/');
        }
    }, [navigate]);

    // ຟັງຊັນສຳລັບການອອກຈາກລະບົບ
    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    // ຟັງຊັນສຳລັບການນຳທາງໄປຍັງໜ້າຕ່າງໆ
    const handleNavigation = (path) => {
        navigate(path);
        setCurrentPath(path);
    };

    // ຟັງຊັນສຳລັບການຂໍເບີກ
    const handleWithdrawalRequest = () => {
        navigate('/user/withdrawal');
    };

    // ຖ້າຍັງບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ສະແດງໜ້າໂຫຼດ
    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>ກຳລັງໂຫຼດ...</Typography>
            </Box>
        );
    }

    // ຖ້າຜູ້ໃຊ້ແມ່ນ admin, ປ່ຽນເສັ້ນທາງໄປໜ້າ admin
    if (user.role === 'admin') {
        navigate('/admin');
        return null;
    }

    // ສ້າງສ່ວນປະກອບແຖບດ້ານຂ້າງທີ່ມີປຸ່ມອອກຈາກລະບົບ
    const SidebarWithLogout = () => (
        <Paper
            sx={{
                width: 240,
                minHeight: 'calc(100vh - 64px)', // ຫຼຸດຄວາມສູງຂອງ AppBar
                backgroundColor: '#079578',
                color: 'white',
                position: 'fixed',
                left: sidebarOpen ? 0 : -240,
                top: 64, // ເລີ່ມຈາກດ້ານລຸ່ມຂອງ AppBar
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'column',
                transition: 'left 0.3s ease',
            }}
            elevation={3}
        >
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    ແຜງຄວບຄຸມຜູ້ໃຊ້
                </Typography>
                <Typography variant="body2">
                    {user.username}
                </Typography>
            </Box>

            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

            <List sx={{ flexGrow: 1 }}>
                {/* Regular navigation items */}
                {NAVIGATION.map((item) => (
                    <ListItem
                        button
                        key={item.segment}
                        selected={currentPath === item.path}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                            },
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                            borderRadius: '10px',
                            margin: '4px 8px',
                            cursor: 'pointer'
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>

            {/* ປຸ່ມອອກຈາກລະບົບຢູ່ດ້ານລຸ່ມຂອງແຖບດ້ານຂ້າງ */}
            <Box sx={{ p: 2, mt: 'auto' }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogout}
                    sx={{
                        backgroundColor: '#e0f2f1',
                        color: '#079578',
                        '&:hover': { backgroundColor: '#b2dfdb' }
                    }}
                    startIcon={<LogoutIcon />}
                >
                    ອອກຈາກລະບົບ
                </Button>
            </Box>
        </Paper>
    );

    // ແຖບທາງເທິງ (Header)
    const Header = () => {
        return (
            <AppBar position="fixed" color="default" elevation={1} sx={{ zIndex: 1200, backgroundColor: 'white' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* ປຸ່ມຂໍເບີກເງິນ */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                // backgroundColor: '#f0f7ff',
                                marginLeft: '500px',
                                borderRadius: '4px',
                                padding: '6px 10px',
                                '&:hover': { backgroundColor: '#e1f0ff' },
                            }}
                            onClick={handleWithdrawalRequest}
                        >
                            <ReceiptIcon sx={{ mr: 1, color: '#079578' }} />
                            <Typography sx={{ fontWeight: 'bold', color: '#333' }}>
                                ລາຍການຂໍເບີກ
                            </Typography>
                        </Box>

                        {/* ອັບເດດສະແດງຊື່ຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບ */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', marginLeft:'500px' }}>
                            ຍິນດີຕ້ອນຮັບ: {user.username}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary'
            }}>
                {/* ແຖບທາງເທິງ */}
                <Header />

                {/* ແຖບດ້ານຂ້າງພ້ອມປຸ່ມອອກຈາກລະບົບ */}
                <SidebarWithLogout />

                {/* ສ່ວນເນື້ອຫາຂອງໜ້າ */}
                <Box sx={{
                    flexGrow: 1,
                    marginLeft: sidebarOpen ? '240px' : 0,
                    marginTop: '64px',
                    p: 3,
                    transition: 'margin-left 0.3s ease',
                }}>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default UserLayout;