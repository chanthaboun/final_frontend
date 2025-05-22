// // frontend/src/components/UserDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Grid,
//     Button,
//     Card,
//     CardContent,
//     Divider,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemIcon,
//     Avatar
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { authService } from '../api';

// // ໄອຄອນງ່າຍໆສຳລັບເມນູ
// const HomeIcon = () => <span>🏠</span>;
// const ProfileIcon = () => <span>👤</span>;
// const NotificationIcon = () => <span>🔔</span>;
// const HelpIcon = () => <span>❓</span>;

// const UserDashboard = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // ດຶງຂໍ້ມູນຜູ້ໃຊ້ຈາກ localStorage
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             // ຖ້າບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ກັບໄປຍັງໜ້າ login
//             navigate('/');
//         }
//     }, [navigate]);

//     // ຟັງຊັນສຳລັບການອອກຈາກລະບົບ
//     const handleLogout = () => {
//         authService.logout();
//         navigate('/');
//     };

//     // ຖ້າຍັງບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ສະແດງໜ້າໂຫຼດ
//     if (!user) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <Typography>ກຳລັງໂຫຼດ...</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ display: 'flex' }}>
//             {/* ແຖບດ້ານຂ້າງ */}
//             <Paper
//                 sx={{
//                     width: 240,
//                     minHeight: '100vh',
//                     backgroundColor: '#2196f3',
//                     color: 'white',
//                     position: 'fixed',
//                     left: 0,
//                     top: 0,
//                 }}
//             >
//                 <Box sx={{ p: 3, textAlign: 'center' }}>
//                     <Avatar
//                         sx={{
//                             width: 80,
//                             height: 80,
//                             margin: '0 auto 16px',
//                             backgroundColor: '#64b5f6'
//                         }}
//                     >
//                         {user.username.charAt(0).toUpperCase()}
//                     </Avatar>
//                     <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//                         {user.username}
//                     </Typography>
//                     <Typography variant="body2">
//                         ຜູ້ໃຊ້ທົ່ວໄປ
//                     </Typography>
//                 </Box>

//                 <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

//                 <List>
//                     <ListItem button selected>
//                         <ListItemIcon sx={{ color: 'white' }}>
//                             <HomeIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="ໜ້າຫຼັກ" />
//                     </ListItem>

//                     <ListItem button>
//                         <ListItemIcon sx={{ color: 'white' }}>
//                             <ProfileIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="ໂປຣໄຟລ໌" />
//                     </ListItem>

//                     <ListItem button>
//                         <ListItemIcon sx={{ color: 'white' }}>
//                             <NotificationIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="ແຈ້ງເຕືອນ" />
//                     </ListItem>

//                     <ListItem button>
//                         <ListItemIcon sx={{ color: 'white' }}>
//                             <HelpIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="ຊ່ວຍເຫຼືອ" />
//                     </ListItem>
//                 </List>

//                 <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
//                     <Button
//                         variant="contained"
//                         color="error"
//                         fullWidth
//                         onClick={handleLogout}
//                     >
//                         ອອກຈາກລະບົບ
//                     </Button>
//                 </Box>
//             </Paper>

//             {/* ເນື້ອຫາຫຼັກ */}
//             <Box sx={{ marginLeft: '240px', flexGrow: 1, p: 3 }}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     ສະບາຍດີ, {user.username}
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                     ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ. ນີ້ແມ່ນໜ້າຈໍຫຼັກສຳລັບຜູ້ໃຊ້ທົ່ວໄປ.
//                 </Typography>

