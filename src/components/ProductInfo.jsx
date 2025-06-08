// // frontend/src/pages/ProductInfo.jsx
// import React, { useState, useEffect } from "react";
// import {
// 	Box,
// 	Typography,
// 	Paper,
// 	Button,
// 	Grid,
// 	Card,
// 	CardMedia,
// 	CardContent,
// 	CardActions,
// 	Snackbar,
// 	Alert,
// 	CircularProgress,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useNavigate } from "react-router-dom";

// // Mock Data - ຂໍ້ມູນຈຳລອງສຳລັບສິນຄ້າ
// const mockProducts = [
// 	{
// 		id: "1",
// 		name: "Forklift Lights",
// 		category: "ອຸປະກອນໄຟຟ້າ",
// 		price: 250000,
// 		stock: 30,
// 		image: "/images/Niicha (11).jpg",
// 	},
// 	{
// 		id: "2",
// 		name: "Forklift tires",
// 		category: "ອຸປະກອນເຄື່ອງຈັກ",
// 		price: 380000,
// 		stock: 30,
// 		image: "/images/Forklift-Logo.png",
// 	},
// 	{
// 		id: "3",
// 		name: "Forklift Screws",
// 		category: "ອຸປະກອນເຄື່ອງຈັກ",
// 		price: 25000,
// 		stock: 30,
// 		image: "/images/Niicha.jpg",
// 	},
// 	{
// 		id: "4",
// 		name: "Forklift Lights",
// 		category: "ອຸປະກອນໄຟຟ້າ",
// 		price: 220000,
// 		stock: 30,
// 		image: "/images/Pe2.jpg",
// 	},
// 	{
// 		id: "5",
// 		name: "Forklift Lights",
// 		category: "ອຸປະກອນເຄື່ອງຈັກ",
// 		price: 290000,
// 		stock: 30,
// 		image: "/images/Nu1.jpg",
// 	},
// 	{
// 		id: "6",
// 		name: "Forklift Lights",
// 		category: "ອຸປະກອນໄຟຟ້າ",
// 		price: 320000,
// 		stock: 30,
// 		image: "/images/Niicha.jpg",
// 	},
// ];

// const ProductInfo = () => {
// 	// State for products and UI
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [cart, setCart] = useState([]);

// 	// Notification (Snackbar)
// 	const [notification, setNotification] = useState({
// 		open: false,
// 		message: "",
// 		severity: "success",
// 	});

// 	// Initialize - load mock data
// 	useEffect(() => {
// 		setLoading(true);
// 		// Simulate API delay
// 		setTimeout(() => {
// 			setProducts(mockProducts);
// 			setLoading(false);
// 		}, 700);
// 	}, []);

// 	// useNavigate
// 	const navigate = useNavigate();

// 	// ຟັງຊັນສຳລັບການໄປທີ່ໜ້າການຊື້
// 	const handleNavigateToCart = () => {
// 		navigate("/cart");
// 	};

// 	// ຟັງຊັນສຳລັບການເພີ່ມສິນຄ້າລົງກະຕ່າ
// 	const handleAddToCart = (product) => {
// 		// ເພີ່ມສິນຄ້າລົງກະຕ່າ
// 		setCart([...cart, product]);

// 		// ສະແດງການແຈ້ງເຕືອນ
// 		showNotification(`ເພີ່ມ ${product.name} ລົງກະຕ່າແລ້ວ`, "success");
// 	};

// 	// Snackbar helpers
// 	const showNotification = (message, severity = "success") => {
// 		setNotification({ open: true, message, severity });
// 	};

// 	const closeNotification = () => {
// 		setNotification((prev) => ({ ...prev, open: false }));
// 	};

// 	return (
// 		<Box sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// 			<Paper sx={{ padding: 3, mb: 3 }}>
// 				{/* ສ່ວນຫົວຂອງໜ້າ */}
// 				<Box sx={{ position: "relative" }}>
// 					<Typography
// 						variant="h6"
// 						component="h1"
// 						sx={{
// 							color: "white",
// 							bgcolor: "#079578",
// 							p: 2,
// 							borderRadius: "4px 4px 0 0",
// 							mb: 2,
// 							fontWeight: "bold",
// 							fontFamily: "Noto Sans Lao, sans-serif",
// 						}}
// 					>
// 						ເລືອກຊື້ສິນຄ້າ
// 					</Typography>

// 					{/* ກະຕ່າສິນຄ້າ */}
// 					<Box
// 						sx={{
// 							position: "absolute",
// 							top: 10,
// 							right: 10,
// 							display: "flex",
// 							alignItems: "center",
// 							backgroundColor: "#f5f5f5",
// 							borderRadius: "50%",
// 							padding: "8px",
// 							cursor: "pointer",
// 						}}
// 						onClick={handleNavigateToCart}
// 					>
// 						<Box
// 							sx={{
// 								position: "relative",
// 								display: "flex",
// 								alignItems: "center",
// 								justifyContent: "center",
// 							}}
// 						>
// 							<ShoppingCartIcon sx={{ color: "#079578", fontSize: "2rem" }} />
// 							{cart.length > 0 && (
// 								<Box
// 									sx={{
// 										position: "absolute",
// 										top: -8,
// 										right: -8,
// 										backgroundColor: "red",
// 										color: "white",
// 										borderRadius: "50%",
// 										width: 20,
// 										height: 20,
// 										display: "flex",
// 										alignItems: "center",
// 										justifyContent: "center",
// 										fontSize: "0.75rem",
// 										fontWeight: "bold",
// 									}}
// 								>
// 									{cart.length}
// 								</Box>
// 							)}
// 						</Box>
// 					</Box>
// 				</Box>

