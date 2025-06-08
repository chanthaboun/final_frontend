

// // frontend/src/component/UserProductInfo.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   TextField,
//   InputAdornment,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Badge,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import ViewModuleIcon from "@mui/icons-material/ViewModule";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// // import API functions
// import {
//   getAllProducts,
//   searchProducts,
//   updateProduct,
//   getCategories,
//   getBrands,
// } from "../api/product.api";

// const UserProductInfo = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // State for products and UI
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filter states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);

//   // View mode
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

//   // Shopping cart
//   const [cart, setCart] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);

//   // Product request dialog
//   const [requestDialogOpen, setRequestDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [requestQuantity, setRequestQuantity] = useState(1);

//   // Notification
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // ດຶງຂໍ້ມູນສິນຄ້າຈາກ server
//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await getAllProducts();
//       if (response.success) {
//         // ກັ່ນຕອງເອົາສິນຄ້າທີ່ມີສະຖານະເປັນ active ແລະມີຈຳນວນມາກກວ່າ 0
//         const availableProducts = response.products.filter(
//           (product) =>
//             product.status === "active" &&
//             product.quantity > 0
//         );
//         setProducts(availableProducts);
//         setFilteredProducts(availableProducts);
//       } else {
//         setError("ບໍ່ສາມາດດຶງຂໍ້ມູນສິນຄ້າໄດ້.");
//       }
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("ບໍ່ສາມາດດຶງຂໍ້ມູນສິນຄ້າໄດ້. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ດຶງຂໍ້ມູນປະເພດສິນຄ້າ ແລະ ຍີ່ຫໍ້
//   const fetchFilterData = useCallback(async () => {
//     try {
//       const [categoriesResponse, brandsResponse] = await Promise.all([
//         getCategories(),
//         getBrands(),
//       ]);

//       if (categoriesResponse.success) {
//         setCategories(categoriesResponse.categories);
//       }

//       if (brandsResponse.success) {
//         setBrands(brandsResponse.brands);
//       }
//     } catch (err) {
//       console.error("Error fetching filter data:", err);
//     }
//   }, []);

//   // ດຶງຂໍ້ມູນເມື່ອ component ໂຫຼດຂຶ້ນ
//   useEffect(() => {
//     fetchProducts();
//     fetchFilterData();
//   }, [fetchProducts, fetchFilterData]);

//   // Filter products
//   useEffect(() => {
//     let filtered = products;

//     // ຄົ້ນຫາຕາມຄຳທີ່ປ້ອນ
//     if (searchQuery.trim() !== "") {
//       const lower = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           product.name?.toLowerCase().includes(lower) ||
//           product.category?.toLowerCase().includes(lower) ||
//           product.brand?.toLowerCase().includes(lower) ||
//           product.description?.toLowerCase().includes(lower)
//       );
//     }

//     // ກັ່ນຕອງຕາມປະເພດສິນຄ້າ
//     if (selectedCategory) {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     // ກັ່ນຕອງຕາມຍີ່ຫໍ້
//     if (selectedBrand) {
//       filtered = filtered.filter((product) => product.brand === selectedBrand);
//     }

//     setFilteredProducts(filtered);
//   }, [searchQuery, selectedCategory, selectedBrand, products]);

//   // Notification helpers
//   const showNotification = (message, severity = "success") => {
//     setNotification({ open: true, message, severity });
//   };

//   const closeNotification = () => {
//     setNotification((prev) => ({ ...prev, open: false }));
//   };

//   // Handle search
//   const handleSearch = () => {
//     // Search is already handled by useEffect
//   };

//   // Clear filters
//   const handleClearFilters = () => {
//     setSearchQuery("");
//     setSelectedCategory("");
//     setSelectedBrand("");
//   };

//   // Handle product request
//   const handleRequestProduct = (product) => {
//     setSelectedProduct(product);
//     setRequestQuantity(1);
//     setRequestDialogOpen(true);
//   };

//   // Close request dialog
//   const handleCloseRequestDialog = () => {
//     setRequestDialogOpen(false);
//     setSelectedProduct(null);
//     setRequestQuantity(1);
//   };

//   // Submit product request
//   const handleSubmitRequest = async () => {
//     if (!selectedProduct || requestQuantity <= 0) {
//       showNotification("ກະລຸນາປ້ອນຈຳນວນທີ່ຖືກຕ້ອງ", "error");
//       return;
//     }

//     if (requestQuantity > selectedProduct.quantity) {
//       showNotification("ຈຳນວນທີ່ຂໍເບີກເກີນຈຳນວນຄົງເຫຼືອ", "error");
//       return;
//     }

//     try {
//       // ອັບເດດຈຳນວນສິນຄ້າ
//       const newQuantity = selectedProduct.quantity - requestQuantity;
//       const productData = {
//         ...selectedProduct,
//         quantity: newQuantity,
//         // ປ່ຽນສະຖານະຖ້າໝົດແລ້ວ
//         status: newQuantity === 0 ? "out-of-stock" :
//           newQuantity <= selectedProduct.minQuantity ? "low-stock" : "active"
//       };

//       const response = await updateProduct(selectedProduct.id, productData);

//       if (response.success) {
//         // ອັບເດດລາຍການສິນຄ້າ
//         setProducts((prev) =>
//           prev.map((prod) =>
//             prod.id === selectedProduct.id ? response.product : prod
//           ).filter(prod => prod.quantity > 0 && prod.status === "active")
//         );

//         // ເພີ່ມໃສ່ກະຕ່າ (ຖ້າຕ້ອງການ)
//         setCart((prev) => [
//           ...prev,
//           {
//             ...selectedProduct,
//             requestedQuantity: requestQuantity,
//             requestedAt: new Date().toISOString(),
//           },
//         ]);

//         showNotification(
//           `ເບີກສິນຄ້າ ${selectedProduct.name} ຈຳນວນ ${requestQuantity} ${selectedProduct.unit} ສຳເລັດແລ້ວ`,
//           "success"
//         );

//         handleCloseRequestDialog();
//       } else {
//         showNotification("ບໍ່ສາມາດເບີກສິນຄ້າໄດ້", "error");
//       }
//     } catch (err) {
//       console.error("Error requesting product:", err);
//       showNotification("ບໍ່ສາມາດເບີກສິນຄ້າໄດ້", "error");
//     }
//   };

//   // Get status display
//   const getStatusDisplay = (product) => {
//     if (product.quantity === 0) {
//       return { color: "#c62828", bgcolor: "#ffebee", text: "ໝົດແລ້ວ" };
//     } else if (product.quantity <= product.minQuantity) {
//       return { color: "#f57f17", bgcolor: "#fff8e1", text: "ໃກ້ໝົດ" };
//     } else {
//       return { color: "#2e7d32", bgcolor: "#e8f5e9", text: "ມີໃນສາງ" };
//     }
//   };

//   // Product Card Component
//   const ProductCard = ({ product }) => {
//     const statusDisplay = getStatusDisplay(product);

//     return (
//       <Card
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           transition: "transform 0.2s, box-shadow 0.2s",
//           "&:hover": {
//             transform: "translateY(-4px)",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//           },
//           border: "1px solid #e0e0e0",
//         }}
//       >
//         <CardMedia
//           component="img"
//           height="200"
//           image={
//             product.imageUrl
//               ? `http://localhost:5001${product.imageUrl}`
//               : "/placeholder-image.png"
//           }
//           alt={product.name}
//           sx={{ objectFit: "cover" }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "/placeholder-image.png";
//           }}
//         />
//         <CardContent sx={{ flexGrow: 1, p: 2 }}>
//           <Typography
//             variant="h6"
//             component="h3"
//             sx={{
//               fontFamily: "Noto Sans Lao, sans-serif",
//               fontWeight: "bold",
//               mb: 1,
//               minHeight: "1.5em",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               display: "-webkit-box",
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: "vertical",
//             }}
//           >
//             {product.name}
//           </Typography>

//           <Box sx={{ mb: 1 }}>
//             <Chip
//               label={product.category}
//               size="small"
//               sx={{
//                 bgcolor: "#e3f2fd",
//                 color: "#1976d2",
//                 fontFamily: "Noto Sans Lao, sans-serif",
//                 fontSize: "0.75rem",
//               }}
//             />
//           </Box>

//           <Typography
//             variant="body2"
//             sx={{
//               fontFamily: "Noto Sans Lao, sans-serif",
//               color: "text.secondary",
//               mb: 1,
//             }}
//           >
//             ຍີ່ຫໍ້: {product.brand || "ບໍ່ລະບຸ"}
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 1,
//             }}
//           >
//             <Typography
//               variant="body2"
//               sx={{
//                 fontFamily: "Noto Sans Lao, sans-serif",
//                 fontWeight: "bold",
//               }}
//             >
//               ຄົງເຫຼືອ: {product.quantity} {product.unit}
//             </Typography>
//             <Chip
//               label={statusDisplay.text}
//               size="small"
//               sx={{
//                 bgcolor: statusDisplay.bgcolor,
//                 color: statusDisplay.color,
//                 fontFamily: "Noto Sans Lao, sans-serif",
//                 fontSize: "0.7rem",
//               }}
//             />
//           </Box>

//           <Button
//             fullWidth
//             variant="contained"
//             startIcon={<AddShoppingCartIcon />}
//             onClick={() => handleRequestProduct(product)}
//             disabled={product.quantity === 0}
//             sx={{
//               bgcolor: "#079578",
//               "&:hover": { bgcolor: "#046c56" },
//               fontFamily: "Noto Sans Lao, sans-serif",
//               mt: 1,
//             }}
//           >
//             ເລືອກສິນຄ້າ
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   };

