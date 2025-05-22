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
	FormHelperText,
	InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

// Mock Data
const mockUsers = [
	{ id: "1", username: "admin", name: "ຜູ້ດູແລລະບົບ", role: "admin" },
	{ id: "2", username: "user1", name: "ພະນັກງານ 1", role: "user" },
	{ id: "3", username: "user2", name: "ພະນັກງານ 2", role: "user" },
];

const mockProducts = [
	{ id: "1", name: "ເຄື່ອງດື່ມ ໂຄຄາໂຄລາ", price: 10000, stock: 100 },
	{ id: "2", name: "ເຄື່ອງດື່ມ ແພບຊີ", price: 9000, stock: 150 },
	{ id: "3", name: "ເຂົ້າໜົມປັງ", price: 15000, stock: 80 },
	{ id: "4", name: "ນ້ຳດື່ມບໍລິສຸດ", price: 5000, stock: 200 },
	{ id: "5", name: "ນົມສົດ", price: 12000, stock: 50 },
];

const mockPurchases = [
	{
		id: "P001",
		date: "2025-05-10",
		user_id: "2",
		invoice_no: "INV-001",
		total_amount: 125000,
		items: [
			{
				product_id: "1",
				product_name: "ເຄື່ອງດື່ມ ໂຄຄາໂຄລາ",
				quantity: 5,
				price: 10000,
				subtotal: 50000,
			},
			{
				product_id: "3",
				product_name: "ເຂົ້າໜົມປັງ",
				quantity: 5,
				price: 15000,
				subtotal: 75000,
			},
		],
	},
	{
		id: "P002",
		date: "2025-05-15",
		user_id: "3",
		invoice_no: "INV-002",
		total_amount: 90000,
		items: [
			{
				product_id: "2",
				product_name: "ເຄື່ອງດື່ມ ແພບຊີ",
				quantity: 10,
				price: 9000,
				subtotal: 90000,
			},
		],
	},
];