// 				{loading && (
// 					<Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
// 						<CircularProgress color="primary" />
// 					</Box>
// 				)}

// 				{/* ສະແດງລາຍການສິນຄ້າ */}
// 				{!loading && (
// 					<Grid container spacing={3}>
// 						{products.map((product) => (
// 							<Grid item xs={12} sm={6} md={4} key={product.id}>
// 								<Card
// 									elevation={3}
// 									sx={{
// 										height: "100%",
// 										display: "flex",
// 										flexDirection: "column",
// 										transition: "0.3s",
// 										"&:hover": {
// 											transform: "translateY(-5px)",
// 											boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
// 										},
// 									}}
// 								>
// 									<CardMedia
// 										component="img"
// 										height="180"
// 										image={product.image}
// 										alt={product.name}
// 										sx={{
// 											objectFit: "contain",
// 											padding: 2,
// 											backgroundColor: "#f9f9f9",
// 										}}
// 									/>
// 									<CardContent sx={{ flexGrow: 1 }}>
// 										<Typography
// 											gutterBottom
// 											variant="h6"
// 											component="div"
// 											align="center"
// 											sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 										>
// 											{product.name}
// 										</Typography>
// 										<Box sx={{ mt: 1 }}>
// 											<Typography
// 												variant="body2"
// 												color="text.secondary"
// 												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 											>
// 												ປະເພດສິນຄ້າ: {product.category}
// 											</Typography>
// 											<Typography
// 												variant="body2"
// 												color="text.secondary"
// 												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 											>
// 												ຈຳນວນໃນສະຕັອກ: {product.stock}
// 											</Typography>
// 										</Box>
// 									</CardContent>
// 									<CardActions
// 										sx={{ justifyContent: "space-between", padding: 2 }}
// 									>
// 										<Button
// 											variant="contained"
// 											startIcon={<AddIcon />}
// 											onClick={() => handleAddToCart(product)}
// 											sx={{
// 												bgcolor: "#079578",
// 												"&:hover": { bgcolor: "#046c56" },
// 												borderRadius: "4px",
// 												color: "white",
// 												fontFamily: "Noto Sans Lao, sans-serif",
// 												flexGrow: 1,
// 											}}
// 										>
// 											ເພີ່ມສິນຄ້າ
// 										</Button>
// 									</CardActions>
// 								</Card>
// 							</Grid>
// 						))}
// 					</Grid>
// 				)}

// 				{/* Notification Snackbar */}
// 				<Snackbar
// 					open={notification.open}
// 					autoHideDuration={3000}
// 					onClose={closeNotification}
// 					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// 				>
// 					<Alert
// 						onClose={closeNotification}
// 						severity={notification.severity}
// 						sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 					>
// 						{notification.message}
// 					</Alert>
// 				</Snackbar>
// 			</Paper>
// 		</Box>
// 	);
// };

// export default ProductInfo;

// // frontend/src/pages/ProductInfo.jsx
// import React, { useState, useEffect } from "react";
// import {
// 	Box,
// 	Typography,
// 	Paper,
// 	Button,
// 	Grid,
// 	Card,
// 	CardMedia,
// 	CardContent,
// 	CardActions,
// 	Snackbar,
// 	Alert,
// 	CircularProgress,
// 	Chip,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import WarningIcon from "@mui/icons-material/Warning";
// import { useNavigate } from "react-router-dom";

// // Import API function to get products
// import { getAllProducts } from "../api/product.api";

// const ProductInfo = () => {
// 	// State for products and UI
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [cart, setCart] = useState([]);
// 	const [error, setError] = useState(null);

// 	// Notification (Snackbar)
// 	const [notification, setNotification] = useState({
// 		open: false,
// 		message: "",
// 		severity: "success",
// 	});

// 	// Fetch products with low stock (quantity <= 5)
// 	useEffect(() => {
// 		const fetchLowStockProducts = async () => {
// 			setLoading(true);
// 			setError(null);

// 			try {
// 				const response = await getAllProducts();

// 				if (response.success) {
// 					// Filter products with quantity <= 5
// 					const lowStockProducts = response.products.filter(
// 						(product) => product.quantity <= 5,
// 					);

// 					// Map the products to include necessary fields
// 					const mappedProducts = lowStockProducts.map((product) => ({
// 						id: product.id,
// 						name: product.name,
// 						category: product.category || "ບໍ່ລະບຸປະເພດ",
// 						brand: product.brand || "ບໍ່ລະບຸຍີ່ຫໍ້",
// 						unit: product.unit || "ໜ່ວຍ",
// 						quantity: product.quantity,
// 						image: product.imageUrl
// 							? `http://localhost:5001${product.imageUrl}`
// 							: "/placeholder-image.png",
// 						status: product.status,
// 						description: product.description || "",
// 					}));

// 					setProducts(mappedProducts);

// 					// Show notification if there are low stock products
// 					if (mappedProducts.length > 0) {
// 						showNotification(
// 							`ມີສິນຄ້າທີ່ໃກ້ໝົດ ${mappedProducts.length} ລາຍການ`,
// 							"warning",
// 						);
// 					}
// 				} else {
// 					setError("ບໍ່ສາມາດດຶງຂໍ້ມູນສິນຄ້າໄດ້");
// 				}
// 			} catch (err) {
// 				console.error("Error fetching products:", err);
// 				setError("ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchLowStockProducts();
// 	}, []);

// 	// useNavigate
// 	const navigate = useNavigate();