//   return (
//     <Box sx={{ fontFamily: "Noto Sans Lao, sans-serif", p: 3 }}>
//       {/* Header */}
//       <Paper sx={{ p: 3, mb: 3, bgcolor: "#079578", color: "white" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: 2,
//           }}
//         >
//           <Typography
//             variant="h4"
//             component="h1"
//             sx={{
//               fontFamily: "Noto Sans Lao, sans-serif",
//               fontWeight: "bold",
//             }}
//           >
//             ລາຍການສິນຄ້າໃນສາງ
//           </Typography>
//           <IconButton
//             color="inherit"
//             onClick={() => setCartOpen(true)}
//             sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
//           >
//             <Badge badgeContent={cart.length} color="error">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//         </Box>
//       </Paper>

//       {/* Filters */}
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               placeholder="ຄົ້ນຫາສິນຄ້າ..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "25px",
//                   fontFamily: "Noto Sans Lao, sans-serif",
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchQuery && (
//                   <InputAdornment position="end">
//                     <IconButton
//                       size="small"
//                       onClick={() => setSearchQuery("")}
//                     >
//                       <ClearIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                 ປະເພດສິນຄ້າ
//               </InputLabel>
//               <Select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 label="ປະເພດສິນຄ້າ"
//                 sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//               >
//                 <MenuItem value="">
//                   <em>ທັງໝົດ</em>
//                 </MenuItem>
//                 {categories.map((category) => (
//                   <MenuItem
//                     key={category}
//                     value={category}
//                     sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                   >
//                     {category}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                 ຍີ່ຫໍ້
//               </InputLabel>
//               <Select
//                 value={selectedBrand}
//                 onChange={(e) => setSelectedBrand(e.target.value)}
//                 label="ຍີ່ຫໍ້"
//                 sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//               >
//                 <MenuItem value="">
//                   <em>ທັງໝົດ</em>
//                 </MenuItem>
//                 {brands.map((brand) => (
//                   <MenuItem
//                     key={brand}
//                     value={brand}
//                     sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//                   >
//                     {brand}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={2}>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleClearFilters}
//                 startIcon={<ClearIcon />}
//                 sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//               >
//                 ລ້າງ
//               </Button>
//               <Tooltip title="ປ່ຽນການສະແດງຜົນ">
//                 <IconButton
//                   onClick={() =>
//                     setViewMode(viewMode === "grid" ? "list" : "grid")
//                   }
//                 >
//                   {viewMode === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Loading */}
//       {loading && (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
//           <CircularProgress size={60} sx={{ color: "#079578" }} />
//         </Box>
//       )}

//       {/* Error */}
//       {error && !loading && (
//         <Alert severity="error" sx={{ my: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Products Grid */}
//       {!loading && (
//         <>
//           <Box sx={{ mb: 2 }}>
//             <Typography
//               variant="h6"
//               sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//             >
//               ພົບ {filteredProducts.length} ລາຍການ
//             </Typography>
//           </Box>

//           {filteredProducts.length === 0 ? (
//             <Paper sx={{ p: 5, textAlign: "center" }}>
//               <Typography
//                 variant="h6"
//                 sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}
//               >
//                 ບໍ່ພົບສິນຄ້າທີ່ຄົ້ນຫາ
//               </Typography>
//             </Paper>
//           ) : (
//             <Grid container spacing={3}>
//               {filteredProducts.map((product) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={4}
//                   lg={3}
//                   key={product.id}
//                 >
//                   <ProductCard product={product} />
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </>
//       )}

//       {/* Request Product Dialog */}
//       <Dialog
//         open={requestDialogOpen}
//         onClose={handleCloseRequestDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//           ເບີກສິນຄ້າ
//         </DialogTitle>
//         <DialogContent>
//           {selectedProduct && (
//             <Box sx={{ pt: 2 }}>
//               <Typography
//                 variant="h6"
//                 sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}
//               >
//                 {selectedProduct.name}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}
//               >
//                 ຄົງເຫຼືອ: {selectedProduct.quantity} {selectedProduct.unit}
//               </Typography>
//               <TextField
//                 label="ຈຳນວນທີ່ຕ້ອງການເບີກ"
//                 type="number"
//                 fullWidth
//                 value={requestQuantity}
//                 onChange={(e) => setRequestQuantity(Number(e.target.value))}
//                 inputProps={{
//                   min: 1,
//                   max: selectedProduct.quantity,
//                 }}
//                 sx={{ mt: 2 }}
//                 InputLabelProps={{
//                   style: { fontFamily: "Noto Sans Lao, sans-serif" },
//                 }}
//                 InputProps={{
//                   style: { fontFamily: "Noto Sans Lao, sans-serif" },
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       {selectedProduct.unit}
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleCloseRequestDialog}
//             sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
//           >
//             ຍົກເລີກ
//           </Button>
//           <Button
//             onClick={handleSubmitRequest}
//             variant="contained"
//             sx={{
//               bgcolor: "#079578",
//               "&:hover": { bgcolor: "#046c56" },
//               fontFamily: "Noto Sans Lao, sans-serif",
//             }}
//           >
//             ຢືນຢັນເບີກສິນຄ້າ
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Cart Dialog */}
//       <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//           ລາຍການເບີກສິນຄ້າ
//         </DialogTitle>
//         <DialogContent>
//           {cart.length === 0 ? (
//             <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", p: 2, textAlign: "center" }}>
//               ຍັງບໍ່ມີລາຍການເບີກສິນຄ້າ
//             </Typography>
//           ) : (
//             cart.map((item, index) => (
//               <Box key={index} sx={{ p: 2, border: "1px solid #e0e0e0", mb: 1, borderRadius: 1 }}>
//                 <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
//                   {item.name}
//                 </Typography>
//                 <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//                   ຈຳນວນ: {item.requestedQuantity} {item.unit}
//                 </Typography>
//                 <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontSize: "0.8rem", color: "text.secondary" }}>
//                   ເວລາ: {new Date(item.requestedAt).toLocaleString("lo-LA")}
//                 </Typography>
//               </Box>
//             ))
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setCartOpen(false)} sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//             ປິດ
//           </Button>
//           {cart.length > 0 && (
//             <Button onClick={() => setCart([])} sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
//               ລ້າງລາຍການ
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>

