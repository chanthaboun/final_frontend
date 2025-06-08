
// frontend/src/pages/ManageProductBrandInfo.jsx
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
	FormControlLabel,
	Switch,
	Chip,
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

// ເຊື່ອມຕໍ່ກັບ Service
import brandService from "../services/brandService";

const ManageProductBrandInfo = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State for brands and UI
	const [brands, setBrands] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(3);

	// Search
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredBrands, setFilteredBrands] = useState([]);

	// Dialog states
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// Current brand form data
	const [currentBrand, setCurrentBrand] = useState({
		id: "",
		name: "",
		status: true,
		createdDate: "",
	});

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	/**
	 * 1) ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທັງໝົດ
	 */
	const fetchBrands = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			// ໃຊ້ service ທີ່ເຊື່ອມຕໍ່ກັບ backend
			const data = await brandService.getAllBrands();
			setBrands(data);
		} catch (err) {
			console.error("Error fetching brands:", err);
			setError(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າໄດ້",
			);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າໄດ້",
				"error",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	/**
	 * 2) ດຶງຂໍ້ມູນເມື່ອໂຫຼດໜ້າ
	 */
	useEffect(() => {
		fetchBrands();
	}, [fetchBrands]);

	// Filter brands on search
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredBrands(brands);
		} else {
			const lower = searchQuery.toLowerCase();
			const filtered = brands.filter(
				(brand) =>
					brand.id?.toLowerCase().includes(lower) ||
					brand.name?.toLowerCase().includes(lower),
			);
			setFilteredBrands(filtered);
		}
		setPage(0);
	}, [searchQuery, brands]);

	// Snackbar helpers
	const showNotification = (message, severity = "success") => {
		setNotification({ open: true, message, severity });
	};
	const closeNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	// Open/Close Dialog
	// const handleOpen = (isEdit, brand = null) => {
	// 	setEditMode(isEdit);
	// 	if (brand) {
	// 		setCurrentBrand({
	// 			id: brand.id,
	// 			name: brand.name,
	// 			status: brand.status,
	// 			createdDate: brand.createdDate,
	// 		});
	// 	} else {
	// 		const now = new Date();
	// 		const formattedDate =
	// 			`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
	// 			`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

	// 		// ສ້າງລະຫັດຍີ່ຫໍ້ອັດຕະໂນມັດ B001, B002, ...
	// 		const lastId =
	// 			brands.length > 0
	// 				? Math.max(...brands.map((b) => Number.parseInt(b.id.substring(1), 10)))
	// 				: 0;
	// 		const newId = `B${String(lastId + 1).padStart(3, "0")}`;

	// 		setCurrentBrand({
	// 			id: newId,
	// 			name: "",
	// 			status: true,
	// 			createdDate: formattedDate,
	// 		});
	// 	}
	// 	setOpen(true);
	// };

	const handleOpen = (isEdit, brand = null) => {
		setEditMode(isEdit);
		if (brand) {
			setCurrentBrand({
				id: brand.id, // ຮັບປະກັນວ່າ id ມີ 'B' ນຳໜ້າແລ້ວ
				name: brand.name,
				status: brand.status,
				createdDate: brand.createdDate,
			});
		} else {
			const now = new Date();
			const formattedDate =
				`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
				`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

			// ສ້າງລະຫັດຍີ່ຫໍ້ອັດຕະໂນມັດ B001, B002, ...
			const lastId =
				brands.length > 0
					? Math.max(
							...brands.map((b) => {
								// ແປງ id ເປັນເລກໂດຍຕັດຕົວອັກສອນນຳໜ້າອອກ
								const numStr = b.id.replace(/\D/g, "");
								return Number.parseInt(numStr, 10);
							}),
						)
					: 0;
			const newId = `B${String(lastId + 1).padStart(3, "0")}`;

			setCurrentBrand({
				id: newId,
				name: "",
				status: true,
				createdDate: formattedDate,
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
		setCurrentBrand((prev) => ({ ...prev, [name]: value }));
	};

	// Handle status change with Switch component
	const handleStatusChange = (e) => {
		setCurrentBrand((prev) => ({ ...prev, status: e.target.checked }));
	};

	// Save or Update brand
	const handleSave = async () => {
		try {
			// ກວດສອບຂໍ້ມູນພື້ນຖານ
			if (!currentBrand.name) {
				showNotification("ກະລຸນາປ້ອນຊື່ຍີ່ຫໍ້ສິນຄ້າ", "error");
				return;
			}

			if (editMode) {
				// Update existing brand
				const response = await brandService.updateBrand(currentBrand.id, {
					name: currentBrand.name,
					status: currentBrand.status,
				});

				// ອັບເດດລາຍການຍີ່ຫໍ້ສິນຄ້າ
				setBrands((prev) =>
					prev.map((brand) =>
						brand.id === currentBrand.id ? response.brand : brand,
					),
				);

				showNotification("ອັບເດດຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າສຳເລັດແລ້ວ", "success");
			} else {
				// Create new brand
				const response = await brandService.createBrand({
					name: currentBrand.name,
					status: currentBrand.status,
				});

				// ເພີ່ມລາຍການຍີ່ຫໍ້ສິນຄ້າໃໝ່
				setBrands((prev) => [response.brand, ...prev]);

				showNotification("ສ້າງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າສຳເລັດແລ້ວ", "success");
			}

			handleClose();
		} catch (err) {
			console.error("Error saving brand:", err);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດບັນທຶກຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າໄດ້",
				"error",
			);
		}
	};

	// Delete brand
	const handleDelete = async (id) => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບຍີ່ຫໍ້ສິນຄ້ານີ້?")) {
			try {
				await brandService.deleteBrand(id);

				// ອັບເດດລາຍການຍີ່ຫໍ້ສິນຄ້າໂດຍລຶບລາຍການທີ່ມີ ID ກົງກັນອອກ
				setBrands((prev) => prev.filter((brand) => brand.id !== id));

				showNotification("ລຶບຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າສຳເລັດແລ້ວ", "success");
			} catch (err) {
				console.error("Error deleting brand:", err);
				showNotification(
					err.response?.data?.message || err.message || "ບໍ່ສາມາດລຶບຍີ່ຫໍ້ສິນຄ້າໄດ້",
					"error",
				);
			}
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
	const handleSearch = async () => {
		if (searchQuery.trim() === "") {
			return fetchBrands();
		}

		try {
			setLoading(true);
			setError(null);

			// ເຮັດການຄົ້ນຫາໂດຍໃຊ້ API
			const results = await brandService.searchBrands(searchQuery);
			setBrands(results);
		} catch (err) {
			console.error("Error searching brands:", err);
			setError(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າໄດ້",
			);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າໄດ້",
				"error",
			);
		} finally {
			setLoading(false);
		}
	};

	// Table columns - ຕາມທີ່ຕ້ອງການ
	const tableHeaders = [
		{
			id: "id",
			label: "ລະຫັດຍີ່ຫໍ້ສິນຄ້າ",
			width: 150,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "name",
			label: "ຊື່ຍີ່ຫໍ້ສິນຄ້າ",
			width: 200,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "status",
			label: "ສະຖານະ",
			width: 120,
			align: "center",
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
		<Box sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
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
						fontFamily: "Noto Sans Lao, sans-serif",
					}}
				>
					ລາຍການຍີ່ຫໍ້ສິນຄ້າ
				</Typography>

				<Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
					<Grid item>
						<Button
							variant="contained"
							startIcon={<AddIcon />}
							onClick={() => handleOpen(false)}
							sx={{
								bgcolor: "#079578",
								"&:hover": { bgcolor: "#046c56" },
								borderRadius: "30px",
								color: "white",
								pl: 2,
								fontFamily: "Noto Sans Lao, sans-serif",
							}}
						>
							ເພີ່ມຍີ່ຫໍ້ສິນຄ້າ
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
													...header.style,
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
									{filteredBrands
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((brand, index) => (
											<TableRow
												key={brand.id}
												hover
												sx={{
													bgcolor: index % 2 === 0 ? "white" : "#f9f9f9",
													"&:hover": { bgcolor: "#f5f5f5" },
												}}
											>
												<TableCell
													style={{
														width: tableHeaders[0].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													{brand.id}
												</TableCell>
												<TableCell
													style={{
														width: tableHeaders[1].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													{brand.name}
												</TableCell>
												<TableCell
													align="center"
													style={{
														width: tableHeaders[2].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													<Chip
														label={brand.status ? "ໃຊ້ງານ" : "ບໍ່ໃຊ້ງານ"}
														color={brand.status ? "success" : "error"}
														sx={{
															fontFamily: "Noto Sans Lao, sans-serif",
															fontWeight: "medium",
														}}
													/>
												</TableCell>
												<TableCell
													align="center"
													style={{ width: tableHeaders[3].width }}
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
															onClick={() => handleOpen(true, brand)}
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
															onClick={() => handleDelete(brand.id)}
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
										))}
									{filteredBrands.length === 0 && (
										<TableRow>
											<TableCell
												colSpan={tableHeaders.length}
												align="center"
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
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
				{!loading && !error && filteredBrands.length > 0 && (
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

						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography variant="body2" sx={{ mr: 2 }}>
								{`${page * rowsPerPage + 1}-${Math.min(
									(page + 1) * rowsPerPage,
									filteredBrands.length,
								)} of ${filteredBrands.length}`}
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
									page >= Math.ceil(filteredBrands.length / rowsPerPage) - 1
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
											Math.ceil(filteredBrands.length / rowsPerPage) - 1,
										),
									)
								}
								disabled={
									page >= Math.ceil(filteredBrands.length / rowsPerPage) - 1
								}
								size="small"
							>
								<KeyboardDoubleArrowRightIcon fontSize="small" />
							</IconButton>
						</Box>
					</Box>
				)}

				{/* Dialog for create/edit brand */}
				<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
					<DialogTitle
						sx={{
							bgcolor: "#079578",
							color: "white",
							fontFamily: "Noto Sans Lao, sans-serif",
						}}
					>
						{editMode ? "ແກ້ໄຂຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ"}
					</DialogTitle>

					<DialogContent>
						<Box
							sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
						>
							<TextField
								name="id"
								label="ລະຫັດຍີ່ຫໍ້ສິນຄ້າ"
								fullWidth
								value={currentBrand.id}
								disabled={true}
								InputProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
								InputLabelProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
							/>

							<TextField
								name="name"
								label="ຊື່ຍີ່ຫໍ້ສິນຄ້າ"
								fullWidth
								value={currentBrand.name}
								onChange={handleChange}
								required
								InputProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
								InputLabelProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
							/>

							<FormControlLabel
								control={
									<Switch
										checked={currentBrand.status}
										onChange={handleStatusChange}
										color="success"
									/>
								}
								label={
									<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
										{currentBrand.status ? "ໃຊ້ງານ" : "ບໍ່ໃຊ້ງານ"}
									</Typography>
								}
							/>
						</Box>
					</DialogContent>

					<DialogActions>
						<Button
							onClick={handleClose}
							variant="outlined"
							sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
						>
							ຍົກເລີກ
						</Button>
						<Button
							onClick={handleSave}
							color="primary"
							variant="contained"
							sx={{
								fontFamily: "Noto Sans Lao, sans-serif",
								bgcolor: "#079578",
								"&:hover": { bgcolor: "#046c56" },
							}}
						>
							ບັນທຶກ
						</Button>
					</DialogActions>
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

export default ManageProductBrandInfo;