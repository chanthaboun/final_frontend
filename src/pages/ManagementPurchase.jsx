// // frontend/src/pages/ManagementPurchase.jsx
// import React, { useState, useEffect, useCallback } from "react";
// import {
// 	Box,
// 	Typography,
// 	Paper,
// 	Button,
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableRow,
// 	IconButton,
// 	TextField,
// 	InputAdornment,
// 	FormControl,
// 	Select,
// 	MenuItem,
// 	Grid,
// 	useTheme,
// 	useMediaQuery,
// 	Snackbar,
// 	Alert,
// 	CircularProgress,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// import { useNavigate } from "react-router-dom";
// import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

// // Mock Data
// const mockUsers = [
// 	{ id: "1", username: "admin", name: "ຜູ້ດູແລລະບົບ", role: "admin" },
// 	{ id: "2", username: "user1", name: "ພະນັກງານ 1", role: "user" },
// 	{ id: "3", username: "user2", name: "ພະນັກງານ 2", role: "user" },
// ];

// const mockProducts = [
// 	{ id: "1", name: "ເຄື່ອງດື່ມ ໂຄຄາໂຄລາ", price: 10000, stock: 100 },
// 	{ id: "2", name: "ເຄື່ອງດື່ມ ແພບຊີ", price: 9000, stock: 150 },
// 	{ id: "3", name: "ເຂົ້າໜົມປັງ", price: 15000, stock: 80 },
// 	{ id: "4", name: "ນ້ຳດື່ມບໍລິສຸດ", price: 5000, stock: 200 },
// 	{ id: "5", name: "ນົມສົດ", price: 12000, stock: 50 },
// ];

// const mockPurchases = [
// 	{
// 		id: "P001",
// 		date: "2025-05-10",
// 		user_id: "2",
// 	},
// 	{
// 		id: "P002",
// 		date: "2025-05-15",
// 		user_id: "3",
// 	},
// ];

// const ManagementPurchase = () => {
// 	const theme = useTheme();
// 	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// 	// State for purchases and UI
// 	const [purchases, setPurchases] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	// State for users and products
// 	const [users, setUsers] = useState([]);
// 	const [products, setProducts] = useState([]); // ກຳນົດເປັນ array ເປົ່າເພື່ອຫຼີກລ່ຽງ "map is not a function"

// 	// Pagination
// 	const [page, setPage] = useState(0);
// 	const [rowsPerPage, setRowsPerPage] = useState(3);

// 	// Search
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [filteredPurchases, setFilteredPurchases] = useState([]);

// 	// Dialog states
// 	const [open, setOpen] = useState(false);
// 	const [editMode, setEditMode] = useState(false);

// 	// Current purchase form data
// 	const [currentPurchase, setCurrentPurchase] = useState({
// 		id: "",
// 		date: "",
// 		user_id: "",
// 		invoice_no: "",
// 		total_amount: 0,
// 		items: [], // ລາຍການສິນຄ້າທີ່ຊື້
// 	});

// 	// ສຳລັບຈັດການກັບລາຍການສິນຄ້າທີ່ຈະຊື້
// 	const [currentItem, setCurrentItem] = useState({
// 		product_id: "",
// 		quantity: 1,
// 		price: 0,
// 	});

// 	// Notification (Snackbar)
// 	const [notification, setNotification] = useState({
// 		open: false,
// 		message: "",
// 		severity: "success",
// 	});

// 	// Initialization - load mock data
// 	useEffect(() => {
// 		setLoading(true);
// 		// Simulate API delay
// 		setTimeout(() => {
// 			setUsers(mockUsers);
// 			setProducts(mockProducts);
// 			setPurchases(mockPurchases);
// 			setLoading(false);
// 		}, 700);
// 	}, []);

// 	// Filter purchases on search
// 	useEffect(() => {
// 		if (searchQuery.trim() === "") {
// 			setFilteredPurchases(purchases);
// 		} else {
// 			const lower = searchQuery.toLowerCase();
// 			const filtered = purchases.filter(
// 				(purchase) =>
// 					purchase.id?.toLowerCase().includes(lower) ||
// 					purchase.date?.toLowerCase().includes(lower) ||
// 					purchase.invoice_no?.toLowerCase().includes(lower) ||
// 					getUserNameById(purchase.user_id)?.toLowerCase().includes(lower),
// 			);
// 			setFilteredPurchases(filtered);
// 		}
// 		setPage(0);
// 	}, [searchQuery, purchases]);

// 	// Snackbar helpers
// 	const showNotification = (message, severity = "success") => {
// 		setNotification({ open: true, message, severity });
// 	};

// 	const closeNotification = () => {
// 		setNotification((prev) => ({ ...prev, open: false }));
// 	};

// 	// ເພີ່ມລາຍການສິນຄ້າໃໝ່ເຂົ້າ purchase
// 	const addItemToPurchase = () => {
// 		if (!currentItem.product_id || currentItem.quantity <= 0) {
// 			showNotification("ກະລຸນາເລືອກສິນຄ້າ ແລະ ລະບຸຈຳນວນ", "error");
// 			return;
// 		}

// 		// ຊອກຫາຂໍ້ມູນລາຍລະອຽດຂອງສິນຄ້າຈາກ product_id
// 		const product = products.find((p) => p.id === currentItem.product_id);
// 		if (!product) {
// 			showNotification("ບໍ່ພົບຂໍ້ມູນສິນຄ້າ", "error");
// 			return;
// 		}

// 		// ເພີ່ມລາຍການເຂົ້າໃນ currentPurchase.items
// 		const price = currentItem.price > 0 ? currentItem.price : product.price;
// 		const newItem = {
// 			product_id: currentItem.product_id,
// 			product_name: product.name, // ເກັບຊື່ສິນຄ້າໄວ້ເພື່ອສະແດງໃນຕາຕະລາງ
// 			quantity: Number(currentItem.quantity),
// 			price: Number(price),
// 			subtotal: Number(price) * Number(currentItem.quantity),
// 		};

// 		// ກວດສອບວ່າມີລາຍການນີ້ຢູ່ແລ້ວຫຼືບໍ່
// 		const existingItemIndex = currentPurchase.items.findIndex(
// 			(item) => item.product_id === currentItem.product_id,
// 		);

