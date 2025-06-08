// // // frontend/src/component/UserCart.jsx
// // import React, { useState, useEffect } from "react";
// // import {
// //     Box,
// //     Typography,
// //     Paper,
// //     Button,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableHead,
// //     TableRow,
// //     IconButton,
// //     Dialog,
// //     DialogTitle,
// //     DialogContent,
// //     DialogActions,
// //     TextField,
// //     Grid,
// //     Card,
// //     CardContent,
// //     Snackbar,
// //     Alert,
// //     Chip,
// //     Divider,
// //     useTheme,
// //     useMediaQuery,
// // } from "@mui/material";
// // import AddIcon from "@mui/icons-material/Add";
// // import RemoveIcon from "@mui/icons-material/Remove";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // import CancelIcon from "@mui/icons-material/Cancel";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// // const UserCart = ({ cart, setCart, onBackToProducts }) => {
// //     const theme = useTheme();
// //     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// //     // States
// //     const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
// //     const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
// //     const [notification, setNotification] = useState({
// //         open: false,
// //         message: "",
// //         severity: "success",
// //     });

// //     // Notification helpers
// //     const showNotification = (message, severity = "success") => {
// //         setNotification({ open: true, message, severity });
// //     };

// //     const closeNotification = () => {
// //         setNotification((prev) => ({ ...prev, open: false }));
// //     };

// //     // ເພີ່ມຈຳນວນສິນຄ້າໃນກະຕ່າ
// //     const increaseQuantity = (productId) => {
// //         setCart((prevCart) =>
// //             prevCart.map((item) =>
// //                 item.id === productId
// //                     ? { ...item, requestedQuantity: item.requestedQuantity + 1 }
// //                     : item
// //             )
// //         );
// //     };

// //     // ຫຼຸດຈຳນວນສິນຄ້າໃນກະຕ່າ
// //     const decreaseQuantity = (productId) => {
// //         setCart((prevCart) =>
// //             prevCart.map((item) =>
// //                 item.id === productId && item.requestedQuantity > 1
// //                     ? { ...item, requestedQuantity: item.requestedQuantity - 1 }
// //                     : item
// //             )
// //         );
// //     };

// //     // ລຶບສິນຄ້າອອກຈາກກະຕ່າ
// //     const removeFromCart = (productId) => {
// //         setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
// //         showNotification("ລຶບສິນຄ້າອອກຈາກກະຕ່າແລ້ວ", "info");
// //     };

// //     // ຢືນຢັນການເບີກສິນຄ້າ
// //     const handleConfirmRequest = () => {
// //         setConfirmDialogOpen(true);
// //     };

// //     // ສົ່ງການເບີກສິນຄ້າ
// //     const handleSubmitRequest = () => {
// //         // TODO: ເຊື່ອມຕໍ່ກັບ Backend API
// //         console.log("ສົ່ງການເບີກສິນຄ້າ:", cart);

// //         // ລ້າງກະຕ່າ
// //         setCart([]);
// //         setConfirmDialogOpen(false);

// //         showNotification(
// //             `ເບີກສິນຄ້າສຳເລັດແລ້ວ ${cart.length} ລາຍການ`,
// //             "success"
// //         );

// //         // ກັບໄປໜ້າສິນຄ້າ
// //         setTimeout(() => {
// //             onBackToProducts();
// //         }, 1500);
// //     };

// //     // ຍົກເລີກການເບີກ
// //     const handleCancelRequest = () => {
// //         setCancelDialogOpen(true);
// //     };

// //     // ຢືນຢັນຍົກເລີກການເບີກ
// //     const handleConfirmCancel = () => {
// //         setCart([]);
// //         setCancelDialogOpen(false);
// //         showNotification("ຍົກເລີກການເບີກສິນຄ້າແລ້ວ", "warning");
// //         onBackToProducts();
// //     };

// //     // ຄຳນວນຈຳນວນລວມ
// //     const getTotalItems = () => {
// //         return cart.reduce((total, item) => total + item.requestedQuantity, 0);
// //     };

// //     // Component สำหรับแสดงสินค้าในตาราง
// //     const CartTableRow = ({ item }) => (
// //         <TableRow hover>
// //             <TableCell>
// //                 <Box
// //                     component="img"
// //                     src={
// //                         item.imageUrl
// //                             ? `http://localhost:5001${item.imageUrl}`
// //                             : "/placeholder-image.png"
// //                     }
// //                     alt={item.name}
// //                     sx={{
// //                         width: 60,
// //                         height: 60,
// //                         objectFit: "cover",
// //                         borderRadius: "4px",
// //                     }}
// //                     onError={(e) => {
// //                         e.target.onerror = null;
// //                         e.target.src = "/placeholder-image.png";
// //                     }}
// //                 />
// //             </TableCell>
// //             <TableCell>
// //                 <Typography
// //                     variant="body1"
// //                     sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}
// //                 >
// //                     {item.name}
// //                 </Typography>
// //             </TableCell>
// //             <TableCell>
// //                 <Chip
// //                     label={item.category}
// //                     size="small"
// //                     sx={{
// //                         bgcolor: "#e3f2fd",
// //                         color: "#1976d2",
// //                         fontFamily: "Noto Sans Lao, sans-serif",
// //                     }}
// //                 />
// //             </TableCell>
// //             <TableCell>
// //                 <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// //                     {item.brand || "ບໍ່ລະບຸ"}
// //                 </Typography>
// //             </TableCell>
// //             <TableCell>
// //                 <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// //                     {item.unit}
// //                 </Typography>
// //             </TableCell>
// //             <TableCell>
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                     <IconButton
// //                         size="small"
// //                         onClick={() => decreaseQuantity(item.id)}
// //                         disabled={item.requestedQuantity <= 1}
// //                         sx={{
// //                             bgcolor: "#ffebee",
// //                             "&:hover": { bgcolor: "#ffcdd2" },
// //                             "&:disabled": { bgcolor: "#f5f5f5" },
// //                         }}
// //                     >
// //                         <RemoveIcon fontSize="small" />
// //                     </IconButton>
// //                     <Typography
// //                         sx={{
// //                             fontFamily: "Noto Sans Lao, sans-serif",
// //                             fontWeight: "bold",
// //                             minWidth: "40px",
// //                             textAlign: "center",
// //                         }}
// //                     >
// //                         {item.requestedQuantity}
// //                     </Typography>
// //                     <IconButton
// //                         size="small"
// //                         onClick={() => increaseQuantity(item.id)}
// //                         sx={{
// //                             bgcolor: "#e8f5e9",
// //                             "&:hover": { bgcolor: "#c8e6c9" },
// //                         }}
// //                     >
// //                         <AddIcon fontSize="small" />
// //                     </IconButton>
// //                 </Box>
// //             </TableCell>
// //             <TableCell>
// //                 <IconButton
// //                     color="error"
// //                     onClick={() => removeFromCart(item.id)}
// //                     sx={{
// //                         bgcolor: "#ffebee",
// //                         "&:hover": { bgcolor: "#ffcdd2" },
// //                     }}
// //                 >
// //                     <DeleteIcon />
// //                 </IconButton>
// //             </TableCell>
// //         </TableRow>
// //     );

// //     // Component สำหรับแสดงสินค้าในรูปแบบ Card (สำหรับมือถือ)
// //     const CartMobileCard = ({ item }) => (
// //         <Card sx={{ mb: 2, border: "1px solid #e0e0e0" }}>
// //             <CardContent>
// //                 <Grid container spacing={2}>
// //                     <Grid item xs={4}>
// //                         <Box
// //                             component="img"
// //                             src={
// //                                 item.imageUrl
// //                                     ? `http://localhost:5001${item.imageUrl}`
// //                                     : "/placeholder-image.png"
// //                             }
// //                             alt={item.name}
// //                             sx={{
// //                                 width: "100%",
// //                                 height: 80,
// //                                 objectFit: "cover",
// //                                 borderRadius: "4px",
// //                             }}
// //                             onError={(e) => {
// //                                 e.target.onerror = null;
// //                                 e.target.src = "/placeholder-image.png";
// //                             }}
// //                         />
// //                     </Grid>
// //                     <Grid item xs={8}>
// //                         <Typography
// //                             variant="h6"
// //                             sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold", mb: 1 }}
// //                         >
// //                             {item.name}
// //                         </Typography>
// //                         <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
// //                             <Chip
// //                                 label={item.category}
// //                                 size="small"
// //                                 sx={{
// //                                     bgcolor: "#e3f2fd",
// //                                     color: "#1976d2",
// //                                     fontFamily: "Noto Sans Lao, sans-serif",
// //                                 }}
// //                             />
// //                             <Chip
// //                                 label={item.brand || "ບໍ່ລະບຸ"}
// //                                 size="small"
// //                                 variant="outlined"
// //                                 sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// //                             />
// //                         </Box>
// //                         <Typography
// //                             variant="body2"
// //                             sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 1 }}
// //                         >
// //                             ຫົວໜ່ວຍ: {item.unit}
// //                         </Typography>
// //                     </Grid>
// //                 </Grid>

// //                 <Divider sx={{ my: 2 }} />

// //                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                         <IconButton
// //                             size="small"
// //                             onClick={() => decreaseQuantity(item.id)}
// //                             disabled={item.requestedQuantity <= 1}
// //                             sx={{
// //                                 bgcolor: "#ffebee",
// //                                 "&:hover": { bgcolor: "#ffcdd2" },
// //                                 "&:disabled": { bgcolor: "#f5f5f5" },
// //                             }}
// //                         >
// //                             <RemoveIcon fontSize="small" />
// //                         </IconButton>
// //                         <Typography
// //                             sx={{
// //                                 fontFamily: "Noto Sans Lao, sans-serif",
// //                                 fontWeight: "bold",
// //                                 minWidth: "40px",
// //                                 textAlign: "center",
// //                             }}
// //                         >
// //                             {item.requestedQuantity}
// //                         </Typography>
// //                         <IconButton
// //                             size="small"
// //                             onClick={() => increaseQuantity(item.id)}
// //                             sx={{
// //                                 bgcolor: "#e8f5e9",
// //                                 "&:hover": { bgcolor: "#c8e6c9" },
// //                             }}
// //                         >
// //                             <AddIcon fontSize="small" />
// //                         </IconButton>
// //                     </Box>