// 	// ຟັງຊັນສຳລັບການໄປທີ່ໜ້າການຊື້
// 	const handleNavigateToCart = () => {
// 		navigate("/cart");
// 	};

// 	// ຟັງຊັນສຳລັບການເພີ່ມສິນຄ້າລົງກະຕ່າ
// 	const handleAddToCart = (product) => {
// 		// Check if product is out of stock
// 		if (product.quantity === 0) {
// 			showNotification(`ສິນຄ້າ ${product.name} ໝົດແລ້ວ`, "error");
// 			return;
// 		}

// 		// ເພີ່ມສິນຄ້າລົງກະຕ່າ
// 		setCart([...cart, product]);

// 		// ສະແດງການແຈ້ງເຕືອນ
// 		showNotification(`ເພີ່ມ ${product.name} ລົງກະຕ່າແລ້ວ`, "success");
// 	};

// 	// Snackbar helpers
// 	const showNotification = (message, severity = "success") => {
// 		setNotification({ open: true, message, severity });
// 	};

// 	const closeNotification = () => {
// 		setNotification((prev) => ({ ...prev, open: false }));
// 	};

// 	// Get stock status color and text
// 	const getStockStatus = (quantity, unit) => {
// 		if (quantity === 0) {
// 			return { color: "error", text: "ໝົດແລ້ວ" };
// 		}
// 		if (quantity <= 5) {
// 			return {
// 				color: "warning",
// 				text: `ເຫຼືອ ${quantity} ${unit || "ໜ່ວຍ"}`,
// 			};
// 		}
// 		return { color: "success", text: "ມີໃນສາງ" };
// 	};

// 	return (
// 		<Box sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// 			<Paper sx={{ padding: 3, mb: 3 }}>
// 				{/* ສ່ວນຫົວຂອງໜ້າ */}
// 				<Box sx={{ position: "relative" }}>
// 					<Typography
// 						variant="h6"
// 						component="h1"
// 						sx={{
// 							color: "white",
// 							bgcolor: "#079578",
// 							p: 2,
// 							borderRadius: "4px 4px 0 0",
// 							mb: 2,
// 							fontWeight: "bold",
// 							fontFamily: "Noto Sans Lao, sans-serif",
// 							display: "flex",
// 							alignItems: "center",
// 							gap: 1,
// 						}}
// 					>
// 						<WarningIcon sx={{ color: "#FFC107" }} />
// 						ສິນຄ້າທີ່ໃກ້ຈະໝົດ
// 					</Typography>

// 					{/* ກະຕ່າສິນຄ້າ */}
// 					<Box
// 						sx={{
// 							position: "absolute",
// 							top: 10,
// 							right: 10,
// 							display: "flex",
// 							alignItems: "center",
// 							backgroundColor: "#f5f5f5",
// 							borderRadius: "50%",
// 							padding: "8px",
// 							cursor: "pointer",
// 						}}
// 						onClick={handleNavigateToCart}
// 					>
// 						<Box
// 							sx={{
// 								position: "relative",
// 								display: "flex",
// 								alignItems: "center",
// 								justifyContent: "center",
// 							}}
// 						>
// 							<ShoppingCartIcon sx={{ color: "#079578", fontSize: "2rem" }} />
// 							{cart.length > 0 && (
// 								<Box
// 									sx={{
// 										position: "absolute",
// 										top: -8,
// 										right: -8,
// 										backgroundColor: "red",
// 										color: "white",
// 										borderRadius: "50%",
// 										width: 20,
// 										height: 20,
// 										display: "flex",
// 										alignItems: "center",
// 										justifyContent: "center",
// 										fontSize: "0.75rem",
// 										fontWeight: "bold",
// 									}}
// 								>
// 									{cart.length}
// 								</Box>
// 							)}
// 						</Box>
// 					</Box>
// 				</Box>

// 				{/* Loading state */}
// 				{loading && (
// 					<Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
// 						<CircularProgress color="primary" />
// 					</Box>
// 				)}

// 				{/* Error state */}
// 				{error && !loading && (
// 					<Alert severity="error" sx={{ my: 2 }}>
// 						{error}
// 					</Alert>
// 				)}

// 				{/* No products state */}
// 				{!loading && !error && products.length === 0 && (
// 					<Box sx={{ textAlign: "center", py: 5 }}>
// 						<Typography
// 							variant="h6"
// 							color="text.secondary"
// 							sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 						>
// 							ບໍ່ມີສິນຄ້າທີ່ໃກ້ໝົດໃນຂະນະນີ້
// 						</Typography>
// 					</Box>
// 				)}

// 				{/* ສະແດງລາຍການສິນຄ້າ */}
// 				{!loading && !error && products.length > 0 && (
// 					<Grid container spacing={3}>
// 						{products.map((product) => {
// 							const stockStatus = getStockStatus(
// 								product.quantity,
// 								product.unit,
// 							);
// 							return (
// 								<Grid item xs={12} sm={6} md={4} key={product.id}>
// 									<Card
// 										elevation={3}
// 										sx={{
// 											height: "100%",
// 											display: "flex",
// 											flexDirection: "column",
// 											transition: "0.3s",
// 											border:
// 												product.quantity === 0
// 													? "2px solid #f44336"
// 													: "1px solid #e0e0e0",
// 											"&:hover": {
// 												transform: "translateY(-5px)",
// 												boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
// 											},
// 										}}
// 									>
// 										<CardMedia
// 											component="img"
// 											height="180"
// 											image={product.image}
// 											alt={product.name}
// 											sx={{
// 												objectFit: "contain",
// 												padding: 2,
// 												backgroundColor: "#f9f9f9",
// 											}}
// 											onError={(e) => {
// 												e.target.onerror = null;
// 												e.target.src = "/placeholder-image.png";
// 											}}
// 										/>
// 										<CardContent sx={{ flexGrow: 1 }}>
// 											<Typography
// 												gutterBottom
// 												variant="h6"
// 												component="div"
// 												align="center"
// 												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 											>
// 												{product.name}
// 											</Typography>