//       {/* Notification */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={closeNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert onClose={closeNotification} severity={notification.severity}>
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserProductInfo;





// frontend/src/component/UserProductInfo.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// import components
import UserCart from "./UserCart";

// import API functions
import {
  getAllProducts,
  searchProducts,
  updateProduct,
  getCategories,
  getBrands,
} from "../api/product.api";

const UserProductInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for products and UI
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // View mode
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [currentView, setCurrentView] = useState("products"); // 'products' or 'cart'

  // Shopping cart
  const [cart, setCart] = useState([]);

  // Product request dialog
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [requestQuantity, setRequestQuantity] = useState(1);

  // Notification
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ດຶງຂໍ້ມູນສິນຄ້າຈາກ server
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllProducts();
      if (response.success) {
        // ກັ່ນຕອງເອົາສິນຄ້າທີ່ມີສະຖານະເປັນ active ແລະມີຈຳນວນມາກກວ່າ 0
        const availableProducts = response.products.filter(
          (product) =>
            product.status === "active" &&
            product.quantity > 0
        );
        setProducts(availableProducts);
        setFilteredProducts(availableProducts);
      } else {
        setError("ບໍ່ສາມາດດຶງຂໍ້ມູນສິນຄ້າໄດ້.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("ບໍ່ສາມາດດຶງຂໍ້ມູນສິນຄ້າໄດ້. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ດຶງຂໍ້ມູນປະເພດສິນຄ້າ ແລະ ຍີ່ຫໍ້
  const fetchFilterData = useCallback(async () => {
    try {
      const [categoriesResponse, brandsResponse] = await Promise.all([
        getCategories(),
        getBrands(),
      ]);

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.categories);
      }

      if (brandsResponse.success) {
        setBrands(brandsResponse.brands);
      }
    } catch (err) {
      console.error("Error fetching filter data:", err);
    }
  }, []);

  // ດຶງຂໍ້ມູນເມື່ອ component ໂຫຼດຂຶ້ນ
  useEffect(() => {
    fetchProducts();
    fetchFilterData();
  }, [fetchProducts, fetchFilterData]);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // ຄົ້ນຫາຕາມຄຳທີ່ປ້ອນ
    if (searchQuery.trim() !== "") {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(lower) ||
          product.category?.toLowerCase().includes(lower) ||
          product.brand?.toLowerCase().includes(lower) ||
          product.description?.toLowerCase().includes(lower)
      );
    }

    // ກັ່ນຕອງຕາມປະເພດສິນຄ້າ
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // ກັ່ນຕອງຕາມຍີ່ຫໍ້
    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedBrand, products]);

  // Notification helpers
  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Handle search
  const handleSearch = () => {
    // Search is already handled by useEffect
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
  };

  // Handle product request (ເພີ່ມໃສ່ກະຕ່າ)
  const handleRequestProduct = (product) => {
    setSelectedProduct(product);
    setRequestQuantity(1);
    setRequestDialogOpen(true);
  };

  // Close request dialog
  const handleCloseRequestDialog = () => {
    setRequestDialogOpen(false);
    setSelectedProduct(null);
    setRequestQuantity(1);
  };

  // Add to cart (ເພີ່ມສິນຄ້າໃສ່ກະຕ່າ)
  const handleAddToCart = () => {
    if (!selectedProduct || requestQuantity <= 0) {
      showNotification("ກະລຸນາປ້ອນຈຳນວນທີ່ຖືກຕ້ອງ", "error");
      return;
    }

    if (requestQuantity > selectedProduct.quantity) {
      showNotification("ຈຳນວນທີ່ເລືອກເກີນຈຳນວນຄົງເຫຼືອ", "error");
      return;
    }

    // ກວດສອບວ່າສິນຄ້ານີ້ມີໃນກະຕ່າແລ້ວຫຼືບໍ່
    const existingItem = cart.find(item => item.id === selectedProduct.id);

    if (existingItem) {
      // ຖ້າມີແລ້ວ ໃຫ້ອັບເດດຈຳນວນ
      const newQuantity = existingItem.requestedQuantity + requestQuantity;
      if (newQuantity > selectedProduct.quantity) {
        showNotification("ຈຳນວນລວມເກີນຈຳນວນຄົງເຫຼືອ", "error");
        return;
      }

      setCart(prevCart =>
        prevCart.map(item =>
          item.id === selectedProduct.id
            ? { ...item, requestedQuantity: newQuantity }
            : item
        )
      );
      showNotification(`ອັບເດດຈຳນວນ ${selectedProduct.name} ໃນກະຕ່າແລ້ວ`, "success");
    } else {
      // ຖ້າຍັງບໍ່ມີ ໃຫ້ເພີ່ມໃໝ່
      const cartItem = {
        ...selectedProduct,
        requestedQuantity: requestQuantity,
        addedAt: new Date().toISOString(),
      };

      setCart(prevCart => [...prevCart, cartItem]);
      showNotification(`ເພີ່ມ ${selectedProduct.name} ໃສ່ກະຕ່າແລ້ວ`, "success");
    }

    handleCloseRequestDialog();
  };

  // Go to cart
  const handleGoToCart = () => {
    setCurrentView("cart");
  };

  // Back to products
  const handleBackToProducts = () => {
    setCurrentView("products");
  };

  // Get status display
  const getStatusDisplay = (product) => {
    if (product.quantity === 0) {
      return { color: "#c62828", bgcolor: "#ffebee", text: "ໝົດແລ້ວ" };
    } else if (product.quantity <= product.minQuantity) {
      return { color: "#f57f17", bgcolor: "#fff8e1", text: "ໃກ້ໝົດ" };
    } else {
      return { color: "#2e7d32", bgcolor: "#e8f5e9", text: "ມີໃນສາງ" };
    }
  };

  // Check if product is in cart
  const isProductInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Get quantity in cart
  const getQuantityInCart = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.requestedQuantity : 0;
  };

  // Product Card Component
  const ProductCard = ({ product }) => {
    const statusDisplay = getStatusDisplay(product);
    const inCart = isProductInCart(product.id);
    const cartQuantity = getQuantityInCart(product.id);

    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          },
          border: inCart ? "2px solid #079578" : "1px solid #e0e0e0",
          position: "relative",
        }}
      >
        {/* Badge แสดงว่าอยู่ในตะกร้า */}
        {inCart && (
          <Chip
            label={`ໃນກະຕ່າ: ${cartQuantity}`}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "#079578",
              color: "white",
              fontFamily: "Noto Sans Lao, sans-serif",
              zIndex: 1,
            }}
          />
        )}

        <CardMedia
          component="img"
          height="200"
          image={
            product.imageUrl
              ? `http://localhost:5001${product.imageUrl}`
              : "/placeholder-image.png"
          }
          alt={product.name}
          sx={{ objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-image.png";
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontFamily: "Noto Sans Lao, sans-serif",
              fontWeight: "bold",
              mb: 1,
              minHeight: "1.5em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ mb: 1 }}>
            <Chip
              label={product.category}
              size="small"
              sx={{
                bgcolor: "#e3f2fd",
                color: "#1976d2",
                fontFamily: "Noto Sans Lao, sans-serif",
                fontSize: "0.75rem",
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontFamily: "Noto Sans Lao, sans-serif",
              color: "text.secondary",
              mb: 1,
            }}
          >
            ຍີ່ຫໍ້: {product.brand || "ບໍ່ລະບຸ"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Noto Sans Lao, sans-serif",
                fontWeight: "bold",
              }}
            >
              ຄົງເຫຼືອ: {product.quantity} {product.unit}
            </Typography>
            <Chip
              label={statusDisplay.text}
              size="small"
              sx={{
                bgcolor: statusDisplay.bgcolor,
                color: statusDisplay.color,
                fontFamily: "Noto Sans Lao, sans-serif",
                fontSize: "0.7rem",
              }}
            />
          </Box>

          <Button
            fullWidth
            variant={inCart ? "outlined" : "contained"}
            startIcon={<AddShoppingCartIcon />}
            onClick={() => handleRequestProduct(product)}
            disabled={product.quantity === 0}
            sx={{
              bgcolor: inCart ? "transparent" : "#079578",
              color: inCart ? "#079578" : "white",
              borderColor: inCart ? "#079578" : "transparent",
              "&:hover": {
                bgcolor: inCart ? "rgba(7, 149, 120, 0.1)" : "#046c56",
                borderColor: "#079578"
              },
              fontFamily: "Noto Sans Lao, sans-serif",
              mt: 1,
            }}
          >
            {inCart ? "ເພີ່ມອີກ" : "ເລືອກສິນຄ້າ"}
          </Button>
        </CardContent>
      </Card>
    );
  };

  // ถ้าอยู่ในหน้า Cart ให้แสดง UserCart component
  if (currentView === "cart") {
    return (
      <UserCart
        cart={cart}
        setCart={setCart}
        onBackToProducts={handleBackToProducts}
      />
    );
  }

  // หน้าสินค้า
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
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: "Noto Sans Lao, sans-serif",
              fontWeight: "bold",
            }}
          >
            ລາຍການສິນຄ້າໃນສາງ
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleGoToCart}
            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="ຄົ້ນຫາສິນຄ້າ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  fontFamily: "Noto Sans Lao, sans-serif",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery("")}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                ປະເພດສິນຄ້າ
              </InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="ປະເພດສິນຄ້າ"
                sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
              >
                <MenuItem value="">
                  <em>ທັງໝົດ</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                ຍີ່ຫໍ້
              </InputLabel>
              <Select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                label="ຍີ່ຫໍ້"
                sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
              >
                <MenuItem value="">
                  <em>ທັງໝົດ</em>
                </MenuItem>
                {brands.map((brand) => (
                  <MenuItem
                    key={brand}
                    value={brand}
                    sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                  >
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                startIcon={<ClearIcon />}
                sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
              >
                ລ້າງ
              </Button>
              <Tooltip title="ປ່ຽນການສະແດງຜົນ">
                <IconButton
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                >
                  {viewMode === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: "#e8f5e9", borderLeft: "4px solid #079578" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
              ມີສິນຄ້າໃນກະຕ່າ: {cart.length} ລາຍການ
              ({cart.reduce((sum, item) => sum + item.requestedQuantity, 0)} ລວມ)
            </Typography>
            <Button
              variant="contained"
              onClick={handleGoToCart}
              sx={{
                bgcolor: "#079578",
                "&:hover": { bgcolor: "#046c56" },
                fontFamily: "Noto Sans Lao, sans-serif",
              }}
            >
              ເບິ່ງກະຕ່າ
            </Button>
          </Box>
        </Paper>
      )}

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress size={60} sx={{ color: "#079578" }} />
        </Box>
      )}

      {/* Error */}
      {error && !loading && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {/* Products Grid */}
      {!loading && (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
            >
              ພົບ {filteredProducts.length} ລາຍການ
            </Typography>
          </Box>

          {filteredProducts.length === 0 ? (
            <Paper sx={{ p: 5, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}
              >
                ບໍ່ພົບສິນຄ້າທີ່ຄົ້ນຫາ
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.id}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Request Product Dialog */}
      <Dialog
        open={requestDialogOpen}
        onClose={handleCloseRequestDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
          ເລືອກສິນຄ້າໃສ່ກະຕ່າ
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ pt: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}
              >
                {selectedProduct.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}
              >
                ຄົງເຫຼືອ: {selectedProduct.quantity} {selectedProduct.unit}
              </Typography>

              {/* แสดงจำนวนที่มีในตะกร้าแล้ว */}
              {isProductInCart(selectedProduct.id) && (
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Noto Sans Lao, sans-serif",
                    mb: 2,
                    color: "#079578",
                    fontWeight: "bold"
                  }}
                >
                  ມີໃນກະຕ່າແລ້ວ: {getQuantityInCart(selectedProduct.id)} {selectedProduct.unit}
                </Typography>
              )}

              <TextField
                label="ຈຳນວນທີ່ຕ້ອງການເພີ່ມ"
                type="number"
                fullWidth
                value={requestQuantity}
                onChange={(e) => setRequestQuantity(Number(e.target.value))}
                inputProps={{
                  min: 1,
                  max: selectedProduct.quantity - getQuantityInCart(selectedProduct.id),
                }}
                sx={{ mt: 2 }}
                InputLabelProps={{
                  style: { fontFamily: "Noto Sans Lao, sans-serif" },
                }}
                InputProps={{
                  style: { fontFamily: "Noto Sans Lao, sans-serif" },
                  endAdornment: (
                    <InputAdornment position="end">
                      {selectedProduct.unit}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseRequestDialog}
            sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
          >
            ຍົກເລີກ
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            sx={{
              bgcolor: "#079578",
              "&:hover": { bgcolor: "#046c56" },
              fontFamily: "Noto Sans Lao, sans-serif",
            }}
          >
            ເພີ່ມໃສ່ກະຕ່າ
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

export default UserProductInfo;