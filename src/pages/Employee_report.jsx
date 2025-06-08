// frontend/src/pages/employee_report.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Divider,
    IconButton,
    Tooltip,
    Avatar,
    Container
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const API_BASE_URL = 'http://localhost:5001/api';

const EmployeeReport = () => {
    // State for employees data
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Filter states
    const [reportType, setReportType] = useState('all');
    const [provinceFilter, setProvinceFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');

    // Analytics data
    const [analytics, setAnalytics] = useState({
        totalEmployees: 0,
        maleEmployees: 0,
        femaleEmployees: 0,
        adminCount: 0,
        userCount: 0,
        provinceDistribution: [],
        avgAge: 0,
        completedProfiles: 0
    });

    /**
     * ດຶງຂໍ້ມູນພະນັກງານທັງໝົດ
     */
    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_BASE_URL}/employees`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEmployees(response.data);
            generateAnalytics(response.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError(
                err.response?.data?.message || err.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນພະນັກງານໄດ້'
            );
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * ສ້າງຂໍ້ມູນວິເຄາະ
     */
    const generateAnalytics = (employeeData) => {
        const totalEmployees = employeeData.length;
        const maleEmployees = employeeData.filter(emp => emp.gender === 'ຊາຍ').length;
        const femaleEmployees = employeeData.filter(emp => emp.gender === 'ຍິງ').length;
        const adminCount = employeeData.filter(emp => emp.role === 'Admin').length;
        const userCount = employeeData.filter(emp => emp.role === 'User').length;

        // ຄະນວນຂໍ້ມູນທີ່ສົມບູນ
        const completedProfiles = employeeData.filter(emp =>
            emp.name && emp.email && emp.tel && emp.province && emp.gender
        ).length;

        // ການແຈກແຍງຕາມແຂວງ
        const provinceCount = {};
        employeeData.forEach(employee => {
            const province = employee.province || 'ບໍ່ລະບຸ';
            provinceCount[province] = (provinceCount[province] || 0) + 1;
        });

        const provinceDistribution = Object.entries(provinceCount)
            .map(([name, count]) => ({
                name,
                count,
                percentage: ((count / totalEmployees) * 100).toFixed(1)
            }))
            .sort((a, b) => b.count - a.count);

        setAnalytics({
            totalEmployees,
            maleEmployees,
            femaleEmployees,
            adminCount,
            userCount,
            provinceDistribution,
            completedProfiles
        });
    };

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    // ກັ່ນຕອງຂໍ້ມູນ
    const getFilteredEmployees = () => {
        let filtered = employees;

        if (provinceFilter !== 'all') {
            filtered = filtered.filter(emp => emp.province === provinceFilter);
        }

        if (roleFilter !== 'all') {
            filtered = filtered.filter(emp => emp.role === roleFilter);
        }

        return filtered;
    };

    const filteredEmployees = getFilteredEmployees();

    // ສ້าງ HTML ສຳລັບການພິມ
    const generatePrintHTML = () => {
        const currentDate = new Date().toLocaleDateString('lo-LA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>ລາຍງານຂໍ້ມູນພະນັກງານ</title>
                <style>
                    @page {
                        size: A4;
                        margin: 15mm;
                    }
                    body {
                        font-family: 'Noto Sans Lao', Arial, sans-serif;
                        font-size: 12px;
                        line-height: 1.4;
                        margin: 0;
                        padding: 0;
                        color: #000;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 3px solid #079578;
                        padding-bottom: 20px;
                    }
                    .logo {
                        width: 70px;
                        height: 70px;
                        border: 3px solid #079578;
                        border-radius: 50%;
                        margin: 0 auto 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 18px;
                        background: linear-gradient(45deg, #079578, #0891b2);
                        color: white;
                    }
                    .company-name {
                        font-size: 22px;
                        font-weight: bold;
                        margin: 15px 0 8px 0;
                        color: #079578;
                    }
                    .company-info {
                        font-size: 12px;
                        margin: 3px 0;
                        color: #555;
                    }
                    .report-title {
                        font-size: 28px;
                        font-weight: bold;
                        margin: 25px 0;
                        color: #079578;
                        border: 2px solid #079578;
                        padding: 15px;
                        border-radius: 8px;
                        background: linear-gradient(45deg, #f0fffe, #e6fffd);
                    }
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 15px;
                        margin: 20px 0;
                    }
                    .stat-card {
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        padding: 15px;
                        text-align: center;
                        background: #f9f9f9;
                    }
                    .stat-number {
                        font-size: 24px;
                        font-weight: bold;
                        color: #079578;
                        margin-bottom: 5px;
                    }
                    .stat-label {
                        font-size: 11px;
                        color: #666;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 25px;
                        border: 2px solid #079578;
                    }
                    th, td {
                        border: 1px solid #079578;
                        padding: 10px 6px;
                        text-align: left;
                        font-size: 11px;
                    }
                    th {
                        background: linear-gradient(45deg, #079578, #0891b2);
                        color: white;
                        font-weight: bold;
                        text-align: center;
                    }
                    .text-center {
                        text-align: center;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-weight: bold;
                        font-size: 16px;
                        color: #079578;
                        border: 2px solid #079578;
                        padding: 15px;
                        border-radius: 8px;
                        background: #f0fffe;
                    }
                    .date-info {
                        margin-top: 25px;
                        text-align: right;
                        font-size: 12px;
                        color: #666;
                        border-top: 1px solid #ddd;
                        padding-top: 15px;
                    }
                    tr:nth-child(even) {
                        background-color: #f8fffe;
                    }
                    .signature-section {
                        margin-top: 40px;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 50px;
                    }
                    .signature-box {
                        text-align: center;
                        border-top: 1px solid #666;
                        padding-top: 10px;
                        margin-top: 60px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">BYD</div>
                    <div class="company-name">Build Your Dream</div>
                    <div class="company-info">ບໍລິສັດ ລາວ ບີວາຍດີ ສັດຕະຫີນອີລັກໂທນິກ ຈຳກັດດຽວ</div>
                    <div class="company-info">ທີ່ຢູ່: ນະຄອນຫຼວງວຽງຈັນ, ເມືອງ ໄຊເສດຖາ, ບ້ານໄຊໂທນີ</div>
                    <div class="company-info">ເບີໂທ: 020 76718331 | ອີເມວ: BYD@laosgmail.com</div>
                    <div class="report-title">ລາຍງານຂໍ້ມູນພະນັກງານ</div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${analytics.totalEmployees}</div>
                        <div class="stat-label">ພະນັກງານທັງໝົດ</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${analytics.maleEmployees}</div>
                        <div class="stat-label">ພະນັກງານຊາຍ</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${analytics.femaleEmployees}</div>
                        <div class="stat-label">ພະນັກງານຍິງ</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${analytics.adminCount}</div>
                        <div class="stat-label">ຜູ້ຄຸ້ມຄອງ</div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th style="width: 8%;">ລຳດັບ</th>
                            <th style="width: 12%;">ລະຫັດ</th>
                            <th style="width: 20%;">ຊື່ ແລະ ນາມສະກຸນ</th>
                            <th style="width: 18%;">ອີເມວ</th>
                            <th style="width: 12%;">ເບີໂທ</th>
                            <th style="width: 12%;">ແຂວງ</th>
                            <th style="width: 8%;">ເພດ</th>
                            <th style="width: 10%;">ບົດບາດ</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredEmployees.map((employee, index) => `
                            <tr>
                                <td class="text-center">${index + 1}</td>
                                <td>${employee.id || '-'}</td>
                                <td>${employee.name || '-'}</td>
                                <td>${employee.email || '-'}</td>
                                <td>${employee.tel || '-'}</td>
                                <td>${employee.province || 'ບໍ່ລະບຸ'}</td>
                                <td class="text-center">${employee.gender || '-'}</td>
                                <td class="text-center">${employee.role || 'User'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="footer">
                    ຈຳນວນພະນັກງານທັງໝົດ: ${filteredEmployees.length} ຄົນ
                    <br>
                    ຄວາມສົມບູນຂອງຂໍ້ມູນ: ${((analytics.completedProfiles / analytics.totalEmployees) * 100).toFixed(1)}%
                </div>

                <div class="signature-section">
                    <div>
                        <div class="signature-box">ຜູ້ຈັດທຳລາຍງານ</div>
                    </div>
                    <div>
                        <div class="signature-box">ຜູ້ອຳນວຍການ</div>
                    </div>
                </div>

                <div class="date-info">
                    ວັນທີພິມລາຍງານ: ${currentDate}
                </div>
            </body>
            </html>
        `;
    };

    // ຟຸງຊັນການພິມ
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const printContent = generatePrintHTML();

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // ຟຸງຊັນດາວໂຫຼດ Excel/CSV
    const handleDownloadExcel = () => {
        try {
            const csvData = generateCSVData();
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');

            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `ລາຍງານພະນັກງານ_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error downloading CSV:', error);
            alert('ບໍ່ສາມາດດາວໂຫຼດໄຟລ໌ได้');
        }
    };

    // ສ້າງຂໍ້ມູນ CSV
    const generateCSVData = () => {
        const headers = ['ລຳດັບ', 'ລະຫັດພະນັກງານ', 'ຊື່-ນາມສະກຸນ', 'ອີເມວ', 'ເບີໂທ', 'ແຂວງ', 'ເມືອງ', 'ບ້ານ', 'ເພດ', 'ບົດບາດ'];

        let csvContent = '\ufeff'; // BOM for UTF-8
        csvContent += headers.join(',') + '\n';

        filteredEmployees.forEach((employee, index) => {
            const row = [
                index + 1,
                employee.id || '-',
                employee.name || '-',
                employee.email || '-',
                employee.tel || '-',
                employee.province || 'ບໍ່ລະບຸ',
                employee.district || '-',
                employee.village || '-',
                employee.gender || '-',
                employee.role || 'User'
            ];
            csvContent += row.map(field => `"${field}"`).join(',') + '\n';
        });

        return csvContent;
    };

    // Pagination handlers
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10));
        setPage(0);
    };

    // ສ້າງລາຍການແຂວງສຳລັບ filter
    const getUniqueProvinces = () => {
        const provinces = [...new Set(employees.map(emp => emp.province).filter(Boolean))];
        return provinces.sort();
    };

    // คำนวณหน้า
    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredEmployees.length);

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress size={60} sx={{ color: '#079578' }} />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ fontSize: 16 }}>{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4, fontFamily: 'Noto Sans Lao, sans-serif' }}>
            {/* ສ່ວນຫົວ */}
            <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #079578 0%, #0891b2 100%)', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: '#079578', fontSize: 24, fontWeight: 'bold' }}>
                            BYD
                        </Avatar>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                                ລາຍງານຂໍ້ມູນພະນັກງານ
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Build Your Dream Company
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Tooltip title="ພິມລາຍງານ">
                            <Button
                                variant="contained"
                                startIcon={<PrintIcon />}
                                onClick={handlePrint}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.3)'
                                }}
                            >
                                ພິມລາຍງານ
                            </Button>
                        </Tooltip>
                        <Tooltip title="ດາວໂຫຼດ Excel">
                            <Button
                                variant="contained"
                                startIcon={<FileDownloadIcon />}
                                onClick={handleDownloadExcel}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.3)'
                                }}
                            >
                                ດາວໂຫຼດ Excel
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>

            {/* ສະຖິຕິລວມ */}
          

            {/* ຕົວກັ່ນຕອງ */}
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssessmentIcon /> ຕົວເລືອກການກັ່ນຕອງ
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>ປະເພດລາຍງານ</InputLabel>
                            <Select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                label="ປະເພດລາຍງານ"
                            >
                                <MenuItem value="all">ລາຍງານທົ່ວໄປ</MenuItem>
                                <MenuItem value="summary">ສະຫຼຸບລວມ</MenuItem>
                                <MenuItem value="detailed">ລາຍລະອຽດ</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>ແຂວງ</InputLabel>
                            <Select
                                value={provinceFilter}
                                onChange={(e) => setProvinceFilter(e.target.value)}
                                label="ແຂວງ"
                            >
                                <MenuItem value="all">ທັງໝົດ</MenuItem>
                                {getUniqueProvinces().map(province => (
                                    <MenuItem key={province} value={province}>
                                        {province}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>ບົດບາດ</InputLabel>
                            <Select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                label="ບົດບາດ"
                            >
                                <MenuItem value="all">ທັງໝົດ</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="User">User</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* ຕາຕະລາງຂໍ້ມູນ */}
            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                <Box sx={{
                    background: 'linear-gradient(135deg, #079578 0%, #0891b2 100%)',
                    color: 'white',
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BusinessIcon /> ລາຍການພະນັກງານ
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        ທັງໝົດ: {filteredEmployees.length} ຄົນ
                    </Typography>
                </Box>
                <Box sx={{ overflow: 'auto' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', borderRight: '1px solid #dee2e6' }}>
                                    ລຳດັບ
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #dee2e6' }}>
                                    ລະຫັດພະນັກງານ
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #dee2e6' }}>
                                    ຊື່ ແລະ ນາມສະກຸນ
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #dee2e6' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <EmailIcon fontSize="small" /> ອີເມວ
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #dee2e6' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneIcon fontSize="small" /> ເບີໂທ
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #dee2e6' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationOnIcon fontSize="small" /> ແຂວງ
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #dee2e6' }}>
                                    ເພດ
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    ບົດບາດ
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees
                                .slice(startIndex, endIndex)
                                .map((employee, index) => (
                                    <TableRow
                                        key={employee.id}
                                        sx={{
                                            '&:nth-of-type(even)': { bgcolor: '#f8f9fa' },
                                            '&:hover': {
                                                bgcolor: '#e9ecef',
                                                transform: 'scale(1.01)',
                                                transition: 'all 0.2s'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ textAlign: 'center', borderRight: '1px solid #dee2e6', fontWeight: 'bold' }}>
                                            {startIndex + index + 1}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #dee2e6', fontFamily: 'monospace' }}>
                                            {employee.id}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #dee2e6', fontWeight: 'bold' }}>
                                            {employee.name}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #dee2e6' }}>
                                            {employee.email ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <EmailIcon fontSize="small" color="primary" />
                                                    {employee.email}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">-</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #dee2e6' }}>
                                            {employee.tel ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PhoneIcon fontSize="small" color="success" />
                                                    {employee.tel}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">-</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #dee2e6' }}>
                                            {employee.province ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LocationOnIcon fontSize="small" color="warning" />
                                                    {employee.province}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">ບໍ່ລະບຸ</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #dee2e6', textAlign: 'center' }}>
                                            {employee.gender ? (
                                                <Box sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: 2,
                                                    bgcolor: employee.gender === 'ຊາຍ' ? '#e3f2fd' : '#fce4ec',
                                                    color: employee.gender === 'ຊາຍ' ? '#1976d2' : '#c2185b',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {employee.gender}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">-</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 2,
                                                bgcolor: employee.role === 'Admin' ? '#e8f5e8' : '#f3e5f5',
                                                color: employee.role === 'Admin' ? '#2e7d32' : '#7b1fa2',
                                                fontWeight: 'bold'
                                            }}>
                                                <WorkIcon fontSize="small" sx={{ mr: 0.5 }} />
                                                {employee.role || 'User'}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {filteredEmployees.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography variant="h6" color="text.secondary">
                                            ບໍ່ພົບຂໍ້ມູນພະນັກງານ
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>

                {/* Pagination */}
                {filteredEmployees.length > 0 && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        borderTop: '1px solid #dee2e6',
                        bgcolor: '#f8f9fa'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                ຈຳນວນແຖວຕໍ່ໜ້າ:
                            </Typography>
                            <FormControl size="small" sx={{ minWidth: 80 }}>
                                <Select
                                    value={rowsPerPage}
                                    onChange={handleChangeRowsPerPage}
                                    variant="outlined"
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {`${startIndex + 1}-${endIndex} ຈາກ ${filteredEmployees.length}`}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="ໜ້າທຳອິດ">
                                    <IconButton
                                        onClick={() => handleChangePage(0)}
                                        disabled={page === 0}
                                        size="small"
                                        sx={{
                                            bgcolor: page === 0 ? 'transparent' : '#079578',
                                            color: page === 0 ? 'text.disabled' : 'white',
                                            '&:hover': { bgcolor: page === 0 ? 'transparent' : '#046c56' }
                                        }}
                                    >
                                        <FirstPageIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="ໜ້າກ່ອນ">
                                    <IconButton
                                        onClick={() => handleChangePage(page - 1)}
                                        disabled={page === 0}
                                        size="small"
                                        sx={{
                                            bgcolor: page === 0 ? 'transparent' : '#079578',
                                            color: page === 0 ? 'text.disabled' : 'white',
                                            '&:hover': { bgcolor: page === 0 ? 'transparent' : '#046c56' }
                                        }}
                                    >
                                        <KeyboardArrowLeftIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 2,
                                    bgcolor: '#079578',
                                    color: 'white',
                                    borderRadius: 1,
                                    fontWeight: 'bold'
                                }}>
                                    {page + 1} / {totalPages}
                                </Box>

                                <Tooltip title="ໜ້າຕໍ່ໄປ">
                                    <IconButton
                                        onClick={() => handleChangePage(page + 1)}
                                        disabled={page >= totalPages - 1}
                                        size="small"
                                        sx={{
                                            bgcolor: page >= totalPages - 1 ? 'transparent' : '#079578',
                                            color: page >= totalPages - 1 ? 'text.disabled' : 'white',
                                            '&:hover': { bgcolor: page >= totalPages - 1 ? 'transparent' : '#046c56' }
                                        }}
                                    >
                                        <KeyboardArrowRightIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="ໜ້າສຸດທ້າຍ">
                                    <IconButton
                                        onClick={() => handleChangePage(totalPages - 1)}
                                        disabled={page >= totalPages - 1}
                                        size="small"
                                        sx={{
                                            bgcolor: page >= totalPages - 1 ? 'transparent' : '#079578',
                                            color: page >= totalPages - 1 ? 'text.disabled' : 'white',
                                            '&:hover': { bgcolor: page >= totalPages - 1 ? 'transparent' : '#046c56' }
                                        }}
                                    >
                                        <LastPageIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Paper>

        </Container>
    );
};

export default EmployeeReport;