// 											{/* Stock status chip */}
// 											<Box
// 												sx={{
// 													display: "flex",
// 													justifyContent: "center",
// 													mb: 2,
// 												}}
// 											>
// 												<Chip
// 													label={stockStatus.text}
// 													color={stockStatus.color}
// 													size="small"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												/>
// 											</Box>

// 											<Box sx={{ mt: 1 }}>
// 												<Typography
// 													variant="body2"
// 													color="text.secondary"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												>
// 													<strong>ປະເພດ:</strong> {product.category}
// 												</Typography>
// 												<Typography
// 													variant="body2"
// 													color="text.secondary"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												>
// 													<strong>ຍີ່ຫໍ້:</strong> {product.brand}
// 												</Typography>
// 												<Typography
// 													variant="body2"
// 													color="text.secondary"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												>
// 													<strong>ຫົວໜ່ວຍ:</strong> {product.unit}
// 												</Typography>
// 												<Typography
// 													variant="body2"
// 													color={product.quantity === 0 ? "error" : "warning"}
// 													sx={{
// 														fontFamily: "Noto Sans Lao, sans-serif",
// 														fontWeight: "bold",
// 														mt: 1,
// 													}}
// 												>
// 													<strong>ຈຳນວນຄົງເຫຼືອ:</strong> {product.quantity}{" "}
// 													{product.unit}
// 												</Typography>
// 											</Box>
// 										</CardContent>
// 										<CardActions
// 											sx={{ justifyContent: "space-between", padding: 2 }}
// 										>
// 											<Button
// 												variant="contained"
// 												startIcon={<AddIcon />}
// 												onClick={() => handleAddToCart(product)}
// 												disabled={product.quantity === 0}
// 												sx={{
// 													bgcolor:
// 														product.quantity === 0 ? "#e0e0e0" : "#079578",
// 													"&:hover": {
// 														bgcolor:
// 															product.quantity === 0 ? "#e0e0e0" : "#046c56",
// 													},
// 													borderRadius: "4px",
// 													color: "white",
// 													fontFamily: "Noto Sans Lao, sans-serif",
// 													flexGrow: 1,
// 												}}
// 											>
// 												{product.quantity === 0 ? "ສິນຄ້າໝົດ" : "ເພີ່ມສິນຄ້າ"}
// 											</Button>
// 										</CardActions>
// 									</Card>
// 								</Grid>
// 							);
// 						})}
// 					</Grid>
// 				)}

// 				{/* Notification Snackbar */}
// 				<Snackbar
// 					open={notification.open}
// 					autoHideDuration={3000}
// 					onClose={closeNotification}
// 					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// 				>
// 					<Alert
// 						onClose={closeNotification}
// 						severity={notification.severity}
// 						sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 					>
// 						{notification.message}
// 					</Alert>
// 				</Snackbar>
// 			</Paper>
// 		</Box>
// 	);
// };

// export default ProductInfo;




// // frontend/src/pages/ProductInfo.jsx
// import React, { useState, useEffect } from "react";
// import {
// 	Box,
// 	Typography,
// 	Paper,
// 	Button,
// 	Grid,
// 	Card,
// 	CardMedia,
// 	CardContent,
// 	CardActions,
// 	Snackbar,
// 	Alert,
// 	CircularProgress,
// 	Chip,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import WarningIcon from "@mui/icons-material/Warning";
// import { useNavigate } from "react-router-dom";

// // Import API function to get products
// import { getAllProducts } from "../api/product.api";
// // Import Cart Context
// import { useCart } from "../context/CartContext";

// const ProductInfo = () => {
// 	// State for products and UI
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	// Use Cart Context instead of local cart state
// 	const { addToCart, getTotalItems, getCartItem } = useCart();

// 	// Notification (Snackbar)
// 	const [notification, setNotification] = useState({
// 		open: false,
// 		message: "",
// 		severity: "success",
// 	});

// 	// Fetch products with low stock (quantity <= 5)
// 	useEffect(() => {
// 		const fetchLowStockProducts = async () => {
// 			setLoading(true);
// 			setError(null);

// 			try {
// 				const response = await getAllProducts();

// 				if (response.success) {
// 					// Filter products with quantity <= 5
// 					const lowStockProducts = response.products.filter(
// 						(product) => product.quantity <= 5,
// 					);

// 					// Map the products to include necessary fields
// 					const mappedProducts = lowStockProducts.map((product) => ({
// 						id: product.id,
// 						name: product.name,
// 						category: product.category || "ບໍ່ລະບຸປະເພດ",
// 						brand: product.brand || "ບໍ່ລະບຸຍີ່ຫໍ້",
// 						unit: product.unit || "ໜ່ວຍ",
// 						quantity: product.quantity,
// 						stockQuantity: product.quantity, // ເກັບຈຳນວນສິນຄ້າທີ່ມີໃນສາງ
// 						image: product.imageUrl
// 							? `http://localhost:5001${product.imageUrl}`
// 							: "/placeholder-image.png",
// 						status: product.status || "ພ້ອມ",
// 						description: product.description || "",
// 					}));

// 					setProducts(mappedProducts);

