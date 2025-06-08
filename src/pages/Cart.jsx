// // // src/components/Cart.jsx
// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
//     Paper,
//     Button,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     Snackbar,
//     Alert,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Avatar,
//     Divider,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PriceChangeIcon from "@mui/icons-material/PriceChange";
// import BusinessIcon from "@mui/icons-material/Business";
// import CalculateIcon from "@mui/icons-material/Calculate";
// import { useNavigate } from "react-router-dom";

// // Import Cart Context
// import { useCart } from "../context/CartContext";

// const Cart = () => {
//     // Use Cart Context
//     const {
//         cartItems,
//         updateCartItemQuantity,
//         removeFromCart,
//         clearCart,
//         getTotalItems
//     } = useCart();

//     const navigate = useNavigate();

//     const [notification, setNotification] = useState({
//         open: false,
//         message: "",
//         severity: "success",
//     });

//     const [confirmDialog, setConfirmDialog] = useState({
//         open: false,
//         title: "",
//         message: "",
//         onConfirm: null,
//     });

//     // 🆕 ຟັງຊັນຈັດຮູບແບບເງິນລາວ
//     const formatLaoKip = (amount) => {
//         if (!amount || amount === 0) return '0 ກີບ';
//         const formatted = Number(amount).toLocaleString('en-US');
//         return `${formatted} ກີບ`;
//     };

//     // 🆕 ຟັງຊັນຄິດໄລ່ລາຄາລວມຂອງແຕ່ລະລາຍການ
//     const calculateItemTotal = (price, quantity) => {
//         return (price || 0) * quantity;
//     };

//     // 🆕 ຟັງຊັນຄິດໄລ່ລາຄາລວມທັງໝົດ
//     const calculateGrandTotal = () => {
//         return cartItems.reduce((total, item) => {
//             return total + calculateItemTotal(item.price || 0, item.quantity);
//         }, 0);
//     };

//     // Update quantity
//     const updateQuantity = (id, newQuantity) => {
//         updateCartItemQuantity(id, newQuantity);
//         showNotification("ອັບເດດຈຳນວນແລ້ວ", "success");
//     };

//     // Remove item from cart
//     const removeItem = (id) => {
//         const item = cartItems.find((item) => item.id === id);
//         setConfirmDialog({
//             open: true,
//             title: "ລຶບສິນຄ້າ",
//             message: `ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບ "${item?.name}" ອອກຈາກກະຕ່າ?`,
//             onConfirm: () => {
//                 removeFromCart(id);
//                 showNotification("ລຶບສິນຄ້າອອກຈາກກະຕ່າແລ້ວ", "success");
//                 setConfirmDialog({ ...confirmDialog, open: false });
//             },
//         });
//     };

//     // Clear all cart
//     const clearAllCart = () => {
//         setConfirmDialog({
//             open: true,
//             title: "ລ້າງກະຕ່າ",
//             message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລ້າງສິນຄ້າທັງໝົດອອກຈາກກະຕ່າ?",
//             onConfirm: () => {
//                 clearCart();
//                 showNotification("ລ້າງກະຕ່າແລ້ວ", "success");
//                 setConfirmDialog({ ...confirmDialog, open: false });
//             },
//         });
//     };

//     // Place order
//     const placeOrder = () => {
//         const grandTotal = calculateGrandTotal();
//         setConfirmDialog({
//             open: true,
//             title: "ຢືນຢັນການສັ່ງຊື້",
//             message: `ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການສັ່ງຊື້ສິນຄ້າທັງໝົດ ${cartItems.length} ລາຍການ\nລາຄາລວມ: ${formatLaoKip(grandTotal)}`,
//             onConfirm: () => {
//                 // Here you would typically send the order to your backend
//                 showNotification("ສັ່ງຊື້ສຳເລັດແລ້ວ!", "success");
//                 clearCart();
//                 setConfirmDialog({ ...confirmDialog, open: false });
//                 // Navigate to order confirmation or back to products
//                 setTimeout(() => {
//                     navigate("/productdata");
//                 }, 2000);
//             },
//         });
//     };

//     // Notification helpers
//     const showNotification = (message, severity = "success") => {
//         setNotification({ open: true, message, severity });
//     };