const ManagementPurchase = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State for purchases and UI
	const [purchases, setPurchases] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// State for users and products
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState([]); // ກຳນົດເປັນ array ເປົ່າເພື່ອຫຼີກລ່ຽງ "map is not a function"

	// Pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(3);

	// Search
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredPurchases, setFilteredPurchases] = useState([]);

	// Dialog states
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// Current purchase form data
	const [currentPurchase, setCurrentPurchase] = useState({
		id: "",
		date: "",
		user_id: "",
		invoice_no: "",
		total_amount: 0,
		items: [], // ລາຍການສິນຄ້າທີ່ຊື້
	});

	// ສຳລັບຈັດການກັບລາຍການສິນຄ້າທີ່ຈະຊື້
	const [currentItem, setCurrentItem] = useState({
		product_id: "",
		quantity: 1,
		price: 0,
	});

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	// Initialization - load mock data
	useEffect(() => {
		setLoading(true);
		// Simulate API delay
		setTimeout(() => {
			setUsers(mockUsers);
			setProducts(mockProducts);
			setPurchases(mockPurchases);
			setLoading(false);
		}, 700);
	}, []);

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
					getUserNameById(purchase.user_id)?.toLowerCase().includes(lower),
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

	// ເພີ່ມລາຍການສິນຄ້າໃໝ່ເຂົ້າ purchase
	const addItemToPurchase = () => {
		if (!currentItem.product_id || currentItem.quantity <= 0) {
			showNotification("ກະລຸນາເລືອກສິນຄ້າ ແລະ ລະບຸຈຳນວນ", "error");
			return;
		}

		// ຊອກຫາຂໍ້ມູນລາຍລະອຽດຂອງສິນຄ້າຈາກ product_id
		const product = products.find((p) => p.id === currentItem.product_id);
		if (!product) {
			showNotification("ບໍ່ພົບຂໍ້ມູນສິນຄ້າ", "error");
			return;
		}

		// ເພີ່ມລາຍການເຂົ້າໃນ currentPurchase.items
		const price = currentItem.price > 0 ? currentItem.price : product.price;
		const newItem = {
			product_id: currentItem.product_id,
			product_name: product.name, // ເກັບຊື່ສິນຄ້າໄວ້ເພື່ອສະແດງໃນຕາຕະລາງ
			quantity: Number(currentItem.quantity),
			price: Number(price),
			subtotal: Number(price) * Number(currentItem.quantity),
		};

		// ກວດສອບວ່າມີລາຍການນີ້ຢູ່ແລ້ວຫຼືບໍ່
		const existingItemIndex = currentPurchase.items.findIndex(
			(item) => item.product_id === currentItem.product_id,
		);

		if (existingItemIndex >= 0) {
			// ຖ້າມີແລ້ວໃຫ້ອັບເດດຈຳນວນ
			const updatedItems = [...currentPurchase.items];
			const newQuantity =
				updatedItems[existingItemIndex].quantity + Number(currentItem.quantity);

			updatedItems[existingItemIndex] = {
				...updatedItems[existingItemIndex],
				quantity: newQuantity,
				price: Number(price),
				subtotal: newQuantity * Number(price),
			};

			const newTotal = updatedItems.reduce(
				(sum, item) => sum + item.subtotal,
				0,
			);

			setCurrentPurchase((prev) => ({
				...prev,
				items: updatedItems,
				total_amount: newTotal,
			}));
		} else {
			// ຖ້າບໍ່ມີລາຍການນີ້ໃຫ້ເພີ່ມໃໝ່
			const newItems = [...currentPurchase.items, newItem];
			const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);

			setCurrentPurchase((prev) => ({
				...prev,
				items: newItems,
				total_amount: newTotal,
			}));
		}

		// ລ້າງຂໍ້ມູນໃນຟອມລາຍການສິນຄ້າ
		setCurrentItem({
			product_id: "",
			quantity: 1,
			price: 0,
		});
	};

	// ລຶບລາຍການສິນຄ້າອອກຈາກລາຍການຊື້
	const removeItemFromPurchase = (index) => {
		const updatedItems = [...currentPurchase.items];
		updatedItems.splice(index, 1);

		const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);

		setCurrentPurchase((prev) => ({
			...prev,
			items: updatedItems,
			total_amount: newTotal,
		}));
	};

	// Open/Close Dialog
	const handleOpen = (isEdit, purchase = null) => {
		setEditMode(isEdit);
		if (purchase) {
			setCurrentPurchase({
				id: purchase.id,
				date: purchase.date || new Date().toISOString().split("T")[0],
				user_id: purchase.user_id || "",
				invoice_no: purchase.invoice_no || "",
				total_amount: purchase.total_amount || 0,
				items: purchase.items || [],
			});
		} else {
			const now = new Date();
			const formattedDate = now.toISOString().split("T")[0];

			setCurrentPurchase({
				id: `P${String(purchases.length + 1).padStart(3, "0")}`,
				date: formattedDate,
				user_id: "",
				invoice_no: "",
				total_amount: 0,
				items: [],
			});
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// Handle form field changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCurrentPurchase((prev) => ({ ...prev, [name]: value }));
	};

	// Handle item form field changes
	const handleItemChange = (e) => {
		const { name, value } = e.target;
		setCurrentItem((prev) => ({ ...prev, [name]: value }));

		// ຖ້າປ່ຽນແປງສິນຄ້າແລ້ວ, ດຶງລາຄາສິນຄ້າມາສະແດງ
		if (name === "product_id" && value) {
			const product = products.find((p) => p.id === value);
			if (product) {
				setCurrentItem((prev) => ({ ...prev, price: product.price }));
			}
		}
	};

	// Save or Update purchase
	const handleSave = () => {
		// ກວດສອບຂໍ້ມູນ
		if (
			!currentPurchase.date ||
			!currentPurchase.user_id ||
			currentPurchase.items.length === 0
		) {
			showNotification("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ", "error");
			return;
		}

		setLoading(true);

		// Simulate API delay
		setTimeout(() => {
			if (editMode) {
				// Update existing purchase
				setPurchases((prev) =>
					prev.map((p) => (p.id === currentPurchase.id ? currentPurchase : p)),
				);
				showNotification("ອັບເດດຂໍ້ມູນການຊື້ສິນຄ້າສຳເລັດແລ້ວ", "success");
			} else {
				// Create new purchase
				setPurchases((prev) => [...prev, currentPurchase]);
				showNotification("ສ້າງຂໍ້ມູນການຊື້ສິນຄ້າສຳເລັດແລ້ວ", "success");
			}

			setLoading(false);
			handleClose();
		}, 500);
	};

	// Delete purchase
	const handleDelete = (id) => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການຊື້ສິນຄ້ານີ້?")) {
			setLoading(true);

			// Simulate API delay
			setTimeout(() => {
				setPurchases((prev) => prev.filter((purchase) => purchase.id !== id));
				showNotification("ລຶບຂໍ້ມູນການຊື້ສິນຄ້າສຳເລັດແລ້ວ", "success");
				setLoading(false);
			}, 500);
		}
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
		const user = users.find((u) => u.id === userId);
		return user ? user.username || user.name : "ບໍ່ມີຂໍ້ມູນ";
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
			width: 120,
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
			width: 150,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "invoice_no",
			label: "ໃບໃນບັນຊີ",
			width: 120,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "actions",
			label: "ຈັດການ",
			width: 120,
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
							// onClick={() => handleOpen(false)}
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

					{/* <Grid item xs={9} sm={8} md={6} lg={5}>
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
					</Grid> */}
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
									marginLeft: "500px",
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
								height: rowsPerPage > 3 ? "400px" : "auto",
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
														{purchase.id}
													</TableCell>
													<TableCell style={{ width: tableHeaders[1].width }}>
														{purchase.date
															? new Date(purchase.date).toLocaleDateString(
																	"lo-LA",
																)
															: "-"}
													</TableCell>
													<TableCell style={{ width: tableHeaders[2].width }}>
														{getUserNameById(purchase.user_id)}
													</TableCell>
													<TableCell style={{ width: tableHeaders[3].width }}>
														{purchase.invoice_no || "-"}
													</TableCell>
													<TableCell
														align="center"
														style={{ width: tableHeaders[4].width }}
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
																onClick={() => handleOpen(true, purchase)}
																sx={{
																	bgcolor: "#e3f2fd",
																	"&:hover": { bgcolor: "#bbdefb" },
																	borderRadius: "4px",
																	p: 1,
																}}
															>
																<EditIcon fontSize="small" />
															</IconButton>
															<IconButton
																size="small"
																onClick={() => handleDelete(purchase.id)}
																sx={{
																	bgcolor: "#ffebee",
																	"&:hover": { bgcolor: "#ffcdd2" },
																	borderRadius: "4px",
																	p: 1,
																}}
															>
																<DeleteIcon fontSize="small" />
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
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												ຍັງບໍ່ມີລາຍການສິນຄ້າເທື່ອ
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

				{/* Dialog for create/edit purchase */}
				<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
					<DialogTitle
						sx={{
							bgcolor: "#079578",
							color: "white",
							fontFamily: "Noto Sans Lao, sans-serif",
						}}
					>
						{editMode ? "ແກ້ໄຂຂໍ້ມູນການຊື້ສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນການຊື້ສິນຄ້າ"}
					</DialogTitle>
					<DialogContent>
						<Box
							sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
						>
							{/* ສ່ວນເພີ່ມລາຍການສິນຄ້າ */}
							<Typography
								variant="subtitle1"
								sx={{
									mt: 2,
									fontFamily: "Noto Sans Lao, sans-serif",
									fontWeight: "bold",
								}}
							>
								ລາຍການສິນຄ້າ
							</Typography>

							{/* ຕາຕະລາງລາຍການສິນຄ້າ */}
							<Paper
								sx={{
									mt: 2,
									border: "1px solid #e0e0e0",
									borderRadius: "4px",
									overflow: "hidden",
								}}
							>
								<Table size="small">
									<TableHead>
										<TableRow sx={{ bgcolor: "#f5f5f5" }}>
											<TableCell
												sx={{
													fontFamily: "Noto Sans Lao, sans-serif",
													fontWeight: "bold",
												}}
											>
												ສິນຄ້າ
											</TableCell>
											<TableCell
												align="right"
												sx={{
													fontFamily: "Noto Sans Lao, sans-serif",
													fontWeight: "bold",
												}}
											>
												ລາຄາ
											</TableCell>
											<TableCell
												align="right"
												sx={{
													fontFamily: "Noto Sans Lao, sans-serif",
													fontWeight: "bold",
												}}
											>
												ຈຳນວນ
											</TableCell>
											<TableCell
												align="right"
												sx={{
													fontFamily: "Noto Sans Lao, sans-serif",
													fontWeight: "bold",
												}}
											>
												ລວມ
											</TableCell>
											<TableCell
												align="center"
												sx={{
													fontFamily: "Noto Sans Lao, sans-serif",
													fontWeight: "bold",
												}}
											>
												ຈັດການ
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{currentPurchase.items.length > 0 ? (
											currentPurchase.items.map((item, index) => (
												<TableRow key={`item-${item.product_id}-${index}`}>
													<TableCell
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														{item.product_name ||
															products.find((p) => p.id === item.product_id)
																?.name ||
															"ບໍ່ມີຊື່"}
													</TableCell>
													<TableCell
														align="right"
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														{item.price.toLocaleString()} ກີບ
													</TableCell>
													<TableCell
														align="right"
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														{item.quantity}
													</TableCell>
													<TableCell
														align="right"
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														{item.subtotal.toLocaleString()} ກີບ
													</TableCell>
													<TableCell align="center">
														<IconButton
															size="small"
															onClick={() => removeItemFromPurchase(index)}
															color="error"
														>
															<DeleteIcon fontSize="small" />
														</IconButton>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={5}
													align="center"
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													ຍັງບໍ່ມີລາຍການສິນຄ້າ
												</TableCell>
											</TableRow>
										)}
										{currentPurchase.items.length > 0 && (
											<TableRow sx={{ bgcolor: "#f9f9f9" }}>
												<TableCell
													colSpan={3}
													align="right"
													sx={{
														fontFamily: "Noto Sans Lao, sans-serif",
														fontWeight: "bold",
													}}
												>
													ລວມທັງໝົດ:
												</TableCell>
												<TableCell
													align="right"
													sx={{
														fontFamily: "Noto Sans Lao, sans-serif",
														fontWeight: "bold",
													}}
												>
													{currentPurchase.total_amount.toLocaleString()} ກີບ
												</TableCell>
												<TableCell />
											</TableRow>
										)}
									</TableBody>
								</Table>
							</Paper>
						</Box>
					</DialogContent>
				</Dialog>

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