// 					// Show notification if there are low stock products
// 					if (mappedProducts.length > 0) {
// 						showNotification(
// 							`ມີສິນຄ້າທີ່ໃກ້ໝົດ ${mappedProducts.length} ລາຍການ`,
// 							"warning",
// 						);
// 					}
// 				} else {
// 					setError("ບໍ່ສາມາດດຶງຂໍ້ມູນສິນຄ້າໄດ້");
// 				}
// 			} catch (err) {
// 				console.error("Error fetching products:", err);
// 				setError("ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchLowStockProducts();
// 	}, []);

// 	// useNavigate
// 	const navigate = useNavigate();

// 	// ຟັງຊັນສຳລັບການໄປທີ່ໜ້າການຊື້
// 	const handleNavigateToCart = () => {
// 		navigate("/cart");
// 	};

// 	// ຟັງຊັນສຳລັບການເພີ່ມສິນຄ້າລົງກະຕ່າ
// 	const handleAddToCart = (product) => {
// 		// Check if product is out of stock
// 		if (product.quantity === 0) {
// 			showNotification(`ສິນຄ້າ ${product.name} ໝົດແລ້ວ`, "error");
// 			return;
// 		}

// 		// ເພີ່ມສິນຄ້າລົງກະຕ່າຜ່ານ Context
// 		addToCart(product);

// 		// ສະແດງການແຈ້ງເຕືອນ
// 		showNotification(`ເພີ່ມ ${product.name} ລົງກະຕ່າແລ້ວ`, "success");
// 	};

// 	// Snackbar helpers
// 	const showNotification = (message, severity = "success") => {
// 		setNotification({ open: true, message, severity });
// 	};

// 	const closeNotification = () => {
// 		setNotification((prev) => ({ ...prev, open: false }));
// 	};

// 	// Get stock status color and text
// 	const getStockStatus = (quantity, unit) => {
// 		if (quantity === 0) {
// 			return { color: "error", text: "ໝົດແລ້ວ" };
// 		}
// 		if (quantity <= 5) {
// 			return {
// 				color: "warning",
// 				text: `ເຫຼືອ ${quantity} ${unit || "ໜ່ວຍ"}`,
// 			};
// 		}
// 		return { color: "success", text: "ມີໃນສາງ" };
// 	};

// 	return (
// 		<Box sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
// 			<Paper sx={{ padding: 3, mb: 3 }}>
// 				{/* ສ່ວນຫົວຂອງໜ້າ */}
// 				<Box sx={{ position: "relative" }}>
// 					<Typography
// 						variant="h6"
// 						component="h1"
// 						sx={{
// 							color: "white",
// 							bgcolor: "#079578",
// 							p: 2,
// 							borderRadius: "4px 4px 0 0",
// 							mb: 2,
// 							fontWeight: "bold",
// 							fontFamily: "Noto Sans Lao, sans-serif",
// 							display: "flex",
// 							alignItems: "center",
// 							gap: 1,
// 						}}
// 					>
// 						<WarningIcon sx={{ color: "#FFC107" }} />
// 						ສິນຄ້າທີ່ໃກ້ຈະໝົດ
// 					</Typography>

// 					{/* ກະຕ່າສິນຄ້າ */}
// 					<Box
// 						sx={{
// 							position: "absolute",
// 							top: 10,
// 							right: 10,
// 							display: "flex",
// 							alignItems: "center",
// 							backgroundColor: "#f5f5f5",
// 							borderRadius: "50%",
// 							padding: "8px",
// 							cursor: "pointer",
// 							transition: "all 0.3s ease",
// 							"&:hover": {
// 								backgroundColor: "#e0e0e0",
// 								transform: "scale(1.05)",
// 							},
// 						}}
// 						onClick={handleNavigateToCart}
// 					>
// 						<Box
// 							sx={{
// 								position: "relative",
// 								display: "flex",
// 								alignItems: "center",
// 								justifyContent: "center",
// 							}}
// 						>
// 							<ShoppingCartIcon sx={{ color: "#079578", fontSize: "2rem" }} />
// 							{getTotalItems() > 0 && (
// 								<Box
// 									sx={{
// 										position: "absolute",
// 										top: -8,
// 										right: -8,
// 										backgroundColor: "red",
// 										color: "white",
// 										borderRadius: "50%",
// 										width: 20,
// 										height: 20,
// 										display: "flex",
// 										alignItems: "center",
// 										justifyContent: "center",
// 										fontSize: "0.75rem",
// 										fontWeight: "bold",
// 										animation: "pulse 2s infinite",
// 										"@keyframes pulse": {
// 											"0%": {
// 												transform: "scale(1)",
// 											},
// 											"50%": {
// 												transform: "scale(1.2)",
// 											},
// 											"100%": {
// 												transform: "scale(1)",
// 											},
// 										},
// 									}}
// 								>
// 									{getTotalItems()}
// 								</Box>
// 							)}
// 						</Box>
// 					</Box>
// 				</Box>

// 				{/* Loading state */}
// 				{loading && (
// 					<Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
// 						<CircularProgress color="primary" />
// 					</Box>
// 				)}

// 				{/* Error state */}
// 				{error && !loading && (
// 					<Alert severity="error" sx={{ my: 2 }}>
// 						{error}
// 					</Alert>
// 				)}

// 				{/* No products state */}
// 				{!loading && !error && products.length === 0 && (
// 					<Box sx={{ textAlign: "center", py: 5 }}>
// 						<Typography
// 							variant="h6"
// 							color="text.secondary"
// 							sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 						>
// 							ບໍ່ມີສິນຄ້າທີ່ໃກ້ໝົດໃນຂະນະນີ້
// 						</Typography>
// 					</Box>
// 				)}

