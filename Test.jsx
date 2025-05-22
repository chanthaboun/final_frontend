// frontend/src/pages/Management_product_category.jsx
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
	Breadcrumbs,
	Link,
	Tooltip,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// ເຊື່ອມຕໍ່ກັບ Service
import categoryService from "../services/categoryService";

const Management_product_category = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State for categories and UI
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// ໝວດໝູ່ປັດຈຸບັນທີ່ກຳລັງເບິ່ງຢູ່
	const [currentCategory, setCurrentCategory] = useState(null);
	const [breadcrumbTrail, setBreadcrumbTrail] = useState([]);

	// Pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// Search
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	// Dialog states
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// Current category form data
	const [categoryForm, setCategoryForm] = useState({
		id: "",
		name: "",
		status: true,
		createdDate: "",
		parentId: null,
		level: 0,
	});

	// ບັນຊີໝວດໝູ່ທັງໝົດ (ໃຊ້ສຳລັບເລືອກໝວດໝູ່ແມ່)
	const [allCategories, setAllCategories] = useState([]);

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	/**
	 * 1) ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
	 */
	const fetchCategories = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			// ໃຊ້ service ທີ່ເຊື່ອມຕໍ່ກັບ backend
			const data = await categoryService.getAllCategories(false);
			setAllCategories(data); // ເກັບບັນຊີຫມົດສຳລັບໃຊ້ເລືອກໃນຟອມ

			if (currentCategory) {
				// ຖ້າມີໝວດໝູ່ປັດຈຸບັນໃຫ້ໂຫຼດໝວດໝູ່ຍ່ອຍຂອງມັນ
				const subCats = await categoryService.getSubCategories(
					currentCategory.id,
				);
				setCategories(subCats);
			} else {
				// ຖ້າບໍ່ມີໝວດໝູ່ປັດຈຸບັນໃຫ້ໂຫຼດໝວດໝູ່ຫຼັກ (ໝວດໝູ່ທີ່ບໍ່ມີແມ່)
				const mainCats = await categoryService.getMainCategories();
				setCategories(mainCats);
			}
		} catch (err) {
			console.error("Error fetching categories:", err);
			setError(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນປະເພດສິນຄ້າໄດ້",
			);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນປະເພດສິນຄ້າໄດ້",
				"error",
			);
		} finally {
			setLoading(false);
		}
	}, [currentCategory]);

	/**
	 * 2) ດຶງຂໍ້ມູນເມື່ອໂຫຼດໜ້າ ຫຼື ເມື່ອມີການປ່ຽນແປງໝວດໝູ່ປັດຈຸບັນ
	 */
	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	// Filter categories on search
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredCategories(categories);
			setIsSearching(false);
		} else {
			setIsSearching(true);
			const lower = searchQuery.toLowerCase();
			const filtered = categories.filter(
				(category) =>
					category.id?.toLowerCase().includes(lower) ||
					category.name?.toLowerCase().includes(lower),
			);
			setFilteredCategories(filtered);
		}
		setPage(0);
	}, [searchQuery, categories]);

	// Snackbar helpers
	const showNotification = (message, severity = "success") => {
		setNotification({ open: true, message, severity });
	};
	const closeNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	// Open/Close Dialog
	const handleOpen = (isEdit, category = null) => {
		setEditMode(isEdit);
		if (category) {
			setCategoryForm({
				id: category.id,
				name: category.name,
				status: category.status,
				createdDate: category.createdDate,
				parentId: category.parentId || null,
				level: category.level || 0,
			});
		} else {
			const now = new Date();
			const formattedDate =
				`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
				`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

			// ສ້າງລະຫັດປະເພດສິນຄ້າອັດຕະໂນມັດ C001, C002, ...
			const lastId =
				allCategories.length > 0
					? Math.max(
							...allCategories.map((c) =>
								Number.parseInt(c.id.substring(1), 10),
							),
						)
					: 0;
			const newId = `C${String(lastId + 1).padStart(3, "0")}`;

			setCategoryForm({
				id: newId,
				name: "",
				status: true,
				createdDate: formattedDate,
				parentId: currentCategory ? currentCategory.id : null, // ຖ້າຢູ່ໃນໝວດໝູ່ໃດໜຶ່ງໃຫ້ເລືອກໝວດໝູ່ນັ້ນເປັນແມ່
				level: currentCategory ? currentCategory.level + 1 : 0,
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
		setCategoryForm((prev) => ({ ...prev, [name]: value }));
	};

	// Handle status change with Switch component
	const handleStatusChange = (e) => {
		setCategoryForm((prev) => ({ ...prev, status: e.target.checked }));
	};

	// ຟັງຊັນສຳລັບການກວດສອບວົງຈອນ ເພື່ອໃຫ້ແນ່ໃຈວ່າບໍ່ໄດ້ເລືອກລູກເປັນແມ່
	const checkCircularReference = (parentId, currentId) => {
		if (!parentId) return false;
		if (parentId === currentId) return true;

		const getSubCategoryIds = (categoryId) => {
			const subCategories = allCategories.filter(
				(c) => c.parentId === categoryId,
			);
			if (subCategories.length === 0) return [];

			let ids = subCategories.map((c) => c.id);
			for (const sub of subCategories) {
				ids = [...ids, ...getSubCategoryIds(sub.id)];
			}

			return ids;
		};

		const subCategoryIds = getSubCategoryIds(currentId);
		return subCategoryIds.includes(parentId);
	};

	// Save or Update category
	const handleSave = async () => {
		try {
			// ກວດສອບຂໍ້ມູນພື້ນຖານ
			if (!categoryForm.name) {
				showNotification("ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ", "error");
				return;
			}

			// ກວດສອບການກຳນົດໝວດໝູ່ແມ່ທີ່ບໍ່ຖືກຕ້ອງ (ເລືອກລູກຂອງໂຕເອງເປັນແມ່)
			if (editMode && categoryForm.parentId) {
				const isCircular = checkCircularReference(
					categoryForm.parentId,
					categoryForm.id,
				);
				if (isCircular) {
					showNotification("ບໍ່ສາມາດເລືອກລູກຂອງຕົນເອງເປັນໝວດໝູ່ແມ່ໄດ້", "error");
					return;
				}
			}

			if (editMode) {
				// Update existing category
				const response = await categoryService.updateCategory(categoryForm.id, {
					name: categoryForm.name,
					status: categoryForm.status,
					parentId: categoryForm.parentId,
					level: categoryForm.level,
				});

				// ອັບເດດລາຍການປະເພດສິນຄ້າ
				setCategories((prev) =>
					prev.map((category) =>
						category.id === categoryForm.id ? response.category : category,
					),
				);

				// ດຶງຂໍ້ມູນໃໝ່ເພື່ອເອົາໂຄງສ້າງຫຼ້າສຸດ
				await fetchCategories();

				showNotification("ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ", "success");
			} else {
				// Create new category
				const response = await categoryService.createCategory({
					name: categoryForm.name,
					status: categoryForm.status,
					parentId: categoryForm.parentId,
					level: categoryForm.level,
				});

				// ເພີ່ມລາຍການປະເພດສິນຄ້າໃໝ່
				setCategories((prev) => [response.category, ...prev]);

				showNotification("ສ້າງຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ", "success");
			}

			handleClose();
		} catch (err) {
			console.error("Error saving category:", err);
			showNotification(
				err.response?.data?.message ||
					err.message ||
					"ບໍ່ສາມາດບັນທຶກຂໍ້ມູນປະເພດສິນຄ້າໄດ້",
				"error",
			);
		}
	};

	// Delete category
	const handleDelete = async (id) => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບປະເພດສິນຄ້ານີ້?")) {
			try {
				await categoryService.deleteCategory(id);

				// ອັບເດດລາຍການປະເພດສິນຄ້າໂດຍລຶບລາຍການທີ່ມີ ID ກົງກັນອອກ
				setCategories((prev) => prev.filter((category) => category.id !== id));

				showNotification("ລຶບຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ", "success");
			} catch (err) {
				console.error("Error deleting category:", err);
				showNotification(
					err.response?.data?.message || err.message || "ບໍ່ສາມາດລຶບປະເພດສິນຄ້າໄດ້",
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
			return fetchCategories();
		}

		try {
			setLoading(true);
			setError(null);

			// ເຮັດການຄົ້ນຫາໂດຍໃຊ້ API
			const results = await categoryService.searchCategories(searchQuery);
			setCategories(results);
		} catch (err) {
			console.error("Error searching categories:", err);
			setError(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດຄົ້ນຫາປະເພດສິນຄ້າໄດ້",
			);
			showNotification(
				err.response?.data?.message || err.message || "ບໍ່ສາມາດຄົ້ນຫາປະເພດສິນຄ້າໄດ້",
				"error",
			);
		} finally {
			setLoading(false);
		}
	};

	// ຟັງຊັນສຳລັບເປີດໝວດໝູ່
	const handleOpenCategory = async (category) => {
		setCurrentCategory(category);

		// ເພີ່ມໝວດໝູ່ປັດຈຸບັນເຂົ້າໃນເສັ້ນທາງ breadcrumb
		const updatedTrail = [...breadcrumbTrail];

		// ກວດສອບວ່າມີໝວດໝູ່ນີ້ຢູ່ແລ້ວຫຼືບໍ່
		const existingIndex = updatedTrail.findIndex(
			(item) => item.id === category.id,
		);
		if (existingIndex !== -1) {
			// ຖ້າມີແລ້ວ, ຕັດເອົາແຕ່ສ່ວນທີ່ຢູ່ຫຼັງໄປ
			setBreadcrumbTrail(updatedTrail.slice(0, existingIndex + 1));
		} else {
			// ຖ້າຍັງບໍ່ມີ, ເພີ່ມລົງໄປ
			setBreadcrumbTrail([...updatedTrail, category]);
		}

		// ດຶງຂໍ້ມູນລູກຂອງໝວດໝູ່ນີ້
		try {
			setLoading(true);
			const subCategories = await categoryService.getSubCategories(category.id);
			setCategories(subCategories);
		} catch (err) {
			console.error(`Error fetching subcategories for ${category.id}:`, err);
			showNotification(`ບໍ່ສາມາດໂຫຼດໝວດໝູ່ຍ່ອຍໄດ້: ${err.message}`, "error");
		} finally {
			setLoading(false);
		}
	};

	// ຟັງຊັນສຳລັບຍ້ອນກັບໄປທີ່ໝວດໝູ່ແມ່
	const handleGoBack = async () => {
		// ຖ້າຢູ່ໃນໝວດໝູ່ຫຼັກແລ້ວ, ບໍ່ຕ້ອງເຮັດຫຍັງ
		if (!currentCategory) return;

		try {
			setLoading(true);

			if (currentCategory.parentId) {
				// ຖ້າມີ parentId, ໂຫຼດຂໍ້ມູນຂອງໝວດໝູ່ແມ່
				const parentCategory = await categoryService.getCategoryById(
					currentCategory.parentId,
				);
				setCurrentCategory(parentCategory);

				// ອັບເດດ breadcrumb trail
				const parentIndex = breadcrumbTrail.findIndex(
					(item) => item.id === parentCategory.id,
				);
				if (parentIndex !== -1) {
					setBreadcrumbTrail(breadcrumbTrail.slice(0, parentIndex + 1));
				}

				// ໂຫຼດລູກຂອງໝວດໝູ່ແມ່
				const siblings = await categoryService.getSubCategories(
					parentCategory.id,
				);
				setCategories(siblings);
			} else {
				// ຖ້າບໍ່ມີ parentId, ໄປຫາລາຍການໝວດໝູ່ຫຼັກ
				setCurrentCategory(null);
				setBreadcrumbTrail([]);
				const mainCategories = await categoryService.getMainCategories();
				setCategories(mainCategories);
			}
		} catch (err) {
			console.error("Error navigating back:", err);
			showNotification(`ບໍ່ສາມາດກັບໄປຫາໝວດໝູ່ແມ່ໄດ້: ${err.message}`, "error");
		} finally {
			setLoading(false);
		}
	};

	// ຟັງຊັນສຳລັບການໄປຫາໝວດໝູ່ທີ່ລະບຸໄວ້ໃນ breadcrumb
	const handleBreadcrumbClick = async (category, index) => {
		try {
			setLoading(true);

			if (!category) {
				// ຖ້າເປັນ "ໜ້າຫຼັກ", ກັບໄປຫາລາຍການໝວດໝູ່ຫຼັກ
				setCurrentCategory(null);
				setBreadcrumbTrail([]);
				const mainCategories = await categoryService.getMainCategories();
				setCategories(mainCategories);
			} else {
				// ໄປຫາໝວດໝູ່ທີ່ເລືອກ
				setCurrentCategory(category);

				// ອັບເດດ breadcrumb trail
				setBreadcrumbTrail(breadcrumbTrail.slice(0, index + 1));

				// ໂຫຼດລູກຂອງໝວດໝູ່ນີ້
				const children = await categoryService.getSubCategories(category.id);
				setCategories(children);
			}
		} catch (err) {
			console.error("Error navigating via breadcrumb:", err);
			showNotification(`ບໍ່ສາມາດນຳທາງໄປຫາໝວດໝູ່ໄດ້: ${err.message}`, "error");
		} finally {
			setLoading(false);
		}
	};

	// Table columns - ຕາມທີ່ຕ້ອງການ
	const tableHeaders = [
		{
			id: "id",
			label: "ລະຫັດປະເພດສິນຄ້າ",
			width: 150,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "name",
			label: "ຊື່ປະເພດສິນຄ້າ",
			width: 200,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		// {
		// 	id: "status",
		// 	label: "ສະຖານະ",
		// 	width: 120,
		// 	align: "center",
		// 	style: { fontFamily: "Noto Sans Lao, sans-serif" },
		// },
		{
			id: "subcategories",
			label: "ໝວດໝູ່ຍ່ອຍ",
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
					ຈັດການປະເພດສິນຄ້າ
				</Typography>

				{/* Breadcrumb navigation */}
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize="small" />}
					aria-label="breadcrumb"
					sx={{ mb: 2, px: 1, color: isSearching ? "#999" : "inherit" }}
				>
					<Link
						component="button"
						color="inherit"
						onClick={() => handleBreadcrumbClick(null, -1)}
						sx={{
							textDecoration: "none",
							display: "flex",
							alignItems: "center",
							fontFamily: "Noto Sans Lao, sans-serif",
							opacity: isSearching ? 0.6 : 1,
						}}
						disabled={isSearching}
					>
						<FolderIcon sx={{ mr: 0.5, fontSize: "small" }} />
						ໜ້າຫຼັກ
					</Link>

					{breadcrumbTrail.map((cat, index) => (
						<Link
							key={cat.id}
							component="button"
							color="inherit"
							onClick={() => handleBreadcrumbClick(cat, index)}
							sx={{
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
								fontWeight:
									index === breadcrumbTrail.length - 1 ? "bold" : "normal",
								fontFamily: "Noto Sans Lao, sans-serif",
								opacity: isSearching ? 0.6 : 1,
							}}
							disabled={isSearching}
						>
							{index === breadcrumbTrail.length - 1 ? (
								<FolderOpenIcon sx={{ mr: 0.5, fontSize: "small" }} />
							) : (
								<FolderIcon sx={{ mr: 0.5, fontSize: "small" }} />
							)}
							{cat.name}
						</Link>
					))}

					{isSearching && (
						<Typography
							sx={{
								display: "flex",
								alignItems: "center",
								fontFamily: "Noto Sans Lao, sans-serif",
							}}
						>
							<SearchIcon sx={{ mr: 0.5, fontSize: "small" }} />
							ຜົນການຄົ້ນຫາ: {searchQuery}
						</Typography>
					)}
				</Breadcrumbs>

				<Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
					<Grid item xs={12} sm="auto">
						{currentCategory && (
							<Button
								variant="outlined"
								startIcon={<ArrowBackIcon />}
								onClick={handleGoBack}
								sx={{
									borderRadius: "30px",
									mr: 1,
									fontFamily: "Noto Sans Lao, sans-serif",
								}}
								disabled={isSearching}
							>
								ກັບຄືນ
							</Button>
						)}

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
							ເພີ່ມປະເພດສິນຄ້າ{currentCategory ? "ຍ່ອຍ" : ""}
						</Button>
					</Grid>

					<Grid item xs={12} sm>
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
									{filteredCategories
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((category, index) => {
											// ນັບຈຳນວນໝວດໝູ່ຍ່ອຍຂອງແຕ່ລະໝວດໝູ່
											const subCount = allCategories.filter(
												(c) => c.parentId === category.id,
											).length;

											return (
												<TableRow
													key={category.id}
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
														{category.id}
													</TableCell>
													<TableCell
														style={{
															width: tableHeaders[1].width,
															fontFamily: "Noto Sans Lao, sans-serif",
															cursor: "pointer",
														}}
														onClick={() => handleOpenCategory(category)}
													>
														<Box
															sx={{
																display: "flex",
																alignItems: "center",
																color: "#1976d2",
															}}
														>
															<FolderIcon sx={{ mr: 1, color: "#546e7a" }} />
															{category.name}
														</Box>
													</TableCell>
													{/* <TableCell
														align="center"
														style={{
															width: tableHeaders[2].width,
															fontFamily: "Noto Sans Lao, sans-serif",
														}}
													>
														<Chip
															label={category.status ? "ໃຊ້ງານ" : "ບໍ່ໃຊ້ງານ"}
															color={category.status ? "success" : "error"}
															sx={{
																fontFamily: "Noto Sans Lao, sans-serif",
																fontWeight: "medium",
															}}
														/>
													</TableCell> */}
													<TableCell
														align="center"
														style={{
															width: tableHeaders[3].width,
															fontFamily: "Noto Sans Lao, sans-serif",
														}}
													>
														<Chip
															label={subCount.toString()}
															color={subCount > 0 ? "primary" : "default"}
															sx={{
																fontFamily: "Noto Sans Lao, sans-serif",
																cursor: subCount > 0 ? "pointer" : "default",
															}}
															onClick={
																subCount > 0
																	? () => handleOpenCategory(category)
																	: undefined
															}
														/>
													</TableCell>
													<TableCell
														align="center"
														style={{ width: tableHeaders[2].width }}
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
																onClick={() => handleOpen(true, category)}
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
																onClick={() => handleDelete(category.id)}
																sx={{
																	bgcolor: "#ffebee",
																	"&:hover": { bgcolor: "#ffcdd2" },
																	borderRadius: "4px",
																	p: 1,
																}}
																disabled={subCount > 0}
															>
																<DeleteIcon fontSize="small" />
															</IconButton>
														</Box>
													</TableCell>
												</TableRow>
											);
										})}
									{filteredCategories.length === 0 && (
										<TableRow>
											<TableCell
												colSpan={tableHeaders.length}
												align="center"
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												{isSearching
													? "ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ"
													: currentCategory
														? "ບໍ່ມີໝວດໝູ່ຍ່ອຍໃນໝວດໝູ່ນີ້"
														: "ບໍ່ມີຂໍ້ມູນປະເພດສິນຄ້າ"}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</Box>
					</Box>
				)}

				{/* Pagination */}
				{!loading && !error && filteredCategories.length > 0 && (
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
									<MenuItem value={25}>25</MenuItem>
									<MenuItem value={50}>50</MenuItem>
								</Select>
							</FormControl>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography variant="body2" sx={{ mr: 2 }}>
								{`${page * rowsPerPage + 1}-${Math.min(
									(page + 1) * rowsPerPage,
									filteredCategories.length,
								)} of ${filteredCategories.length}`}
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
									page >= Math.ceil(filteredCategories.length / rowsPerPage) - 1
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
											Math.ceil(filteredCategories.length / rowsPerPage) - 1,
										),
									)
								}
								disabled={
									page >= Math.ceil(filteredCategories.length / rowsPerPage) - 1
								}
								size="small"
							>
								<KeyboardDoubleArrowRightIcon fontSize="small" />
							</IconButton>
						</Box>
					</Box>
				)}

				{/* Dialog for create/edit category */}
				<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
					<DialogTitle
						sx={{
							bgcolor: "#079578",
							color: "white",
							fontFamily: "Noto Sans Lao, sans-serif",
						}}
					>
						{editMode ? "ແກ້ໄຂຂໍ້ມູນປະເພດສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນປະເພດສິນຄ້າ"}
					</DialogTitle>

					<DialogContent>
						<Box
							sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
						>
							<TextField
								name="id"
								label="ລະຫັດປະເພດສິນຄ້າ"
								fullWidth
								value={categoryForm.id}
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
								label="ຊື່ປະເພດສິນຄ້າ"
								fullWidth
								value={categoryForm.name}
								onChange={handleChange}
								required
								InputProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
								InputLabelProps={{
									style: { fontFamily: "Noto Sans Lao, sans-serif" },
								}}
							/>

							<FormControl fullWidth>
								<Typography
									component="label"
									sx={{
										mb: 1,
										fontFamily: "Noto Sans Lao, sans-serif",
										fontSize: "0.875rem",
										color: "rgba(0, 0, 0, 0.6)",
									}}
								>
									ໝວດໝູ່ແມ່
								</Typography>
								{/* <Select
									name="parentId"
									value={categoryForm.parentId || ""}
									onChange={handleChange}
									displayEmpty
									sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
								>
									<MenuItem
										value=""
										sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
									>
										<em>ໝວດໝູ່ຫຼັກ (ບໍ່ມີໝວດໝູ່ແມ່)</em>
									</MenuItem>
									{allCategories
										.filter((cat) => cat.id !== categoryForm.id) // ບໍ່ໃຫ້ເລືອກໂຕເອງເປັນແມ່
										.map((cat) => (
											<MenuItem
												key={cat.id}
												value={cat.id}
												sx={{
													fontFamily: "Noto Sans Lao, sans-serif",
													pl: cat.level ? cat.level * 2 + 1 : 1, // ເຍື້ອງຕາມລະດັບຊັ້ນ
												}}
											>
												{cat.name}
											</MenuItem>
										))}
								</Select> */}
							</FormControl>

							<FormControlLabel
								control={
									<Switch
										checked={categoryForm.status}
										onChange={handleStatusChange}
										color="success"
									/>
								}
								label={
									<Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
										{categoryForm.status ? "ໃຊ້ງານ" : "ບໍ່ໃຊ້ງານ"}
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

export default Management_product_category;