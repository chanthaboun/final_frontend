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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

// Mock Data - ຂໍ້ມູນຈຳລອງສຳລັບສິນຄ້າ
const mockProducts = [
	{
		id: "1",
		name: "Forklift Lights",
		category: "ອຸປະກອນໄຟຟ້າ",
		price: 250000,
		stock: 30,
		image: "/images/Niicha (11).jpg",
	},
	{
		id: "2",
		name: "Forklift tires",
		category: "ອຸປະກອນເຄື່ອງຈັກ",
		price: 380000,
		stock: 30,
		image: "/images/Forklift-Logo.png",
	},
	{
		id: "3",
		name: "Forklift Screws",
		category: "ອຸປະກອນເຄື່ອງຈັກ",
		price: 25000,
		stock: 30,
		image: "/images/Niicha.jpg",
	},
	{
		id: "4",
		name: "Forklift Lights",
		category: "ອຸປະກອນໄຟຟ້າ",
		price: 220000,
		stock: 30,
		image: "/images/Pe2.jpg",
	},
	{
		id: "5",
		name: "Forklift Lights",
		category: "ອຸປະກອນເຄື່ອງຈັກ",
		price: 290000,
		stock: 30,
		image: "/images/Nu1.jpg",
	},
	{
		id: "6",
		name: "Forklift Lights",
		category: "ອຸປະກອນໄຟຟ້າ",
		price: 320000,
		stock: 30,
		image: "/images/Niicha.jpg",
	},
];

const ProductInfo = () => {
	// State for products and UI
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [cart, setCart] = useState([]);

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	// Initialize - load mock data
	useEffect(() => {
		setLoading(true);
		// Simulate API delay
		setTimeout(() => {
			setProducts(mockProducts);
			setLoading(false);
		}, 700);
	}, []);

	// useNavigate
	const navigate = useNavigate();

	// ຟັງຊັນສຳລັບການໄປທີ່ໜ້າການຊື້
	const handleNavigateToCart = () => {
		navigate("/cart");
	};

	// ຟັງຊັນສຳລັບການເພີ່ມສິນຄ້າລົງກະຕ່າ
	const handleAddToCart = (product) => {
		// ເພີ່ມສິນຄ້າລົງກະຕ່າ
		setCart([...cart, product]);

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
						}}
					>
						ເລືອກຊື້ສິນຄ້າ
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
							{cart.length > 0 && (
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
									}}
								>
									{cart.length}
								</Box>
							)}
						</Box>
					</Box>
				</Box>

				{loading && (
					<Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
						<CircularProgress color="primary" />
					</Box>
				)}

				{/* ສະແດງລາຍການສິນຄ້າ */}
				{!loading && (
					<Grid container spacing={3}>
						{products.map((product) => (
							<Grid item xs={12} sm={6} md={4} key={product.id}>
								<Card
									elevation={3}
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										transition: "0.3s",
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
										<Box sx={{ mt: 1 }}>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												ປະເພດສິນຄ້າ: {product.category}
											</Typography>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												ຈຳນວນໃນສະຕັອກ: {product.stock}
											</Typography>
										</Box>
									</CardContent>
									<CardActions
										sx={{ justifyContent: "space-between", padding: 2 }}
									>
										<Button
											variant="contained"
											startIcon={<AddIcon />}
											onClick={() => handleAddToCart(product)}
											sx={{
												bgcolor: "#079578",
												"&:hover": { bgcolor: "#046c56" },
												borderRadius: "4px",
												color: "white",
												fontFamily: "Noto Sans Lao, sans-serif",
												flexGrow: 1,
											}}
										>
											ເພີ່ມສິນຄ້າ
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
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