// 				{/* ສະແດງລາຍການສິນຄ້າ */}
// 				{!loading && !error && products.length > 0 && (
// 					<Grid container spacing={3}>
// 						{products.map((product) => {
// 							const stockStatus = getStockStatus(
// 								product.quantity,
// 								product.unit,
// 							);

// 							// ຫາຈຳນວນທີ່ມີໃນກະຕ່າແລ້ວ
// 							const cartItem = getCartItem(product.id);
// 							const cartQuantity = cartItem ? cartItem.quantity : 0;

// 							return (
// 								<Grid item xs={12} sm={6} md={4} key={product.id}>
// 									<Card
// 										elevation={3}
// 										sx={{
// 											height: "100%",
// 											display: "flex",
// 											flexDirection: "column",
// 											transition: "0.3s",
// 											border:
// 												product.quantity === 0
// 													? "2px solid #f44336"
// 													: "1px solid #e0e0e0",
// 											"&:hover": {
// 												transform: "translateY(-5px)",
// 												boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
// 											},
// 										}}
// 									>
// 										<CardMedia
// 											component="img"
// 											height="180"
// 											image={product.image}
// 											alt={product.name}
// 											sx={{
// 												objectFit: "contain",
// 												padding: 2,
// 												backgroundColor: "#f9f9f9",
// 											}}
// 											onError={(e) => {
// 												e.target.onerror = null;
// 												e.target.src = "/placeholder-image.png";
// 											}}
// 										/>
// 										<CardContent sx={{ flexGrow: 1 }}>
// 											<Typography
// 												gutterBottom
// 												variant="h6"
// 												component="div"
// 												align="center"
// 												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 											>
// 												{product.name}
// 											</Typography>

// 											{/* Stock status chip */}
// 											<Box
// 												sx={{
// 													display: "flex",
// 													justifyContent: "center",
// 													mb: 2,
// 												}}
// 											>
// 												<Chip
// 													label={stockStatus.text}
// 													color={stockStatus.color}
// 													size="small"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												/>
// 											</Box>

// 											<Box sx={{ mt: 1 }}>
// 												<Typography
// 													variant="body2"
// 													color="text.secondary"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												>
// 													<strong>ປະເພດ:</strong> {product.category}
// 												</Typography>
// 												<Typography
// 													variant="body2"
// 													color="text.secondary"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												>
// 													<strong>ຍີ່ຫໍ້:</strong> {product.brand}
// 												</Typography>
// 												<Typography
// 													variant="body2"
// 													color="text.secondary"
// 													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 												>
// 													<strong>ຫົວໜ່ວຍ:</strong> {product.unit}
// 												</Typography>
// 												<Typography
// 													variant="body2"
// 													color={product.quantity === 0 ? "error" : "warning"}
// 													sx={{
// 														fontFamily: "Noto Sans Lao, sans-serif",
// 														fontWeight: "bold",
// 														mt: 1,
// 													}}
// 												>
// 													<strong>ຈຳນວນຄົງເຫຼືອ:</strong> {product.quantity}{" "}
// 													{product.unit}
// 												</Typography>

// 												{/* ສະແດງຈຳນວນທີ່ມີໃນກະຕ່າ */}
// 												{cartQuantity > 0 && (
// 													<Typography
// 														variant="body2"
// 														color="primary"
// 														sx={{
// 															fontFamily: "Noto Sans Lao, sans-serif",
// 															fontWeight: "bold",
// 															mt: 1,
// 															bgcolor: "#e3f2fd",
// 															p: 1,
// 															borderRadius: 1,
// 														}}
// 													>
// 														<strong>ໃນກະຕ່າ:</strong> {cartQuantity} {product.unit}
// 													</Typography>
// 												)}
// 											</Box>
// 										</CardContent>
// 										<CardActions
// 											sx={{ justifyContent: "space-between", padding: 2 }}
// 										>
// 											<Button
// 												variant="contained"
// 												startIcon={<AddIcon />}
// 												onClick={() => handleAddToCart(product)}
// 												disabled={product.quantity === 0}
// 												sx={{
// 													bgcolor:
// 														product.quantity === 0 ? "#e0e0e0" : "#079578",
// 													"&:hover": {
// 														bgcolor:
// 															product.quantity === 0 ? "#e0e0e0" : "#046c56",
// 													},
// 													borderRadius: "4px",
// 													color: "white",
// 													fontFamily: "Noto Sans Lao, sans-serif",
// 													flexGrow: 1,
// 												}}
// 											>
// 												{product.quantity === 0 ? "ສິນຄ້າໝົດ" : "ເພີ່ມສິນຄ້າ"}
// 											</Button>
// 										</CardActions>
// 									</Card>
// 								</Grid>
// 							);
// 						})}
// 					</Grid>
// 				)}

// 				{/* Notification Snackbar */}
// 				<Snackbar
// 					open={notification.open}
// 					autoHideDuration={3000}
// 					onClose={closeNotification}
// 					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// 				>
// 					<Alert
// 						onClose={closeNotification}
// 						severity={notification.severity}
// 						sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 					>
// 						{notification.message}
// 					</Alert>
// 				</Snackbar>
// 			</Paper>
// 		</Box>
// 	);
// };

// export default ProductInfo;


// frontend/src/pages/ProductInfo.jsx
import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Paper,
	Button,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Snackbar,
	Alert,
	CircularProgress,
	Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarningIcon from "@mui/icons-material/Warning";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";