// //                     <IconButton
// //                         color="error"
// //                         onClick={() => removeFromCart(item.id)}
// //                         sx={{
// //                             bgcolor: "#ffebee",
// //                             "&:hover": { bgcolor: "#ffcdd2" },
// //                         }}
// //                     >
// //                         <DeleteIcon />
// //                     </IconButton>
// //                 </Box>
// //             </CardContent>
// //         </Card>
// //     );

// //     return (
// //         <Box sx={{ fontFamily: "Noto Sans Lao, sans-serif", p: 3 }}>
// //             {/* Header */}
// //             <Paper sx={{ p: 3, mb: 3, bgcolor: "#079578", color: "white" }}>
// //                 <Box
// //                     sx={{
// //                         display: "flex",
// //                         justifyContent: "space-between",
// //                         alignItems: "center",
// //                         flexWrap: "wrap",
// //                         gap: 2,
// //                     }}
// //                 >
// //                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //                         <IconButton
// //                             color="inherit"
// //                             onClick={onBackToProducts}
// //                             sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
// //                         >
// //                             <ArrowBackIcon />
// //                         </IconButton>
// //                         <Typography
// //                             variant="h4"
// //                             component="h1"
// //                             sx={{
// //                                 fontFamily: "Noto Sans Lao, sans-serif",
// //                                 fontWeight: "bold",
// //                             }}
// //                         >
// //                             ກະຕ່າເບີກສິນຄ້າ
// //                         </Typography>
// //                     </Box>

// //                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //                         <ShoppingCartIcon sx={{ fontSize: 30 }} />
// //                         <Typography
// //                             variant="h6"
// //                             sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// //                         >
// //                             {cart.length} ລາຍການ ({getTotalItems()} ລວມ)
// //                         </Typography>
// //                     </Box>
// //                 </Box>
// //             </Paper>

// //             {/* Cart Content */}
// //             {cart.length === 0 ? (
// //                 <Paper sx={{ p: 5, textAlign: "center" }}>
// //                     <ShoppingCartIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
// //                     <Typography
// //                         variant="h5"
// //                         sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary", mb: 2 }}
// //                     >
// //                         ກະຕ່າວ່າງເປົ່າ
// //                     </Typography>
// //                     <Typography
// //                         variant="body1"
// //                         sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary", mb: 3 }}
// //                     >
// //                         ຍັງບໍ່ມີສິນຄ້າໃນກະຕ່າ ກະລຸນາເລືອກສິນຄ້າທີ່ຕ້ອງການເບີກ
// //                     </Typography>
// //                     <Button
// //                         variant="contained"
// //                         startIcon={<AddShoppingCartIcon />}
// //                         onClick={onBackToProducts}
// //                         sx={{
// //                             bgcolor: "#079578",
// //                             "&:hover": { bgcolor: "#046c56" },
// //                             fontFamily: "Noto Sans Lao, sans-serif",
// //                         }}
// //                     >
// //                         ໄປເລືອກສິນຄ້າ
// //                     </Button>
// //                 </Paper>
// //             ) : (
// //                 <>
// //                     {/* สำหรับหน้าจอใหญ่ - แสดงเป็นตาราง */}
// //                     {!isMobile ? (
// //                         <Paper sx={{ overflow: "hidden" }}>
// //                             <Table>
// //                                 <TableHead>
// //                                     <TableRow sx={{ bgcolor: "#f5f5f5" }}>
// //                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
// //                                             ຮູບພາບ
// //                                         </TableCell>
// //                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
// //                                             ຊື່ສິນຄ້າ
// //                                         </TableCell>
// //                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
// //                                             ປະເພດສິນຄ້າ
// //                                         </TableCell>
// //                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
// //                                             ຍີ່ຫໍ້
// //                                         </TableCell>
// //                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
// //                                             ຫົວໜ່ວຍ
// //                                         </TableCell>
// //                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
// //                                             ຈຳນວນ
// //                                         </TableCell>
// //                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
// //                                             ຈັດການ
// //                                         </TableCell>
// //                                     </TableRow>
// //                                 </TableHead>
// //                                 <TableBody>
// //                                     {cart.map((item) => (
// //                                         <CartTableRow key={item.id} item={item} />
// //                                     ))}
// //                                 </TableBody>
// //                             </Table>
// //                         </Paper>
// //                     ) : (
// //                         /* สำหรับมือถือ - แสดงเป็น Card */
// //                         <Box>
// //                             {cart.map((item) => (
// //                                 <CartMobileCard key={item.id} item={item} />
// //                             ))}
// //                         </Box>
// //                     )}

// //                     {/* Action Buttons */}
// //                     <Paper sx={{ p: 3, mt: 3 }}>
// //                         <Grid container spacing={2} justifyContent="center">
// //                             <Grid item xs={12} sm={6} md={3}>
// //                                 <Button
// //                                     fullWidth
// //                                     variant="outlined"
// //                                     startIcon={<AddShoppingCartIcon />}
// //                                     onClick={onBackToProducts}
// //                                     sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// //                                 >
// //                                     ເລືອກເພີ່ມສິນຄ້າ
// //                                 </Button>
// //                             </Grid>
// //                             <Grid item xs={12} sm={6} md={3}>
// //                                 <Button
// //                                     fullWidth
// //                                     variant="outlined"
// //                                     color="error"
// //                                     startIcon={<CancelIcon />}
// //                                     onClick={handleCancelRequest}
// //                                     sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// //                                 >
// //                                     ຍົກເລີກການເບີກ
// //                                 </Button>
// //                             </Grid>
// //                             <Grid item xs={12} sm={12} md={6}>
// //                                 <Button
// //                                     fullWidth
// //                                     variant="contained"
// //                                     size="large"
// //                                     startIcon={<CheckCircleIcon />}
// //                                     onClick={handleConfirmRequest}
// //                                     sx={{
// //                                         bgcolor: "#079578",
// //                                         "&:hover": { bgcolor: "#046c56" },
// //                                         fontFamily: "Noto Sans Lao, sans-serif",
// //                                         py: 1.5,
// //                                     }}
// //                                 >
// //                                     ຢືນຢັນການເບີກສິນຄ້າ ({cart.length} ລາຍການ)
// //                                 </Button>
// //                             </Grid>
// //                         </Grid>
// //                     </Paper>
// //                 </>
// //             )}

// //             {/* Confirm Dialog */}
// //             <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} maxWidth="sm" fullWidth>
// //                 <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// //                     ຢືນຢັນການເບີກສິນຄ້າ
// //                 </DialogTitle>
// //                 <DialogContent>
// //                     <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
// //                         ທ່ານຕ້ອງການເບີກສິນຄ້າທັງໝົດໃນກະຕ່າແມ່ນບໍ່?
// //                     </Typography>
// //                     <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
// //                         <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 1 }}>
// //                             ສະຫຼຸບການເບີກ:
// //                         </Typography>
// //                         {cart.map((item, index) => (
// //                             <Typography key={item.id} sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// //                                 {index + 1}. {item.name} - {item.requestedQuantity} {item.unit}
// //                             </Typography>
// //                         ))}
// //                         <Divider sx={{ my: 1 }} />
// //                         <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// //                             ລວມ: {cart.length} ລາຍການ ({getTotalItems()} ລວມ)
// //                         </Typography>
// //                     </Paper>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button
// //                         onClick={() => setConfirmDialogOpen(false)}
// //                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// //                     >
// //                         ຍົກເລີກ
// //                     </Button>
// //                     <Button
// //                         onClick={handleSubmitRequest}
// //                         variant="contained"
// //                         sx={{
// //                             bgcolor: "#079578",
// //                             "&:hover": { bgcolor: "#046c56" },
// //                             fontFamily: "Noto Sans Lao, sans-serif",
// //                         }}
// //                     >
// //                         ຢືນຢັນເບີກສິນຄ້າ
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>

// //             {/* Cancel Dialog */}
// //             <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
// //                 <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// //                     ຢືນຢັນຍົກເລີກ
// //                 </DialogTitle>
// //                 <DialogContent>
// //                     <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// //                         ທ່ານຕ້ອງການຍົກເລີກການເບີກສິນຄ້າທັງໝົດແມ່ນບໍ່? ຂໍ້ມູນທີ່ເລືອກໄວ້ຈະຫາຍໄປ.
// //                     </Typography>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button
// //                         onClick={() => setCancelDialogOpen(false)}
// //                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// //                     >
// //                         ບໍ່ຍົກເລີກ
// //                     </Button>
// //                     <Button
// //                         onClick={handleConfirmCancel}
// //                         variant="contained"
// //                         color="error"
// //                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// //                     >
// //                         ຢືນຢັນຍົກເລີກ
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>

// //             {/* Notification */}
// //             <Snackbar
// //                 open={notification.open}
// //                 autoHideDuration={6000}
// //                 onClose={closeNotification}
// //                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //             >
// //                 <Alert onClose={closeNotification} severity={notification.severity}>
// //                     {notification.message}
// //                 </Alert>
// //             </Snackbar>
// //         </Box>
// //     );
// // };

// // export default UserCart;





// // frontend/src/component/UserCart.jsx - ເວີຊັນປັບປຸງ
// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Paper,
//     Button,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     IconButton,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Grid,
//     Card,
//     CardContent,
//     Snackbar,
//     Alert,
//     Chip,
//     Divider,
//     useTheme,
//     useMediaQuery,
//     CircularProgress,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Badge,
//     Tooltip,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import SendIcon from "@mui/icons-material/Send";
// import WarningIcon from "@mui/icons-material/Warning";
// import InfoIcon from "@mui/icons-material/Info";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import PrintIcon from "@mui/icons-material/Print";

// const UserCart = ({ cart, setCart, onBackToProducts }) => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     // States
//     const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//     const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//     const [submitting, setSubmitting] = useState(false);
//     const [requestNote, setRequestNote] = useState("");
//     const [priority, setPriority] = useState("normal"); // normal, urgent, low
//     const [editingQuantity, setEditingQuantity] = useState(null);
//     const [tempQuantity, setTempQuantity] = useState("");
//     const [showValidation, setShowValidation] = useState(true);