//     const closeNotification = () => {
//         setNotification((prev) => ({ ...prev, open: false }));
//     };

//     const closeConfirmDialog = () => {
//         setConfirmDialog({ ...confirmDialog, open: false });
//     };

//     return (
//         <Box
//             sx={{
//                 fontFamily: "Noto Sans Lao, sans-serif",
//                 backgroundColor: "#f5f5f5",
//                 minHeight: "100vh",
//                 p: 3
//             }}
//         >
//             {/* Header ສີຂຽວ */}
//             <Paper
//                 sx={{
//                     bgcolor: "#079578",
//                     color: "white",
//                     p: 2,
//                     borderRadius: "8px",
//                     mb: 3
//                 }}
//                 elevation={0}
//             >
//                 <Typography
//                     variant="h6"
//                     sx={{
//                         fontWeight: "bold",
//                         fontFamily: "Noto Sans Lao, sans-serif",
//                     }}
//                 >
//                     ລາຍການສັ່ງຊື້ສິນຄ້າ
//                 </Typography>
//             </Paper>

//             {/* Empty cart message */}
//             {cartItems.length === 0 && (
//                 <Paper sx={{ p: 5, textAlign: "center" }}>
//                     <Typography
//                         variant="h6"
//                         color="text.secondary"
//                         sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 3 }}
//                     >
//                         ກະຕ່າຂອງທ່ານວ່າງເປົ່າ
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         onClick={() => navigate("/productdata")}
//                         sx={{
//                             bgcolor: "#079578",
//                             "&:hover": { bgcolor: "#046c56" },
//                             fontFamily: "Noto Sans Lao, sans-serif",
//                         }}
//                     >
//                         ໄປເລືອກສິນຄ້າ
//                     </Button>
//                 </Paper>
//             )}

//             {/* Cart items table */}
//             {cartItems.length > 0 && (
//                 <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{ bgcolor: "#079578" }}>
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem"
//                                         }}
//                                     >
//                                         ສິນຄ້າ
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem"
//                                         }}
//                                     >
//                                         ປະເພດສິນຄ້າ
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem"
//                                         }}
//                                     >
//                                         ຍີ່ຫໍ້
//                                     </TableCell>
//                                     {/* 🆕 ເພີ່ມຫົວຕາຕະລາງລາຄາ */}
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem",
//                                             textAlign: "center"
//                                         }}
//                                     >
//                                         ລາຄາ/ຫົວໜ່ວຍ
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem",
//                                             textAlign: "center"
//                                         }}
//                                     >
//                                         ຈຳນວນ
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem"
//                                         }}
//                                     >
//                                         ຫົວໜ່ວຍ
//                                     </TableCell>
//                                     {/* 🆕 ເພີ່ມຫົວຕາຕະລາງຜູ້ສະໜອງ */}
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem"
//                                         }}
//                                     >
//                                         ຜູ້ສະໜອງ
//                                     </TableCell>
//                                     {/* 🆕 ເພີ່ມຫົວຕາຕະລາງລາຄາລວມ */}
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem",
//                                             textAlign: "center"
//                                         }}
//                                     >
//                                         ລາຄາລວມ
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             fontSize: "1.1rem",
//                                             textAlign: "center"
//                                         }}
//                                     >
//                                         ຈັດການ
//                                     </TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {cartItems.map((item, index) => (
//                                     <TableRow
//                                         key={item.id}
//                                         hover
//                                         sx={{
//                                             "&:nth-of-type(odd)": {
//                                                 backgroundColor: "#f9f9f9",
//                                             },
//                                             "&:hover": {
//                                                 backgroundColor: "#f0f0f0",
//                                             },
//                                         }}
//                                     >
//                                         {/* ສິນຄ້າ (ຮູບ + ຊື່) */}
//                                         <TableCell>
//                                             <Box sx={{ display: "flex", alignItems: "center" }}>
//                                                 <Avatar
//                                                     src={item.image}
//                                                     sx={{
//                                                         width: 50,
//                                                         height: 50,
//                                                         mr: 2,
//                                                         borderRadius: "8px"
//                                                     }}
//                                                     variant="rounded"
//                                                 />
//                                                 <Typography
//                                                     sx={{
//                                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                                         fontWeight: "500"
//                                                     }}
//                                                 >
//                                                     {item.name}
//                                                 </Typography>
//                                             </Box>
//                                         </TableCell>