//                 <Grid container spacing={3}>
//                     <Grid item xs={12} md={6} lg={4}>
//                         <Card sx={{
//                             height: '100%',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             transition: 'transform 0.3s',
//                             '&:hover': {
//                                 transform: 'translateY(-5px)',
//                                 boxShadow: 3
//                             }
//                         }}>
//                             <CardContent sx={{ flexGrow: 1 }}>
//                                 <Typography variant="h6" component="div">
//                                     ສ້າງຄຳຮ້ອງໃໝ່
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     ສ້າງຄຳຮ້ອງໃໝ່ຫາທີມງານພວກເຮົາ
//                                 </Typography>
//                             </CardContent>
//                             <Box sx={{ p: 2 }}>
//                                 <Button variant="contained" color="primary" size="small">
//                                     ສ້າງຄຳຮ້ອງ
//                                 </Button>
//                             </Box>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} md={6} lg={4}>
//                         <Card sx={{
//                             height: '100%',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             transition: 'transform 0.3s',
//                             '&:hover': {
//                                 transform: 'translateY(-5px)',
//                                 boxShadow: 3
//                             }
//                         }}>
//                             <CardContent sx={{ flexGrow: 1 }}>
//                                 <Typography variant="h6" component="div">
//                                     ຄຳຮ້ອງຂອງຂ້ອຍ
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     ເບິ່ງຄຳຮ້ອງຂອງທ່ານທັງໝົດ
//                                 </Typography>
//                             </CardContent>
//                             <Box sx={{ p: 2 }}>
//                                 <Button variant="outlined" color="primary" size="small">
//                                     ເບິ່ງທັງໝົດ
//                                 </Button>
//                             </Box>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} md={6} lg={4}>
//                         <Card sx={{
//                             height: '100%',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             transition: 'transform 0.3s',
//                             '&:hover': {
//                                 transform: 'translateY(-5px)',
//                                 boxShadow: 3
//                             }
//                         }}>
//                             <CardContent sx={{ flexGrow: 1 }}>
//                                 <Typography variant="h6" component="div">
//                                     ຊ່ວຍເຫຼືອ & ຕິດຕໍ່
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     ຕ້ອງການຊ່ວຍເຫຼືອ? ຕິດຕໍ່ພວກເຮົາໄດ້
//                                 </Typography>
//                             </CardContent>
//                             <Box sx={{ p: 2 }}>
//                                 <Button variant="outlined" color="primary" size="small">
//                                     ຕິດຕໍ່
//                                 </Button>
//                             </Box>
//                         </Card>
//                     </Grid>
//                 </Grid>

//                 <Paper sx={{ p: 2, mt: 3 }}>
//                     <Typography variant="h6" gutterBottom>
//                         ສະຖານະຄຳຮ້ອງຫຼ້າສຸດຂອງທ່ານ
//                     </Typography>
//                     <List>
//                         <ListItem>
//                             <ListItemText
//                                 primary="ຄຳຮ້ອງ #12345"
//                                 secondary="ສະຖານະ: ກຳລັງດຳເນີນການ | ສົ່ງເມື່ອ: 05/03/2025"
//                             />
//                             <Button variant="text" color="primary" size="small">
//                                 ເບິ່ງລາຍລະອຽດ
//                             </Button>
//                         </ListItem>
//                         <Divider />
//                         <ListItem>
//                             <ListItemText
//                                 primary="ຄຳຮ້ອງ #12344"
//                                 secondary="ສະຖານະ: ສຳເລັດແລ້ວ | ສົ່ງເມື່ອ: 28/02/2025"
//                             />
//                             <Button variant="text" color="primary" size="small">
//                                 ເບິ່ງລາຍລະອຽດ
//                             </Button>
//                         </ListItem>
//                     </List>
//                 </Paper>
//             </Box>
//         </Box>
//     );
// };

// export default UserDashboard;




// // frontend/src/components/UserDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Grid,
//     Button,
//     Card,
//     CardContent,
//     Divider,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemIcon,
//     createTheme,
//     ThemeProvider,
//     AppBar,
//     Toolbar,
//     IconButton,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { authService } from '../api';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import DescriptionIcon from '@mui/icons-material/Description';
// import LogoutIcon from '@mui/icons-material/Logout';
// import MenuIcon from '@mui/icons-material/Menu';
// import ReceiptIcon from '@mui/icons-material/Receipt';

// // Main navigation items for regular users
// const NAVIGATION = [
//     {
//         segment: 'dashboard',
//         title: 'ໜ້າຫຼັກ',
//         icon: <DashboardIcon />,
//         path: '/dashboard'
//     },
//     {
//         segment: 'productslist',
//         title: 'ລາຍການປະເພດສິນຄ້າ',
//         icon: <ShoppingCartIcon />,
//         path: '/productslist'
//     },
//     {
//         segment: 'productdata',
//         title: 'ຂໍ້ມູນສິນຄ້າ',
//         icon: <DescriptionIcon />,
//         path: '/productdata'
//     },
// ];

// const customTheme = (mode) => createTheme({
//     cssVariables: {
//         colorSchemeSelector: 'data-toolpad-color-scheme',
//     },
//     palette: {
//         mode,
//         primary: {
//             main: '#079578',
//         },
//         background: {
//             default: mode === 'light' ? '#f5f5f5' : '#121212',
//         },
//     },
//     colorSchemes: { light: true, dark: true },
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 600,
//             md: 600,
//             lg: 1200,
//             xl: 1536,
//         },
//     },
// });