//     const [notification, setNotification] = useState({
//         open: false,
//         message: "",
//         severity: "success",
//     });

//     // Notification helpers
//     const showNotification = (message, severity = "success") => {
//         setNotification({ open: true, message, severity });
//     };

//     const closeNotification = () => {
//         setNotification((prev) => ({ ...prev, open: false }));
//     };

//     // ເພີ່ມຈຳນວນສິນຄ້າໃນກະຕ່າ
//     const increaseQuantity = (productId) => {
//         setCart((prevCart) =>
//             prevCart.map((item) => {
//                 if (item.id === productId) {
//                     if (item.requestedQuantity < item.quantity) {
//                         return { ...item, requestedQuantity: item.requestedQuantity + 1 };
//                     } else {
//                         showNotification("ຈຳນວນເກີນຈຳນວນຄົງເຫຼືອໃນສາງ", "warning");
//                         return item;
//                     }
//                 }
//                 return item;
//             })
//         );
//     };

//     // ຫຼຸດຈຳນວນສິນຄ້າໃນກະຕ່າ
//     const decreaseQuantity = (productId) => {
//         setCart((prevCart) =>
//             prevCart.map((item) =>
//                 item.id === productId && item.requestedQuantity > 1
//                     ? { ...item, requestedQuantity: item.requestedQuantity - 1 }
//                     : item
//             )
//         );
//     };

//     // ລຶບສິນຄ້າອອກຈາກກະຕ່າ
//     const removeFromCart = (productId) => {
//         setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//         showNotification("ລຶບສິນຄ້າອອກຈາກກະຕ່າແລ້ວ", "info");
//     };

//     // ແກ້ໄຂຈຳນວນໂດຍການພິມ
//     const handleEditQuantity = (productId, currentQuantity) => {
//         setEditingQuantity(productId);
//         setTempQuantity(currentQuantity.toString());
//     };

//     // ບັນທຶກຈຳນວນທີ່ແກ້ໄຂ
//     const handleSaveQuantity = (productId) => {
//         const newQuantity = parseInt(tempQuantity);
//         const item = cart.find(item => item.id === productId);

//         if (isNaN(newQuantity) || newQuantity <= 0) {
//             showNotification("ກະລຸນາປ້ອນຈຳນວນທີ່ຖືກຕ້ອງ", "error");
//             return;
//         }

//         if (newQuantity > item.quantity) {
//             showNotification("ຈຳນວນເກີນຈຳນວນຄົງເຫຼືອໃນສາງ", "warning");
//             return;
//         }

//         setCart((prevCart) =>
//             prevCart.map((item) =>
//                 item.id === productId
//                     ? { ...item, requestedQuantity: newQuantity }
//                     : item
//             )
//         );

//         setEditingQuantity(null);
//         setTempQuantity("");
//         showNotification("ອັບເດດຈຳນວນສຳເລັດແລ້ວ", "success");
//     };

//     // ຍົກເລີກການແກ້ໄຂຈຳນວນ
//     const handleCancelEdit = () => {
//         setEditingQuantity(null);
//         setTempQuantity("");
//     };

//     // ລ້າງກະຕ່າທັງໝົດ
//     const handleClearCart = () => {
//         setCart([]);
//         showNotification("ລ້າງກະຕ່າທັງໝົດແລ້ວ", "info");
//     };

//     // ຢືນຢັນການເບີກສິນຄ້າ
//     const handleConfirmRequest = () => {
//         const validationIssues = validateCartItems();
//         if (validationIssues.length > 0) {
//             showNotification("ກະລຸນາແກ້ໄຂບັນຫາກ່ອນສົ່ງການເບີກ", "error");
//             return;
//         }
//         setConfirmDialogOpen(true);
//     };

//     // ສົ່ງການເບີກສິນຄ້າ
//     const handleSubmitRequest = async () => {
//         if (cart.length === 0) {
//             showNotification("ບໍ່ມີສິນຄ້າໃນກະຕ່າ", "error");
//             return;
//         }

//         setSubmitting(true);

//         try {
//             // ເຕືອມຂໍ້ມູນສຳລັບສົ່ງໄປ API
//             const requestData = {
//                 userId: "User1", // TODO: ດຶງຈາກ authentication context
//                 items: cart.map(item => ({
//                     productId: item.id,
//                     productName: item.name,
//                     quantity: item.requestedQuantity,
//                     unit: item.unit,
//                     category: item.category,
//                     brand: item.brand,
//                     imageUrl: item.imageUrl
//                 })),
//                 note: requestNote.trim() || null,
//                 priority: priority,
//                 requestDate: new Date().toISOString()
//             };

//             console.log("Submitting request:", requestData);

//             // TODO: ສົ່ງໄປ Backend API
//             // const response = await submitRequest(requestData);

//             // Mock response for now
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             const mockRequestId = `REQ${Date.now().toString().slice(-6)}`;

//             // ລ້າງກະຕ່າ
//             setCart([]);
//             setConfirmDialogOpen(false);
//             setRequestNote("");
//             setPriority("normal");

//             showNotification(
//                 `ສົ່ງການເບີກສິນຄ້າສຳເລັດແລ້ວ! ລະຫັດການເບີກ: ${mockRequestId}`,
//                 "success"
//             );

//             // ກັບໄປໜ້າສິນຄ້າ
//             setTimeout(() => {
//                 onBackToProducts();
//             }, 2000);

//         } catch (error) {
//             console.error("Error submitting request:", error);
//             showNotification("ເກີດຂໍ້ຜິດພາດໃນການສົ່ງການເບີກ", "error");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     // ຍົກເລີກການເບີກ
//     const handleCancelRequest = () => {
//         setCancelDialogOpen(true);
//     };

//     // ຢືນຢັນຍົກເລີກການເບີກ
//     const handleConfirmCancel = () => {
//         setCart([]);
//         setCancelDialogOpen(false);
//         setRequestNote("");
//         setPriority("normal");
//         showNotification("ຍົກເລີກການເບີກສິນຄ້າແລ້ວ", "warning");
//         onBackToProducts();
//     };

//     // ພິມໃບເບີກ
//     const handlePrintRequest = () => {
//         const printWindow = window.open('', '_blank');
//         const printContent = `
//       <html>
//         <head>
//           <title>ໃບເບີກສິນຄ້າ</title>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 20px; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             th { background-color: #f2f2f2; }
//             .header { text-align: center; margin-bottom: 20px; }
//             .summary { margin-top: 20px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h2>ໃບເບີກສິນຄ້າ</h2>
//             <p>ວັນທີ: ${new Date().toLocaleDateString('lo-LA')}</p>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>ລ/ດ</th>
//                 <th>ຊື່ສິນຄ້າ</th>
//                 <th>ປະເພດ</th>
//                 <th>ຍີ່ຫໍ້</th>
//                 <th>ຈຳນວນ</th>
//                 <th>ຫົວໜ່ວຍ</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${cart.map((item, index) => `
//                 <tr>
//                   <td>${index + 1}</td>
//                   <td>${item.name}</td>
//                   <td>${item.category}</td>
//                   <td>${item.brand || 'ບໍ່ລະບຸ'}</td>
//                   <td>${item.requestedQuantity}</td>
//                   <td>${item.unit}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//           <div class="summary">
//             <p><strong>ລວມລາຍການ:</strong> ${cart.length} ລາຍການ</p>
//             <p><strong>ລວມຈຳນວນ:</strong> ${getTotalItems()} ຊິ້ນ</p>
//             <p><strong>ໝາຍເຫດ:</strong> ${requestNote || 'ບໍ່ມີ'}</p>
//             <p><strong>ລະດັບຄວາມສຳຄັນ:</strong> ${getPriorityText(priority)}</p>
//           </div>
//         </body>
//       </html>
//     `;

//         printWindow.document.write(printContent);
//         printWindow.document.close();
//         printWindow.print();
//     };

//     // ຄຳນວນຈຳນວນລວມ
//     const getTotalItems = () => {
//         return cart.reduce((total, item) => total + item.requestedQuantity, 0);
//     };

//     // ຄຳນວນມູນຄ່າລວມ (ຖ້າມີລາຄາ)
//     const getTotalValue = () => {
//         return cart.reduce((total, item) => {
//             const price = item.price || 0;
//             return total + (price * item.requestedQuantity);
//         }, 0);
//     };

//     // ກວດສອບວ່າສິນຄ້າພຽງພໍບໍ່
//     const validateCartItems = () => {
//         const issues = [];
//         cart.forEach(item => {
//             if (item.requestedQuantity > item.quantity) {
//                 issues.push(`${item.name}: ຂໍເບີກ ${item.requestedQuantity} ແຕ່ມີແຕ່ ${item.quantity} ${item.unit}`);
//             }
//             if (item.requestedQuantity <= 0) {
//                 issues.push(`${item.name}: ຈຳນວນຕ້ອງຫຼາຍກວ່າ 0`);
//             }
//         });
//         return issues;
//     };

//     // ໄດ້ຮັບຂໍ້ຄວາມລະດັບຄວາມສຳຄັນ
//     const getPriorityText = (priority) => {
//         switch (priority) {
//             case "urgent": return "ດ່ວນ";
//             case "normal": return "ປົກກະຕິ";
//             case "low": return "ບໍ່ດ່ວນ";
//             default: return "ປົກກະຕິ";
//         }
//     };

//     // ໄດ້ຮັບສີຂອງລະດັບຄວາມສຳຄັນ
//     const getPriorityColor = (priority) => {
//         switch (priority) {
//             case "urgent": return { color: "#d32f2f", bgcolor: "#ffebee" };
//             case "normal": return { color: "#1976d2", bgcolor: "#e3f2fd" };
//             case "low": return { color: "#388e3c", bgcolor: "#e8f5e9" };
//             default: return { color: "#1976d2", bgcolor: "#e3f2fd" };
//         }
//     };