//                                         {/* ປະເພດສິນຄ້າ */}
//                                         <TableCell
//                                             sx={{
//                                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                                 fontSize: "1rem"
//                                             }}
//                                         >
//                                             {item.category}
//                                         </TableCell>

//                                         {/* ຍີ່ຫໍ້ */}
//                                         <TableCell
//                                             sx={{
//                                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                                 fontSize: "1rem"
//                                             }}
//                                         >
//                                             {item.brand}
//                                         </TableCell>

//                                         {/* 🆕 ລາຄາ/ຫົວໜ່ວຍ */}
//                                         <TableCell sx={{ textAlign: "center" }}>
//                                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
//                                                 <PriceChangeIcon fontSize="small" color="primary" />
//                                                 <Typography
//                                                     sx={{
//                                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                                         fontSize: "1rem",
//                                                         fontWeight: "bold",
//                                                         color: "#079578"
//                                                     }}
//                                                 >
//                                                     {formatLaoKip(item.price || 0)}
//                                                 </Typography>
//                                             </Box>
//                                         </TableCell>

//                                         {/* ຈຳນວນ */}
//                                         <TableCell sx={{ textAlign: "center" }}>
//                                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                                 <IconButton
//                                                     size="small"
//                                                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                                     sx={{
//                                                         bgcolor: "#f5f5f5",
//                                                         "&:hover": { bgcolor: "#e0e0e0" },
//                                                         mr: 1
//                                                     }}
//                                                 >
//                                                     <RemoveIcon />
//                                                 </IconButton>

//                                                 <Typography
//                                                     sx={{
//                                                         mx: 2,
//                                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                                         fontSize: "1.2rem",
//                                                         fontWeight: "bold",
//                                                         minWidth: "30px",
//                                                         textAlign: "center",
//                                                     }}
//                                                 >
//                                                     {item.quantity}
//                                                 </Typography>

//                                                 <IconButton
//                                                     size="small"
//                                                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                                     sx={{
//                                                         bgcolor: "#079578",
//                                                         color: "white",
//                                                         "&:hover": { bgcolor: "#046c56" },
//                                                         ml: 1
//                                                     }}
//                                                 >
//                                                     <AddIcon />
//                                                 </IconButton>
//                                             </Box>
//                                         </TableCell>

//                                         {/* ຫົວໜ່ວຍ */}
//                                         <TableCell
//                                             sx={{
//                                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                                 fontSize: "1rem"
//                                             }}
//                                         >
//                                             {item.unit}
//                                         </TableCell>

//                                         {/* 🆕 ຜູ້ສະໜອງ */}
//                                         <TableCell>
//                                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                                 <BusinessIcon fontSize="small" color="action" />
//                                                 <Typography
//                                                     sx={{
//                                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                                         fontSize: "0.9rem"
//                                                     }}
//                                                 >
//                                                     {item.supplier || "ບໍ່ລະບຸຜູ້ສະໜອງ"}
//                                                 </Typography>
//                                             </Box>
//                                         </TableCell>

//                                         {/* 🆕 ລາຄາລວມ */}
//                                         <TableCell sx={{ textAlign: "center" }}>
//                                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
//                                                 <CalculateIcon fontSize="small" color="secondary" />
//                                                 <Typography
//                                                     sx={{
//                                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                                         fontSize: "1rem",
//                                                         fontWeight: "bold",
//                                                         color: "#d32f2f"
//                                                     }}
//                                                 >
//                                                     {formatLaoKip(calculateItemTotal(item.price, item.quantity))}
//                                                 </Typography>
//                                             </Box>
//                                         </TableCell>