// const UserDashboard = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [currentPath, setCurrentPath] = useState('/dashboard');
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const [mode, setMode] = useState('light');

//     const theme = React.useMemo(() => customTheme(mode), [mode]);

//     const toggleColorMode = () => {
//         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//     };

//     useEffect(() => {
//         // ດຶງຂໍ້ມູນຜູ້ໃຊ້ຈາກ localStorage
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             // ຖ້າບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ກັບໄປຍັງໜ້າ login
//             navigate('/');
//         }
//     }, [navigate]);

//     // ຟັງຊັນສຳລັບການອອກຈາກລະບົບ
//     const handleLogout = () => {
//         authService.logout();
//         navigate('/');
//     };

//     // ຟັງຊັນສຳລັບການນຳທາງໄປຍັງໜ້າຕ່າງໆ
//     const handleNavigation = (path) => {
//         setCurrentPath(path);
//         navigate(path);
//         console.log("Navigating to:", path); // For debugging
//     };

//     // ຟັງຊັນສຳລັບການຂໍເບີກ
//     const handleWithdrawalRequest = () => {
//         // ຕົວຢ່າງການຂໍເບີກ - ໃນກໍລະນີຈິງຈະເຊື່ອມຕໍ່ກັບ API
//         alert('ການຂໍເບີກຂອງທ່ານໄດ້ຖືກສົ່ງແລ້ວ');
//     };

//     // ຖ້າຍັງບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ສະແດງໜ້າໂຫຼດ
//     if (!user) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <Typography>ກຳລັງໂຫຼດ...</Typography>
//             </Box>
//         );
//     }

//     // ຖ້າຜູ້ໃຊ້ແມ່ນ admin, ປ່ຽນເສັ້ນທາງໄປໜ້າ admin
//     if (user.role === 'admin') {
//         navigate('/admin');
//         return null;
//     }

//     // ສ່ວນເນື້ອຫາຂອງແຕ່ລະໜ້າ
//     const DashboardContent = () => {
//         // ເພີ່ມການລ໋ອກ
//         console.log("Current path:", currentPath);

//         if (currentPath === '/dashboard') {
//             return (
//                 <Box sx={{ width: '100%' }}>
//                     <Typography variant="h4" component="h1" gutterBottom>
//                         ສະບາຍດີ, {user.username}
//                     </Typography>

//                     <Grid container spacing={3}>
//                         <Grid item xs={12} md={6} lg={3}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography color="text.secondary" gutterBottom>
//                                         ສິນຄ້າທັງໝົດ
//                                     </Typography>
//                                     <Typography variant="h4">85</Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>

//                         <Grid item xs={12} md={6} lg={3}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography color="text.secondary" gutterBottom>
//                                         ລາຍການສັ່ງຊື້
//                                     </Typography>
//                                     <Typography variant="h4">12</Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>

//                         <Grid item xs={12} md={6} lg={3}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography color="text.secondary" gutterBottom>
//                                         ສິນຄ້າໃໝ່
//                                     </Typography>
//                                     <Typography variant="h4">7</Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>

//                         <Grid item xs={12} md={6} lg={3}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography color="text.secondary" gutterBottom>
//                                         ຄຳຮ້ອງຂໍເບີກ
//                                     </Typography>
//                                     <Typography variant="h4">3</Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             );
//         }
//         return (
//             <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
//                 <Typography>ເນື້ອຫາສຳລັບໜ້າ {currentPath}</Typography>
//             </Box>
//         )
//     };

//     // ສ້າງສ່ວນປະກອບແຖບດ້ານຂ້າງທີ່ມີປຸ່ມອອກຈາກລະບົບ
//     const SidebarWithLogout = () => (
//         <Paper
//             sx={{
//                 width: 240,
//                 minHeight: 'calc(100vh - 64px)', // ຫຼຸດຄວາມສູງຂອງ AppBar
//                 backgroundColor: '#079578',
//                 color: 'white',
//                 position: 'fixed',
//                 left: sidebarOpen ? 0 : -240,
//                 top: 64, // ເລີ່ມຈາກດ້ານລຸ່ມຂອງ AppBar
//                 zIndex: 1100,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'left 0.3s ease',
//             }}
//             elevation={3}
//         >
//             <Box sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//                     ແຜງຄວບຄຸມຜູ້ໃຊ້
//                 </Typography>
//                 <Typography variant="body2">
//                     {user.username}
//                 </Typography>
//             </Box>

