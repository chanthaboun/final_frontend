// frontend/src/components/ProductCategories.jsx
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

// Sample data for product categories
const initialCategories = [
    { id: 1, name: 'ຜະລິດຕະພັນເຄື່ອງໃຊ້ໄຟຟ້າ', description: 'ເຄື່ອງໃຊ້ໄຟຟ້າພາຍໃນບ້ານ' },
    { id: 2, name: 'ສິນຄ້າອາຫານ', description: 'ອາຫານແຫ້ງ ແລະ ສິນຄ້າບໍລິໂພກ' },
    { id: 3, name: 'ເຄື່ອງນຸ່ງ', description: 'ເຄື່ອງນຸ່ງຫົ່ມແຟຊັ່ນ' },
];

const ProductCategories = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', description: '' });
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Handle dialog open for adding a new category
    const handleAddClick = () => {
        setEditMode(false);
        setCurrentCategory({ id: categories.length + 1, name: '', description: '' });
        setOpenDialog(true);
    };

    // Handle dialog open for editing a category
    const handleEditClick = (category) => {
        setEditMode(true);
        setCurrentCategory(category);
        setOpenDialog(true);
    };

    // Handle dialog close
    const handleClose = () => {
        setOpenDialog(false);
    };

    // Handle form submission
    const handleSubmit = () => {
        if (editMode) {
            // Update existing category
            setCategories(categories.map(cat =>
                cat.id === currentCategory.id ? currentCategory : cat
            ));
        } else {
            // Add new category
            setCategories([...categories, currentCategory]);
        }
        setOpenDialog(false);
    };

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory({
            ...currentCategory,
            [name]: value
        });
    };

    // Open delete confirmation dialog
    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setDeleteConfirmOpen(true);
    };

    // Confirm deletion
    const confirmDelete = () => {
        setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
        setDeleteConfirmOpen(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    ລາຍການປະເພດສິນຄ້າ
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleAddClick}
                    sx={{ backgroundColor: '#079578', '&:hover': { backgroundColor: '#067a64' } }}
                >
                    ເພີ່ມປະເພດສິນຄ້າໃໝ່
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>ລຳດັບ</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ຊື່ປະເພດສິນຄ້າ</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ລາຍລະອຽດ</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ຈັດການ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        sx={{ mr: 1 }}
                                        onClick={() => handleEditClick(category)}
                                    >
                                        ແກ້ໄຂ
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteClick(category)}
                                    >
                                        ລຶບ
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for adding/editing category */}
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>
                    {editMode ? 'ແກ້ໄຂປະເພດສິນຄ້າ' : 'ເພີ່ມປະເພດສິນຄ້າໃໝ່'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="ຊື່ປະເພດສິນຄ້າ"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentCategory.name}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="ລາຍລະອຽດ"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentCategory.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} color="inherit">ຍົກເລີກ</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ backgroundColor: '#079578', '&:hover': { backgroundColor: '#067a64' } }}
                    >
                        {editMode ? 'ບັນທຶກການແກ້ໄຂ' : 'ເພີ່ມ'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation dialog for deletion */}
            <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
            >
                <DialogTitle>ຢືນຢັນການລຶບ</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບປະເພດສິນຄ້າ "{categoryToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">ຍົກເລີກ</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        ລຶບ
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductCategories;