//                                         {/* ຈັດການ */}
//                                         <TableCell sx={{ textAlign: "center" }}>
//                                             <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
//                                                 {/* ປຸ່ມລົບສິນຄ້າອອກຈາກກະຕ່າ */}
//                                                 <Button
//                                                     variant="contained"
//                                                     onClick={() => removeItem(item.id)}
//                                                     startIcon={<DeleteIcon />}
//                                                     sx={{
//                                                         bgcolor: "#f44336",
//                                                         color: "white",
//                                                         "&:hover": {
//                                                             bgcolor: "#d32f2f",
//                                                         },
//                                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                                         fontSize: "0.8rem",
//                                                         px: 2,
//                                                         py: 0.5
//                                                     }}
//                                                 >
//                                                     ລົບອອກ
//                                                 </Button>
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     {/* 🆕 ສ່ວນສະຫຼຸບລາຄາລວມທັງໝົດ */}
//                     <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderTop: "1px solid #e0e0e0" }}>
//                         <Divider sx={{ mb: 2 }} />
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                             <Typography
//                                 variant="h6"
//                                 sx={{
//                                     fontFamily: "Noto Sans Lao, sans-serif",
//                                     fontWeight: "bold",
//                                     color: "#333"
//                                 }}
//                             >
//                                 ຈຳນວນລາຍການທັງໝົດ: {cartItems.length} ລາຍການ
//                             </Typography>
//                             <Typography
//                                 variant="h6"
//                                 sx={{
//                                     fontFamily: "Noto Sans Lao, sans-serif",
//                                     fontWeight: "bold",
//                                     color: "#333"
//                                 }}
//                             >
//                                 ຈຳນວນສິນຄ້າລວມ: {getTotalItems()} ຊິ້ນ
//                             </Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//                             <Box
//                                 sx={{
//                                     bgcolor: "#079578",
//                                     color: "white",
//                                     p: 2,
//                                     borderRadius: "8px",
//                                     minWidth: "200px",
//                                     textAlign: "center"
//                                 }}
//                             >
//                                 <Typography
//                                     variant="h5"
//                                     sx={{
//                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                         fontWeight: "bold"
//                                     }}
//                                 >
//                                     ລາຄາລວມທັງໝົດ
//                                 </Typography>
//                                 <Typography
//                                     variant="h4"
//                                     sx={{
//                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                         fontWeight: "bold",
//                                         mt: 1
//                                     }}
//                                 >
//                                     {formatLaoKip(calculateGrandTotal())}
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     </Box>

//                     {/* ປຸ່ມດ້ານລຸ່ມ */}
//                     <Box
//                         sx={{
//                             p: 3,
//                             bgcolor: "white",
//                             display: "flex",
//                             justifyContent: "center",
//                             gap: 2,
//                             borderTop: "1px solid #e0e0e0"
//                         }}
//                     >
//                         {/* ປຸ່ມຍົກເລີກການສັ່ງຊື້ */}
//                         <Button
//                             variant="contained"
//                             onClick={clearAllCart}
//                             sx={{
//                                 bgcolor: "#f44336",
//                                 "&:hover": { bgcolor: "#d32f2f" },
//                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                 px: 4,
//                                 py: 1.5,
//                                 fontSize: "1rem",
//                                 fontWeight: "bold"
//                             }}
//                         >
//                             ຍົກເລີກການສັ່ງຊື້
//                         </Button>

//                         {/* ປຸ່ມເລືອກສິນຄ້າເພີ່ມ */}
//                         <Button
//                             variant="outlined"
//                             onClick={() => navigate("/productdata")}
//                             sx={{
//                                 borderColor: "#999",
//                                 color: "#666",
//                                 "&:hover": {
//                                     borderColor: "#666",
//                                     bgcolor: "#f5f5f5"
//                                 },
//                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                 px: 4,
//                                 py: 1.5,
//                                 fontSize: "1rem"
//                             }}
//                         >
//                             ເລືອກສິນຄ້າເພີ່ມ
//                         </Button>

//                         {/* ປຸ່ມຢືນຢັນການສັ່ງຊື້ */}
//                         <Button
//                             variant="contained"
//                             onClick={placeOrder}
//                             sx={{
//                                 bgcolor: "#079578",
//                                 "&:hover": { bgcolor: "#046c56" },
//                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                 px: 4,
//                                 py: 1.5,
//                                 fontSize: "1rem",
//                                 fontWeight: "bold"
//                             }}
//                         >
//                             ຢືນຢັນການສັ່ງຊື້
//                         </Button>
//                     </Box>
//                 </Paper>
//             )}