// 		if (existingItemIndex >= 0) {
// 			// ຖ້າມີແລ້ວໃຫ້ອັບເດດຈຳນວນ
// 			const updatedItems = [...currentPurchase.items];
// 			const newQuantity =
// 				updatedItems[existingItemIndex].quantity + Number(currentItem.quantity);

// 			updatedItems[existingItemIndex] = {
// 				...updatedItems[existingItemIndex],
// 				quantity: newQuantity,
// 				price: Number(price),
// 				subtotal: newQuantity * Number(price),
// 			};

// 			const newTotal = updatedItems.reduce(
// 				(sum, item) => sum + item.subtotal,
// 				0,
// 			);

// 			setCurrentPurchase((prev) => ({
// 				...prev,
// 				items: updatedItems,
// 				total_amount: newTotal,
// 			}));
// 		} else {
// 			// ຖ້າບໍ່ມີລາຍການນີ້ໃຫ້ເພີ່ມໃໝ່
// 			const newItems = [...currentPurchase.items, newItem];
// 			const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);

// 			setCurrentPurchase((prev) => ({
// 				...prev,
// 				items: newItems,
// 				total_amount: newTotal,
// 			}));
// 		}

// 		// ລ້າງຂໍ້ມູນໃນຟອມລາຍການສິນຄ້າ
// 		setCurrentItem({
// 			product_id: "",
// 			quantity: 1,
// 			price: 0,
// 		});
// 	};

// 	// ລຶບລາຍການສິນຄ້າອອກຈາກລາຍການຊື້
// 	const removeItemFromPurchase = (index) => {
// 		const updatedItems = [...currentPurchase.items];
// 		updatedItems.splice(index, 1);

// 		const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);

// 		setCurrentPurchase((prev) => ({
// 			...prev,
// 			items: updatedItems,
// 			total_amount: newTotal,
// 		}));
// 	};

// 	// Open/Close Dialog
// 	const handleOpen = (isEdit, purchase = null) => {
// 		setEditMode(isEdit);
// 		if (purchase) {
// 			setCurrentPurchase({
// 				id: purchase.id,
// 				date: purchase.date || new Date().toISOString().split("T")[0],
// 				user_id: purchase.user_id || "",
// 				invoice_no: purchase.invoice_no || "",
// 				total_amount: purchase.total_amount || 0,
// 				items: purchase.items || [],
// 			});
// 		} else {
// 			const now = new Date();
// 			const formattedDate = now.toISOString().split("T")[0];

// 			setCurrentPurchase({
// 				id: `P${String(purchases.length + 1).padStart(3, "0")}`,
// 				date: formattedDate,
// 				user_id: "",
// 				invoice_no: "",
// 				total_amount: 0,
// 				items: [],
// 			});
// 		}
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	// Handle form field changes
// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setCurrentPurchase((prev) => ({ ...prev, [name]: value }));
// 	};

// 	// Handle item form field changes
// 	const handleItemChange = (e) => {
// 		const { name, value } = e.target;
// 		setCurrentItem((prev) => ({ ...prev, [name]: value }));

// 		// ຖ້າປ່ຽນແປງສິນຄ້າແລ້ວ, ດຶງລາຄາສິນຄ້າມາສະແດງ
// 		if (name === "product_id" && value) {
// 			const product = products.find((p) => p.id === value);
// 			if (product) {
// 				setCurrentItem((prev) => ({ ...prev, price: product.price }));
// 			}
// 		}
// 	};

// 	// Save or Update purchase
// 	const handleSave = () => {
// 		// ກວດສອບຂໍ້ມູນ
// 		if (
// 			!currentPurchase.date ||
// 			!currentPurchase.user_id ||
// 			currentPurchase.items.length === 0
// 		) {
// 			showNotification("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ", "error");
// 			return;
// 		}

// 		setLoading(true);

// 		// Simulate API delay
// 		setTimeout(() => {
// 			if (editMode) {
// 				// Update existing purchase
// 				setPurchases((prev) =>
// 					prev.map((p) => (p.id === currentPurchase.id ? currentPurchase : p)),
// 				);
// 				showNotification("ອັບເດດຂໍ້ມູນການຊື້ສິນຄ້າສຳເລັດແລ້ວ", "success");
// 			} else {
// 				// Create new purchase
// 				setPurchases((prev) => [...prev, currentPurchase]);
// 				showNotification("ສ້າງຂໍ້ມູນການຊື້ສິນຄ້າສຳເລັດແລ້ວ", "success");
// 			}

// 			setLoading(false);
// 			handleClose();
// 		}, 500);
// 	};

// 	// Delete purchase
// 	const handleDelete = (id) => {
// 		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການຊື້ສິນຄ້ານີ້?")) {
// 			setLoading(true);

// 			// Simulate API delay
// 			setTimeout(() => {
// 				setPurchases((prev) => prev.filter((purchase) => purchase.id !== id));
// 				showNotification("ລຶບຂໍ້ມູນການຊື້ສິນຄ້າສຳເລັດແລ້ວ", "success");
// 				setLoading(false);
// 			}, 500);
// 		}
// 	};

// 	// Pagination
// 	const handleChangePage = (event, newPage) => {
// 		setPage(newPage);
// 	};

// 	const handleChangeRowsPerPage = (event) => {
// 		setRowsPerPage(Number.parseInt(event.target.value, 10));
// 		setPage(0);
// 	};

// 	// Clear and perform search
// 	const handleClearSearch = () => {
// 		setSearchQuery("");
// 	};

// 	const handleSearch = () => {
// 		// Already handled by useEffect
// 	};

// 	// ຊອກຊື່ຜູ້ໃຊ້ຈາກ ID
// 	const getUserNameById = (userId) => {
// 		const user = users.find((u) => u.id === userId);
// 		return user ? user.username || user.name : "ບໍ່ມີຂໍ້ມູນ";
// 	};

// 	// useNavigate
// 	const navigate = useNavigate();
// 	const handleNavigate = () => {
// 		navigate("/productdata");
// 	};