//     // Component สำหรับแสดงสินค้าในตาราง
//     const CartTableRow = ({ item }) => (
//         <TableRow hover>
//             <TableCell>
//                 <Box
//                     component="img"
//                     src={
//                         item.imageUrl
//                             ? `http://localhost:5001${item.imageUrl}`
//                             : "/placeholder-image.png"
//                     }
//                     alt={item.name}
//                     sx={{
//                         width: 60,
//                         height: 60,
//                         objectFit: "cover",
//                         borderRadius: "4px",
//                     }}
//                     onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "/placeholder-image.png";
//                     }}
//                 />
//             </TableCell>
//             <TableCell>
//                 <Typography
//                     variant="body1"
//                     sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}
//                 >
//                     {item.name}
//                 </Typography>
//                 <Typography
//                     variant="caption"
//                     sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}
//                 >
//                     ລະຫັດ: {item.id}
//                 </Typography>
//             </TableCell>
//             <TableCell>
//                 <Chip
//                     label={item.category}
//                     size="small"
//                     sx={{
//                         bgcolor: "#e3f2fd",
//                         color: "#1976d2",
//                         fontFamily: "Noto Sans Lao, sans-serif",
//                     }}
//                 />
//             </TableCell>
//             <TableCell>
//                 <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                     {item.brand || "ບໍ່ລະບຸ"}
//                 </Typography>
//             </TableCell>
//             <TableCell>
//                 <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                     {item.unit}
//                 </Typography>
//             </TableCell>
//             <TableCell>
//                 {editingQuantity === item.id ? (
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         <TextField
//                             size="small"
//                             type="number"
//                             value={tempQuantity}
//                             onChange={(e) => setTempQuantity(e.target.value)}
//                             inputProps={{ min: 1, max: item.quantity }}
//                             sx={{ width: 80 }}
//                         />
//                         <IconButton
//                             size="small"
//                             onClick={() => handleSaveQuantity(item.id)}
//                             sx={{ bgcolor: "#e8f5e9", "&:hover": { bgcolor: "#c8e6c9" } }}
//                         >
//                             <SaveIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                             size="small"
//                             onClick={handleCancelEdit}
//                             sx={{ bgcolor: "#ffebee", "&:hover": { bgcolor: "#ffcdd2" } }}
//                         >
//                             <CancelIcon fontSize="small" />
//                         </IconButton>
//                     </Box>
//                 ) : (
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         <IconButton
//                             size="small"
//                             onClick={() => decreaseQuantity(item.id)}
//                             disabled={item.requestedQuantity <= 1}
//                             sx={{
//                                 bgcolor: "#ffebee",
//                                 "&:hover": { bgcolor: "#ffcdd2" },
//                                 "&:disabled": { bgcolor: "#f5f5f5" },
//                             }}
//                         >
//                             <RemoveIcon fontSize="small" />
//                         </IconButton>
//                         <Tooltip title="ກົດເພື່ອແກ້ໄຂ">
//                             <Typography
//                                 onClick={() => handleEditQuantity(item.id, item.requestedQuantity)}
//                                 sx={{
//                                     fontFamily: "Noto Sans Lao, sans-serif",
//                                     fontWeight: "bold",
//                                     minWidth: "40px",
//                                     textAlign: "center",
//                                     color: item.requestedQuantity > item.quantity ? "error.main" : "inherit",
//                                     cursor: "pointer",
//                                     "&:hover": { bgcolor: "#f5f5f5", borderRadius: "4px" },
//                                     padding: "4px 8px"
//                                 }}
//                             >
//                                 {item.requestedQuantity}
//                             </Typography>
//                         </Tooltip>
//                         <IconButton
//                             size="small"
//                             onClick={() => increaseQuantity(item.id)}
//                             disabled={item.requestedQuantity >= item.quantity}
//                             sx={{
//                                 bgcolor: "#e8f5e9",
//                                 "&:hover": { bgcolor: "#c8e6c9" },
//                                 "&:disabled": { bgcolor: "#f5f5f5" },
//                             }}
//                         >
//                             <AddIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                             size="small"
//                             onClick={() => handleEditQuantity(item.id, item.requestedQuantity)}
//                             sx={{ bgcolor: "#e3f2fd", "&:hover": { bgcolor: "#bbdefb" } }}
//                         >
//                             <EditIcon fontSize="small" />
//                         </IconButton>
//                     </Box>
//                 )}
//                 <Typography
//                     variant="caption"
//                     sx={{
//                         fontFamily: "Noto Sans Lao, sans-serif",
//                         color: item.requestedQuantity > item.quantity ? "error.main" : "text.secondary",
//                         display: "block",
//                         textAlign: "center",
//                         mt: 0.5
//                     }}
//                 >
//                     ມີໃນສາງ: {item.quantity}
//                 </Typography>
//             </TableCell>
//             <TableCell>
//                 <IconButton
//                     color="error"
//                     onClick={() => removeFromCart(item.id)}
//                     sx={{
//                         bgcolor: "#ffebee",
//                         "&:hover": { bgcolor: "#ffcdd2" },
//                     }}
//                 >
//                     <DeleteIcon />
//                 </IconButton>
//             </TableCell>
//         </TableRow>
//     );

//     // Component สำหรับแสดงสินค้าในรูปแบบ Card (สำหรับมือถือ)
//     const CartMobileCard = ({ item }) => (
//         <Card sx={{
//             mb: 2,
//             border: item.requestedQuantity > item.quantity ? "2px solid red" : "1px solid #e0e0e0"
//         }}>
//             <CardContent>
//                 <Grid container spacing={2}>
//                     <Grid item xs={4}>
//                         <Box
//                             component="img"
//                             src={
//                                 item.imageUrl
//                                     ? `http://localhost:5001${item.imageUrl}`
//                                     : "/placeholder-image.png"
//                             }
//                             alt={item.name}
//                             sx={{
//                                 width: "100%",
//                                 height: 80,
//                                 objectFit: "cover",
//                                 borderRadius: "4px",
//                             }}
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "/placeholder-image.png";
//                             }}
//                         />
//                     </Grid>
//                     <Grid item xs={8}>
//                         <Typography
//                             variant="h6"
//                             sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold", mb: 1 }}
//                         >
//                             {item.name}
//                         </Typography>
//                         <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
//                             <Chip
//                                 label={item.category}
//                                 size="small"
//                                 sx={{
//                                     bgcolor: "#e3f2fd",
//                                     color: "#1976d2",
//                                     fontFamily: "Noto Sans Lao, sans-serif",
//                                 }}
//                             />
//                             <Chip
//                                 label={item.brand || "ບໍ່ລະບຸ"}
//                                 size="small"
//                                 variant="outlined"
//                                 sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                             />
//                         </Box>
//                         <Typography
//                             variant="body2"
//                             sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 1 }}
//                         >
//                             ຫົວໜ່ວຍ: {item.unit} | ມີໃນສາງ: {item.quantity}
//                         </Typography>
//                     </Grid>
//                 </Grid>

//                 <Divider sx={{ my: 2 }} />

//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         <IconButton
//                             size="small"
//                             onClick={() => decreaseQuantity(item.id)}
//                             disabled={item.requestedQuantity <= 1}
//                             sx={{
//                                 bgcolor: "#ffebee",
//                                 "&:hover": { bgcolor: "#ffcdd2" },
//                                 "&:disabled": { bgcolor: "#f5f5f5" },
//                             }}
//                         >
//                             <RemoveIcon fontSize="small" />
//                         </IconButton>
//                         <Typography
//                             sx={{
//                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                 fontWeight: "bold",
//                                 minWidth: "40px",
//                                 textAlign: "center",
//                                 color: item.requestedQuantity > item.quantity ? "error.main" : "inherit"
//                             }}
//                         >
//                             {item.requestedQuantity}
//                         </Typography>
//                         <IconButton
//                             size="small"
//                             onClick={() => increaseQuantity(item.id)}
//                             disabled={item.requestedQuantity >= item.quantity}
//                             sx={{
//                                 bgcolor: "#e8f5e9",
//                                 "&:hover": { bgcolor: "#c8e6c9" },
//                                 "&:disabled": { bgcolor: "#f5f5f5" },
//                             }}
//                         >
//                             <AddIcon fontSize="small" />
//                         </IconButton>
//                     </Box>

//                     <Box sx={{ display: "flex", gap: 1 }}>
//                         <IconButton
//                             size="small"
//                             onClick={() => handleEditQuantity(item.id, item.requestedQuantity)}
//                             sx={{ bgcolor: "#e3f2fd", "&:hover": { bgcolor: "#bbdefb" } }}
//                         >
//                             <EditIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                             color="error"
//                             onClick={() => removeFromCart(item.id)}
//                             sx={{
//                                 bgcolor: "#ffebee",
//                                 "&:hover": { bgcolor: "#ffcdd2" },
//                             }}
//                         >
//                             <DeleteIcon />
//                         </IconButton>
//                     </Box>
//                 </Box>
//             </CardContent>
//         </Card>
//     );

//     return (
//         <Box sx={{ fontFamily: "Noto Sans Lao, sans-serif", p: 3 }}>
//             {/* Header */}
//             <Paper sx={{ p: 3, mb: 3, bgcolor: "#079578", color: "white" }}>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         flexWrap: "wrap",
//                         gap: 2,
//                     }}
//                 >
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <IconButton
//                             color="inherit"
//                             onClick={onBackToProducts}
//                             sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
//                         >
//                             <ArrowBackIcon />
//                         </IconButton>
//                         <Typography
//                             variant="h4"
//                             component="h1"
//                             sx={{
//                                 fontFamily: "Noto Sans Lao, sans-serif",
//                                 fontWeight: "bold",
//                             }}
//                         >
//                             ກະຕ່າເບີກສິນຄ້າ
//                         </Typography>
//                     </Box>

//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Badge badgeContent={cart.length} color="error">
//                             <ShoppingCartIcon sx={{ fontSize: 30 }} />
//                         </Badge>
//                         <Box sx={{ textAlign: "right" }}>
//                             <Typography
//                                 variant="h6"
//                                 sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                             >
//                                 {cart.length} ລາຍການ
//                             </Typography>
//                             <Typography
//                                 variant="body2"
//                                 sx={{ fontFamily: "Noto Sans Lao, sans-serif", opacity: 0.9 }}
//                             >
//                                 ({getTotalItems()} ລວມ)
//                             </Typography>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Paper>