//             {/* Confirmation Dialog */}
//             <Dialog
//                 open={confirmDialog.open}
//                 onClose={closeConfirmDialog}
//                 PaperProps={{
//                     sx: { fontFamily: "Noto Sans Lao, sans-serif" },
//                 }}
//             >
//                 <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                     {confirmDialog.title}
//                 </DialogTitle>
//                 <DialogContent>
//                     <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", whiteSpace: "pre-line" }}>
//                         {confirmDialog.message}
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         onClick={closeConfirmDialog}
//                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                     >
//                         ຍົກເລີກ
//                     </Button>
//                     <Button
//                         onClick={confirmDialog.onConfirm}
//                         variant="contained"
//                         sx={{
//                             bgcolor: "#079578",
//                             "&:hover": { bgcolor: "#046c56" },
//                             fontFamily: "Noto Sans Lao, sans-serif",
//                         }}
//                     >
//                         ຢືນຢັນ
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Notification Snackbar */}
//             <Snackbar
//                 open={notification.open}
//                 autoHideDuration={3000}
//                 onClose={closeNotification}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             >
//                 <Alert
//                     onClose={closeNotification}
//                     severity={notification.severity}
//                     sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                 >
//                     {notification.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default Cart;







// src/components/Cart.jsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import BusinessIcon from "@mui/icons-material/Business";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useNavigate } from "react-router-dom";

// Import Cart Context
import { useCart } from "../context/CartContext";