// 	// Table columns
// 	const tableHeaders = [
// 		{
// 			id: "id",
// 			label: "ເລກທີໃບສັ່ງຊື້",
// 			width: 120,
// 			style: { fontFamily: "Noto Sans Lao, sans-serif" },
// 		},
// 		{
// 			id: "date",
// 			label: "ວັນທີ",
// 			width: 120,
// 			style: { fontFamily: "Noto Sans Lao, sans-serif" },
// 		},
// 		{
// 			id: "user_id",
// 			label: "ຜູ້ຊື້",
// 			width: 150,
// 			style: { fontFamily: "Noto Sans Lao, sans-serif" },
// 		},
// 		{
// 			id: "actions",
// 			label: "ພິມໃບສັ່ງຊື້",
// 			width: 120,
// 			align: "center",
// 			style: { fontFamily: "Noto Sans Lao, sans-serif" },
// 		},
// 	];

// 	return (
// 		<Box sx={{ fontFamily: "Noto Sans Lao , sans-serif" }}>
// 			<Paper sx={{ padding: 3, mb: 3 }}>
// 				<Typography
// 					variant="h6"
// 					component="h1"
// 					sx={{
// 						color: "white",
// 						bgcolor: "#079578",
// 						p: 2,
// 						borderRadius: "4px 4px 0 0",
// 						mb: 2,
// 						fontWeight: "bold",
// 						fontFamily: "Noto Sans Lao , sans-serif",
// 					}}
// 				>
// 					ຈັດການຂໍ້ມູນການຊື້ສິນຄ້າ
// 				</Typography>

// 				<Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
// 					<Grid item>
// 						<Button
// 							variant="contained"
// 							onClick={handleNavigate}
// 							startIcon={<AddIcon />}
// 							// onClick={() => handleOpen(false)}
// 							sx={{
// 								bgcolor: "#079578",
// 								"&:hover": { bgcolor: "#046c56" },
// 								borderRadius: "30px",
// 								color: "white",
// 								pl: 2,
// 								fontFamily: "Noto Sans Lao , sans-serif",
// 							}}
// 						>
// 							ສັ່ງຊື້ສິນຄ້າ
// 						</Button>
// 					</Grid>
// 					<Grid item xs={9} sm={8} md={6} lg={5}>
// 						<TextField
// 							fullWidth
// 							placeholder="ຄົ້ນຫາ..."
// 							value={searchQuery}
// 							onChange={(e) => setSearchQuery(e.target.value)}
// 							onKeyPress={(e) => e.key === "Enter" && handleSearch()}
// 							sx={{
// 								"& .MuiOutlinedInput-root": {
// 									borderRadius: "30px",
// 									fontFamily: "Noto Sans Lao, sans-serif",
// 									marginLeft: "500px",
// 								},
// 							}}
// 							InputProps={{
// 								startAdornment: (
// 									<InputAdornment position="start">
// 										<SearchIcon sx={{ fontSize: "1.2rem" }} />
// 									</InputAdornment>
// 								),
// 								endAdornment: (
// 									<InputAdornment position="end">
// 										{searchQuery && (
// 											<IconButton
// 												size="small"
// 												onClick={handleClearSearch}
// 												sx={{ padding: "4px" }}
// 											>
// 												<ClearIcon fontSize="small" />
// 											</IconButton>
// 										)}
// 										<Button
// 											variant="contained"
// 											size="small"
// 											onClick={handleSearch}
// 											sx={{
// 												ml: 1,
// 												borderRadius: "20px",
// 												fontSize: "0.75rem",
// 												padding: "4px 12px",
// 												minWidth: "60px",
// 												fontFamily: "Noto Sans Lao, sans-serif",
// 											}}
// 										>
// 											ຄົ້ນຫາ
// 										</Button>
// 									</InputAdornment>
// 								),
// 							}}
// 						/>
// 					</Grid>
// 				</Grid>

// 				{loading && (
// 					<Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
// 						<CircularProgress color="primary" />
// 					</Box>
// 				)}

// 				{error && !loading && (
// 					<Alert severity="error" sx={{ my: 2 }}>
// 						{error}
// 					</Alert>
// 				)}

// 				{/* Table */}
// 				{!loading && !error && (
// 					<Box
// 						sx={{
// 							border: "1px solid #e0e0e0",
// 							borderRadius: "4px",
// 							overflow: "hidden",
// 							position: "relative",
// 						}}
// 					>
// 						<Box sx={{ overflowX: "auto" }}>
// 							<Table stickyHeader>
// 								<TableHead>
// 									<TableRow sx={{ bgcolor: "#f5f5f5" }}>
// 										{tableHeaders.map((header) => (
// 											<TableCell
// 												key={header.id}
// 												align={header.align || "left"}
// 												style={{
// 													width: header.width,
// 													minWidth: header.width,
// 													backgroundColor: "#f5f5f5",
// 													borderBottom: "2px solid #ddd",
// 													padding: "8px",
// 													whiteSpace: "normal",
// 													fontWeight: "bold",
// 												}}
// 											>
// 												{header.label}
// 											</TableCell>
// 										))}
// 									</TableRow>
// 								</TableHead>
// 							</Table>
// 						</Box>

