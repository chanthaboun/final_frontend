// src/components/WithdrawalRequest.jsx
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const WithdrawalRequest = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        reason: '',
        department: '',
    });

    // ຂໍ້ມູນຈຳລອງສຳລັບການສະແດງຜົນ
    const withdrawalRequests = [
        { id: 1, date: '2023-04-01', product: 'ເຈ້ຍ A4', quantity: 5, status: 'ອະນຸມັດແລ້ວ', reason: 'ໃຊ້ໃນຫ້ອງການ', department: 'ບໍລິການ' },
        { id: 2, date: '2023-04-02', product: 'ປາກກາສີຟ້າ', quantity: 10, status: 'ລໍຖ້າ', reason: 'ໃຊ້ໃນການຝຶກອົບຮົມ', department: 'ຝຶກອົບຮົມ' },
        { id: 3, date: '2023-04-03', product: 'ສໍດຳ', quantity: 20, status: 'ປະຕິເສດ', reason: 'ໃຊ້ໃນການສອບເສັງ', department: 'ວິຊາການ' },
        { id: 4, date: '2023-04-05', product: 'ແຟ້ມເອກະສານ', quantity: 3, status: 'ອະນຸມັດແລ້ວ', reason: 'ເກັບເອກະສານສຳຄັນ', department: 'ບັນຊີ' },
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // ຕົວຢ່າງການສົ່ງຄຳຮ້ອງຂໍເບີກ - ໃນກໍລະນີຈິງຈະເຊື່ອມຕໍ່ກັບ API
        console.log('Submitting withdrawal request:', formData);
        setOpen(false);

        // Reset form data
        setFormData({
            productName: '',
            quantity: '',
            reason: '',
            department: '',
        });

        // Show success message (in real app, you'd use a proper notification system)
        alert('ຄຳຮ້ອງຂໍເບີກສິນຄ້າຂອງທ່ານໄດ້ຖືກສົ່ງແລ້ວ!');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ອະນຸມັດແລ້ວ':
                return 'success';
            case 'ລໍຖ້າ':
                return 'warning';
            case 'ປະຕິເສດ':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box sx={{ width: '100%', my: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    ລາຍການຂໍເບີກສິນຄ້າ
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpen}
                >
                    ສ້າງຄຳຮ້ອງຂໍເບີກໃໝ່
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>ວັນທີ</TableCell>
                            <TableCell>ຊື່ສິນຄ້າ</TableCell>
                            <TableCell>ຈຳນວນ</TableCell>
                            <TableCell>ພະແນກ</TableCell>
                            <TableCell>ເຫດຜົນ</TableCell>
                            <TableCell>ສະຖານະ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {withdrawalRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.date}</TableCell>
                                <TableCell>{request.product}</TableCell>
                                <TableCell>{request.quantity}</TableCell>
                                <TableCell>{request.department}</TableCell>
                                <TableCell>{request.reason}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={request.status}
                                        color={getStatusColor(request.status)}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for new withdrawal request */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>ສ້າງຄຳຮ້ອງຂໍເບີກສິນຄ້າໃໝ່</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        ກະລຸນາປ້ອນຂໍ້ມູນລາຍລະອຽດຂອງສິນຄ້າທີ່ທ່ານຕ້ອງການຂໍເບີກ
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="productName"
                                label="ຊື່ສິນຄ້າ"
                                fullWidth
                                value={formData.productName}
                                onChange={handleChange}
                                required
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="quantity"
                                label="ຈຳນວນ"
                                type="number"
                                fullWidth
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                margin="dense"
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>ພະແນກ</InputLabel>
                                <Select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    label="ພະແນກ"
                                    required
                                >
                                    <MenuItem value="ບໍລິການ">ບໍລິການ</MenuItem>
                                    <MenuItem value="ຝຶກອົບຮົມ">ຝຶກອົບຮົມ</MenuItem>
                                    <MenuItem value="ວິຊາການ">ວິຊາການ</MenuItem>
                                    <MenuItem value="ບັນຊີ">ບັນຊີ</MenuItem>
                                    <MenuItem value="ຂາຍ">ຂາຍ</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="reason"
                                label="ເຫດຜົນໃນການຂໍເບີກ"
                                fullWidth
                                value={formData.reason}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                required
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} color="inherit">
                        ຍົກເລີກ
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={!formData.productName || !formData.quantity || !formData.reason || !formData.department}
                    >
                        ສົ່ງຄຳຮ້ອງຂໍ
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WithdrawalRequest;