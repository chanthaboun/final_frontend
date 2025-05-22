// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
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
    Menu,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import BarChartIcon from '@mui/icons-material/BarChart';
import SourceIcon from '@mui/icons-material/Source';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Main navigation items for top AppBar


const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'ໜ້າຫຼັກ',
        icon: <DashboardIcon />,
        path: '/dashboard'  // ເພີ່ມເສັ້ນທາງທີ່ຊັດເຈນ
    },
    {
        segment: 'productslist',
        title: 'ລາຍການປະເພດສິນຄ້າ',
        icon: <PeopleIcon />,
        path: '/productslist'  // ເພີ່ມເສັ້ນທາງທີ່ຊັດເຈນ
    },
    {
        segment: 'productdata',
        title: 'ຂໍ້ມູນສິນຄ້າ',
        icon: <DescriptionIcon />,
        path: '/productdata'  // ເພີ່ມເສັ້ນທາງທີ່ຊັດເຈນ
    },
    {
        segment: 'orders',
        title: 'ລາຍການຂໍເບີກ',
        icon: <ShoppingCartIcon />,
        path: '/orders'  // ເພີ່ມເສັ້ນທາງທີ່ຊັດເຈນ
    },
];
// ຟັງຊັນສຳລັບການນຳທາງໄປຍັງໜ້າຕ່າງໆ
const handleNavigation = (path) => {
    // ປັບປຸງຕົວແປ state
    setCurrentPath(path);

    // ໃຊ້ navigate ເພື່ອປ່ຽນເສັ້ນທາງຈິງໆ
    navigate(path);
};

// Sidebar reports section with children
const REPORTS_SECTION = {
	segment: "management",
	title: "ຈັດການຂໍ້ມູນ",
	icon: <SourceIcon />,
	children: [
		{
			segment: "management_employee",
			title: "ຈັດການຂໍ້ມູນພະນັກງານ",
			// icon: <DescriptionIcon />,
		},
		{
			segment: "management_product",
			title: "ຈັດການຂໍ້ມູນສິນຄ້າ",
			// icon: <DescriptionIcon />,
		},
		{
			segment: "management_product_category",
			title: "ຈັດການຂໍ້ມູນປະເພດສິນຄ້າ",
			// icon: <DescriptionIcon />,
		},
		{
			segment: "management_product_category",
			title: "ຈັດການຂໍ້ມູນປະເພດສິນຄ້າ",
			// icon: <DescriptionIcon />,
		},
		{
			segment: "management_supplier",
			title: "ຈັດການຂໍ້ມູນຜູ້ສະໜອງ",
			// icon: <DescriptionIcon />,
		},
		{
			segment: "management_purchase",
			title: "ຈັດການຂໍ້ມູນການຊື້ສິນຄ້າ",
			// icon: <DescriptionIcon />,
		},
	],
};