//             <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

//             <List sx={{ flexGrow: 1 }}>
//                 {/* Regular navigation items */}
//                 {NAVIGATION.map((item) => (
//                     <ListItem
//                         button
//                         key={item.segment}
//                         selected={currentPath === item.path}
//                         onClick={() => {
//                             navigate(item.path);
//                             setCurrentPath(item.path);
//                         }}
//                         sx={{
//                             '&.Mui-selected': {
//                                 backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                                 '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
//                             },
//                             '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
//                             borderRadius: '10px',
//                             cursor: 'pointer',
//                             margin: '4px 8px',
//                         }}
//                     >
//                         <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
//                             {item.icon}
//                         </ListItemIcon>
//                         <ListItemText primary={item.title} />
//                     </ListItem>
//                 ))}
//             </List>

//             {/* ປຸ່ມອອກຈາກລະບົບຢູ່ດ້ານລຸ່ມຂອງແຖບດ້ານຂ້າງ */}
//             <Box sx={{ p: 2, mt: 'auto' }}>
//                 <Button
//                     variant="contained"
//                     fullWidth
//                     onClick={handleLogout}
//                     sx={{
//                         backgroundColor: '#e0f2f1',
//                         color: '#079578',
//                         '&:hover': { backgroundColor: '#b2dfdb' },
//                     }}
//                     startIcon={<LogoutIcon />}
//                 >
//                     ອອກຈາກລະບົບ
//                 </Button>
//             </Box>
//         </Paper>
//     );

//     // ແຖບທາງເທິງ (Header)
//     const Header = () => {
//         return (
//             <AppBar position="fixed" color="default" elevation={1} sx={{ zIndex: 1200, backgroundColor: 'white' }}>
//                 <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     {/* ສ່ວນຊ້າຍ: ປຸ່ມເປີດປິດແຖບຂ້າງ */}
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             aria-label="menu"
//                             onClick={() => setSidebarOpen(!sidebarOpen)}
//                             sx={{ mr: 2 }}
//                         >
//                             <MenuIcon />
//                         </IconButton>

//                         {/* ປຸ່ມຂໍເບີກເງິນ */}
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 cursor: 'pointer',
//                                 backgroundColor: '#f0f7ff',
//                                 marginLeft: '50px',
//                                 borderRadius: '4px',
//                                 padding: '6px 10px',
//                                 '&:hover': { backgroundColor: '#e1f0ff' },
//                             }}
//                             onClick={handleWithdrawalRequest}
//                         >
//                             <ReceiptIcon sx={{ mr: 1, color: '#079578' }} />
//                             <Typography sx={{ fontWeight: 'bold', color: '#333' }}>
//                                 ລາຍການຂໍເບີກ
//                             </Typography>
//                         </Box>

//                         {/* ອັບເດດສະແດງຊື່ຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບ */}
//                         <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', marginLeft: 'auto' }}>
//                             ຍິນດີຕ້ອນຮັບ: {user.username}
//                         </Typography>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//         );
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Box sx={{
//                 display: 'flex',
//                 minHeight: '100vh',
//                 bgcolor: 'background.default',
//                 color: 'text.primary'
//             }}>
//                 {/* ແຖບທາງເທິງ */}
//                 <Header />

//                 {/* ແຖບດ້ານຂ້າງພ້ອມປຸ່ມອອກຈາກລະບົບ */}
//                 <SidebarWithLogout />

//                 {/* ສ່ວນເນື້ອຫາຂອງໜ້າ */}
//                 <Box sx={{
//                     flexGrow: 1,
//                     marginLeft: sidebarOpen ? '240px' : 0,
//                     marginTop: '64px',
//                     p: 3,
//                     transition: 'margin-left 0.3s ease',
//                 }}>
//                     <DashboardContent />
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     );
// };

// export default UserDashboard;




// frontend/src/components/UserDashboard.jsx
import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';

const UserDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // ຖ້າຍັງບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ສະແດງໜ້າໂຫຼດ
    if (!user || Object.keys(user).length === 0) {
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
                                ສິນຄ້າທັງໝົດ
                            </Typography>
                            <Typography variant="h4">85</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                ສິນຄ້າເຫຼືອນ້ອຍ
                            </Typography>
                            <Typography variant="h4">3</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserDashboard;