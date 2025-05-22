
// frontend/src/pages/management_exployee.jsx
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Grid,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { provinces } from '../data/provinces';

// Example: we only store address in "employee_address" now
// Removed provinces import if it existed
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const API_BASE_URL = 'http://localhost:5001/api';

const ManagementEmployee = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for employees and UI
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for users (เพิ่มเข้ามาใหม่สำหรับเลือกผู้ใช้)
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Dialog states
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Dialog สำหรับสร้างผู้ใช้ใหม่
  const [openUserDialog, setOpenUserDialog] = useState(false);
  // ເພີ່ມສະຖານະສຳລັບເມືອງ ອີງຕາມແຂວງທີ່ເລືອກ (ໃສ່ພາຍໃນຟັງຊັ່ນຕົ້ນຕໍ)
  const [availableDistricts, setAvailableDistricts] = useState([]);

  // Current employee form data
  const [currentEmployee, setCurrentEmployee] = useState({
    id: '',
    name: '',
    email: '',
    tel: '',
    province: '',
    district: '',
    village: '',
    gender: '',
    role: 'User',
    // status: 'active',
    user_id: null,
    createdDate: ''
  });

  // ข้อมูลผู้ใช้ใหม่
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  // Notification (Snackbar)
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  /**
   * 1) ດຶງຂໍ້ມູນຜູ້ໃຊ້ທັງໝົດ
   */
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
      }

      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      showNotification(err.response?.data?.message || err.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນຜູ້ໃຊ້ໄດ້', 'error');
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  /**
   * 2) ດຶງຂໍ້ມູນພະນັກງານທັງໝົດ
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
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.response?.data?.message || err.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນພະນັກງານໄດ້');
      showNotification(err.response?.data?.message || err.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນພະນັກງານໄດ້', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 3) ດຶງຂໍ້ມູນເມື່ອໂຫຼດໜ້າ
   */
  useEffect(() => {
    fetchEmployees();
    fetchUsers();
  }, [fetchEmployees, fetchUsers]);

  
  // Filter employees on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const lower = searchQuery.toLowerCase();
      const filtered = employees.filter(emp =>
        emp.id?.toLowerCase().includes(lower) ||
        emp.name?.toLowerCase().includes(lower) ||
        emp.email?.toLowerCase().includes(lower) ||
        emp.tel?.toLowerCase().includes(lower) ||
        emp.province?.toLowerCase().includes(lower) ||
        emp.district?.toLowerCase().includes(lower) ||
        emp.village?.toLowerCase().includes(lower)
      );
      setFilteredEmployees(filtered);
    }
    setPage(0);
  }, [searchQuery, employees]);

  // ອັບເດດລາຍຊື່ເມືອງທີ່ມີໃຫ້ເລືອກ ເມື່ອມີການປ່ຽນແປງແຂວງ
  useEffect(() => {
    if (!currentEmployee.province) {
      setAvailableDistricts([]);
      return;
    }

    const selectedProvince = provinces.find(p => p.name === currentEmployee.province);
    if (selectedProvince) {
      setAvailableDistricts(selectedProvince.districts);

      // ຖ້າມີການປ່ຽນແປງແຂວງ ແລະ ເມືອງປັດຈຸບັນບໍ່ຢູ່ໃນລາຍຊື່ເມືອງຂອງແຂວງໃໝ່
      if (currentEmployee.district && !selectedProvince.districts.includes(currentEmployee.district)) {
        setCurrentEmployee(prev => ({
          ...prev,
          district: ''
        }));
      }
    }
  }, [currentEmployee.province, currentEmployee.district]);

  // Snackbar helpers
  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Open/Close Dialog
  const handleOpen = (isEdit, employee = null) => {
    setEditMode(isEdit);
    if (employee) {
      setCurrentEmployee({
        id: employee.id,
        name: employee.name,
        email: employee.email || '',
        tel: employee.tel || '',
        province: employee.province || '',
        district: employee.district || '',
        village: employee.village || '',
        gender: employee.gender || '',
        role: employee.role || 'User',
        // status: employee.status || 'active',
        user_id: employee.user_id || null,
        createdDate: employee.createdDate
      });
    } else {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setCurrentEmployee({
        id: '',
        name: '',
        email: '',
        tel: '',
        province: '',
        district: '',
        village: '',
        gender: '',
        role: 'User',
        // status: 'active',
        user_id: null,
        createdDate: formattedDate
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ເປີດ/ປິດ dialog ສຳລັບສ້າງຜູ້ໃຊ້ໃໝ່
  const handleOpenUserDialog = () => {
    setNewUser({
      username: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    });
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };

  // Handle form field changes
  const handleChange = e => {
    const { name, value } = e.target;
    setCurrentEmployee(prev => ({ ...prev, [name]: value }));
  };

  // Handle user form field changes
  const handleUserChange = e => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Save or Update user
  const handleSaveUser = async () => {
    // ກວດສອບລະຫັດຜ່ານ
    if (newUser.password !== newUser.confirmPassword) {
      showNotification('ລະຫັດຜ່ານບໍ່ກົງກັນ', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
      }

      const response = await axios.post(
        `${API_BASE_URL}/register`,
        {
          username: newUser.username,
          password: newUser.password,
          role: newUser.role,
          employeeName: currentEmployee.name,
          employeeEmail: currentEmployee.email,
          employeeTel: currentEmployee.tel,
          gender: currentEmployee.gender
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleCloseUserDialog();
      fetchUsers();

      // ອັບເດດຂໍ້ມູນພະນັກງານດ້ວຍ user_id ໃໝ່
      if (response.data.employeeId) {
        showNotification('ສ້າງຜູ້ໃຊ້ແລະພະນັກງານສຳເລັດແລ້ວ', 'success');
        fetchEmployees();
        handleClose();
      } else if (response.data.userId) {
        setCurrentEmployee(prev => ({
          ...prev,
          user_id: response.data.userId
        }));
        showNotification('ສ້າງຜູ້ໃຊ້ສຳເລັດແລ້ວ', 'success');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      showNotification(err.response?.data?.message || err.message || 'ບໍ່ສາມາດສ້າງຜູ້ໃຊ້ໄດ້', 'error');
    }
  };

  // Save or Update employee
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
      }
      const headers = { Authorization: `Bearer ${token}` };

      if (editMode) {
        // Update existing employee
        const response = await axios.put(
          `${API_BASE_URL}/employees/${currentEmployee.id}`,
          {
            name: currentEmployee.name,
            email: currentEmployee.email,
            tel: currentEmployee.tel,
            province: currentEmployee.province,
            district: currentEmployee.district,
            village: currentEmployee.village,
            gender: currentEmployee.gender,
            role: currentEmployee.role
          },
          { headers }
        );
        setEmployees(prev =>
          prev.map(emp =>
            emp.id === currentEmployee.id
              ? response.data.employee || currentEmployee
              : emp
          )
        );
        showNotification('ອັບເດດຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ', 'success');
      } else {
        // Create new employee
        // ຖ້າບໍ່ມີ user_id, ໃຫ້ສະເໜີສ້າງຜູ້ໃຊ້ໃໝ່
        if (!currentEmployee.user_id) {
          handleOpenUserDialog();
          return;
        }

        const response = await axios.post(
          `${API_BASE_URL}/employees`,
          {
            name: currentEmployee.name,
            email: currentEmployee.email,
            tel: currentEmployee.tel,
            province: currentEmployee.province,
            district: currentEmployee.district,
            village: currentEmployee.village,
            gender: currentEmployee.gender,
            role: currentEmployee.role,
            user_id: currentEmployee.user_id
          },
          { headers }
        );
        if (response.data.employee) {
          setEmployees(prev => [...prev, response.data.employee]);
        } else {
          // If no employee object returned, refetch all
          fetchEmployees();
        }
        showNotification('ສ້າງຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ', 'success');
      }

      handleClose();
    } catch (err) {
      console.error('Error saving employee:', err);
      showNotification(err.response?.data?.message || err.message || 'ບໍ່ສາມາດບັນທຶກຂໍ້ມູນພະນັກງານໄດ້', 'error');
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (window.confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບພະນັກງານນີ້?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
        }

        // ຖາມວ່າຈະລຶບຜູ້ໃຊ້ນຳຫຼືບໍ່
        const deleteUser = window.confirm('ທ່ານຕ້ອງການລຶບບັນຊີຜູ້ໃຊ້ທີ່ເຊື່ອມໂຍງກັບພະນັກງານນີ້ນຳບໍ່?');

        await axios.delete(`${API_BASE_URL}/employees/${id}${deleteUser ? '?deleteUser=true' : ''}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setEmployees(prev => prev.filter(emp => emp.id !== id));
        showNotification('ລຶບຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ', 'success');

        // ຖ້າລຶບຜູ້ໃຊ້ນຳ, ໃຫ້ດຶງຂໍ້ມູນຜູ້ໃຊ້ໃໝ່
        if (deleteUser) {
          fetchUsers();
        }
      } catch (err) {
        console.error('Error deleting employee:', err);
        showNotification(err.response?.data?.message || err.message || 'ບໍ່ສາມາດລຶບພະນັກງານໄດ້', 'error');
      }
    }
  };

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  // Clear and perform search
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return fetchEmployees();
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
      }
      const response = await axios.get(`${API_BASE_URL}/employees/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data);
    } catch (err) {
      console.error('Error searching employees:', err);
      setError(err.response?.data?.message || err.message || 'ບໍ່ສາມາດຄົ້ນຫາພະນັກງານໄດ້');
      showNotification(err.response?.data?.message || err.message || 'ບໍ່ສາມາດຄົ້ນຫາພະນັກງານໄດ້', 'error');
    } finally {
      setLoading(false);
    }
  };

  // StatusChip helper
  const StatusChip = ({ status }) => {
    let backgroundColor = '#E53935'; // default color for "inactive"
    if (status === 'active') backgroundColor = '#43A047';
    else if (status === 'pending') backgroundColor = '#FB8C00';
    const textColor = 'white';

    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          bgcolor: backgroundColor,
          color: textColor,
          borderRadius: '16px',
          px: 1.5,
          py: 0.5,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          height: '24px',
          minWidth: '85px',
          fontFamily: 'Noto Sans Lao sans-serif'
        }}
      >
        <StatusIcon status={status} />
        {status || 'active'}
      </Box>
    );
  };

  const StatusIcon = ({ status }) => {
    const icons = {
      active: '✓',
      inactive: '✗',
      pending: '⚠'
    };
    return icons[status] ? (
      <span style={{ fontSize: '14px', marginRight: '4px', color: 'white' }}>
        {icons[status]}
      </span>
    ) : null;
  };

  // Table columns - ປັບປຸງໃຫ້ສອດຄ່ອງກັບໂຄງສ້າງໃໝ່
  const tableHeaders = [
    {
      id: 'id',
      label: 'ລະຫັດພະນັກງານ',
      width: 120,
      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    },
    {
      id: 'name',
      label: 'ຊື່-ນາມສະກຸນ',
      width: 150,
      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    },
    // { 
    //   id: 'email', 
    //   label: 'ອີເມວ', 
    //   width: 180,
    //   style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    // },
    {
      id: 'tel',
      label: 'ເບີໂທ',
      width: 120,
      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    },
    // { 
    //   id: 'province', 
    //   label: 'ແຂວງ', 
    //   width: 120,
    //   style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    // },
    // { 
    //   id: 'district', 
    //   label: 'ເມືອງ', 
    //   width: 120,
    //   style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    // },
    // { 
    //   id: 'village', 
    //   label: 'ບ້ານ', 
    //   width: 120,
    //   style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    // },
    {
      id: 'role',
      label: 'ບົດບາດ',
      width: 100,
      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    },
    // { 
    //   id: 'status', 
    //   label: 'ສະຖານະ', 
    //   width: 110,
    //   style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    // },
    {
      id: 'actions',
      label: 'ຈັດການ',
      width: 120,
      align: 'center',
      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
    }
  ];

  return (
    <Box sx={{ fontFamily: 'Noto Sans Lao , sans-serif' }}>
      <Paper sx={{ padding: 3, mb: 3 }}>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            color: 'white',
            bgcolor: '#079578',
            p: 2,
            borderRadius: '4px 4px 0 0',
            mb: 2,
            fontWeight: 'bold',
            fontFamily: 'Noto Sans Lao , sans-serif',

          }}
        >
          ລາຍການພະນັກງານ
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen(false)}
              sx={{
                bgcolor: '#079578',
                '&:hover': { bgcolor: '#046c56' },
                borderRadius: '30px',
                color: 'white',
                pl: 2,
                fontFamily: 'Noto Sans Lao , sans-serif',
              }}
            >
              ເພີ່ມພະນັກງານ
            </Button>
          </Grid>
    
          <Grid item xs={9} sm={8} md={6} lg={5}>
            <TextField
              fullWidth
              placeholder="ຄົ້ນຫາ..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  fontFamily: 'Noto Sans Lao, sans-serif',
                  marginLeft: '500px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '1.2rem' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {searchQuery && (
                      <IconButton size="small" onClick={handleClearSearch} sx={{ padding: '4px' }}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSearch}
                      sx={{
                        ml: 1,
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        padding: '4px 12px',
                        minWidth: '60px',
                        fontFamily: 'Noto Sans Lao, sans-serif',
                      }}
                    >
                      ຄົ້ນຫາ
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && !loading && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {/* Table */}
        {!loading && !error && (
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Box sx={{ overflowX: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    {tableHeaders.map(header => (
                      <TableCell
                        key={header.id}
                        align={header.align || 'left'}
                        style={{
                          width: header.width,
                          minWidth: header.width,
                          backgroundColor: '#f5f5f5',
                          borderBottom: '2px solid #ddd',
                          padding: '8px',
                          whiteSpace: 'normal',
                          fontWeight: 'bold'
                        }}
                      >
                        {header.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              </Table>
            </Box>

            <Box
              sx={{
                height: rowsPerPage > 3 ? '400px' : 'auto',
                maxHeight: '400px',
                overflowX: 'auto',
                overflowY: 'auto'
              }}
            >
              <Table>
                <TableBody>
                  {filteredEmployees
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((employee, index) => (
                      <TableRow
                        key={employee.id}
                        hover
                        sx={{
                          bgcolor: index % 2 === 0 ? 'white' : '#f9f9f9',
                          '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                      >
                        <TableCell style={{ width: tableHeaders[0].width }} >
                          {employee.id}
                        </TableCell>
                        <TableCell style={{ width: tableHeaders[1].width }}>
                          {employee.name}
                        </TableCell>
                        {/* <TableCell style={{ width: tableHeaders[2].width }}>
                          {employee.email || '-'}
                        </TableCell> */}
                        <TableCell style={{ width: tableHeaders[2].width }}>
                          {employee.tel || '-'}
                        </TableCell>
                        {/* <TableCell style={{ width: tableHeaders[4].width }}>
                          {employee.province || '-'}
                        </TableCell> */}
                        {/* <TableCell style={{ width: tableHeaders[5].width }}>
                          {employee.district || '-'}
                        </TableCell> */}
                        {/* <TableCell style={{ width: tableHeaders[6].width }}>
                          {employee.village || '-'}
                        </TableCell> */}
                        <TableCell style={{ width: tableHeaders[3].width }}>
                          {employee.role || 'User'}
                        </TableCell>
                        {/* <TableCell style={{ width: tableHeaders[4].width }}>
                          <StatusChip status={employee.status || 'active'} />
                        </TableCell> */}
                        <TableCell
                          align="center"
                          style={{ width: tableHeaders[4].width }}
                        >
                          <Box
                            sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleOpen(true, employee)}
                              sx={{
                                bgcolor: '#e3f2fd',
                                '&:hover': { bgcolor: '#bbdefb' },
                                borderRadius: '4px',
                                p: 1
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(employee.id)}
                              sx={{
                                bgcolor: '#ffebee',
                                '&:hover': { bgcolor: '#ffcdd2' },
                                borderRadius: '4px',
                                p: 1
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredEmployees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={tableHeaders.length} align="center" sx={{ fontFamily: 'Noto Sans Lao, sans-serif', }}>
                        ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}

        {/* Pagination */}
        {!loading && !error && filteredEmployees.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
              px: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Rows per page:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 70 }}>
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  variant="outlined"
                  sx={{ height: 30 }}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {`${page * rowsPerPage + 1}-${Math.min(
                  (page + 1) * rowsPerPage,
                  filteredEmployees.length
                )} of ${filteredEmployees.length}`}
              </Typography>
              <IconButton
                onClick={() => handleChangePage(null, 0)}
                disabled={page === 0}
                size="small"
              >
                <KeyboardDoubleArrowLeftIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => handleChangePage(null, page - 1)}
                disabled={page === 0}
                size="small"
              >
                <KeyboardArrowLeftIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => handleChangePage(null, page + 1)}
                disabled={
                  page >= Math.ceil(filteredEmployees.length / rowsPerPage) - 1
                }
                size="small"
              >
                <KeyboardArrowRightIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() =>
                  handleChangePage(
                    null,
                    Math.max(
                      0,
                      Math.ceil(filteredEmployees.length / rowsPerPage) - 1
                    )
                  )
                }
                disabled={
                  page >= Math.ceil(filteredEmployees.length / rowsPerPage) - 1
                }
                size="small"
              >
                <KeyboardDoubleArrowRightIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Dialog for create/edit employee */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#079578', color: 'white',fontFamily: 'Noto Sans Lao, sans-serif', }}>
            {editMode ? 'ແກ້ໄຂຂໍ້ມູນພະນັກງານ' : 'ເພີ່ມຂໍ້ມູນພະນັກງານ'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, }}>
              {editMode && (
                <TextField
                  name="id"
                  label="ລະຫັດພະນັກງານ"
                  fullWidth
                  value={currentEmployee.id}
                  disabled={true}
                  InputProps={{
                    style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                  }}
                  InputLabelProps={{
                    style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                  }}
                />
              )}
              <TextField
                name="name"
                label="ຊື່-ນາມສະກຸນ"
                fullWidth
                value={currentEmployee.name}
                onChange={handleChange}
                required
                InputProps={{
                  style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                }}
              />
              <TextField
                name="email"
                label="ອີເມວ"
                fullWidth
                value={currentEmployee.email}
                onChange={handleChange}
                InputProps={{
                  style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                }}
              />
              <TextField
                name="tel"
                label="ເບີໂທລະສັບ"
                fullWidth
                value={currentEmployee.tel}
                onChange={handleChange}
                InputProps={{
                  style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                }}
                InputLabelProps={{
                  style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <Typography variant="caption" sx={{ mb: 1, fontFamily: 'Noto Sans Lao, sans-serif' }}>
                      ແຂວງ
                    </Typography>
                    <Select
                      name="province"
                      value={currentEmployee.province || ''}
                      onChange={handleChange}
                      sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}
                      MenuProps={{
                        PaperProps: {
                          style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                        }
                      }}
                    >
                      <MenuItem value="" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>
                        <em>ເລືອກແຂວງ</em>
                      </MenuItem>
                      {provinces.map((province) => (
                        <MenuItem
                          key={province.name}
                          value={province.name}
                          sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}
                        >
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth disabled={!currentEmployee.province}>
                    <Typography variant="caption" sx={{ mb: 1, fontFamily: 'Noto Sans Lao, sans-serif' }}>
                      ເມືອງ
                    </Typography>
                    <Select
                      name="district"
                      value={currentEmployee.district || ''}
                      onChange={handleChange}
                      sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}
                      MenuProps={{
                        PaperProps: {
                          style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                        }
                      }}
                    >
                      <MenuItem value="" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>
                        <em>ເລືອກເມືອງ</em>
                      </MenuItem>
                      {availableDistricts.map((district) => (
                        <MenuItem
                          key={district}
                          value={district}
                          sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}
                        >
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                    {!currentEmployee.province && (
                      <FormHelperText sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>ກະລຸນາເລືອກແຂວງກ່ອນ</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" sx={{ mb: 1, fontFamily: 'Noto Sans Lao, sans-serif' }}>
                    ບ້ານ
                  </Typography>
                  <TextField
                    name="village"
                    sx={{marginTop:'5px'}}
                    fullWidth
                    value={currentEmployee.village || ''}
                    onChange={handleChange}
                    InputProps={{
                      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                    }}
                    InputLabelProps={{
                      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                    }}
                  />
                </Grid>
              </Grid>
              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 1, fontFamily: 'Noto Sans Lao, sans-serif' }}>
                  ເພດ
                </Typography>
                <Select
                  name="gender"
                  value={currentEmployee.gender || ''}
                  onChange={handleChange}
                  sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}
                  MenuProps={{
                    PaperProps: {
                      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                    }
                  }}
                >
                  <MenuItem value="ຊາຍ" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>ຊາຍ</MenuItem>
                  <MenuItem value="ຍິງ" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>ຍິງ</MenuItem>
                </Select>
              </FormControl>

              {!editMode && (
                <FormControl fullWidth>
                  <Typography variant="caption" sx={{ mb: 1, fontFamily: 'Noto Sans Lao, sans-serif' }}>
                    ເລືອກຜູ້ໃຊ້ທີ່ເຊື່ອມໂຍງ (ຫຼື "ສ້າງຜູ້ໃຊ້ໃໝ່")
                  </Typography>
                  <Select
                    name="user_id"
                    value={currentEmployee.user_id || ''}
                    onChange={handleChange}
                    sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}
                    MenuProps={{
                      PaperProps: {
                        style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                      }
                    }}
                  >
                    <MenuItem value="" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>
                      <em>ສ້າງຜູ້ໃຊ້ໃໝ່</em>
                    </MenuItem>
                    {users.map(user => (
                      <MenuItem key={user.id} value={user.id} sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>
                        {user.username} ({user.role})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 1, fontFamily: 'Noto Sans Lao, sans-serif' }}>
                  ບົດບາດ
                </Typography>
                <Select
                  name="role"
                  value={currentEmployee.role || 'User'}
                  onChange={handleChange}
                  sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}
                  MenuProps={{
                    PaperProps: {
                      style: { fontFamily: 'Noto Sans Lao, sans-serif' }
                    }
                  }}
                >
                  <MenuItem value="User" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>User</MenuItem>
                  <MenuItem value="Admin" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>Admin</MenuItem>
                  {/* <MenuItem value="Manager">Manager</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" sx={{ fontFamily: 'Noto Sans Lao, sans-serif' }}>
              ຍົກເລີກ
            </Button>
            <Button
              onClick={handleSave}
              color="primary"
              variant="contained"
              sx={{ fontFamily: 'Noto Sans Lao, sans-serif',bgcolor: '#079578', '&:hover': { bgcolor: '#046c56' } }}
            >
              ບັນທຶກ
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for creating new user */}
        <Dialog open={openUserDialog} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white',fontFamily: 'Noto Sans Lao, sans-serif' }}>
            ສ້າງຜູ້ໃຊ້ໃໝ່
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                name="username"
                label="ຊື່ຜູ້ໃຊ້"
                fullWidth
                value={newUser.username}
                onChange={handleUserChange}
                required
              />
              <TextField
                name="password"
                label="ລະຫັດຜ່ານ"
                type="password"
                fullWidth
                value={newUser.password}
                onChange={handleUserChange}
                required
              />
              <TextField
                name="confirmPassword"
                label="ຢືນຢັນລະຫັດຜ່ານ"
                type="password"
                fullWidth
                value={newUser.confirmPassword}
                onChange={handleUserChange}
                required
                error={newUser.password !== newUser.confirmPassword && newUser.confirmPassword !== ''}
                helperText={newUser.password !== newUser.confirmPassword && newUser.confirmPassword !== '' ? 'ລະຫັດຜ່ານບໍ່ກົງກັນ' : ''}
              />
              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 1, fontFamily: 'Noto Sans Lao, sans-serif' }}>
                  ບົດບາດ
                </Typography>
                <Select
                  name="role"
                  value={newUser.role}
                  onChange={handleUserChange}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                * ຈະສ້າງຜູ້ໃຊ້ພ້ອມເຊື່ອມໂຍງກັບພະນັກງານນີ້ທັນທີ
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUserDialog} variant="outlined">
              ຍົກເລີກ
            </Button>
            <Button
              onClick={handleSaveUser}
              color="primary"
              variant="contained"
              disabled={!newUser.username || !newUser.password || newUser.password !== newUser.confirmPassword}
              fontFamily="Noto Sans Lao, sans-serif"
            >
              ສ້າງຜູ້ໃຊ້
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={closeNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={closeNotification} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ManagementEmployee;