const REPORTS_CREATE_SECTION = {
    segment: 'create_report',
    title: 'ສ້າງລາຍງານ',
    icon: <BarChartIcon />,
    children: [
        {
            segment: 'report_employee',
            title: 'ລາຍງານພະນັກງານ',
            // icon: <DescriptionIcon />,
        },
        {
            segment: 'report_product',
            title: 'ລາຍງານຂໍ້ມູນສິນຄ້າ',
            // icon: <DescriptionIcon />,
        },
        {
            segment: 'report_product_category',
            title: 'ລາຍງານຂໍ້ມູນປະເພດສິນຄ້າ',
            // icon: <DescriptionIcon />,
        },
        {
            segment: 'report_supplier',
            title: 'ລາຍງານຂໍ້ມູນຜູ້ສະໜອງ',
            // icon: <DescriptionIcon />,
        },
        {
            segment: 'report_purchase',
            title: 'ລາຍງານຂໍ້ມູນການຊື້ສິນຄ້າ',
            // icon: <DescriptionIcon />,
        },
    ],
};

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

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentPath, setCurrentPath] = useState('/dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mode, setMode] = useState('light');
    const [openSubMenu, setOpenSubMenu] = useState(null);

    const theme = React.useMemo(() => customTheme(mode), [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

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
        setCurrentPath(path);
    };

    // ຟັງຊັນສຳລັບການເປີດ/ປິດ submenu
    const handleToggleSubMenu = (segment) => {
        setOpenSubMenu(openSubMenu === segment ? null : segment);
    };

    // ຖ້າຍັງບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ສະແດງໜ້າໂຫຼດ
    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>ກຳລັງໂຫຼດ...</Typography>
            </Box>
        );
    }

    // ຖ້າຜູ້ໃຊ້ບໍ່ແມ່ນ admin, ປະຕິເສດການເຂົ້າເຖິງ
    if (user.role !== 'admin') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">
                    ການເຂົ້າເຖິງຖືກປະຕິເສດ. ສະເພາະຜູ້ດູແລລະບົບເທົ່ານັ້ນ.
                </Typography>
            </Box>
        );
    }

    // ສ່ວນເນື້ອຫາຂອງແຕ່ລະໜ້າ
    const DashboardContent = () => {
        if (currentPath === '/dashboard') {
            return (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        ສະບາຍດີ, {user.username}
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        ຜູ້ໃຊ້ທັງໝົດ
                                    </Typography>
                                    <Typography variant="h4">15</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        ຜູ້ໃຊ້ໃໝ່ມື້ນີ້
                                    </Typography>
                                    <Typography variant="h4">3</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        ຈຳນວນລາຍງານ
                                    </Typography>
                                    <Typography variant="h4">8</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        ຄຳຮ້ອງທີ່ລໍຖ້າ
                                    </Typography>
                                    <Typography variant="h4">5</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            );
        }
        return (
            <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography>ເນື້ອຫາສຳລັບໜ້າ {currentPath}</Typography>
            </Box>
        )
    };

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
                    ແຜງຄວບຄຸມຜູ້ຈັດການ
                </Typography>
                <Typography variant="body2">
                    {user.username}
                </Typography>
            </Box>

            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

            <List sx={{ flexGrow: 1 }}>
                {/* Regular navigation items */}
                {NAVIGATION.map((item) => (
                    // <ListItem
                    //     button
                    //     key={item.segment}
                    //     selected={currentPath === `/${item.segment}`}
                    //     onClick={() => handleNavigation(`/${item.segment}`)}
                    //     sx={{
                    //         '&.Mui-selected': {
                    //             backgroundColor: 'rgba(199, 14, 14, 0.2)',
                    //             '&:hover': { backgroundColor: 'rgba(11, 1, 9, 0.3)' }
                    //         },
                    //         '&:hover': { backgroundColor: 'rgba(55, 55, 51, 0.47)' },
                    //         borderRadius: '10px',
                    //         cursor: 'pointer'
                    //     }}
                    // >
                    //     <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    //         {item.icon}
                    //     </ListItemIcon>
                    //     <ListItemText primary={item.title} />
                    // </ListItem>
                    <ListItem
                        button
                        key={item.segment}
                        selected={currentPath === `/${item.segment}`}
                        onClick={() => {
                            navigate(item.path); // ໃຊ້ navigate ໂດຍກົງກັບເສັ້ນທາງທີ່ຊັດເຈນ
                            setCurrentPath(`/${item.segment}`);
                        }}
                        sx={{
                            // styles...
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
                        '&:hover': { backgroundColor: '#b2dfdb' },

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
        const [anchorEl, setAnchorEl] = useState(null);
        const [reportAnchorEl, setReportAnchorEl] = useState(null); // ເພີ່ມສຳລັບເມນູລາຍງານ
        const open = Boolean(anchorEl);
        const reportOpen = Boolean(reportAnchorEl); // ເພີ່ມສຳລັບເມນູລາຍງານ

        const handleClick = (event) => {  // ເພີ່ມສຳລັບການຈັດການຂໍ້ມູນ
            setAnchorEl(event.currentTarget);
        };
        const handleReportClick = (event) => { // ເພີ່ມສຳລັບເມນູລາຍງານ
            setReportAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleReportClose = () => { // ເພີ່ມສຳລັບເມນູລາຍງານ
            setReportAnchorEl(null);
        };


        const handleMenuItemClick = (path) => {
            handleNavigation(path);
            handleClose();
        };

        const handleReportMenuItemClick = (path) => { // ເພີ່ມສຳລັບເມນູລາຍງານ
            handleNavigation(path);
            handleReportClose();
        };

        return (
            <AppBar position="fixed" color="default" elevation={1} sx={{ zIndex: 1200, backgroundColor: 'white' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* ສ່ວນຊ້າຍ: ປຸ່ມເປີດປິດແຖບຂ້າງ ແລະ ເມນູ dropdown */}
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
                        {/* ຈັດການຂໍ້ມູນ */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                // backgroundColor: '#e3f2fd',
                                marginLeft: '500px',
                                borderRadius: '4px',
                                padding: '6px 10px',
                                userSelect: 'none'
                            }}
                            onClick={handleClick}
                            aria-controls={open ? 'reports-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <SourceIcon sx={{ mr: 1 }} />
                            <Typography sx={{
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                ຈັດການຂໍ້ມູນ
                                {open ? <ExpandLess sx={{ ml: 1 }} /> : <ExpandMore sx={{ ml: 1 }} />}
                            </Typography>
                        </Box>


                        {/* ເມນູ dropdown */}
                        <Menu
                            id="reports-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'reports-button',
                            }}
                            sx={{
                                mt: 1,
                                '& .MuiPaper-root': {
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    minWidth: '250px'
                                }
                            }}
                        >
                            {REPORTS_SECTION.children.map((option) => (
                                <MenuItem
                                    key={option.segment}
                                    onClick={() => {
                                        // ຖ້າເປັນການຈັດການຂໍ້ມູນພະນັກງານ, ໃຊ້ navigate ໂດຍກົງ
                                        if (option.segment === 'management_employee') {
                                            navigate('/management_employee');
                                        } else {
                                            handleMenuItemClick(`/${option.segment}`);
                                        }
                                        handleClose();
                                    }}
                                    selected={currentPath === `/${option.segment}`}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: '4px',
                                        mx: 1,
                                        my: 0.5,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(7, 149, 120, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(7, 149, 120, 0.2)'
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: '#079578' }}>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.title} />
                                </MenuItem>
                            ))}
                        </Menu>


                        {/* ເພີ່ມປຸ່ມເມນູ "ສ້າງລາຍງານ" */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginLeft: '50px',
                                borderRadius: '4px',
                                padding: '6px 10px',
                                userSelect: 'none'
                            }}
                            onClick={handleReportClick}
                            aria-controls={reportOpen ? 'create-report-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={reportOpen ? 'true' : undefined}
                        >
                            <BarChartIcon sx={{ mr: 1 }} />
                            <Typography sx={{
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                ສ້າງລາຍງານ
                                {reportOpen ? <ExpandLess sx={{ ml: 1 }} /> : <ExpandMore sx={{ ml: 1 }} />}
                            </Typography>
                        </Box>


                        {/* ເມນູ dropdown ສ້າງລາຍງານ */}
                        <Menu
                            id="create-report-menu"
                            anchorEl={reportAnchorEl}
                            open={reportOpen}
                            onClose={handleReportClose}
                            MenuListProps={{
                                'aria-labelledby': 'create-report-button',
                            }}
                            sx={{
                                mt: 1,
                                '& .MuiPaper-root': {
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    minWidth: '250px'
                                }
                            }}
                        >
                            {REPORTS_CREATE_SECTION.children.map((option) => (
                                <MenuItem
                                    key={option.segment}
                                    onClick={() => handleReportMenuItemClick(`/${option.segment}`)}
                                    selected={currentPath === `/${option.segment}`}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: '4px',
                                        mx: 1,
                                        my: 0.5,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(7, 149, 120, 0.1)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(7, 149, 120, 0.2)'
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, color: '#079578' }}>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.title} />
                                </MenuItem>
                            ))}
                        </Menu>

                        {/* ອັບເດດສະແດງຊື່ຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບ */}

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', marginLeft: '300px' }}>
                            ຍິນດີຕ້ອນຮັບ : {user.username}
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
                    <DashboardContent />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default AdminDashboard;