const Cart = () => {
    // Use Cart Context
    const {
        cartItems,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        getTotalItems
    } = useCart();

    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    // 🆕 ຟັງຊັນຈັດຮູບແບບເງິນລາວ
    const formatLaoKip = (amount) => {
        if (!amount || amount === 0) return '0 ກີບ';
        const formatted = Number(amount).toLocaleString('en-US');
        return `${formatted} ກີບ`;
    };

    // 🆕 ຟັງຊັນຄິດໄລ່ລາຄາລວມຂອງແຕ່ລະລາຍການ
    const calculateItemTotal = (price, quantity) => {
        return (price || 0) * quantity;
    };

    // 🆕 ຟັງຊັນຄິດໄລ່ລາຄາລວມທັງໝົດ
    const calculateGrandTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + calculateItemTotal(item.price || 0, item.quantity);
        }, 0);
    };

    // 🆕 ຟັງຊັນສ້າງເລກທີການສັ່ງຊື້
    const generateOrderId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `P${timestamp}${random}`.slice(0, 8);
    };

    // 🆕 ຟັງຊັນບັນທຶກຂໍ້ມູນການສັ່ງຊື້ໃສ່ localStorage
    const savePurchaseToHistory = (orderData) => {
        try {
            // ດຶງຂໍ້ມູນປະຫວັດການສັ່ງຊື້ທີ່ມີຢູ່ແລ້ວ
            const existingHistory = localStorage.getItem('purchaseHistory');
            const purchaseHistory = existingHistory ? JSON.parse(existingHistory) : [];

            // ເພີ່ມຂໍ້ມູນການສັ່ງຊື້ໃໝ່
            purchaseHistory.unshift(orderData); // ໃຊ້ unshift ເພື່ອໃຫ້ຂໍ້ມູນໃໝ່ຢູ່ເທິງສຸດ

            // ບັນທຶກກັບຄືນໄປ localStorage
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

            console.log('ບັນທຶກຂໍ້ມູນການສັ່ງຊື້ສຳເລັດ:', orderData);
        } catch (error) {
            console.error('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ:', error);
        }
    };

    // Update quantity
    const updateQuantity = (id, newQuantity) => {
        updateCartItemQuantity(id, newQuantity);
        showNotification("ອັບເດດຈຳນວນແລ້ວ", "success");
    };

    // Remove item from cart
    const removeItem = (id) => {
        const item = cartItems.find((item) => item.id === id);
        setConfirmDialog({
            open: true,
            title: "ລຶບສິນຄ້າ",
            message: `ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບ "${item?.name}" ອອກຈາກກະຕ່າ?`,
            onConfirm: () => {
                removeFromCart(id);
                showNotification("ລຶບສິນຄ້າອອກຈາກກະຕ່າແລ້ວ", "success");
                setConfirmDialog({ ...confirmDialog, open: false });
            },
        });
    };

    // Clear all cart
    const clearAllCart = () => {
        setConfirmDialog({
            open: true,
            title: "ລ້າງກະຕ່າ",
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລ້າງສິນຄ້າທັງໝົດອອກຈາກກະຕ່າ?",
            onConfirm: () => {
                clearCart();
                showNotification("ລ້າງກະຕ່າແລ້ວ", "success");
                setConfirmDialog({ ...confirmDialog, open: false });
            },
        });
    };

    // 🔄 ປັບປຸງຟັງຊັນ Place order
    const placeOrder = () => {
        const grandTotal = calculateGrandTotal();
        setConfirmDialog({
            open: true,
            title: "ຢືນຢັນການສັ່ງຊື້",
            message: `ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການສັ່ງຊື້ສິນຄ້າທັງໝົດ ${cartItems.length} ລາຍການ\nລາຄາລວມ: ${formatLaoKip(grandTotal)}`,
            onConfirm: () => {
                // 🆕 ສ້າງຂໍ້ມູນການສັ່ງຊື້
                const orderId = generateOrderId();
                const currentDate = new Date().toISOString().split('T')[0];

                // ດຶງຂໍ້ມູນຜູ້ໃຊ້ຈາກ localStorage ແລະ ແປງເປັນ string ທຳມະດາ
                let currentUser = 'ຜູ້ໃຊ້ລະບົບ';
                try {
                    const savedUser = localStorage.getItem('currentUser');
                    if (savedUser) {
                        // ຖ້າເປັນ JSON object ໃຫ້ parse ແລ້ວເອົາ username ຫຼື name
                        if (savedUser.startsWith('{')) {
                            const userObj = JSON.parse(savedUser);
                            currentUser = userObj.username || userObj.name || userObj.fullName || 'ຜູ້ໃຊ້ລະບົບ';
                        } else {
                            // ຖ້າເປັນ string ທຳມະດາໃຫ້ໃຊ້ໂດຍກົງ
                            currentUser = savedUser;
                        }
                    }
                } catch (error) {
                    console.log('ເກີດຂໍ້ຜິດພາດໃນການແປງຂໍ້ມູນຜູ້ໃຊ້:', error);
                    currentUser = 'ຜູ້ໃຊ້ລະບົບ';
                }

                const orderData = {
                    id: orderId,
                    date: currentDate,
                    user_id: currentUser,
                    invoice_no: `INV-${orderId}`,
                    total_amount: grandTotal,
                    items: cartItems.map(item => ({
                        product_id: item.id,
                        product_name: item.name,
                        quantity: item.quantity,
                        price: item.price || 0,
                        subtotal: calculateItemTotal(item.price, item.quantity),
                        category: item.category,
                        brand: item.brand,
                        unit: item.unit,
                        supplier: item.supplier,
                        image: item.image
                    })),
                    status: 'completed',
                    created_at: new Date().toISOString()
                };

                // 🆕 บันทֶกข้อมูลการสั่งซื้อ
                savePurchaseToHistory(orderData);

                // แสดงข้อความสำเร็จ
                showNotification("ສັ່ງຊື້ສຳເລັດແລ້ວ!", "success");

                // ລ້າງກະຕ່າ
                clearCart();
                setConfirmDialog({ ...confirmDialog, open: false });

                // 🆕 ໄປຫາໜ້າປະຫວັດການສັ່ງຊື້ທັນທີ
                setTimeout(() => {
                    navigate("/management_purchase");
                }, 1500);
            },
        });
    };

    // Notification helpers
    const showNotification = (message, severity = "success") => {
        setNotification({ open: true, message, severity });
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    const closeConfirmDialog = () => {
        setConfirmDialog({ ...confirmDialog, open: false });
    };

    return (
        <Box
            sx={{
                fontFamily: "Noto Sans Lao, sans-serif",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
                p: 3
            }}
        >
            {/* Header ສີຂຽວ */}
            <Paper
                sx={{
                    bgcolor: "#079578",
                    color: "white",
                    p: 2,
                    borderRadius: "8px",
                    mb: 3
                }}
                elevation={0}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "Noto Sans Lao, sans-serif",
                    }}
                >
                    ລາຍການສັ່ງຊື້ສິນຄ້າ
                </Typography>
            </Paper>

            {/* Empty cart message */}
            {cartItems.length === 0 && (
                <Paper sx={{ p: 5, textAlign: "center" }}>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 3 }}
                    >
                        ກະຕ່າຂອງທ່ານວ່າງເປົ່າ
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/productdata")}
                        sx={{
                            bgcolor: "#079578",
                            "&:hover": { bgcolor: "#046c56" },
                            fontFamily: "Noto Sans Lao, sans-serif",
                        }}
                    >
                        ໄປເລືອກສິນຄ້າ
                    </Button>
                </Paper>
            )}

            {/* Cart items table */}
            {cartItems.length > 0 && (
                <Paper sx={{ borderRadius: "12px", overflow: "hidden" }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#079578" }}>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem"
                                        }}
                                    >
                                        ສິນຄ້າ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem"
                                        }}
                                    >
                                        ປະເພດສິນຄ້າ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem"
                                        }}
                                    >
                                        ຍີ່ຫໍ້
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem",
                                            textAlign: "center"
                                        }}
                                    >
                                        ລາຄາ/ຫົວໜ່ວຍ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem",
                                            textAlign: "center"
                                        }}
                                    >
                                        ຈຳນວນ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem"
                                        }}
                                    >
                                        ຫົວໜ່ວຍ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem"
                                        }}
                                    >
                                        ຜູ້ສະໜອງ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem",
                                            textAlign: "center"
                                        }}
                                    >
                                        ລາຄາລວມ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.1rem",
                                            textAlign: "center"
                                        }}
                                    >
                                        ຈັດການ
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        hover
                                        sx={{
                                            "&:nth-of-type(odd)": {
                                                backgroundColor: "#f9f9f9",
                                            },
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0",
                                            },
                                        }}
                                    >
                                        {/* ສິນຄ້າ (ຮູບ + ຊື່) */}
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Avatar
                                                    src={item.image}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        mr: 2,
                                                        borderRadius: "8px"
                                                    }}
                                                    variant="rounded"
                                                />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans Lao, sans-serif",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* ປະເພດສິນຄ້າ */}
                                        <TableCell
                                            sx={{
                                                fontFamily: "Noto Sans Lao, sans-serif",
                                                fontSize: "1rem"
                                            }}
                                        >
                                            {item.category}
                                        </TableCell>

                                        {/* ຍີ່ຫໍ້ */}
                                        <TableCell
                                            sx={{
                                                fontFamily: "Noto Sans Lao, sans-serif",
                                                fontSize: "1rem"
                                            }}
                                        >
                                            {item.brand}
                                        </TableCell>

                                        {/* ລາຄາ/ຫົວໜ່ວຍ */}
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                                                <PriceChangeIcon fontSize="small" color="primary" />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans Lao, sans-serif",
                                                        fontSize: "1rem",
                                                        fontWeight: "bold",
                                                        color: "#079578"
                                                    }}
                                                >
                                                    {formatLaoKip(item.price || 0)}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* ຈຳນວນ */}
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    sx={{
                                                        bgcolor: "#f5f5f5",
                                                        "&:hover": { bgcolor: "#e0e0e0" },
                                                        mr: 1
                                                    }}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>

                                                <Typography
                                                    sx={{
                                                        mx: 2,
                                                        fontFamily: "Noto Sans Lao, sans-serif",
                                                        fontSize: "1.2rem",
                                                        fontWeight: "bold",
                                                        minWidth: "30px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    sx={{
                                                        bgcolor: "#079578",
                                                        color: "white",
                                                        "&:hover": { bgcolor: "#046c56" },
                                                        ml: 1
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>

                                        {/* ຫົວໜ່ວຍ */}
                                        <TableCell
                                            sx={{
                                                fontFamily: "Noto Sans Lao, sans-serif",
                                                fontSize: "1rem"
                                            }}
                                        >
                                            {item.unit}
                                        </TableCell>

                                        {/* ຜູ້ສະໜອງ */}
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <BusinessIcon fontSize="small" color="action" />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans Lao, sans-serif",
                                                        fontSize: "0.9rem"
                                                    }}
                                                >
                                                    {item.supplier || "ບໍ່ລະບຸຜູ້ສະໜອງ"}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* ລາຄາລວມ */}
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                                                <CalculateIcon fontSize="small" color="secondary" />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans Lao, sans-serif",
                                                        fontSize: "1rem",
                                                        fontWeight: "bold",
                                                        color: "#d32f2f"
                                                    }}
                                                >
                                                    {formatLaoKip(calculateItemTotal(item.price, item.quantity))}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* ຈັດການ */}
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => removeItem(item.id)}
                                                    startIcon={<DeleteIcon />}
                                                    sx={{
                                                        bgcolor: "#f44336",
                                                        color: "white",
                                                        "&:hover": {
                                                            bgcolor: "#d32f2f",
                                                        },
                                                        fontFamily: "Noto Sans Lao, sans-serif",
                                                        fontSize: "0.8rem",
                                                        px: 2,
                                                        py: 0.5
                                                    }}
                                                >
                                                    ລົບອອກ
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* ສ່ວນສະຫຼຸບລາຄາລວມທັງໝົດ */}
                    <Box sx={{ p: 3, bgcolor: "#f8f9fa", borderTop: "1px solid #e0e0e0" }}>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: "Noto Sans Lao, sans-serif",
                                    fontWeight: "bold",
                                    color: "#333"
                                }}
                            >
                                ຈຳນວນລາຍການທັງໝົດ: {cartItems.length} ລາຍການ
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: "Noto Sans Lao, sans-serif",
                                    fontWeight: "bold",
                                    color: "#333"
                                }}
                            >
                                ຈຳນວນສິນຄ້າລວມ: {getTotalItems()} ຊິ້ນ
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                            <Box
                                sx={{
                                    bgcolor: "#079578",
                                    color: "white",
                                    p: 2,
                                    borderRadius: "8px",
                                    minWidth: "200px",
                                    textAlign: "center"
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontFamily: "Noto Sans Lao, sans-serif",
                                        fontWeight: "bold"
                                    }}
                                >
                                    ລາຄາລວມທັງໝົດ
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontFamily: "Noto Sans Lao, sans-serif",
                                        fontWeight: "bold",
                                        mt: 1
                                    }}
                                >
                                    {formatLaoKip(calculateGrandTotal())}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* ປຸ່ມດ້ານລຸ່ມ */}
                    <Box
                        sx={{
                            p: 3,
                            bgcolor: "white",
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            borderTop: "1px solid #e0e0e0"
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={clearAllCart}
                            sx={{
                                bgcolor: "#f44336",
                                "&:hover": { bgcolor: "#d32f2f" },
                                fontFamily: "Noto Sans Lao, sans-serif",
                                px: 4,
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: "bold"
                            }}
                        >
                            ຍົກເລີກການສັ່ງຊື້
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/productdata")}
                            sx={{
                                borderColor: "#999",
                                color: "#666",
                                "&:hover": {
                                    borderColor: "#666",
                                    bgcolor: "#f5f5f5"
                                },
                                fontFamily: "Noto Sans Lao, sans-serif",
                                px: 4,
                                py: 1.5,
                                fontSize: "1rem"
                            }}
                        >
                            ເລືອກສິນຄ້າເພີ່ມ
                        </Button>

                        <Button
                            variant="contained"
                            onClick={placeOrder}
                            sx={{
                                bgcolor: "#079578",
                                "&:hover": { bgcolor: "#046c56" },
                                fontFamily: "Noto Sans Lao, sans-serif",
                                px: 4,
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: "bold"
                            }}
                        >
                            ຢືນຢັນການສັ່ງຊື້
                        </Button>
                    </Box>
                </Paper>
            )}

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialog.open}
                onClose={closeConfirmDialog}
                PaperProps={{
                    sx: { fontFamily: "Noto Sans Lao, sans-serif" },
                }}
            >
                <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    {confirmDialog.title}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", whiteSpace: "pre-line" }}>
                        {confirmDialog.message}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeConfirmDialog}
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                    >
                        ຍົກເລີກ
                    </Button>
                    <Button
                        onClick={confirmDialog.onConfirm}
                        variant="contained"
                        sx={{
                            bgcolor: "#079578",
                            "&:hover": { bgcolor: "#046c56" },
                            fontFamily: "Noto Sans Lao, sans-serif",
                        }}
                    >
                        ຢືນຢັນ
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={closeNotification}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={closeNotification}
                    severity={notification.severity}
                    sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Cart;