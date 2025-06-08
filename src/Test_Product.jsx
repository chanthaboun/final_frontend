// frontend/src/pages/Manage_product_Info.jsx
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
import UploadFileIcon from "@mui/icons-material/UploadFile";

// import API functions
import {
	getAllProducts,
	searchProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getUnits,
	getCategories,
	getBrands,
} from "../api/product.api";

// Unit - ໃຊ້ເມື່ອການເຊື່ອມຕໍ່ API ບໍ່ສຳເລັດ
const defaultUnits = [
	"ອັນ",
	"ຕຸກ",
	"ເສັ້ນ",
	"ຄັນ",
	"ຫົວ",
	"ຂວດ",
	"ກ່ອງ",
	"ຊອງ",
	"ຖົງ",
	"ໜ່ວຍ",
	"ເຄື່ອງ",
	"ຊຸດ",
	"ກິໂລກຣາມ",
	"ແມັດ",
	"ລິດ",
	"ຈອກ",
	"ຊຸດ",
	"ແພັກ",
	"ແຜ່ນ",
	"ແກ້ວ",
];

const Manage_product_Info = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State for products and UI
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [units, setUnits] = useState(defaultUnits);
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	// ເພີ່ມ state ສຳລັບເກັບຂໍ້ມູນທັງໝົດ (ລວມທັງທີ່ບໍ່ໃຊ້ງານ)
	const [allCategories, setAllCategories] = useState([]);
	const [allBrands, setAllBrands] = useState([]);

	// Pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(3);

	// Search
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);

	// Dialog states
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// File upload state
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");

	// ເພີ່ມ state ໃໝ່ສຳລັບໂມດອລຮູບພາບ
	const [imageViewOpen, setImageViewOpen] = useState(false);
	const [viewImageUrl, setViewImageUrl] = useState("");
	// ເພີ່ມ state ສຳລັບ hover preview
	const [hoverPreviewOpen, setHoverPreviewOpen] = useState(false);
	const [hoverImageUrl, setHoverImageUrl] = useState("");
	const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

	// Current product form data
	const [currentProduct, setCurrentProduct] = useState({
		id: "",
		name: "",
		quantity: 0,
		minQuantity: 0,
		unit: "",
		category: "",
		brand: "",
		description: "",
		imageUrl: "",
		status: "active",
		createdDate: "",
	});

	// Notification (Snackbar)
	const [notification, setNotification] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	// ດຶງຂໍ້ມູນພື້ນຖານ (ເຊັ່ນ: ໜ່ວຍ, ປະເພດ, ຍີ່ຫໍ້) ເມື່ອ component ໂຫຼດຂຶ້ນ
	useEffect(() => {
		// ຍ້າຍຟັງຊັນເຂົ້າມາໃນ useEffect ເພື່ອແກ້ໄຂບັນຫາ dependencies
		const getActiveSubCategories = (categories) => {
			if (!categories || !Array.isArray(categories)) return [];
			// ກໍາລອງສະເພາະໝວດໝູ່ຍ່ອຍທີ່ມີສະຖານະ active
			return categories.filter((category) => {
				// ກວດສອບວ່າມີ parentId (ແມ່ນໝວດໝູ່ຍ່ອຍ) ແລະ ສະຖານະເປັນ active
				return category.parentId && category.status === true;
			});
		};

		const getActiveBrands = (brands) => {
			if (!brands || !Array.isArray(brands)) return [];
			// ກໍາລອງສະເພາະຍີ່ຫໍ້ທີ່ມີສະຖານະ active
			return brands.filter((brand) => brand.status === true);
		};

		const fetchBasicData = async () => {
			try {
				// ດຶງຂໍ້ມູນໜ່ວຍສິນຄ້າ
				const unitsResponse = await getUnits();
				if (unitsResponse.success) {
					setUnits(unitsResponse.units);
				}

				// ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
				const categoriesResponse = await getCategories();
				if (categoriesResponse.success) {
					setAllCategories(categoriesResponse.categories);
					// ກໍາລອງສະເພາະປະເພດສິນຄ້າທີ່ເປັນໝວດໝູ່ຍ່ອຍ ແລະ ໃຊ້ງານ
					const activeSubCategories = getActiveSubCategories(
						categoriesResponse.categories,
					);
					setCategories(activeSubCategories);
				}

				// ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທັງໝົດ
				const brandsResponse = await getBrands();
				if (brandsResponse.success) {
					setAllBrands(brandsResponse.brands);
					// ກໍາລອງສະເພາະຍີ່ຫໍ້ສິນຄ້າທີ່ໃຊ້ງານ
					const activeBrands = getActiveBrands(brandsResponse.brands);
					setBrands(activeBrands);
				}
			} catch (err) {
				console.error("Error fetching basic data:", err);
				// ໃຊ້ຂໍ້ມູນທີ່ກຳນົດໄວ້ແລ້ວຖ້າການດຶງຂໍ້ມູນບໍ່ສຳເລັດ
			}
		};

		fetchBasicData();
	}, []); // dependency array ວ່າງ - ເຮັດວຽກພຽງຄັ້ງດຽວເມື່ອ component mount

	// ດຶງຂໍ້ມູນສິນຄ້າຈາກ server
	const fetchProducts = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await getAllProducts();
			if (response.success) {
				setProducts(response.products);
				setFilteredProducts(response.products);
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

	// ດຶງຂໍ້ມູນສິນຄ້າເມື່ອ component ໂຫຼດຂຶ້ນ
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	// Filter products on search
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredProducts(products);
		} else {
			const lower = searchQuery.toLowerCase();
			const filtered = products.filter(
				(prod) =>
					prod.id?.toLowerCase().includes(lower) ||
					prod.name?.toLowerCase().includes(lower) ||
					prod.category?.toLowerCase().includes(lower) ||
					prod.brand?.toLowerCase().includes(lower) ||
					prod.description?.toLowerCase().includes(lower),
			);
			setFilteredProducts(filtered);
		}
		setPage(0);
	}, [searchQuery, products]);

	// ຄົ້ນຫາສິນຄ້າຈາກ server
	const handleSearch = async () => {
		if (searchQuery.trim() === "") {
			fetchProducts();
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await searchProducts(searchQuery);
			if (response.success) {
				setFilteredProducts(response.products);
			} else {
				setError("ບໍ່ສາມາດຄົ້ນຫາສິນຄ້າໄດ້.");
			}
		} catch (err) {
			console.error("Error searching products:", err);
			setError("ບໍ່ສາມາດຄົ້ນຫາສິນຄ້າໄດ້. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
		} finally {
			setLoading(false);
		}
	};

	// Snackbar helpers
	const showNotification = (message, severity = "success") => {
		setNotification({ open: true, message, severity });
	};
	const closeNotification = () => {
		setNotification((prev) => ({ ...prev, open: false }));
	};

	// ຟັງຊັນສຳລັບກວດສອບວ່າປະເພດສິນຄ້າ ແລະ ຍີ່ຫໍ້ຍັງໃຊ້ງານຢູ່ຫຼືບໍ່
	const isCategoryActive = (categoryName) => {
		const category = allCategories.find((cat) => cat.name === categoryName);
		return category ? category.status === true : false;
	};

	const isBrandActive = (brandName) => {
		const brand = allBrands.find((b) => b.name === brandName);
		return brand ? brand.status === true : false;
	};

	// ຟັງຊັນສຳລັບການເປີດເບິ່ງຮູບພາບ
	const handleViewImage = (imageUrl) => {
		if (imageUrl) {
			const fullImageUrl = imageUrl.startsWith("http")
				? imageUrl
				: `http://localhost:5001${imageUrl}`;
			setViewImageUrl(fullImageUrl);
			setImageViewOpen(true);
		}
	};

	// ຟັງຊັນສຳລັບການປິດໂມດອລຮູບພາບ
	const handleCloseImageView = () => {
		setImageViewOpen(false);
	};

	// ຟັງຊັນສຳລັບການເບິ່ງຮູບແບບ hover
	const handleMouseEnterImage = (event, imageUrl) => {
		if (imageUrl) {
			const fullImageUrl = imageUrl.startsWith("http")
				? imageUrl
				: `http://localhost:5001${imageUrl}`;

			// ຄຳນວນຕຳແໜ່ງທີ່ຈະສະແດງຮູບ preview
			const x = event.clientX;
			const y = event.clientY;

			setHoverImageUrl(fullImageUrl);
			setHoverPosition({ x, y });
			setHoverPreviewOpen(true);
		}
	};

	// ຟັງຊັນສຳລັບການຍ້າຍເມົ້າອອກຈາກຮູບພາບ
	const handleMouseLeaveImage = () => {
		setHoverPreviewOpen(false);
	};

	// Open/Close Dialog
	const handleOpen = (isEdit, product = null) => {
		setEditMode(isEdit);
		setPreviewUrl(""); // Reset preview
		setSelectedFile(null); // Reset file selection

		if (product) {
			setCurrentProduct({
				id: product.id,
				name: product.name,
				quantity: product.quantity,
				minQuantity: product.minQuantity,
				unit: product.unit,
				category: product.category,
				brand: product.brand,
				description: product.description,
				imageUrl: product.imageUrl,
				status: product.status,
				createdDate: product.createdDate,
			});

			// Set preview if image exists
			if (product.imageUrl) {
				if (product.imageUrl.startsWith("http")) {
					setPreviewUrl(product.imageUrl);
				} else {
					setPreviewUrl(`http://localhost:5001${product.imageUrl}`);
				}
			}
		} else {
			const now = new Date();
			const formattedDate =
				`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
				`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

			setCurrentProduct({
				id: "",
				name: "",
				quantity: 0,
				minQuantity: 0,
				unit: "",
				category: "",
				brand: "",
				description: "",
				imageUrl: "",
				status: "active",
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

		// Handle number fields to ensure they are stored as numbers
		if (["quantity", "minQuantity"].includes(name)) {
			setCurrentProduct((prev) => ({
				...prev,
				[name]: value === "" ? "" : Number(value),
			}));
		} else {
			setCurrentProduct((prev) => ({ ...prev, [name]: value }));
		}
	};

	// ແກ້ໄຂສ່ວນການຈັດການກັບຮູບພາບໃນຟໍມເພີ່ມ/ແກ້ໄຂສິນຄ້າ
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// ກວດສອບຂະໜາດຂອງໄຟລ໌
			if (file.size > 5 * 1024 * 1024) {
				// 5MB
				showNotification("ຂະໜາດຂອງໄຟລ໌ໃຫຍ່ເກີນໄປ. ຂະໜາດສູງສຸດແມ່ນ 5MB", "error");
				return;
			}

			// ກວດສອບປະເພດຂອງໄຟລ໌
			const allowedTypes = [
				"image/jpeg",
				"image/jpg",
				"image/png",
				"image/gif",
			];
			if (!allowedTypes.includes(file.type)) {
				showNotification(
					"ປະເພດຂອງໄຟລ໌ບໍ່ຖືກຕ້ອງ. ກະລຸນາອັບໂຫຼດຮູບພາບໃນຮູບແບບ JPEG, JPG, PNG ຫຼື GIF",
					"error",
				);
				return;
			}

			setSelectedFile(file);
			console.log(
				"File selected:",
				file.name,
				"size:",
				file.size,
				"type:",
				file.type,
			);

			// ສ້າງ preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	// ແກ້ໄຂສ່ວນຂອງການບັນທຶກສິນຄ້າ
	const handleSave = async () => {
		try {
			// ກວດສອບຂໍ້ມູນພື້ນຖານ
			if (!currentProduct.name) {
				showNotification("ກະລຸນາປ້ອນຊື່ສິນຄ້າ", "error");
				return;
			}

			// ກວດສອບວ່າປະເພດສິນຄ້າທີ່ເລືອກຍັງໃຊ້ງານຢູ່ຫຼືບໍ່
			if (
				currentProduct.category &&
				!isCategoryActive(currentProduct.category)
			) {
				showNotification(
					"ປະເພດສິນຄ້າທີ່ເລືອກບໍ່ສາມາດໃຊ້ງານໄດ້ ກະລຸນາເລືອກປະເພດອື່ນ",
					"error",
				);
				return;
			}

			// ກວດສອບວ່າຍີ່ຫໍ້ສິນຄ້າທີ່ເລືອກຍັງໃຊ້ງານຢູ່ຫຼືບໍ່
			if (currentProduct.brand && !isBrandActive(currentProduct.brand)) {
				showNotification("ຍີ່ຫໍ້ສິນຄ້າທີ່ເລືອກບໍ່ສາມາດໃຊ້ງານໄດ້ ກະລຸນາເລືອກຍີ່ຫໍ້ອື່ນ", "error");
				return;
			}

			// ສ້າງຂໍ້ມູນທີ່ຈະສົ່ງໄປຫາ server
			const productData = {
				name: currentProduct.name,
				quantity: currentProduct.quantity || 0,
				minQuantity: currentProduct.minQuantity || 0,
				unit: currentProduct.unit || "",
				category: currentProduct.category || "",
				brand: currentProduct.brand || "",
				description: currentProduct.description || "",
				status: currentProduct.status || "active",
			};

			// ຖ້າມີໄຟລ໌ຮູບພາບໃໝ່, ໃຫ້ເພີ່ມໃສ່ຂໍ້ມູນ
			if (selectedFile) {
				productData.image = selectedFile;
				console.log("Adding image to productData:", selectedFile.name);
			}

			let response;
			if (editMode) {
				// ອັບເດດສິນຄ້າ
				console.log("Updating product:", currentProduct.id, productData);
				response = await updateProduct(currentProduct.id, productData);
			} else {
				// ສ້າງສິນຄ້າໃໝ່
				console.log("Creating new product:", productData);
				response = await createProduct(productData);
			}

			if (response.success) {
				if (editMode) {
					// ອັບເດດລາຍການສິນຄ້າໃນ state
					setProducts((prev) =>
						prev.map((prod) =>
							prod.id === response.product.id ? response.product : prod,
						),
					);

					showNotification(
						response.message || "ອັບເດດຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ",
						"success",
					);
				} else {
					// ເພີ່ມສິນຄ້າໃໝ່ໃສ່ລາຍການ
					setProducts((prev) => [response.product, ...prev]);

					showNotification(response.message || "ສ້າງຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ", "success");
				}

				handleClose();
				// ລ້າງຄ່າຕ່າງໆຫຼັງຈາກບັນທຶກສຳເລັດ
				setSelectedFile(null);
				setPreviewUrl("");
			} else {
				showNotification(
					response.message ||
						(editMode ? "ບໍ່ສາມາດອັບເດດຂໍ້ມູນສິນຄ້າໄດ້" : "ບໍ່ສາມາດສ້າງຂໍ້ມູນສິນຄ້າໄດ້"),
					"error",
				);
			}
		} catch (err) {
			console.error("Error saving product:", err);
			showNotification(
				err.response?.data?.message || "ບໍ່ສາມາດບັນທຶກຂໍ້ມູນສິນຄ້າໄດ້",
				"error",
			);
		}
	};

	// Delete product
	const handleDelete = async (id) => {
		if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບສິນຄ້ານີ້?")) {
			try {
				const response = await deleteProduct(id);

				if (response.success) {
					// ລຶບສິນຄ້າອອກຈາກລາຍການ
					setProducts((prev) => prev.filter((prod) => prod.id !== id));

					showNotification(response.message || "ລຶບຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ", "success");
				} else {
					showNotification("ບໍ່ສາມາດລຶບສິນຄ້າໄດ້", "error");
				}
			} catch (err) {
				console.error("Error deleting product:", err);
				showNotification("ບໍ່ສາມາດລຶບສິນຄ້າໄດ້", "error");
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

	// Table columns
	const tableHeaders = [
		{
			id: "image",
			label: "ຮູບພາບ",
			width: 100,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "id",
			label: "ລະຫັດ",
			width: 100,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "name",
			label: "ຊື່ສິນຄ້າ",
			width: 150,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "quantity",
			label: "ຈຳນວນ",
			width: 100,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "category",
			label: "ປະເພດສິນຄ້າ",
			width: 100,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "unit",
			label: "ຫົວໜ່ວຍ",
			width: 100,
			style: { fontFamily: "Noto Sans Lao, sans-serif" },
		},
		{
			id: "status",
			label: "ສະຖານະ",
			width: 100,
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

	// ຮັບຄ່າສີ ແລະ ເນື້ອໃນທີ່ສະແດງຕາມສະຖານະຂອງສິນຄ້າ
	const getStatusDisplay = (status) => {
		switch (status) {
			case "active":
				return { color: "#2e7d32", bgcolor: "#e8f5e9", text: "ມີໃນສາງ" };
			case "low-stock":
				return { color: "#f57f17", bgcolor: "#fff8e1", text: "ໃກ້ໝົດ" };
			case "out-of-stock":
				return { color: "#c62828", bgcolor: "#ffebee", text: "ໝົດແລ້ວ" };
			default:
				return {
					color: "#2e7d32",
					bgcolor: "#e8f5e9",
					text: status || "ມີໃນສາງ",
				};
		}
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
					ລາຍການສິນຄ້າ
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
							ເພີ່ມສິນຄ້າ
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
				{!loading && (
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
									{filteredProducts
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((product, index) => {
											const statusDisplay = getStatusDisplay(product.status);

											// ກວດສອບວ່າປະເພດສິນຄ້າ ແລະ ຍີ່ຫໍ້ຍັງໃຊ້ງານຢູ່ຫຼືບໍ່
											const categoryActive = isCategoryActive(product.category);
											const brandActive = isBrandActive(product.brand);

											return (
												<TableRow
													key={product.id}
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
														{product.imageUrl ? (
															<Box
																component="img"
																src={`http://localhost:5001${product.imageUrl}`}
																alt={product.name}
																sx={{
																	width: 60,
																	height: 60,
																	objectFit: "cover",
																	borderRadius: "4px",
																	cursor: "pointer",
																	transition: "transform 0.2s",
																	"&:hover": {
																		transform: "scale(1.05)",
																		boxShadow: "0 0 8px rgba(0,0,0,0.2)",
																	},
																}}
																onClick={() =>
																	handleViewImage(product.imageUrl)
																}
																onMouseEnter={(e) =>
																	handleMouseEnterImage(e, product.imageUrl)
																}
																onMouseLeave={handleMouseLeaveImage}
																onError={(e) => {
																	console.error(
																		"Image failed to load:",
																		product.imageUrl,
																	);
																	e.target.onerror = null;
																	e.target.src = "/placeholder-image.png";
																}}
															/>
														) : (
															<Box
																sx={{
																	width: 60,
																	height: 60,
																	bgcolor: "#f0f0f0",
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "center",
																	borderRadius: "4px",
																}}
															>
																No Image
															</Box>
														)}
													</TableCell>
													<TableCell
														style={{
															width: tableHeaders[1].width,
															fontFamily: "Noto Sans Lao, sans-serif",
														}}
													>
														{product.id}
													</TableCell>
													<TableCell
														style={{
															width: tableHeaders[2].width,
															fontFamily: "Noto Sans Lao, sans-serif",
														}}
													>
														{product.name}
													</TableCell>
													<TableCell
														style={{
															width: tableHeaders[3].width,
															fontFamily: "Noto Sans Lao, sans-serif",
														}}
													>
														{product.quantity}
													</TableCell>
													<TableCell
														style={{
															width: tableHeaders[4].width,
															fontFamily: "Noto Sans Lao, sans-serif",
															color: !categoryActive ? "#d32f2f" : "inherit",
															fontStyle: !categoryActive ? "italic" : "normal",
														}}
													>
														{product.category || "ບໍ່ລະບຸ"}
														{!categoryActive && product.category && (
															<Box
																component="span"
																sx={{ fontSize: "0.8rem", ml: 1 }}
															>
																(ບໍ່ໃຊ້ງານ)
															</Box>
														)}
													</TableCell>
													<TableCell
														style={{
															width: tableHeaders[5].width,
															fontFamily: "Noto Sans Lao, sans-serif",
														}}
													>
														{product.unit}
													</TableCell>
													<TableCell
														style={{
															width: tableHeaders[6].width,
															fontFamily: "Noto Sans Lao, sans-serif",
														}}
													>
														<Box
															sx={{
																bgcolor: statusDisplay.bgcolor,
																color: statusDisplay.color,
																p: 0.5,
																borderRadius: "4px",
																display: "inline-block",
																fontSize: "0.75rem",
																fontWeight: "medium",
																textAlign: "center",
																minWidth: "80px",
															}}
														>
															{statusDisplay.text}
														</Box>
													</TableCell>
													<TableCell
														align="center"
														style={{ width: tableHeaders[7].width }}
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
																onClick={() => handleOpen(true, product)}
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
																onClick={() => handleDelete(product.id)}
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
											);
										})}
									{filteredProducts.length === 0 && (
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
				{!loading && filteredProducts.length > 0 && (
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
									filteredProducts.length,
								)} of ${filteredProducts.length}`}
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
									page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1
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
											Math.ceil(filteredProducts.length / rowsPerPage) - 1,
										),
									)
								}
								disabled={
									page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1
								}
								size="small"
							>
								<KeyboardDoubleArrowRightIcon fontSize="small" />
							</IconButton>
						</Box>
					</Box>
				)}

				{/* Dialog for create/edit product */}
				<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
					<DialogTitle
						sx={{
							bgcolor: "#079578",
							color: "white",
							fontFamily: "Noto Sans Lao, sans-serif",
						}}
					>
						{editMode ? "ແກ້ໄຂຂໍ້ມູນສິນຄ້າ" : "ເພີ່ມຂໍ້ມູນສິນຄ້າ"}
					</DialogTitle>

					<DialogContent>
						<Box
							sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<Grid container spacing={2}>
										{editMode && (
											<Grid item xs={12}>
												<TextField
													name="id"
													label="ລະຫັດສິນຄ້າ"
													fullWidth
													value={currentProduct.id}
													disabled={true}
													InputProps={{
														style: { fontFamily: "Noto Sans Lao, sans-serif" },
													}}
													InputLabelProps={{
														style: { fontFamily: "Noto Sans Lao, sans-serif" },
													}}
												/>
											</Grid>
										)}
										<Grid item xs={12}>
											<TextField
												name="name"
												label="ຊື່ສິນຄ້າ"
												fullWidth
												value={currentProduct.name}
												onChange={handleChange}
												required
												InputProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
												InputLabelProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
											/>
										</Grid>

										<Grid item xs={12} sm={6}>
											<TextField
												name="quantity"
												label="ຈຳນວນ"
												type="number"
												fullWidth
												value={currentProduct.quantity}
												onChange={handleChange}
												InputProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
												InputLabelProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
											/>
										</Grid>

										<Grid item xs={12} sm={6}>
											<TextField
												name="minQuantity"
												label="ຈຳນວນຕ່ຳສຸດ"
												type="number"
												fullWidth
												value={currentProduct.minQuantity}
												onChange={handleChange}
												InputProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
												InputLabelProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl fullWidth>
												<InputLabel
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													ປະເພດສິນຄ້າ
												</InputLabel>
												<Select
													name="category"
													value={currentProduct.category || ""}
													onChange={handleChange}
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													label="ປະເພດສິນຄ້າ"
												>
													<MenuItem
														value=""
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														<em>ເລືອກປະເພດສິນຄ້າ</em>
													</MenuItem>
													{categories.map((category) => (
														<MenuItem
															key={category.id || category}
															value={category.name || category}
															sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
														>
															{category.name || category}
														</MenuItem>
													))}
												</Select>
												{categories.length === 0 && (
													<FormHelperText sx={{ color: "orange" }}>
														ບໍ່ມີປະເພດສິນຄ້າທີ່ສາມາດໃຊ້ງານໄດ້
													</FormHelperText>
												)}
											</FormControl>
										</Grid>

										<Grid item xs={12} sm={6}>
											<FormControl fullWidth>
												<InputLabel
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													ຫົວໜ່ວຍ
												</InputLabel>
												<Select
													name="unit"
													value={currentProduct.unit || ""}
													onChange={handleChange}
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													label="ຫົວໜ່ວຍ"
												>
													<MenuItem
														value=""
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														<em>ເລືອກຫົວໜ່ວຍ</em>
													</MenuItem>
													{units.map((unit) => (
														<MenuItem
															key={unit}
															value={unit}
															sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
														>
															{unit}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid item xs={12} sm={6}>
											<FormControl fullWidth>
												<InputLabel
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													ຍີ່ຫໍ້ສິນຄ້າ
												</InputLabel>
												<Select
													name="brand"
													value={currentProduct.brand || ""}
													onChange={handleChange}
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													label="ຍີ່ຫໍ້ສິນຄ້າ"
												>
													<MenuItem
														value=""
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														<em>ເລືອກຍີ່ຫໍ້ສິນຄ້າ</em>
													</MenuItem>
													{brands.map((brand) => (
														<MenuItem
															key={brand.id || brand}
															value={brand.name || brand}
															sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
														>
															{brand.name || brand}
														</MenuItem>
													))}
												</Select>
												{brands.length === 0 && (
													<FormHelperText sx={{ color: "orange" }}>
														ບໍ່ມີຍີ່ຫໍ້ສິນຄ້າທີ່ສາມາດໃຊ້ງານໄດ້
													</FormHelperText>
												)}
											</FormControl>
										</Grid>

										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
												>
													ສະຖານະ
												</InputLabel>
												<Select
													name="status"
													value={currentProduct.status || "active"}
													onChange={handleChange}
													sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													label="ສະຖານະ"
												>
													<MenuItem
														value="active"
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														ມີໃນສາງ
													</MenuItem>
													<MenuItem
														value="low-stock"
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														ໃກ້ໝົດ
													</MenuItem>
													<MenuItem
														value="out-of-stock"
														sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
													>
														ໝົດແລ້ວ
													</MenuItem>
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} md={6}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<TextField
												name="description"
												label="ລາຍລະອຽດສິນຄ້າ"
												fullWidth
												multiline
												rows={4}
												value={currentProduct.description || ""}
												onChange={handleChange}
												InputProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
												InputLabelProps={{
													style: { fontFamily: "Noto Sans Lao, sans-serif" },
												}}
											/>
										</Grid>

										<Grid item xs={12}>
											<Typography
												sx={{ mb: 1, fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												ຮູບພາບສິນຄ້າ
											</Typography>
											<Box
												sx={{
													border: "1px dashed #ccc",
													p: 2,
													borderRadius: 1,
													textAlign: "center",
													minHeight: "120px",
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
													position: "relative",
													mb: 2,
												}}
											>
												{previewUrl ? (
													<>
														<Box
															component="img"
															src={previewUrl}
															alt="Preview"
															sx={{
																maxWidth: "100%",
																maxHeight: "200px",
																objectFit: "contain",
																mb: 1,
																cursor: "pointer",
																transition: "transform 0.2s",
																"&:hover": {
																	transform: "scale(1.02)",
																},
															}}
															onClick={() => handleViewImage(previewUrl)}
															onMouseEnter={(e) =>
																handleMouseEnterImage(e, previewUrl)
															}
															onMouseLeave={handleMouseLeaveImage}
														/>
														<Box sx={{ display: "flex", gap: 1, mt: 1 }}>
															<Button
																size="small"
																color="primary"
																variant="outlined"
																onClick={() => {
																	setPreviewUrl("");
																	setSelectedFile(null);
																}}
																sx={{
																	fontFamily: "Noto Sans Lao, sans-serif",
																}}
															>
																ລຶບຮູບພາບ
															</Button>
															<Button
																size="small"
																color="primary"
																variant="contained"
																onClick={() => handleViewImage(previewUrl)}
																sx={{
																	fontFamily: "Noto Sans Lao, sans-serif",
																}}
															>
																ເບິ່ງຮູບພາບ
															</Button>
														</Box>
													</>
												) : (
													<>
														<UploadFileIcon
															sx={{ fontSize: 40, color: "#aaa", mb: 1 }}
														/>
														<Typography
															sx={{
																color: "#666",
																mb: 1,
																fontFamily: "Noto Sans Lao, sans-serif",
															}}
														>
															ຄລິກເພື່ອເລືອກຮູບພາບ ຫຼື ລາກແລະວາງໄຟລ໌ທີ່ນີ້
														</Typography>
														<Button
															component="label"
															variant="contained"
															size="small"
															sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
														>
															ເລືອກຮູບພາບ
															<input
																type="file"
																hidden
																accept="image/*"
																onChange={handleFileChange}
															/>
														</Button>
													</>
												)}
											</Box>
											<FormHelperText
												sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
											>
												ຮອງຮັບໄຟລ໌ JPG, PNG (ສູງສຸດ 5MB)
											</FormHelperText>
										</Grid>
									</Grid>
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

				{/* ໂມດອລສຳລັບການເບິ່ງຮູບພາບ */}
				<Dialog
					open={imageViewOpen}
					onClose={handleCloseImageView}
					maxWidth="lg"
					fullWidth
				>
					<DialogTitle
						sx={{
							bgcolor: "#079578",
							color: "white",
							fontFamily: "Noto Sans Lao, sans-serif",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography
							variant="h6"
							sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
						>
							ເບິ່ງຮູບພາບ
						</Typography>
						<IconButton onClick={handleCloseImageView} sx={{ color: "white" }}>
							<ClearIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								minHeight: "50vh",
								p: 2,
							}}
						>
							<img
								src={viewImageUrl}
								alt="Full size view"
								style={{
									maxWidth: "100%",
									maxHeight: "70vh",
									objectFit: "contain",
								}}
								onError={(e) => {
									console.error("Full image failed to load:", viewImageUrl);
									e.target.onerror = null;
									e.target.src = "/placeholder-image.png";
								}}
							/>
						</Box>
					</DialogContent>
				</Dialog>

				{/* Hover Preview Component */}
				{hoverPreviewOpen && (
					<Box
						sx={{
							position: "fixed",
							top: hoverPosition.y,
							left: hoverPosition.x + 20,
							zIndex: 9999,
							bgcolor: "white",
							borderRadius: 1,
							boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
							p: 1,
							pointerEvents: "none",
						}}
					>
						<img
							src={hoverImageUrl}
							alt="Preview"
							style={{
								maxWidth: "300px",
								maxHeight: "300px",
								objectFit: "contain",
							}}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = "/placeholder-image.png";
							}}
						/>
					</Box>
				)}
			</Paper>
		</Box>
	);
};

export default Manage_product_Info;