
// frontend/src/pages/management_supplier.jsx
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
import { provinces } from "../data/provinces";
import supplierService from "../services/supplierService";

const ManagementSupplier = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State for suppliers and UI
	const [suppliers, setSuppliers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(3);

	// Search
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredSuppliers, setFilteredSuppliers] = useState([]);

	// Dialog states
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// ເພີ່ມສະຖານະສຳລັບເມືອງ ອີງຕາມແຂວງທີ່ເລືອກ
	const [availableDistricts, setAvailableDistricts] = useState([]);

	// Current supplier form data
	const [currentSupplier, setCurrentSupplier] = useState({
		id: "",
		name: "",
		email: "",
		tel: "",
		province: "",
		district: "",
		village: "",
		contact: "",
		createdDate: "",
	});

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	/**
	 * 1) ດຶງຂໍ້ມູນຜູ້ສະໜອງທັງໝົດ
	 */
	const fetchSuppliers = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ");
			}

			// ໃຊ້ service ເພື່ອດຶງຂໍ້ມູນ
			const data = await supplierService.getAllSuppliers();
			setSuppliers(data);
		} catch (err) {
			console.error("Error fetching suppliers:", err);
			setError(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນຜູ້ສະໜອງໄດ້",
			);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນຜູ້ສະໜອງໄດ້",
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
		fetchSuppliers();
	}, [fetchSuppliers]);

	// Filter suppliers on search
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredSuppliers(suppliers);
		} else {
			const lower = searchQuery.toLowerCase();
			const filtered = suppliers.filter(
				(sup) =>
					sup.id?.toLowerCase().includes(lower) ||
					sup.name?.toLowerCase().includes(lower) ||
					sup.email?.toLowerCase().includes(lower) ||
					sup.tel?.toLowerCase().includes(lower) ||
					sup.province?.toLowerCase().includes(lower) ||
					sup.district?.toLowerCase().includes(lower) ||
					sup.village?.toLowerCase().includes(lower) ||
					sup.contact?.toLowerCase().includes(lower),
			);
			setFilteredSuppliers(filtered);
		}
		setPage(0);
	}, [searchQuery, suppliers]);

	// ອັບເດດລາຍຊື່ເມືອງທີ່ມີໃຫ້ເລືອກ ເມື່ອມີການປ່ຽນແປງແຂວງ
	useEffect(() => {
		if (!currentSupplier.province) {
			setAvailableDistricts([]);
			return;
		}

		const selectedProvince = provinces.find(
			(p) => p.name === currentSupplier.province,
		);
		if (selectedProvince) {
			setAvailableDistricts(selectedProvince.districts);

			// ຖ້າມີການປ່ຽນແປງແຂວງ ແລະ ເມືອງປັດຈຸບັນບໍ່ຢູ່ໃນລາຍຊື່ເມືອງຂອງແຂວງໃໝ່
			if (
				currentSupplier.district &&
				!selectedProvince.districts.includes(currentSupplier.district)
			) {
				setCurrentSupplier((prev) => ({
					...prev,
					district: "",
				}));
			}
		}
	}, [currentSupplier.province, currentSupplier.district]);

	// Snackbar helpers
	const showNotification = (message, severity = "success") => {
		setNotification({ open: true, message, severity });
	};
	const closeNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	// Open/Close Dialog
	const handleOpen = (isEdit, supplier = null) => {
		setEditMode(isEdit);
		if (supplier) {
			setCurrentSupplier({
				id: supplier.id,
				name: supplier.name,
				email: supplier.email || "",
				tel: supplier.tel || "",
				province: supplier.province || "",
				district: supplier.district || "",
				village: supplier.village || "",
				contact: supplier.contact || "",
				createdDate: supplier.createdDate,
			});
		} else {
			const now = new Date();
			const formattedDate =
				`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
				`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

			setCurrentSupplier({
				id: "",
				name: "",
				email: "",
				tel: "",
				province: "",
				district: "",
				village: "",
				contact: "",
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
		setCurrentSupplier((prev) => ({ ...prev, [name]: value }));
	};

	// Save or Update supplier
	const handleSave = async () => {
		try {
			// ກວດສອບຂໍ້ມູນພື້ນຖານ
			if (!currentSupplier.name) {
				showNotification("ກະລຸນາປ້ອນຊື່ຜູ້ສະໜອງ", "error");
				return;
			}

			if (editMode) {
				// Update existing supplier
				const response = await supplierService.updateSupplier(
					currentSupplier.id,
					{
						name: currentSupplier.name,
						email: currentSupplier.email,
						tel: currentSupplier.tel,
						province: currentSupplier.province,
						district: currentSupplier.district,
						village: currentSupplier.village,
						contact: currentSupplier.contact,
					},
				);

				// ອັບເດດລາຍການຜູ້ສະໜອງ
				setSuppliers((prev) =>
					prev.map((sup) =>
						sup.id === currentSupplier.id ? response.supplier : sup,
					),
				);

				showNotification("ອັບເດດຂໍ້ມູນຜູ້ສະໜອງສຳເລັດແລ້ວ", "success");
			} else {
				// Create new supplier
				const response = await supplierService.createSupplier({
					name: currentSupplier.name,
					email: currentSupplier.email,
					tel: currentSupplier.tel,
					province: currentSupplier.province,
					district: currentSupplier.district,
					village: currentSupplier.village,
					contact: currentSupplier.contact,
				});

				// ເພີ່ມລາຍການຜູ້ສະໜອງໃໝ່
				setSuppliers((prev) => [response.supplier, ...prev]);

				showNotification("ສ້າງຂໍ້ມູນຜູ້ສະໜອງສຳເລັດແລ້ວ", "success");
			}

			handleClose();
		} catch (err) {
			console.error("Error saving supplier:", err);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດບັນທຶກຂໍ້ມູນຜູ້ສະໜອງໄດ້",
				"error",
			);
		}
	};

	// Delete supplier
	const handleDelete = async (id) => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບຜູ້ສະໜອງນີ້?")) {
			try {
				await supplierService.deleteSupplier(id);

				// ອັບເດດລາຍການຜູ້ສະໜອງໂດຍລຶບລາຍການທີ່ມີ ID ກົງກັນອອກ
				setSuppliers((prev) => prev.filter((sup) => sup.id !== id));

				showNotification("ລຶບຂໍ້ມູນຜູ້ສະໜອງສຳເລັດແລ້ວ", "success");
			} catch (err) {
				console.error("Error deleting supplier:", err);
				showNotification(
					err.response?.data?.message || err.message || "ບໍ່ສາມາດລຶບຜູ້ສະໜອງໄດ້",
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
			return fetchSuppliers();
		}

		try {
			setLoading(true);
			setError(null);

			// ເຮັດການຄົ້ນຫາໂດຍໃຊ້ API
			const results = await supplierService.searchSuppliers(searchQuery);
			setSuppliers(results);
		} catch (err) {
			console.error("Error searching suppliers:", err);
			setError(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດຄົ້ນຫາຜູ້ສະໜອງໄດ້",
			);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດຄົ້ນຫາຜູ້ສະໜອງໄດ້",
				"error",
			);
		} finally {
			setLoading(false);
		}
	};

	// Table columns - ຕາມຮູບພາບທີ່ສົ່ງມາ
	const tableHeaders = [
		{
			id: "id",
			label: "ລະຫັດຜູ້ສະໜອງ",
			width: 120,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "name",
			label: "ຊື່ຜູ້ສະໜອງ",
			width: 150,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "email",
			label: "ອີເມວ",
			width: 120,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "tel",
			label: "ເບີໂທ",
			width: 120,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "contact",
			label: "ຜູ້ຕິດຕໍ່",
			width: 130,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "address",
			label: "ທີ່ຢູ່",
			width: 130,
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

	// ສ້າງຟັງຊັນຈັດຮູບແບບທີ່ຢູ່
	const formatAddress = (province, district, village) => {
		const address = [];

		if (province) address.push(province);
		if (district) address.push(district);
		if (village) address.push(village);

		return address.length > 0 ? address.join(", ") : "-";
	};

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
					ລາຍການຜູ້ສະໜອງ
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
							ເພີ່ມຜູ້ສະໜອງ
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
									{filteredSuppliers
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((supplier, index) => (
											<TableRow
												key={supplier.id}
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
													{supplier.id}
												</TableCell>
												<TableCell
													style={{
														width: tableHeaders[1].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													{supplier.name}
												</TableCell>
												<TableCell
													style={{
														width: tableHeaders[2].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													{supplier.email || "-"}
												</TableCell>
												<TableCell
													style={{
														width: tableHeaders[3].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													{supplier.tel || "-"}
												</TableCell>
												<TableCell
													style={{
														width: tableHeaders[4].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													{supplier.contact || "-"}
												</TableCell>
												<TableCell
													style={{
														width: tableHeaders[5].width,
														fontFamily: "Noto Sans Lao, sans-serif",
													}}
												>
													{formatAddress(
														supplier.province,
														supplier.district,
														supplier.village,
													)}
												</TableCell>
												<TableCell
													align="center"
													style={{ width: tableHeaders[6].width }}
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
															onClick={() => handleOpen(true, supplier)}
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
															onClick={() => handleDelete(supplier.id)}
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
									{filteredSuppliers.length === 0 && (
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
				{!loading && !error && filteredSuppliers.length > 0 && (
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
									filteredSuppliers.length,
								)} of ${filteredSuppliers.length}`}
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
									page >= Math.ceil(filteredSuppliers.length / rowsPerPage) - 1
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
											Math.ceil(filteredSuppliers.length / rowsPerPage) - 1,
										),
									)
								}
								disabled={
									page >= Math.ceil(filteredSuppliers.length / rowsPerPage) - 1
								}
								size="small"
							>
								<KeyboardDoubleArrowRightIcon fontSize="small" />
							</IconButton>
						</Box>
					</Box>
				)}

				{/* Dialog for create/edit supplier */}
				<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
					<DialogTitle
						sx={{
							bgcolor: "#079578",
							color: "white",
							fontFamily: "Noto Sans Lao, sans-serif",
						}}
					>
						{editMode ? "ແກ້ໄຂຂໍ້ມູນຜູ້ສະໜອງ" : "ເພີ່ມຂໍ້ມູນຜູ້ສະໜອງ"}
					</DialogTitle>

					<DialogContent>
						<Box
							sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
						>
							{editMode && (
								<TextField
									name="id"
									label="ລະຫັດຜູ້ສະໜອງ"
									fullWidth
									value={currentSupplier.id}
									disabled={true}
									InputProps={{
										style: { fontFamily: "Noto Sans Lao, sans-serif" },
									}}
									InputLabelProps={{
										style: { fontFamily: "Noto Sans Lao, sans-serif" },
									}}
								/>
							)}
							<TextField
								name="name"
								label="ຊື່ຜູ້ສະໜອງ"
								fullWidth
								value={currentSupplier.name}
								onChange={handleChange}
								required
								InputProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
								InputLabelProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
							/>
							<TextField
								name="email"
								label="ອີເມວ"
								fullWidth
								value={currentSupplier.email}
								onChange={handleChange}
								InputProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
								InputLabelProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
							/>
							<TextField
								name="tel"
								label="ເບີໂທລະສັບ"
								fullWidth
								value={currentSupplier.tel}
								onChange={handleChange}
								InputProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
								InputLabelProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
							/>

							<TextField
								name="contact"
								label="ຜູ້ຕິດຕໍ່"
								fullWidth
								value={currentSupplier.contact}
								onChange={handleChange}
								InputProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
								InputLabelProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
							/>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={4}>
									<FormControl fullWidth>
										<Typography
											variant="caption"
											sx={{ mb: 1, fontFamily: "Noto Sans Lao, sans-serif" }}
										>
											ແຂວງ
										</Typography>
										<Select
											name="province"
											value={currentSupplier.province || ""}
											onChange={handleChange}
											sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											MenuProps={{
												PaperProps: {
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												},
											}}
										>
											<MenuItem
												value=""
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												<em>ເລືອກແຂວງ</em>
											</MenuItem>
											{provinces.map((province) => (
												<MenuItem
													key={province.name}
													value={province.name}
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													{province.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormControl fullWidth disabled={!currentSupplier.province}>
										<Typography
											variant="caption"
											sx={{ mb: 1, fontFamily: "Noto Sans Lao, sans-serif" }}
										>
											ເມືອງ
										</Typography>
										<Select
											name="district"
											value={currentSupplier.district || ""}
											onChange={handleChange}
											sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											MenuProps={{
												PaperProps: {
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												},
											}}
										>
											<MenuItem
												value=""
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												<em>ເລືອກເມືອງ</em>
											</MenuItem>
											{availableDistricts.map((district) => (
												<MenuItem
													key={district}
													value={district}
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													{district}
												</MenuItem>
											))}
										</Select>
										{!currentSupplier.province && (
											<FormHelperText
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												ກະລຸນາເລືອກແຂວງກ່ອນ
											</FormHelperText>
										)}
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Typography
										variant="caption"
										sx={{ mb: 1, fontFamily: "Noto Sans Lao, sans-serif" }}
									>
										ບ້ານ
									</Typography>
									<TextField
										name="village"
										sx={{ marginTop: "5px" }}
										fullWidth
										value={currentSupplier.village || ""}
										onChange={handleChange}
										InputProps={{
											style: { fontFamily: "Noto Sans Lao, sans-serif" },
										}}
										InputLabelProps={{
											style: { fontFamily: "Noto Sans Lao, sans-serif" },
										}}
									/>
								</Grid>
							</Grid>
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

export default ManagementSupplier;