//             {/* Validation Warnings */}
//             {showValidation && validateCartItems().length > 0 && (
//                 <Alert
//                     severity="warning"
//                     sx={{ mb: 3 }}
//                     action={
//                         <IconButton
//                             color="inherit"
//                             size="small"
//                             onClick={() => setShowValidation(false)}
//                         >
//                             <CancelIcon fontSize="inherit" />
//                         </IconButton>
//                     }
//                 >
//                     <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold", mb: 1 }}>
//                         <WarningIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//                         ມີບັນຫາກັບສິນຄ້າໃນກະຕ່າ:
//                     </Typography>
//                     {validateCartItems().map((issue, index) => (
//                         <Typography key={index} sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontSize: "0.9rem" }}>
//                             • {issue}
//                         </Typography>
//                     ))}
//                 </Alert>
//             )}

//             {/* Cart Content */}
//             {cart.length === 0 ? (
//                 <Paper sx={{ p: 5, textAlign: "center" }}>
//                     <ShoppingCartIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
//                     <Typography
//                         variant="h5"
//                         sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary", mb: 2 }}
//                     >
//                         ກະຕ່າວ່າງເປົ່າ
//                     </Typography>
//                     <Typography
//                         variant="body1"
//                         sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary", mb: 3 }}
//                     >
//                         ຍັງບໍ່ມີສິນຄ້າໃນກະຕ່າ ກະລຸນາເລືອກສິນຄ້າທີ່ຕ້ອງການເບີກ
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         startIcon={<AddShoppingCartIcon />}
//                         onClick={onBackToProducts}
//                         sx={{
//                             bgcolor: "#079578",
//                             "&:hover": { bgcolor: "#046c56" },
//                             fontFamily: "Noto Sans Lao, sans-serif",
//                         }}
//                     >
//                         ໄປເລືອກສິນຄ້າ
//                     </Button>
//                 </Paper>
//             ) : (
//                 <>
//                     {/* Cart Summary */}
//                     <Paper sx={{ p: 2, mb: 3, bgcolor: "#f8f9fa", border: "1px solid #e9ecef" }}>
//                         <Grid container spacing={2} alignItems="center">
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Box sx={{ textAlign: "center" }}>
//                                     <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "#079578" }}>
//                                         {cart.length}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                         ລາຍການ
//                                     </Typography>
//                                 </Box>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Box sx={{ textAlign: "center" }}>
//                                     <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "#079578" }}>
//                                         {getTotalItems()}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                         ລວມຊິ້ນ
//                                     </Typography>
//                                 </Box>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Box sx={{ textAlign: "center" }}>
//                                     <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "#079578" }}>
//                                         {getTotalValue().toLocaleString()}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                         ກີບ (ປະມານ)
//                                     </Typography>
//                                 </Box>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Button
//                                     fullWidth
//                                     variant="outlined"
//                                     color="error"
//                                     size="small"
//                                     onClick={handleClearCart}
//                                     sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                                 >
//                                     ລ້າງກະຕ່າ
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </Paper>