// Import API function to get products
import { getAllProducts } from "../api/product.api";
// Import Cart Context
import { useCart } from "../context/CartContext";

const ProductInfo = () => {
	// State for products and UI
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Use Cart Context instead of local cart state
	const { addToCart, getTotalItems, getCartItem } = useCart();

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	// ຟັງຊັນຈັດຮູບແບບເງິນລາວ
	const formatLaoKip = (amount) => {
		if (!amount || amount === 0) return '0 ກີບ';
		// ໃຊ້ Number().toLocaleString() ເພື່ອເພີ່ມ comma
		const formatted = Number(amount).toLocaleString('en-US');
		return `${formatted} ກີບ`;
	};

	// Fetch products with low stock (quantity <= 5)
	useEffect(() => {
		const fetchLowStockProducts = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await getAllProducts();

				if (response.success) {
					// Filter products with quantity <= 5
					const lowStockProducts = response.products.filter(
						(product) => product.quantity <= 5,
					);

					// Map the products to include necessary fields
					const mappedProducts = lowStockProducts.map((product) => ({
						id: product.id,
						name: product.name,
						category: product.category || "ບໍ່ລະບຸປະເພດ",
						brand: product.brand || "ບໍ່ລະບຸຍີ່ຫໍ້",
						unit: product.unit || "ໜ່ວຍ",
						quantity: product.quantity,
						stockQuantity: product.quantity, // ເກັບຈຳນວນສິນຄ້າທີ່ມີໃນສາງ
						price: product.price || 0, // 🆕 ເພີ່ມລາຄາ
						supplier: product.supplier || "ບໍ່ລະບຸຜູ້ສະໜອງ", // 🆕 ເພີ່ມຜູ້ສະໜອງ
						image: product.imageUrl
							? `http://localhost:5001${product.imageUrl}`
							: "/placeholder-image.png",
						status: product.status || "ພ້ອມ",
						description: product.description || "",
					}));

					setProducts(mappedProducts);

					// Show notification if there are low stock products
					if (mappedProducts.length > 0) {
						showNotification(
							`ມີສິນຄ້າທີ່ໃກ້ໝົດ ${mappedProducts.length} ລາຍການ`,
							"warning",
						);
					}
				} else {
					setError("ບໍ່ສາມາດດຶງຂໍ້ມູນສິນຄ້າໄດ້");
				}
			} catch (err) {
				console.error("Error fetching products:", err);
				setError("ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ");
			} finally {
				setLoading(false);
			}
		};

		fetchLowStockProducts();
	}, []);

	// useNavigate
	const navigate = useNavigate();

	// ຟັງຊັນສຳລັບການໄປທີ່ໜ້າການຊື້
	const handleNavigateToCart = () => {
		navigate("/cart");
	};

	// ຟັງຊັນສຳລັບການເພີ່ມສິນຄ້າລົງກະຕ່າ
	const handleAddToCart = (product) => {
		// Check if product is out of stock
		if (product.quantity === 0) {
			showNotification(`ສິນຄ້າ ${product.name} ໝົດແລ້ວ`, "error");
			return;
		}

		// ເພີ່ມສິນຄ້າລົງກະຕ່າຜ່ານ Context
		addToCart(product);

		// ສະແດງການແຈ້ງເຕືອນ
		showNotification(`ເພີ່ມ ${product.name} ລົງກະຕ່າແລ້ວ`, "success");
	};

	// Snackbar helpers
	const showNotification = (message, severity = "success") => {
		setNotification({ open: true, message, severity });
	};

	const closeNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	// Get stock status color and text
	const getStockStatus = (quantity, unit) => {
		if (quantity === 0) {
			return { color: "error", text: "ໝົດແລ້ວ" };
		}
		if (quantity <= 5) {
			return {
				color: "warning",
				text: `ເຫຼືອ ${quantity} ${unit || "ໜ່ວຍ"}`,
			};
		}
		return { color: "success", text: "ມີໃນສາງ" };
	};

	return (
		<Box sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
			<Paper sx={{ padding: 3, mb: 3 }}>
				{/* ສ່ວນຫົວຂອງໜ້າ */}
				<Box sx={{ position: "relative" }}>
					<Typography
						variant="h6"
						component="h1"
						sx={{
							color: "white",
							bgcolor: "#079578",
							p: 2,
							borderRadius: "4px 4px 0 0",
							mb: 2,
							fontWeight: "bold",
							fontFamily: "Noto Sans Lao, sans-serif",
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}
					>
						<WarningIcon sx={{ color: "#FFC107" }} />
						ສິນຄ້າທີ່ໃກ້ຈະໝົດ
					</Typography>

					{/* ກະຕ່າສິນຄ້າ */}
					<Box
						sx={{
							position: "absolute",
							top: 10,
							right: 10,
							display: "flex",
							alignItems: "center",
							backgroundColor: "#f5f5f5",
							borderRadius: "50%",
							padding: "8px",
							cursor: "pointer",
							transition: "all 0.3s ease",
							"&:hover": {
								backgroundColor: "#e0e0e0",
								transform: "scale(1.05)",
							},
						}}
						onClick={handleNavigateToCart}
					>
						<Box
							sx={{
								position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<ShoppingCartIcon sx={{ color: "#079578", fontSize: "2rem" }} />
							{getTotalItems() > 0 && (
								<Box
									sx={{
										position: "absolute",
										top: -8,
										right: -8,
										backgroundColor: "red",
										color: "white",
										borderRadius: "50%",
										width: 20,
										height: 20,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "0.75rem",
										fontWeight: "bold",
										animation: "pulse 2s infinite",
										"@keyframes pulse": {
											"0%": {
												transform: "scale(1)",
											},
											"50%": {
												transform: "scale(1.2)",
											},
											"100%": {
												transform: "scale(1)",
											},
										},
									}}
								>
									{getTotalItems()}
								</Box>
							)}
						</Box>
					</Box>
				</Box>

				{/* Loading state */}
				{loading && (
					<Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
						<CircularProgress color="primary" />
					</Box>
				)}

				{/* Error state */}
				{error && !loading && (
					<Alert severity="error" sx={{ my: 2 }}>
						{error}
					</Alert>
				)}

				{/* No products state */}
				{!loading && !error && products.length === 0 && (
					<Box sx={{ textAlign: "center", py: 5 }}>
						<Typography
							variant="h6"
							color="text.secondary"
							sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
						>
							ບໍ່ມີສິນຄ້າທີ່ໃກ້ໝົດໃນຂະນະນີ້
						</Typography>
					</Box>
				)}

				{/* ສະແດງລາຍການສິນຄ້າ */}
				{!loading && !error && products.length > 0 && (
					<Grid container spacing={3}>
						{products.map((product) => {
							const stockStatus = getStockStatus(
								product.quantity,
								product.unit,
							);

							// ຫາຈຳນວນທີ່ມີໃນກະຕ່າແລ້ວ
							const cartItem = getCartItem(product.id);
							const cartQuantity = cartItem ? cartItem.quantity : 0;

							return (
								<Grid item xs={12} sm={6} md={4} key={product.id}>
									<Card
										elevation={3}
										sx={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
											transition: "0.3s",
											border:
												product.quantity === 0
													? "2px solid #f44336"
													: "1px solid #e0e0e0",
											"&:hover": {
												transform: "translateY(-5px)",
												boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
											},
										}}
									>
										<CardMedia
											component="img"
											height="180"
											image={product.image}
											alt={product.name}
											sx={{
												objectFit: "contain",
												padding: 2,
												backgroundColor: "#f9f9f9",
											}}
											onError={(e) => {
												e.target.onerror = null;
												e.target.src = "/placeholder-image.png";
											}}
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography
												gutterBottom
												variant="h6"
												component="div"
												align="center"
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												{product.name}
											</Typography>

											{/* Stock status chip */}
											<Box
												sx={{
													display: "flex",
													justifyContent: "center",
													mb: 2,
												}}
											>
												<Chip
													label={stockStatus.text}
													color={stockStatus.color}
													size="small"
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												/>
											</Box>

											<Box sx={{ mt: 1 }}>
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													<strong>ປະເພດ:</strong> {product.category}
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													<strong>ຍີ່ຫໍ້:</strong> {product.brand}
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													<strong>ຫົວໜ່ວຍ:</strong> {product.unit}
												</Typography>

												{/* 🆕 ສະແດງລາຄາ */}
												<Typography
													variant="body2"
													color="primary"
													sx={{
														fontFamily: "Noto Sans Lao, sans-serif",
														fontWeight: "bold",
														mt: 1,
														display: "flex",
														alignItems: "center",
														gap: 0.5,
													}}
												>
													<PriceChangeIcon fontSize="small" />
													<strong>ລາຄາ:</strong> {formatLaoKip(product.price)}
												</Typography>

												{/* 🆕 ສະແດງຜູ້ສະໜອງ */}
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{
														fontFamily: "Noto Sans Lao, sans-serif",
														mt: 1,
														display: "flex",
														alignItems: "center",
														gap: 0.5,
													}}
												>
													<BusinessIcon fontSize="small" />
													<strong>ຜູ້ສະໜອງ:</strong> {product.supplier}
												</Typography>

												<Typography
													variant="body2"
													color={product.quantity === 0 ? "error" : "warning"}
													sx={{
														fontFamily: "Noto Sans Lao, sans-serif",
														fontWeight: "bold",
														mt: 1,
													}}
												>
													<strong>ຈຳນວນຄົງເຫຼືອ:</strong> {product.quantity}{" "}
													{product.unit}
												</Typography>

												{/* ສະແດງຈຳນວນທີ່ມີໃນກະຕ່າ */}
												{cartQuantity > 0 && (
													<Typography
														variant="body2"
														color="primary"
														sx={{
															fontFamily: "Noto Sans Lao, sans-serif",
															fontWeight: "bold",
															mt: 1,
															bgcolor: "#e3f2fd",
															p: 1,
															borderRadius: 1,
														}}
													>
														<strong>ໃນກະຕ່າ:</strong> {cartQuantity} {product.unit}
													</Typography>
												)}
											</Box>
										</CardContent>
										<CardActions
											sx={{ justifyContent: "space-between", padding: 2 }}
										>
											<Button
												variant="contained"
												startIcon={<AddIcon />}
												onClick={() => handleAddToCart(product)}
												disabled={product.quantity === 0}
												sx={{
													bgcolor:
														product.quantity === 0 ? "#e0e0e0" : "#079578",
													"&:hover": {
														bgcolor:
															product.quantity === 0 ? "#e0e0e0" : "#046c56",
													},
													borderRadius: "4px",
													color: "white",
													fontFamily: "Noto Sans Lao, sans-serif",
													flexGrow: 1,
												}}
											>
												{product.quantity === 0 ? "ສິນຄ້າໝົດ" : "ເພີ່ມສິນຄ້າ"}
											</Button>
										</CardActions>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				)}

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
			</Paper>
		</Box>
	);
};

export default ProductInfo;