// 						<Box
// 							sx={{
// 								height: rowsPerPage > 3 ? "400px" : "auto",
// 								maxHeight: "400px",
// 								overflowX: "auto",
// 								overflowY: "auto",
// 							}}
// 						>
// 							<Table>
// 								<TableBody>
// 									{filteredPurchases.length > 0 ? (
// 										filteredPurchases
// 											.slice(
// 												page * rowsPerPage,
// 												page * rowsPerPage + rowsPerPage,
// 											)
// 											.map((purchase, index) => (
// 												<TableRow
// 													key={`purchase-${purchase.id}`}
// 													hover
// 													sx={{
// 														bgcolor: index % 2 === 0 ? "white" : "#f9f9f9",
// 														"&:hover": { bgcolor: "#f5f5f5" },
// 													}}
// 												>
// 													<TableCell style={{ width: tableHeaders[0].width }}>
// 														{purchase.id}
// 													</TableCell>
// 													<TableCell style={{ width: tableHeaders[1].width }}>
// 														{purchase.date
// 															? new Date(purchase.date).toLocaleDateString(
// 																	"lo-LA",
// 																)
// 															: "-"}
// 													</TableCell>
// 													<TableCell style={{ width: tableHeaders[2].width }}>
// 														{getUserNameById(purchase.user_id)}
// 													</TableCell>
// 													{/* <TableCell
// 														align="center"
// 														style={{ width: tableHeaders[3].width }}
// 													>
// 														<Box
// 															sx={{
// 																display: "flex",
// 																justifyContent: "center",
// 																gap: 1,
// 															}}
// 														>
// 															<IconButton
// 																size="small"
// 																onClick={() => handleOpen(true, purchase)}
// 																sx={{
// 																	bgcolor: "#e3f2fd",
// 																	"&:hover": { bgcolor: "#bbdefb" },
// 																	borderRadius: "4px",
// 																	p: 1,
// 																}}
// 															>
// 																<EditIcon fontSize="small" />
// 															</IconButton>
// 															<IconButton
// 																size="small"
// 																onClick={() => handleDelete(purchase.id)}
// 																sx={{
// 																	bgcolor: "#ffebee",
// 																	"&:hover": { bgcolor: "#ffcdd2" },
// 																	borderRadius: "4px",
// 																	p: 1,
// 																}}
// 															>
// 																<DeleteIcon fontSize="small" />
// 															</IconButton>
// 														</Box>
// 													</TableCell> */}
// 													<TableCell
// 														align="center"
// 														style={{ width: tableHeaders[3].width }}
// 													>
// 														<Box
// 															sx={{
// 																display: "flex",
// 																justifyContent: "center",
// 																gap: 1,
// 															}}
// 														>
// 															<IconButton
// 																size="small"
// 																onClick={() => handleOpen(true, purchase)}
// 																sx={{
// 																	bgcolor: "#e3f2fd",
// 																	"&:hover": { bgcolor: "#bbdefb" },
// 																	borderRadius: "4px",
// 																	p: 1,
// 																}}
// 															>
// 																<LocalPrintshopIcon fontSize="small" />
// 															</IconButton>
// 														</Box>
// 													</TableCell>
// 												</TableRow>
// 											))
// 									) : (
// 										<TableRow>
// 											<TableCell
// 												colSpan={tableHeaders.length}
// 												align="center"
// 												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
// 											>
// 												ຍັງບໍ່ມີລາຍການສິນຄ້າເທື່ອ
// 											</TableCell>
// 										</TableRow>
// 									)}
// 								</TableBody>
// 							</Table>
// 						</Box>
// 					</Box>
// 				)}

// 				{/* Pagination */}
// 				{!loading && !error && filteredPurchases.length > 0 && (
// 					<Box
// 						sx={{
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "space-between",
// 							mt: 2,
// 							px: 1,
// 						}}
// 					>
// 						<Box sx={{ display: "flex", alignItems: "center" }}>
// 							<Typography
// 								variant="body2"
// 								sx={{ mr: 1, fontFamily: "Noto Sans Lao, sans-serif" }}
// 							>
// 								Rows per page:
// 							</Typography>
// 							<FormControl size="small" sx={{ minWidth: 70 }}>
// 								<Select
// 									value={rowsPerPage}
// 									onChange={handleChangeRowsPerPage}
// 									variant="outlined"
// 									sx={{ height: 30 }}
// 								>
// 									<MenuItem value={3}>3</MenuItem>
// 									<MenuItem value={5}>5</MenuItem>
// 									<MenuItem value={10}>10</MenuItem>
// 								</Select>
// 							</FormControl>
// 						</Box>

// 						<Box sx={{ display: "flex", alignItems: "center" }}>
// 							<Typography variant="body2" sx={{ mr: 2 }}>
// 								{`${page * rowsPerPage + 1}-${Math.min(
// 									(page + 1) * rowsPerPage,
// 									filteredPurchases.length,
// 								)} of ${filteredPurchases.length}`}
// 							</Typography>
// 							<IconButton
// 								onClick={() => handleChangePage(null, 0)}
// 								disabled={page === 0}
// 								size="small"
// 							>
// 								<KeyboardDoubleArrowLeftIcon fontSize="small" />
// 							</IconButton>
// 							<IconButton
// 								onClick={() => handleChangePage(null, page - 1)}
// 								disabled={page === 0}
// 								size="small"
// 							>
// 								<KeyboardArrowLeftIcon fontSize="small" />
// 							</IconButton>
// 							<IconButton
// 								onClick={() => handleChangePage(null, page + 1)}
// 								disabled={
// 									page >= Math.ceil(filteredPurchases.length / rowsPerPage) - 1
// 								}
// 								size="small"
// 							>
// 								<KeyboardArrowRightIcon fontSize="small" />
// 							</IconButton>
// 							<IconButton
// 								onClick={() =>
// 									handleChangePage(
// 										null,
// 										Math.max(
// 											0,
// 											Math.ceil(filteredPurchases.length / rowsPerPage) - 1,
// 										),
// 									)
// 								}
// 								disabled={
// 									page >= Math.ceil(filteredPurchases.length / rowsPerPage) - 1
// 								}
// 								size="small"
// 							>
// 								<KeyboardDoubleArrowRightIcon fontSize="small" />
// 							</IconButton>
// 						</Box>
// 					</Box>
// 				)}
// 				<Snackbar
// 					open={notification.open}
// 					autoHideDuration={6000}
// 					onClose={closeNotification}
// 					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// 				>
// 					<Alert onClose={closeNotification} severity={notification.severity}>
// 						{notification.message}
// 					</Alert>
// 				</Snackbar>
// 			</Paper>
// 		</Box>
// 	);
// };


// export default ManagementPurchase;










// frontend/src/pages/ManagementPurchase.jsx
import React, { useState, useEffect, useCallback } from "react";
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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Divider,
	Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useNavigate } from "react-router-dom";

// Mock Data
const mockUsers = [
	{ id: "1", username: "admin", name: "ຜູ້ດູແລລະບົບ", role: "admin" },
	{ id: "2", username: "user1", name: "ພະນັກງານ 1", role: "user" },
	{ id: "3", username: "user2", name: "ພະນັກງານ 2", role: "user" },
];

const ManagementPurchase = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State for purchases and UI
	const [purchases, setPurchases] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// State for users
	const [users, setUsers] = useState([]);

	// Pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(3);

	// Search
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredPurchases, setFilteredPurchases] = useState([]);

	// Dialog states
	const [viewDialog, setViewDialog] = useState({
		open: false,
		purchase: null
	});

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	// 🆕 ຟັງຊັນໂຫຼດຂໍ້ມູນຈາກ localStorage
	const loadPurchaseHistory = useCallback(() => {
		try {
			const savedHistory = localStorage.getItem('purchaseHistory');
			if (savedHistory) {
				const parsedHistory = JSON.parse(savedHistory);
				console.log('ໂຫຼດຂໍ້ມູນປະຫວັດການສັ່ງຊື້:', parsedHistory);
				return parsedHistory;
			}
			return [];
		} catch (error) {
			console.error('ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ:', error);
			return [];
		}
	}, []);

	// 🆕 ຟັງຊັນຈັດຮູບແບບເງິນລາວ
	const formatLaoKip = (amount) => {
		if (!amount || amount === 0) return '0 ກີບ';
		const formatted = Number(amount).toLocaleString('en-US');
		return `${formatted} ກີບ`;
	};

	// Initialization - load data
	useEffect(() => {
		setLoading(true);
		// Simulate API delay
		setTimeout(() => {
			setUsers(mockUsers);
			// 🔄 ໂຫຼດຂໍ້ມູນຈາກ localStorage ແທນ mock data
			const historyData = loadPurchaseHistory();
			setPurchases(historyData);
			setLoading(false);
		}, 700);
	}, [loadPurchaseHistory]);

	// 🆕 ຟັງຊັນຣີເຟຣຊຂໍ້ມູນ
	const refreshData = () => {
		setLoading(true);
		setTimeout(() => {
			const historyData = loadPurchaseHistory();
			setPurchases(historyData);
			setLoading(false);
			showNotification("ອັບເດດຂໍ້ມູນແລ້ວ", "success");
		}, 500);
	};

	// Filter purchases on search
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredPurchases(purchases);
		} else {
			const lower = searchQuery.toLowerCase();
			const filtered = purchases.filter(
				(purchase) =>
					purchase.id?.toLowerCase().includes(lower) ||
					purchase.date?.toLowerCase().includes(lower) ||
					purchase.invoice_no?.toLowerCase().includes(lower) ||
					purchase.user_id?.toLowerCase().includes(lower),
			);
			setFilteredPurchases(filtered);
		}
		setPage(0);
	}, [searchQuery, purchases]);

	// Snackbar helpers
	const showNotification = (message, severity = "success") => {
		setNotification({ open: true, message, severity });
	};

	const closeNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	// 🆕 ເປີດ Dialog ເພື່ອເບິ່ງລາຍລະອຽດການສັ່ງຊື້
	const handleViewPurchase = (purchase) => {
		setViewDialog({
			open: true,
			purchase: purchase
		});
	};

	// 🆕 ປິດ Dialog ເບິ່ງລາຍລະອຽດ
	const handleCloseViewDialog = () => {
		setViewDialog({
			open: false,
			purchase: null
		});
	};

	// 🆕 ຟັງຊັນພິມໃບສັ່ງຊື້
	const handlePrintOrder = (purchase) => {
		// ສ້າງເນື້ອໃນສຳລັບການພິມ
		const printContent = `
			<html>
				<head>
					<title>ໃບສັ່ງຊື້ - ${purchase.id}</title>
					<style>
						body { 
							font-family: Arial, sans-serif; 
							margin: 20px; 
							font-size: 14px;
							line-height: 1.4;
						}
						.header { 
							text-align: center; 
							margin-bottom: 30px; 
							border-bottom: 2px solid #333;
							padding-bottom: 20px;
						}
						.header h1 { 
							margin: 0; 
							color: #079578; 
							font-size: 28px;
						}
						.header h2 { 
							margin: 5px 0; 
							color: #666; 
							font-size: 18px;
						}
						.info { 
							margin-bottom: 25px; 
							display: flex;
							justify-content: space-between;
						}
						.info-left, .info-right {
							width: 48%;
						}
						.info p { 
							margin: 8px 0; 
							font-size: 14px;
						}
						.info strong { 
							color: #333; 
							min-width: 120px;
							display: inline-block;
						}
						.table { 
							width: 100%; 
							border-collapse: collapse; 
							margin: 20px 0;
							font-size: 12px;
						}
						.table th, .table td { 
							border: 1px solid #ddd; 
							padding: 10px 8px; 
							text-align: left; 
							vertical-align: top;
						}
						.table th { 
							background-color: #079578; 
							color: white;
							font-weight: bold;
							text-align: center;
						}
						.table td.center { text-align: center; }
						.table td.right { text-align: right; }
						.table tr:nth-child(even) { background-color: #f9f9f9; }
						.total { 
							text-align: right; 
							margin: 30px 0; 
							font-weight: bold; 
							font-size: 18px;
							color: #079578;
						}
						.signatures {
							margin-top: 50px;
							display: flex;
							justify-content: space-between;
						}
						.signature-box {
							width: 30%;
							text-align: center;
							border-top: 1px solid #333;
							padding-top: 10px;
						}
						.signature-space {
							height: 60px;
							border-bottom: 1px solid #333;
							margin-bottom: 10px;
						}
						.footer {
							margin-top: 40px;
							text-align: center;
							color: #666;
							font-size: 12px;
							border-top: 1px solid #ddd;
							padding-top: 20px;
						}
						@media print {
							.signatures { page-break-inside: avoid; }
						}
					</style>
				</head>
				<body>
					<div class="header">
						<h1>ໃບສັ່ງຊື້ສິນຄ້າ</h1>
						<h2>Purchase Order</h2>
					</div>
					
					<div class="info">
						<div class="info-left">
							<p><strong>ເລກທີໃບສັ່ງຊື້:</strong> ${purchase.id}</p>
							<p><strong>ວັນທີສັ່ງຊື້:</strong> ${new Date(purchase.date).toLocaleDateString('lo-LA')}</p>
							<p><strong>ເລກທີໃບແຈ້ງໜີ້:</strong> ${purchase.invoice_no || '-'}</p>
						</div>
						<div class="info-right">
							<p><strong>ຜູ້ສັ່ງຊື້:</strong> ${getUserNameById(purchase.user_id)}</p>
							<p><strong>ວັນທີພິມ:</strong> ${new Date().toLocaleDateString('lo-LA')}</p>
							<p><strong>ສະຖານະ:</strong> ${purchase.status === 'completed' ? 'ສຳເລັດແລ້ວ' : 'ດຳເນີນການ'}</p>
						</div>
					</div>

					<h3 style="color: #079578; margin-bottom: 15px;">ລາຍການສິນຄ້າທີ່ສັ່ງຊື້:</h3>
					
					<table class="table">
						<thead>
							<tr>
								<th style="width: 5%;">ລຳດັບ</th>
								<th style="width: 25%;">ຊື່ສິນຄ້າ</th>
								<th style="width: 15%;">ປະເພດສິນຄ້າ</th>
								<th style="width: 12%;">ຍີ່ຫໍ້</th>
								<th style="width: 15%;">ຜູ້ສະໜອງ</th>
								<th style="width: 8%;">ຈຳນວນ</th>
								<th style="width: 10%;">ລາຄາ/ຫົວໜ່ວຍ</th>
								<th style="width: 10%;">ລາຄາລວມ</th>
							</tr>
						</thead>
						<tbody>
							${purchase.items?.map((item, index) => `
								<tr>
									<td class="center">${index + 1}</td>
									<td><strong>${item.product_name}</strong></td>
									<td class="center">${item.category || '-'}</td>
									<td class="center">${item.brand || '-'}</td>
									<td class="center">${item.supplier || 'ບໍ່ລະບຸ'}</td>
									<td class="center">${item.quantity} ${item.unit || ''}</td>
									<td class="right">${formatLaoKip(item.price)}</td>
									<td class="right"><strong>${formatLaoKip(item.subtotal)}</strong></td>
								</tr>
							`).join('') || '<tr><td colspan="8" class="center">ບໍ່ມີລາຍການສິນຄ້າ</td></tr>'}
						</tbody>
					</table>

					<div class="total">
						<p style="margin: 10px 0;">ຈຳນວນລາຍການທັງໝົດ: <span style="color: #333;">${purchase.items?.length || 0} ລາຍການ</span></p>
						<p style="margin: 10px 0; font-size: 20px;">ລາຄາລວມທັງໝົດ: <span style="color: #d32f2f;">${formatLaoKip(purchase.total_amount)}</span></p>
					</div>

					<div class="signatures">
						<div class="signature-box">
							<div class="signature-space"></div>
							<p><strong>ຜູ້ສັ່ງຊື້</strong></p>
							<p>ລາຍເຊັນ: ________________</p>
							<p>ວັນທີ: ________________</p>
						</div>
						<div class="signature-box">
							<div class="signature-space"></div>
							<p><strong>ຜູ້ອະນຸມັດ</strong></p>
							<p>ລາຍເຊັນ: ________________</p>
							<p>ວັນທີ: ________________</p>
						</div>
						<div class="signature-box">
							<div class="signature-space"></div>
							<p><strong>ຜູ້ຮັບສິນຄ້າ</strong></p>
							<p>ລາຍເຊັນ: ________________</p>
							<p>ວັນທີ: ________________</p>
						</div>
					</div>

					<div class="footer">
						<p>ໃບສັ່ງຊື້ນີ້ຖືກສ້າງໂດຍລະບົບການຈັດການສິນຄ້າ | ພິມເມື່ອ: ${new Date().toLocaleString('lo-LA')}</p>
						<p>ກະລຸນາກວດສອບຂໍ້ມູນໃຫ້ຖືກຕ້ອງກ່ອນດຳເນີນການ</p>
					</div>
				</body>
			</html>
		`;

		// ເປີດ window ໃໝ່ເພື່ອພິມ
		const printWindow = window.open('', '_blank');
		printWindow.document.write(printContent);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
		printWindow.close();

		showNotification("ເປີດໜ້າຕ່າງການພິມແລ້ວ", "success");
	};

	// Pagination
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	};

	// Clear and perform search
	const handleClearSearch = () => {
		setSearchQuery("");
	};

	const handleSearch = () => {
		// Already handled by useEffect
	};

	// ຊອກຊື່ຜູ້ໃຊ້ຈາກ ID
	const getUserNameById = (userId) => {
		// ຖ້າ userId ເປັນ JSON object string
		if (typeof userId === 'string' && userId.startsWith('{')) {
			try {
				const userObj = JSON.parse(userId);
				return userObj.username || userObj.name || userObj.fullName || 'ບໍ່ມີຂໍ້ມູນ';
			} catch (error) {
				console.log('ເກີດຂໍ້ຜິດພາດໃນການແປງຂໍ້ມູນຜູ້ໃຊ້:', error);
				return 'ບໍ່ມີຂໍ້ມູນ';
			}
		}

		// ຖ້າເປັນ string ທຳມະດາ
		if (typeof userId === 'string' && userId.trim() !== '') {
			return userId;
		}

		// ຊອກຫາໃນ mock users
		const user = users.find((u) => u.id === userId);
		return user ? user.username || user.name : userId || "ບໍ່ມີຂໍ້ມູນ";
	};

	// useNavigate
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate("/productdata");
	};

	// Table columns
	const tableHeaders = [
		{
			id: "id",
			label: "ເລກທີໃບສັ່ງຊື້",
			width: 140,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "date",
			label: "ວັນທີ",
			width: 120,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "user_id",
			label: "ຜູ້ຊື້",
			width: 120,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "total_amount",
			label: "ລາຄາລວມ",
			width: 150,
			align: "center",
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "items_count",
			label: "ຈຳນວນລາຍການ",
			width: 130,
			align: "center",
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "actions",
			label: "ຈັດການ",
			width: 180,
			align: "center",
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
	];

	return (
		<Box sx={{ fontFamily: "Noto Sans Lao , sans-serif" }}>
			<Paper sx={{ padding: 3, mb: 3 }}>
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
						fontFamily: "Noto Sans Lao , sans-serif",
					}}
				>
					ຈັດການຂໍ້ມູນການຊື້ສິນຄ້າ
				</Typography>

				<Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
					<Grid item>
						<Button
							variant="contained"
							onClick={handleNavigate}
							startIcon={<AddIcon />}
							sx={{
								bgcolor: "#079578",
								"&:hover": { bgcolor: "#046c56" },
								borderRadius: "30px",
								color: "white",
								pl: 2,
								fontFamily: "Noto Sans Lao , sans-serif",
							}}
						>
							ສັ່ງຊື້ສິນຄ້າ
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="outlined"
							onClick={refreshData}
							startIcon={<RefreshIcon />}
							sx={{
								borderRadius: "30px",
								fontFamily: "Noto Sans Lao , sans-serif",
								borderColor: "#079578",
								color: "#079578",
								"&:hover": {
									borderColor: "#046c56",
									bgcolor: "#f0f8f7"
								}
							}}
						>
							ໂຫຼດຂໍ້ມູນໃໝ່
						</Button>
					</Grid>
					<Grid item xs={9} sm={8} md={6} lg={5}>
						<TextField
							fullWidth
							placeholder="ຄົ້ນຫາ..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSearch()}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "30px",
									fontFamily: "Noto Sans Lao, sans-serif",
									marginLeft: "300px",
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon sx={{ fontSize: "1.2rem" }} />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										{searchQuery && (
											<IconButton
												size="small"
												onClick={handleClearSearch}
												sx={{ padding: "4px" }}
											>
												<ClearIcon fontSize="small" />
											</IconButton>
										)}
										<Button
											variant="contained"
											size="small"
											onClick={handleSearch}
											sx={{
												ml: 1,
												borderRadius: "20px",
												fontSize: "0.75rem",
												padding: "4px 12px",
												minWidth: "60px",
												fontFamily: "Noto Sans Lao, sans-serif",
											}}
										>
											ຄົ້ນຫາ
										</Button>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>

				{loading && (
					<Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
						<CircularProgress color="primary" />
					</Box>
				)}

				{error && !loading && (
					<Alert severity="error" sx={{ my: 2 }}>
						{error}
					</Alert>
				)}

				{/* 🆕 ສະແດງຈຳນວນຂໍ້ມູນທັງໝົດ */}
				{!loading && !error && (
					<Box sx={{ mb: 2 }}>
						<Typography
							variant="body2"
							sx={{
								fontFamily: "Noto Sans Lao, sans-serif",
								color: "#666",
								fontWeight: "500"
							}}
						>
							ມີຂໍ້ມູນການສັ່ງຊື້ທັງໝົດ: {filteredPurchases.length} ລາຍການ
						</Typography>
					</Box>
				)}

				{/* Table */}
				{!loading && !error && (
					<Box
						sx={{
							border: "1px solid #e0e0e0",
							borderRadius: "4px",
							overflow: "hidden",
							position: "relative",
						}}
					>
						<Box sx={{ overflowX: "auto" }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow sx={{ bgcolor: "#f5f5f5" }}>
										{tableHeaders.map((header) => (
											<TableCell
												key={header.id}
												align={header.align || "left"}
												style={{
													width: header.width,
													minWidth: header.width,
													backgroundColor: "#f5f5f5",
													borderBottom: "2px solid #ddd",
													padding: "8px",
													whiteSpace: "normal",
													fontWeight: "bold",
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
								height: rowsPerPage > 5 ? "400px" : "auto",
								maxHeight: "400px",
								overflowX: "auto",
								overflowY: "auto",
							}}
						>
							<Table>
								<TableBody>
									{filteredPurchases.length > 0 ? (
										filteredPurchases
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage,
											)
											.map((purchase, index) => (
												<TableRow
													key={`purchase-${purchase.id}`}
													hover
													sx={{
														bgcolor: index % 2 === 0 ? "white" : "#f9f9f9",
														"&:hover": { bgcolor: "#f5f5f5" },
													}}
												>
													<TableCell style={{ width: tableHeaders[0].width }}>
														<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "500" }}>
															{purchase.id}
														</Typography>
													</TableCell>
													<TableCell style={{ width: tableHeaders[1].width }}>
														<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
															{purchase.date
																? new Date(purchase.date).toLocaleDateString("lo-LA")
																: "-"}
														</Typography>
													</TableCell>
													<TableCell style={{ width: tableHeaders[2].width }}>
														<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
															{getUserNameById(purchase.user_id)}
														</Typography>
													</TableCell>
													<TableCell
														align="center"
														style={{ width: tableHeaders[3].width }}
													>
														<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
															<PriceChangeIcon fontSize="small" color="primary" />
															<Typography sx={{
																fontFamily: "Noto Sans Lao, sans-serif",
																fontWeight: "bold",
																color: "#079578"
															}}>
																{formatLaoKip(purchase.total_amount)}
															</Typography>
														</Box>
													</TableCell>
													<TableCell
														align="center"
														style={{ width: tableHeaders[4].width }}
													>
														<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
															<CalculateIcon fontSize="small" color="action" />
															<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
																{purchase.items?.length || 0} ລາຍການ
															</Typography>
														</Box>
													</TableCell>
													<TableCell
														align="center"
														style={{ width: tableHeaders[5].width }}
													>
														<Box
															sx={{
																display: "flex",
																justifyContent: "center",
																gap: 1,
															}}
														>
															<IconButton
																size="small"
																onClick={() => handleViewPurchase(purchase)}
																sx={{
																	bgcolor: "#e3f2fd",
																	"&:hover": { bgcolor: "#bbdefb" },
																	borderRadius: "4px",
																	p: 1,
																}}
																title="ເບິ່ງລາຍລະອຽດ"
															>
																<VisibilityIcon fontSize="small" />
															</IconButton>
															<IconButton
																size="small"
																onClick={() => handlePrintOrder(purchase)}
																sx={{
																	bgcolor: "#f3e5f5",
																	"&:hover": { bgcolor: "#e1bee7" },
																	borderRadius: "4px",
																	p: 1,
																}}
																title="ພິມໃບສັ່ງຊື້"
															>
																<LocalPrintshopIcon fontSize="small" />
															</IconButton>
														</Box>
													</TableCell>
												</TableRow>
											))
									) : (
										<TableRow>
											<TableCell
												colSpan={tableHeaders.length}
												align="center"
												sx={{
													fontFamily: "Noto Sans Lao, sans-serif",
													py: 4,
													color: "#666"
												}}
											>
												{purchases.length === 0
													? "ຍັງບໍ່ມີການສັ່ງຊື້ສິນຄ້າເທື່ອ"
													: "ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ"
												}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</Box>
					</Box>
				)}

				{/* Pagination */}
				{!loading && !error && filteredPurchases.length > 0 && (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mt: 2,
							px: 1,
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography
								variant="body2"
								sx={{ mr: 1, fontFamily: "Noto Sans Lao, sans-serif" }}
							>
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

						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography variant="body2" sx={{ mr: 2 }}>
								{`${page * rowsPerPage + 1}-${Math.min(
									(page + 1) * rowsPerPage,
									filteredPurchases.length,
								)} of ${filteredPurchases.length}`}
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
									page >= Math.ceil(filteredPurchases.length / rowsPerPage) - 1
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
											Math.ceil(filteredPurchases.length / rowsPerPage) - 1,
										),
									)
								}
								disabled={
									page >= Math.ceil(filteredPurchases.length / rowsPerPage) - 1
								}
								size="small"
							>
								<KeyboardDoubleArrowRightIcon fontSize="small" />
							</IconButton>
						</Box>
					</Box>
				)}

				{/* 🆕 Dialog ເບິ່ງລາຍລະອຽດການສັ່ງຊື້ */}
				<Dialog
					open={viewDialog.open}
					onClose={handleCloseViewDialog}
					maxWidth="md"
					fullWidth
					PaperProps={{
						sx: { fontFamily: "Noto Sans Lao, sans-serif" },
					}}
				>
					<DialogTitle sx={{
						fontFamily: "Noto Sans Lao, sans-serif",
						bgcolor: "#079578",
						color: "white",
						fontWeight: "bold"
					}}>
						ລາຍລະອຽດການສັ່ງຊື້ - {viewDialog.purchase?.id}
					</DialogTitle>
					<DialogContent sx={{ p: 3 }}>
						{viewDialog.purchase && (
							<>
								{/* ຂໍ້ມູນທົ່ວໄປ */}
								<Grid container spacing={2} sx={{ mb: 3 }}>
									<Grid item xs={6}>
										<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
											ເລກທີໃບສັ່ງຊື້:
										</Typography>
										<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
											{viewDialog.purchase.id}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
											ວັນທີສັ່ງຊື້:
										</Typography>
										<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
											{new Date(viewDialog.purchase.date).toLocaleDateString('lo-LA')}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
											ຜູ້ສັ່ງຊື້:
										</Typography>
										<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
											{getUserNameById(viewDialog.purchase.user_id)}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
											ລາຄາລວມທັງໝົດ:
										</Typography>
										<Typography sx={{
											fontFamily: "Noto Sans Lao, sans-serif",
											fontWeight: "bold",
											color: "#079578",
											fontSize: "1.1rem"
										}}>
											{formatLaoKip(viewDialog.purchase.total_amount)}
										</Typography>
									</Grid>
								</Grid>

								<Divider sx={{ mb: 3 }} />

								{/* ລາຍການສິນຄ້າ */}
								<Typography sx={{
									fontFamily: "Noto Sans Lao, sans-serif",
									fontWeight: "bold",
									mb: 2,
									fontSize: "1.1rem"
								}}>
									ລາຍການສິນຄ້າທີ່ສັ່ງຊື້:
								</Typography>

								{viewDialog.purchase.items && viewDialog.purchase.items.length > 0 ? (
									<Table size="small" sx={{ border: "1px solid #e0e0e0" }}>
										<TableHead>
											<TableRow sx={{ bgcolor: "#f5f5f5" }}>
												<TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
													ຈຳນວນ
												</TableCell>
												<TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
													ລາຄາ/ຫົວໜ່ວຍ
												</TableCell>
												<TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
													ລາຄາລວມ
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{viewDialog.purchase.items.map((item, index) => (
												<TableRow key={index} hover>
													<TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
														{index + 1}
													</TableCell>
													<TableCell>
														<Box sx={{ display: "flex", alignItems: "center" }}>
															{item.image && (
																<Avatar
																	src={item.image}
																	sx={{
																		width: 40,
																		height: 40,
																		mr: 2,
																		borderRadius: "6px"
																	}}
																	variant="rounded"
																/>
															)}
															<Box>
																<Typography sx={{
																	fontFamily: "Noto Sans Lao, sans-serif",
																	fontWeight: "500"
																}}>
																	{item.product_name}
																</Typography>
																{item.category && (
																	<Typography sx={{
																		fontFamily: "Noto Sans Lao, sans-serif",
																		fontSize: "0.8rem",
																		color: "#666"
																	}}>
																		{item.category}
																	</Typography>
																)}
															</Box>
														</Box>
													</TableCell>
													<TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
														{item.quantity} {item.unit || ''}
													</TableCell>
													<TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
														{formatLaoKip(item.price)}
													</TableCell>
													<TableCell sx={{
														fontFamily: "Noto Sans Lao, sans-serif",
														fontWeight: "bold",
														color: "#d32f2f"
													}}>
														{formatLaoKip(item.subtotal)}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								) : (
									<Typography sx={{
										fontFamily: "Noto Sans Lao, sans-serif",
										color: "#666",
										textAlign: "center",
										py: 3
									}}>
										ບໍ່ມີລາຍການສິນຄ້າ
									</Typography>
								)}

								{/* ສະຫຼຸບລາຄາລວມ */}
								<Box sx={{
									mt: 3,
									p: 2,
									bgcolor: "#f8f9fa",
									borderRadius: "8px",
									textAlign: "right"
								}}>
									<Typography sx={{
										fontFamily: "Noto Sans Lao, sans-serif",
										fontSize: "1.2rem",
										fontWeight: "bold",
										color: "#079578"
									}}>
										ລາຄາລວມທັງໝົດ: {formatLaoKip(viewDialog.purchase.total_amount)}
									</Typography>
								</Box>
							</>
						)}
					</DialogContent>
					<DialogActions sx={{ p: 2 }}>
						<Button
							onClick={() => handlePrintOrder(viewDialog.purchase)}
							startIcon={<LocalPrintshopIcon />}
							variant="contained"
							sx={{
								bgcolor: "#079578",
								"&:hover": { bgcolor: "#046c56" },
								fontFamily: "Noto Sans Lao, sans-serif",
								mr: 1
							}}
						>
							ພິມໃບສັ່ງຊື້
						</Button>
						<Button
							onClick={handleCloseViewDialog}
							sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
						>
							ປິດ
						</Button>
					</DialogActions>
				</Dialog>

				{/* Snackbar Notification */}
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
			</Paper>
		</Box>
	);
};

export default ManagementPurchase;