//                     {/* สำหรับหน้าจอใหญ่ - แสดงเป็นตาราง */}
//                     {!isMobile ? (
//                         <Paper sx={{ overflow: "hidden", mb: 3 }}>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                                             ຮູບພາບ
//                                         </TableCell>
//                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                                             ຊື່ສິນຄ້າ
//                                         </TableCell>
//                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                                             ປະເພດສິນຄ້າ
//                                         </TableCell>
//                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                                             ຍີ່ຫໍ້
//                                         </TableCell>
//                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                                             ຫົວໜ່ວຍ
//                                         </TableCell>
//                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                                             ຈຳນວນ
//                                         </TableCell>
//                                         <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                                             ຈັດການ
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {cart.map((item) => (
//                                         <CartTableRow key={item.id} item={item} />
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Paper>
//                     ) : (
//                         /* สำหรับมือถือ - แสดงเป็น Card */
//                         <Box sx={{ mb: 3 }}>
//                             {cart.map((item) => (
//                                 <CartMobileCard key={item.id} item={item} />
//                             ))}
//                         </Box>
//                     )}

//                     {/* Request Settings */}
//                     <Paper sx={{ p: 3, mb: 3 }}>
//                         <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
//                             <InfoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//                             ການຕັ້ງຄ່າການເບີກ
//                         </Typography>

//                         <Grid container spacing={3}>
//                             <Grid item xs={12} md={6}>
//                                 <FormControl fullWidth>
//                                     <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                         ລະດັບຄວາມສຳຄັນ
//                                     </InputLabel>
//                                     <Select
//                                         value={priority}
//                                         onChange={(e) => setPriority(e.target.value)}
//                                         label="ລະດັບຄວາມສຳຄັນ"
//                                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                                     >
//                                         <MenuItem value="low" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                             <Chip
//                                                 label="ບໍ່ດ່ວນ"
//                                                 size="small"
//                                                 sx={{ ...getPriorityColor("low"), mr: 1 }}
//                                             />
//                                             ບໍ່ດ່ວນ
//                                         </MenuItem>
//                                         <MenuItem value="normal" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                             <Chip
//                                                 label="ປົກກະຕິ"
//                                                 size="small"
//                                                 sx={{ ...getPriorityColor("normal"), mr: 1 }}
//                                             />
//                                             ປົກກະຕິ
//                                         </MenuItem>
//                                         <MenuItem value="urgent" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                             <Chip
//                                                 label="ດ່ວນ"
//                                                 size="small"
//                                                 sx={{ ...getPriorityColor("urgent"), mr: 1 }}
//                                             />
//                                             ດ່ວນ
//                                         </MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Grid>

//                             <Grid item xs={12} md={6}>
//                                 <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                                     <Button
//                                         variant="outlined"
//                                         startIcon={<PrintIcon />}
//                                         onClick={handlePrintRequest}
//                                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                                     >
//                                         ພິມລາຍການ
//                                     </Button>
//                                     <Button
//                                         variant="outlined"
//                                         startIcon={<InfoIcon />}
//                                         onClick={() => setShowValidation(true)}
//                                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                                     >
//                                         ກວດສອບ
//                                     </Button>
//                                 </Box>
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     multiline
//                                     rows={3}
//                                     label="ໝາຍເຫດການເບີກ"
//                                     placeholder="ລະບຸເຫດຜົນການເບີກ, ສະຖານທີ່ໃຊ້, ຫຼື ໝາຍເຫດເພີ່ມເຕີມ..."
//                                     value={requestNote}
//                                     onChange={(e) => setRequestNote(e.target.value)}
//                                     sx={{
//                                         "& .MuiOutlinedInput-root": {
//                                             fontFamily: "Noto Sans Lao, sans-serif",
//                                         },
//                                     }}
//                                     InputLabelProps={{
//                                         style: { fontFamily: "Noto Sans Lao, sans-serif" },
//                                     }}
//                                 />
//                             </Grid>
//                         </Grid>
//                     </Paper>

//                     {/* Action Buttons */}
//                     <Paper sx={{ p: 3 }}>
//                         <Grid container spacing={2} justifyContent="center">
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Button
//                                     fullWidth
//                                     variant="outlined"
//                                     startIcon={<AddShoppingCartIcon />}
//                                     onClick={onBackToProducts}
//                                     sx={{ fontFamily: "Noto Sans Lao, sans-serif", py: 1.5 }}
//                                 >
//                                     ເລືອກເພີ່ມສິນຄ້າ
//                                 </Button>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Button
//                                     fullWidth
//                                     variant="outlined"
//                                     color="error"
//                                     startIcon={<CancelIcon />}
//                                     onClick={handleCancelRequest}
//                                     sx={{ fontFamily: "Noto Sans Lao, sans-serif", py: 1.5 }}
//                                 >
//                                     ຍົກເລີກການເບີກ
//                                 </Button>
//                             </Grid>
//                             <Grid item xs={12} sm={12} md={6}>
//                                 <Button
//                                     fullWidth
//                                     variant="contained"
//                                     size="large"
//                                     startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
//                                     onClick={handleConfirmRequest}
//                                     disabled={submitting || validateCartItems().length > 0}
//                                     sx={{
//                                         bgcolor: "#079578",
//                                         "&:hover": { bgcolor: "#046c56" },
//                                         fontFamily: "Noto Sans Lao, sans-serif",
//                                         py: 1.5,
//                                     }}
//                                 >
//                                     {submitting ? "ກຳລັງສົ່ງ..." : `ສົ່ງການເບີກສິນຄ້າ (${cart.length} ລາຍການ)`}
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </Paper>
//                 </>
//             )}

//             {/* Confirm Dialog */}
//             <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} maxWidth="md" fullWidth>
//                 <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                     <SendIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//                     ຢືນຢັນການສົ່ງການເບີກສິນຄ້າ
//                 </DialogTitle>
//                 <DialogContent>
//                     <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
//                         ທ່ານຕ້ອງການສົ່ງການເບີກສິນຄ້າທັງໝົດໃນກະຕ່າແມ່ນບໍ່?
//                     </Typography>

//                     <Paper sx={{ p: 2, bgcolor: "#f5f5f5", mb: 2 }}>
//                         <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 1 }}>
//                             📋 ສະຫຼຸບການເບີກ:
//                         </Typography>
//                         <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
//                             {cart.map((item, index) => (
//                                 <Typography key={item.id} sx={{ fontFamily: "Noto Sans Lao, sans-serif", py: 0.5 }}>
//                                     {index + 1}. {item.name} - <strong>{item.requestedQuantity} {item.unit}</strong>
//                                     {item.requestedQuantity > item.quantity && (
//                                         <Chip
//                                             label="เกินสต็อก"
//                                             size="small"
//                                             color="error"
//                                             sx={{ ml: 1, fontSize: "0.7rem" }}
//                                         />
//                                     )}
//                                 </Typography>
//                             ))}
//                         </Box>
//                         <Divider sx={{ my: 1 }} />
//                         <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                                 <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                     <strong>ລວມລາຍການ:</strong> {cart.length} ລາຍການ
//                                 </Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                     <strong>ລວມຈຳນວນ:</strong> {getTotalItems()} ຊິ້ນ
//                                 </Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                     <strong>ລະດັບຄວາມສຳຄັນ:</strong>
//                                     <Chip
//                                         label={getPriorityText(priority)}
//                                         size="small"
//                                         sx={{ ...getPriorityColor(priority), ml: 1 }}
//                                     />
//                                 </Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                     <strong>ມູນຄ່າປະມານ:</strong> {getTotalValue().toLocaleString()} ກີບ
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                         {requestNote && (
//                             <>
//                                 <Divider sx={{ my: 1 }} />
//                                 <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                                     <strong>📝 ໝາຍເຫດ:</strong> {requestNote}
//                                 </Typography>
//                             </>
//                         )}
//                     </Paper>

//                     <Alert severity="info" icon={<InfoIcon />}>
//                         <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                             <strong>ຂໍ້ມູນສຳຄັນ:</strong> ການເບີກຈະຖືກສົ່ງໄປຫາ Admin ເພື່ອທຳການອະນຸມັດ.
//                             ທ່ານຈະໄດ້ຮັບແຈ້ງເຕືອນເມື່ອການເບີກຖືກອະນຸມັດ ຫຼື ປະຕິເສດ.
//                         </Typography>
//                     </Alert>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         onClick={() => setConfirmDialogOpen(false)}
//                         disabled={submitting}
//                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                     >
//                         ຍົກເລີກ
//                     </Button>
//                     <Button
//                         onClick={handleSubmitRequest}
//                         variant="contained"
//                         disabled={submitting}
//                         startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
//                         sx={{
//                             bgcolor: "#079578",
//                             "&:hover": { bgcolor: "#046c56" },
//                             fontFamily: "Noto Sans Lao, sans-serif",
//                         }}
//                     >
//                         {submitting ? "ກຳລັງສົ່ງ..." : "ຢືນຢັນສົ່ງການເບີກ"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Cancel Dialog */}
//             <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
//                 <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                     <WarningIcon color="warning" sx={{ mr: 1, verticalAlign: "middle" }} />
//                     ຢືນຢັນຍົກເລີກ
//                 </DialogTitle>
//                 <DialogContent>
//                     <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
//                         ທ່ານຕ້ອງການຍົກເລີກການເບີກສິນຄ້າທັງໝົດແມ່ນບໍ່?
//                     </Typography>
//                     <Alert severity="warning">
//                         <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                             ຂໍ້ມູນທີ່ເລືອກໄວ້ທັງໝົດຈະຫາຍໄປ ແລະ ບໍ່ສາມາດກູ້ຄືນໄດ້!
//                         </Typography>
//                     </Alert>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         onClick={() => setCancelDialogOpen(false)}
//                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                     >
//                         ບໍ່ຍົກເລີກ
//                     </Button>
//                     <Button
//                         onClick={handleConfirmCancel}
//                         variant="contained"
//                         color="error"
//                         sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                     >
//                         ຢືນຢັນຍົກເລີກ
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Notification */}
//             <Snackbar
//                 open={notification.open}
//                 autoHideDuration={6000}
//                 onClose={closeNotification}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             >
//                 <Alert onClose={closeNotification} severity={notification.severity}>
//                     {notification.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default UserCart;





// frontend/src/components/UserCart.jsx - ໃຊ້ MockRequestService
import React, { useState, useEffect } from "react";
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
    Grid,
    Card,
    CardContent,
    Snackbar,
    Alert,
    Chip,
    Divider,
    useTheme,
    useMediaQuery,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Badge,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";

// Import MockRequestService
import MockRequestService from "../services/MockRequestService";

const UserCart = ({ cart, setCart, onBackToProducts }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // States
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [requestNote, setRequestNote] = useState("");
    const [priority, setPriority] = useState("normal");
    const [editingQuantity, setEditingQuantity] = useState(null);
    const [tempQuantity, setTempQuantity] = useState("");
    const [showValidation, setShowValidation] = useState(true);

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // สร้างข้อมูลตัวอย่างเมื่อโหลดครั้งแรก
    useEffect(() => {
        const existingRequests = MockRequestService.getAllRequests();
        if (existingRequests.length === 0) {
            MockRequestService.createSampleData();
        }
    }, []);

    // Notification helpers
    const showNotification = (message, severity = "success") => {
        setNotification({ open: true, message, severity });
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    // ເພີ່ມຈຳນວນສິນຄ້າໃນກະຕ່າ
    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === productId) {
                    if (item.requestedQuantity < item.quantity) {
                        return { ...item, requestedQuantity: item.requestedQuantity + 1 };
                    } else {
                        showNotification("ຈຳນວນເກີນຈຳນວນຄົງເຫຼືອໃນສາງ", "warning");
                        return item;
                    }
                }
                return item;
            })
        );
    };

    // ຫຼຸດຈຳນວນສິນຄ້າໃນກະຕ່າ
    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.requestedQuantity > 1
                    ? { ...item, requestedQuantity: item.requestedQuantity - 1 }
                    : item
            )
        );
    };

    // ລຶບສິນຄ້າອອກຈາກກະຕ່າ
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        showNotification("ລຶບສິນຄ້າອອກຈາກກະຕ່າແລ້ວ", "info");
    };

    // ແກ້ໄຂຈຳນວນໂດຍການພິມ
    const handleEditQuantity = (productId, currentQuantity) => {
        setEditingQuantity(productId);
        setTempQuantity(currentQuantity.toString());
    };

    // ບັນທຶກຈຳນວນທີ່ແກ້ໄຂ
    const handleSaveQuantity = (productId) => {
        const newQuantity = parseInt(tempQuantity);
        const item = cart.find(item => item.id === productId);

        if (isNaN(newQuantity) || newQuantity <= 0) {
            showNotification("ກະລຸນາປ້ອນຈຳນວນທີ່ຖືກຕ້ອງ", "error");
            return;
        }

        if (newQuantity > item.quantity) {
            showNotification("ຈຳນວນເກີນຈຳນວນຄົງເຫຼືອໃນສາງ", "warning");
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, requestedQuantity: newQuantity }
                    : item
            )
        );

        setEditingQuantity(null);
        setTempQuantity("");
        showNotification("ອັບເດດຈຳນວນສຳເລັດແລ້ວ", "success");
    };

    // ຍົກເລີກການແກ້ໄຂຈຳນວນ
    const handleCancelEdit = () => {
        setEditingQuantity(null);
        setTempQuantity("");
    };

    // ລ້າງກະຕ່າທັງໝົດ
    const handleClearCart = () => {
        setCart([]);
        showNotification("ລ້າງກະຕ່າທັງໝົດແລ້ວ", "info");
    };

    // ຢືນຢັນການເບີກສິນຄ້າ
    const handleConfirmRequest = () => {
        const validationIssues = validateCartItems();
        if (validationIssues.length > 0) {
            showNotification("ກະລຸນາແກ້ໄຂບັນຫາກ່ອນສົ່ງການເບີກ", "error");
            return;
        }
        setConfirmDialogOpen(true);
    };

    // ສົ່ງການເບີກສິນຄ້າໂດຍໃຊ້ MockRequestService
    const handleSubmitRequest = async () => {
        if (cart.length === 0) {
            showNotification("ບໍ່ມີສິນຄ້າໃນກະຕ່າ", "error");
            return;
        }

        setSubmitting(true);

        try {
            // ເຕີມຂໍ້ມູນສຳລັບສົ່ງ
            const requestData = {
                userId: "User1", // TODO: ດຶງຈາກ authentication
                userName: "ທ້າວ ສົມໃດ", // TODO: ດຶງຈາກ user profile
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    brand: item.brand,
                    unit: item.unit,
                    requestedQuantity: item.requestedQuantity,
                    imageUrl: item.imageUrl
                })),
                note: requestNote.trim() || null,
                priority: priority,
                totalItems: cart.length,
                totalQuantity: cart.reduce((sum, item) => sum + item.requestedQuantity, 0)
            };

            console.log("📤 Submitting request:", requestData);

            // ສົ່ງຜ່ານ MockRequestService
            const response = MockRequestService.createRequest(requestData);

            if (response.success) {
                // ລ້າງກະຕ່າ
                setCart([]);
                setConfirmDialogOpen(false);
                setRequestNote("");
                setPriority("normal");

                showNotification(response.message, "success");

                // ກັບໄປໜ້າສິນຄ້າ
                setTimeout(() => {
                    onBackToProducts();
                }, 2000);

            } else {
                showNotification(response.message, "error");
            }

        } catch (error) {
            console.error("❌ Error submitting request:", error);
            showNotification("ເກີດຂໍ້ຜິດພາດໃນການສົ່ງການເບີກ", "error");
        } finally {
            setSubmitting(false);
        }
    };

    // ຍົກເລີກການເບີກ
    const handleCancelRequest = () => {
        setCancelDialogOpen(true);
    };

    // ຢືນຢັນຍົກເລີກການເບີກ
    const handleConfirmCancel = () => {
        setCart([]);
        setCancelDialogOpen(false);
        setRequestNote("");
        setPriority("normal");
        showNotification("ຍົກເລີກການເບີກສິນຄ້າແລ້ວ", "warning");
        onBackToProducts();
    };

    // ພິມໃບເບີກ
    const handlePrintRequest = () => {
        const printWindow = window.open('', '_blank');
        const printContent = `
      <html>
        <head>
          <title>ໃບເບີກສິນຄ້າ</title>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px; 
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 12px; 
              text-align: left; 
            }
            th { 
              background-color: #079578; 
              color: white;
              font-weight: bold;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #079578;
              padding-bottom: 20px;
            }
            .summary { 
              margin-top: 20px; 
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 5px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #079578;
              margin-bottom: 10px;
            }
            .priority {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 4px;
              color: white;
              font-weight: bold;
            }
            .priority.normal { background-color: #1976d2; }
            .priority.urgent { background-color: #d32f2f; }
            .priority.low { background-color: #388e3c; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🏢 ລະບົບຄຸ້ມຄອງສາງ</div>
            <h2>ໃບຂໍເບີກສິນຄ້າ</h2>
            <p><strong>ວັນທີສ້າງ:</strong> ${new Date().toLocaleString('lo-LA')}</p>
            <p><strong>ຜູ້ຂໍເບີກ:</strong> ທ້າວ ສົມໃດ (User1)</p>
            <p><strong>ລະດັບຄວາມສຳຄັນ:</strong> <span class="priority ${priority}">${getPriorityText(priority)}</span></p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 50px;">ລ/ດ</th>
                <th>ຊື່ສິນຄ້າ</th>
                <th>ປະເພດ</th>
                <th>ຍີ່ຫໍ້</th>
                <th style="width: 80px;">ຈຳນວນ</th>
                <th style="width: 80px;">ຫົວໜ່ວຍ</th>
              </tr>
            </thead>
            <tbody>
              ${cart.map((item, index) => `
                <tr>
                  <td style="text-align: center;">${index + 1}</td>
                  <td><strong>${item.name}</strong></td>
                  <td>${item.category}</td>
                  <td>${item.brand || 'ບໍ່ລະບຸ'}</td>
                  <td style="text-align: center;"><strong>${item.requestedQuantity}</strong></td>
                  <td style="text-align: center;">${item.unit}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="summary">
            <h3 style="color: #079578; margin-top: 0;">📋 ສະຫຼຸບການເບີກ</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <p><strong>📦 ລວມລາຍການ:</strong> ${cart.length} ລາຍການ</p>
                <p><strong>🔢 ລວມຈຳນວນ:</strong> ${getTotalItems()} ຊິ້ນ</p>
              </div>
              <div>
                <p><strong>⏰ ວັນທີຂໍເບີກ:</strong> ${new Date().toLocaleDateString('lo-LA')}</p>
                <p><strong>👤 ສະຖານະ:</strong> <span style="color: #f57f17;">⏳ ລໍຖ້າອະນຸມັດ</span></p>
              </div>
            </div>
            ${requestNote ? `
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                <p><strong>📝 ໝາຍເຫດ:</strong></p>
                <p style="background-color: white; padding: 10px; border-radius: 4px; border-left: 4px solid #079578;">
                  ${requestNote}
                </p>
              </div>
            ` : ''}
          </div>
          
          <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
            <p>ໃບນີ້ສ້າງໂດຍລະບົບຄຸ້ມຄອງສາງອັດຕະໂນມັດ - ${new Date().toLocaleString('lo-LA')}</p>
          </div>
        </body>
      </html>
    `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // ຄຳນວນຈຳນວນລວມ
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.requestedQuantity, 0);
    };

    // ຄຳນວນມູນຄ່າລວມ (ຖ້າມີລາຄາ)
    const getTotalValue = () => {
        return cart.reduce((total, item) => {
            const price = item.price || 0;
            return total + (price * item.requestedQuantity);
        }, 0);
    };

    // ກວດສອບວ່າສິນຄ້າພຽງພໍບໍ່
    const validateCartItems = () => {
        const issues = [];
        cart.forEach(item => {
            if (item.requestedQuantity > item.quantity) {
                issues.push(`${item.name}: ຂໍເບີກ ${item.requestedQuantity} ແຕ່ມີແຕ່ ${item.quantity} ${item.unit}`);
            }
            if (item.requestedQuantity <= 0) {
                issues.push(`${item.name}: ຈຳນວນຕ້ອງຫຼາຍກວ່າ 0`);
            }
        });
        return issues;
    };

    // ໄດ້ຮັບຂໍ້ຄວາມລະດັບຄວາມສຳຄັນ
    const getPriorityText = (priority) => {
        switch (priority) {
            case "urgent": return "ດ່ວນ";
            case "normal": return "ປົກກະຕິ";
            case "low": return "ບໍ່ດ່ວນ";
            default: return "ປົກກະຕິ";
        }
    };

    // ໄດ້ຮັບສີຂອງລະດັບຄວາມສຳຄັນ
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "urgent": return { color: "#d32f2f", bgcolor: "#ffebee" };
            case "normal": return { color: "#1976d2", bgcolor: "#e3f2fd" };
            case "low": return { color: "#388e3c", bgcolor: "#e8f5e9" };
            default: return { color: "#1976d2", bgcolor: "#e3f2fd" };
        }
    };

    // Component สำหรับแสดงสินค้าในตาราง
    const CartTableRow = ({ item }) => (
        <TableRow hover>
            <TableCell>
                <Box
                    component="img"
                    src={
                        item.imageUrl
                            ? `http://localhost:5001${item.imageUrl}`
                            : "/placeholder-image.png"
                    }
                    alt={item.name}
                    sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: "4px",
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.png";
                    }}
                />
            </TableCell>
            <TableCell>
                <Typography
                    variant="body1"
                    sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}
                >
                    {item.name}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}
                >
                    ລະຫັດ: {item.id}
                </Typography>
            </TableCell>
            <TableCell>
                <Chip
                    label={item.category}
                    size="small"
                    sx={{
                        bgcolor: "#e3f2fd",
                        color: "#1976d2",
                        fontFamily: "Noto Sans Lao, sans-serif",
                    }}
                />
            </TableCell>
            <TableCell>
                <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    {item.brand || "ບໍ່ລະບຸ"}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    {item.unit}
                </Typography>
            </TableCell>
            <TableCell>
                {editingQuantity === item.id ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TextField
                            size="small"
                            type="number"
                            value={tempQuantity}
                            onChange={(e) => setTempQuantity(e.target.value)}
                            inputProps={{ min: 1, max: item.quantity }}
                            sx={{ width: 80 }}
                        />
                        <IconButton
                            size="small"
                            onClick={() => handleSaveQuantity(item.id)}
                            sx={{ bgcolor: "#e8f5e9", "&:hover": { bgcolor: "#c8e6c9" } }}
                        >
                            <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={handleCancelEdit}
                            sx={{ bgcolor: "#ffebee", "&:hover": { bgcolor: "#ffcdd2" } }}
                        >
                            <CancelIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.requestedQuantity <= 1}
                            sx={{
                                bgcolor: "#ffebee",
                                "&:hover": { bgcolor: "#ffcdd2" },
                                "&:disabled": { bgcolor: "#f5f5f5" },
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Tooltip title="ກົດເພື່ອແກ້ໄຂ">
                            <Typography
                                onClick={() => handleEditQuantity(item.id, item.requestedQuantity)}
                                sx={{
                                    fontFamily: "Noto Sans Lao, sans-serif",
                                    fontWeight: "bold",
                                    minWidth: "40px",
                                    textAlign: "center",
                                    color: item.requestedQuantity > item.quantity ? "error.main" : "inherit",
                                    cursor: "pointer",
                                    "&:hover": { bgcolor: "#f5f5f5", borderRadius: "4px" },
                                    padding: "4px 8px"
                                }}
                            >
                                {item.requestedQuantity}
                            </Typography>
                        </Tooltip>
                        <IconButton
                            size="small"
                            onClick={() => increaseQuantity(item.id)}
                            disabled={item.requestedQuantity >= item.quantity}
                            sx={{
                                bgcolor: "#e8f5e9",
                                "&:hover": { bgcolor: "#c8e6c9" },
                                "&:disabled": { bgcolor: "#f5f5f5" },
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => handleEditQuantity(item.id, item.requestedQuantity)}
                            sx={{ bgcolor: "#e3f2fd", "&:hover": { bgcolor: "#bbdefb" } }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
                <Typography
                    variant="caption"
                    sx={{
                        fontFamily: "Noto Sans Lao, sans-serif",
                        color: item.requestedQuantity > item.quantity ? "error.main" : "text.secondary",
                        display: "block",
                        textAlign: "center",
                        mt: 0.5
                    }}
                >
                    ມີໃນສາງ: {item.quantity}
                </Typography>
            </TableCell>
            <TableCell>
                <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{
                        bgcolor: "#ffebee",
                        "&:hover": { bgcolor: "#ffcdd2" },
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );

    // Component สำหรับแสดงสินค้าในรูปแบบ Card (สำหรับมือถือ)
    const CartMobileCard = ({ item }) => (
        <Card sx={{
            mb: 2,
            border: item.requestedQuantity > item.quantity ? "2px solid red" : "1px solid #e0e0e0"
        }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box
                            component="img"
                            src={
                                item.imageUrl
                                    ? `http://localhost:5001${item.imageUrl}`
                                    : "/placeholder-image.png"
                            }
                            alt={item.name}
                            sx={{
                                width: "100%",
                                height: 80,
                                objectFit: "cover",
                                borderRadius: "4px",
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-image.png";
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography
                            variant="h6"
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold", mb: 1 }}
                        >
                            {item.name}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                            <Chip
                                label={item.category}
                                size="small"
                                sx={{
                                    bgcolor: "#e3f2fd",
                                    color: "#1976d2",
                                    fontFamily: "Noto Sans Lao, sans-serif",
                                }}
                            />
                            <Chip
                                label={item.brand || "ບໍ່ລະບຸ"}
                                size="small"
                                variant="outlined"
                                sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 1 }}
                        >
                            ຫົວໜ່ວຍ: {item.unit} | ມີໃນສາງ: {item.quantity}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.requestedQuantity <= 1}
                            sx={{
                                bgcolor: "#ffebee",
                                "&:hover": { bgcolor: "#ffcdd2" },
                                "&:disabled": { bgcolor: "#f5f5f5" },
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                            sx={{
                                fontFamily: "Noto Sans Lao, sans-serif",
                                fontWeight: "bold",
                                minWidth: "40px",
                                textAlign: "center",
                                color: item.requestedQuantity > item.quantity ? "error.main" : "inherit"
                            }}
                        >
                            {item.requestedQuantity}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => increaseQuantity(item.id)}
                            disabled={item.requestedQuantity >= item.quantity}
                            sx={{
                                bgcolor: "#e8f5e9",
                                "&:hover": { bgcolor: "#c8e6c9" },
                                "&:disabled": { bgcolor: "#f5f5f5" },
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={() => handleEditQuantity(item.id, item.requestedQuantity)}
                            sx={{ bgcolor: "#e3f2fd", "&:hover": { bgcolor: "#bbdefb" } }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                            sx={{
                                bgcolor: "#ffebee",
                                "&:hover": { bgcolor: "#ffcdd2" },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ fontFamily: "Noto Sans Lao, sans-serif", p: 3 }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3, bgcolor: "#079578", color: "white" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton
                            color="inherit"
                            onClick={onBackToProducts}
                            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontFamily: "Noto Sans Lao, sans-serif",
                                fontWeight: "bold",
                            }}
                        >
                            ກະຕ່າເບີກສິນຄ້າ
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Badge badgeContent={cart.length} color="error">
                            <ShoppingCartIcon sx={{ fontSize: 30 }} />
                        </Badge>
                        <Box sx={{ textAlign: "right" }}>
                            <Typography
                                variant="h6"
                                sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                            >
                                {cart.length} ລາຍການ
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontFamily: "Noto Sans Lao, sans-serif", opacity: 0.9 }}
                            >
                                ({getTotalItems()} ລວມ)
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {/* Validation Warnings */}
            {showValidation && validateCartItems().length > 0 && (
                <Alert
                    severity="warning"
                    sx={{ mb: 3 }}
                    action={
                        <IconButton
                            color="inherit"
                            size="small"
                            onClick={() => setShowValidation(false)}
                        >
                            <CancelIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold", mb: 1 }}>
                        <WarningIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        ມີບັນຫາກັບສິນຄ້າໃນກະຕ່າ:
                    </Typography>
                    {validateCartItems().map((issue, index) => (
                        <Typography key={index} sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontSize: "0.9rem" }}>
                            • {issue}
                        </Typography>
                    ))}
                </Alert>
            )}

            {/* Cart Content */}
            {cart.length === 0 ? (
                <Paper sx={{ p: 5, textAlign: "center" }}>
                    <ShoppingCartIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
                    <Typography
                        variant="h5"
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary", mb: 2 }}
                    >
                        ກະຕ່າວ່າງເປົ່າ
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary", mb: 3 }}
                    >
                        ຍັງບໍ່ມີສິນຄ້າໃນກະຕ່າ ກະລຸນາເລືອກສິນຄ້າທີ່ຕ້ອງການເບີກ
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={onBackToProducts}
                        sx={{
                            bgcolor: "#079578",
                            "&:hover": { bgcolor: "#046c56" },
                            fontFamily: "Noto Sans Lao, sans-serif",
                        }}
                    >
                        ໄປເລືອກສິນຄ້າ
                    </Button>
                </Paper>
            ) : (
                <>
                    {/* Cart Summary */}
                    <Paper sx={{ p: 2, mb: 3, bgcolor: "#f8f9fa", border: "1px solid #e9ecef" }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "#079578" }}>
                                        {cart.length}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                        ລາຍການ
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "#079578" }}>
                                        {getTotalItems()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                        ລວມຊິ້ນ
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "#079578" }}>
                                        {getTotalValue().toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                        ກີບ (ປະມານ)
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={handleClearCart}
                                    sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                                >
                                    ລ້າງກະຕ່າ
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* สำหรับหน้าจอใหญ่ - แสดงเป็นตาราง */}
                    {!isMobile ? (
                        <Paper sx={{ overflow: "hidden", mb: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ຮູບພາບ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ຊື່ສິນຄ້າ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ປະເພດສິນຄ້າ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ຍີ່ຫໍ້
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ຫົວໜ່ວຍ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ຈຳນວນ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ຈັດການ
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((item) => (
                                        <CartTableRow key={item.id} item={item} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    ) : (
                        /* สำหรับมือถือ - แสดงเป็น Card */
                        <Box sx={{ mb: 3 }}>
                            {cart.map((item) => (
                                <CartMobileCard key={item.id} item={item} />
                            ))}
                        </Box>
                    )}

                    {/* Request Settings */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                            <InfoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                            ການຕັ້ງຄ່າການເບີກ
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                        ລະດັບຄວາມສຳຄັນ
                                    </InputLabel>
                                    <Select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        label="ລະດັບຄວາມສຳຄັນ"
                                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                                    >
                                        <MenuItem value="low" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <Chip
                                                label="ບໍ່ດ່ວນ"
                                                size="small"
                                                sx={{ ...getPriorityColor("low"), mr: 1 }}
                                            />
                                            ບໍ່ດ່ວນ
                                        </MenuItem>
                                        <MenuItem value="normal" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <Chip
                                                label="ປົກກະຕິ"
                                                size="small"
                                                sx={{ ...getPriorityColor("normal"), mr: 1 }}
                                            />
                                            ປົກກະຕິ
                                        </MenuItem>
                                        <MenuItem value="urgent" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <Chip
                                                label="ດ່ວນ"
                                                size="small"
                                                sx={{ ...getPriorityColor("urgent"), mr: 1 }}
                                            />
                                            ດ່ວນ
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PrintIcon />}
                                        onClick={handlePrintRequest}
                                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                                    >
                                        ພິມລາຍການ
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<InfoIcon />}
                                        onClick={() => setShowValidation(true)}
                                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                                    >
                                        ກວດສອບ
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="ໝາຍເຫດການເບີກ"
                                    placeholder="ລະບຸເຫດຜົນການເບີກ, ສະຖານທີ່ໃຊ້, ຫຼື ໝາຍເຫດເພີ່ມເຕີມ..."
                                    value={requestNote}
                                    onChange={(e) => setRequestNote(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            fontFamily: "Noto Sans Lao, sans-serif",
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: { fontFamily: "Noto Sans Lao, sans-serif" },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Action Buttons */}
                    <Paper sx={{ p: 3 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6} md={3}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<AddShoppingCartIcon />}
                                    onClick={onBackToProducts}
                                    sx={{ fontFamily: "Noto Sans Lao, sans-serif", py: 1.5 }}
                                >
                                    ເລືອກເພີ່ມສິນຄ້າ
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    startIcon={<CancelIcon />}
                                    onClick={handleCancelRequest}
                                    sx={{ fontFamily: "Noto Sans Lao, sans-serif", py: 1.5 }}
                                >
                                    ຍົກເລີກການເບີກ
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                    onClick={handleConfirmRequest}
                                    disabled={submitting || validateCartItems().length > 0}
                                    sx={{
                                        bgcolor: "#079578",
                                        "&:hover": { bgcolor: "#046c56" },
                                        fontFamily: "Noto Sans Lao, sans-serif",
                                        py: 1.5,
                                    }}
                                >
                                    {submitting ? "ກຳລັງສົ່ງ..." : `ສົ່ງການເບີກສິນຄ້າ (${cart.length} ລາຍການ)`}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )}

            {/* Confirm Dialog */}
            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    <SendIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    ຢືນຢັນການສົ່ງການເບີກສິນຄ້າ
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                        ທ່ານຕ້ອງການສົ່ງການເບີກສິນຄ້າທັງໝົດໃນກະຕ່າແມ່ນບໍ່?
                    </Typography>

                    <Paper sx={{ p: 2, bgcolor: "#f5f5f5", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 1 }}>
                            📋 ສະຫຼຸບການເບີກ:
                        </Typography>
                        <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                            {cart.map((item, index) => (
                                <Typography key={item.id} sx={{ fontFamily: "Noto Sans Lao, sans-serif", py: 0.5 }}>
                                    {index + 1}. {item.name} - <strong>{item.requestedQuantity} {item.unit}</strong>
                                    {item.requestedQuantity > item.quantity && (
                                        <Chip
                                            label="เกินสต็อก"
                                            size="small"
                                            color="error"
                                            sx={{ ml: 1, fontSize: "0.7rem" }}
                                        />
                                    )}
                                </Typography>
                            ))}
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    <strong>ລວມລາຍການ:</strong> {cart.length} ລາຍການ
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    <strong>ລວມຈຳນວນ:</strong> {getTotalItems()} ຊິ້ນ
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    <strong>ລະດັບຄວາມສຳຄັນ:</strong>
                                    <Chip
                                        label={getPriorityText(priority)}
                                        size="small"
                                        sx={{ ...getPriorityColor(priority), ml: 1 }}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    <strong>ມູນຄ່າປະມານ:</strong> {getTotalValue().toLocaleString()} ກີບ
                                </Typography>
                            </Grid>
                        </Grid>
                        {requestNote && (
                            <>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    <strong>📝 ໝາຍເຫດ:</strong> {requestNote}
                                </Typography>
                            </>
                        )}
                    </Paper>

                    <Alert severity="info" icon={<InfoIcon />}>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            <strong>ຂໍ້ມູນສຳຄັນ:</strong> ການເບີກຈະຖືກສົ່ງໄປຫາ Admin ເພື່ອທຳການອະນຸມັດ.
                            ທ່ານຈະໄດ້ຮັບແຈ້ງເຕືອນເມື່ອການເບີກຖືກອະນຸມັດ ຫຼື ປະຕິເສດ.
                        </Typography>
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setConfirmDialogOpen(false)}
                        disabled={submitting}
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                    >
                        ຍົກເລີກ
                    </Button>
                    <Button
                        onClick={handleSubmitRequest}
                        variant="contained"
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        sx={{
                            bgcolor: "#079578",
                            "&:hover": { bgcolor: "#046c56" },
                            fontFamily: "Noto Sans Lao, sans-serif",
                        }}
                    >
                        {submitting ? "ກຳລັງສົ່ງ..." : "ຢືນຢັນສົ່ງການເບີກ"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Cancel Dialog */}
            <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    <WarningIcon color="warning" sx={{ mr: 1, verticalAlign: "middle" }} />
                    ຢືນຢັນຍົກເລີກ
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                        ທ່ານຕ້ອງການຍົກເລີກການເບີກສິນຄ້າທັງໝົດແມ່ນບໍ່?
                    </Typography>
                    <Alert severity="warning">
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ຂໍ້ມູນທີ່ເລືອກໄວ້ທັງໝົດຈະຫາຍໄປ ແລະ ບໍ່ສາມາດກູ້ຄືນໄດ້!
                        </Typography>
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setCancelDialogOpen(false)}
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                    >
                        ບໍ່ຍົກເລີກ
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        variant="contained"
                        color="error"
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                    >
                        ຢືນຢັນຍົກເລີກ
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Notification */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={closeNotification}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={closeNotification} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserCart;