// frontend/src/components/UserRequestStatus.jsx
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
    Grid,
    Card,
    CardContent,
    Snackbar,
    Alert,
    Chip,
    Divider,
    useTheme,
    useMediaQuery,
    Collapse,
    Tab,
    Tabs,
    Avatar,
    Badge,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    LinearProgress,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InventoryIcon from "@mui/icons-material/Inventory";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import PrintIcon from "@mui/icons-material/Print";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

// Import MockRequestService
import MockRequestService from "../services/MockRequestService";

const UserRequestStatus = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // States
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0); // 0: all, 1: pending, 2: approved, 3: rejected
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // โหลดข้อมูลการเบิกของ User
    const loadUserRequests = useCallback(() => {
        setLoading(true);
        try {
            // ดึงเฉพาะการเบิกของ User1 (TODO: ดึงจาก authentication)
            const userRequests = MockRequestService.getUserRequests("User1");
            setRequests(userRequests);
            setFilteredRequests(userRequests);

            console.log("📊 Loaded user requests:", userRequests.length);

        } catch (error) {
            console.error("❌ Error loading requests:", error);
            showNotification("ບໍ່ສາມາດໂຫຼດຂໍ້ມູນໄດ້", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    // โหลดข้อมูลเมื่อ component mount
    useEffect(() => {
        // สร้างข้อมูลตัวอย่างถ้ายังไม่มี
        const existingRequests = MockRequestService.getAllRequests();
        if (existingRequests.length === 0) {
            MockRequestService.createSampleData();
        }

        loadUserRequests();

        // ตั้ง interval เพื่อ refresh ข้อมูลทุก 30 วินาที
        const interval = setInterval(() => {
            loadUserRequests();
        }, 30000);

        return () => clearInterval(interval);
    }, [loadUserRequests]);

    // Filter และ Search
    useEffect(() => {
        let filtered = requests;

        // Filter by status (tab)
        if (selectedTab === 1) filtered = filtered.filter(req => req.status === "pending");
        else if (selectedTab === 2) filtered = filtered.filter(req => req.status === "approved");
        else if (selectedTab === 3) filtered = filtered.filter(req => req.status === "rejected");

        // Filter by priority
        if (priorityFilter !== "all") {
            filtered = filtered.filter(req => req.priority === priorityFilter);
        }

        // Filter by date range
        if (dateFilter !== "all") {
            const now = new Date();
            const days = dateFilter === "today" ? 1 : dateFilter === "week" ? 7 : dateFilter === "month" ? 30 : 0;
            if (days > 0) {
                const cutoffDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
                filtered = filtered.filter(req => new Date(req.requestDate) >= cutoffDate);
            }
        }

        // Search by ID or items
        if (searchTerm.trim()) {
            filtered = filtered.filter(req =>
                req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredRequests(filtered);
    }, [requests, selectedTab, priorityFilter, dateFilter, searchTerm]);

    // Notification helpers
    const showNotification = (message, severity = "success") => {
        setNotification({ open: true, message, severity });
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    // Get status display
    const getStatusDisplay = (status) => {
        switch (status) {
            case "pending":
                return {
                    color: "#f57f17",
                    bgcolor: "#fff8e1",
                    text: "ລໍຖ້າອະນຸມັດ",
                    icon: <PendingIcon />,
                    description: "ການເບີກກຳລັງລໍຖ້າການອະນຸມັດຈາກ Admin"
                };
            case "approved":
                return {
                    color: "#2e7d32",
                    bgcolor: "#e8f5e9",
                    text: "ອະນຸມັດແລ້ວ",
                    icon: <CheckCircleIcon />,
                    description: "ການເບີກໄດ້ຮັບການອະນຸມັດແລ້ວ"
                };
            case "rejected":
                return {
                    color: "#c62828",
                    bgcolor: "#ffebee",
                    text: "ປະຕິເສດ",
                    icon: <CancelIcon />,
                    description: "ການເບີກຖືກປະຕິເສດ"
                };
            default:
                return {
                    color: "#666",
                    bgcolor: "#f5f5f5",
                    text: status,
                    icon: <PendingIcon />,
                    description: "ສະຖານະບໍ່ທະຈະແຈ້ງ"
                };
        }
    };

    // Get priority display
    const getPriorityDisplay = (priority) => {
        switch (priority) {
            case "urgent": return { color: "#d32f2f", bgcolor: "#ffebee", text: "ດ່ວນ" };
            case "normal": return { color: "#1976d2", bgcolor: "#e3f2fd", text: "ປົກກະຕິ" };
            case "low": return { color: "#388e3c", bgcolor: "#e8f5e9", text: "ບໍ່ດ່ວນ" };
            default: return { color: "#1976d2", bgcolor: "#e3f2fd", text: "ປົກກະຕິ" };
        }
    };

    // Get count by status
    const getCountByStatus = (status) => {
        if (status === "all") return requests.length;
        return requests.filter(req => req.status === status).length;
    };

    // Handle view details
    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setDetailDialogOpen(true);
    };

    // Handle refresh
    const handleRefresh = () => {
        loadUserRequests();
        showNotification("ອັບເດດຂໍ້ມູນແລ້ວ", "info");
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("lo-LA", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // Format relative time
    const getRelativeTime = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return "ຫາກໍ່ນີ້";
        if (diffInMinutes < 60) return `${diffInMinutes} ນາທີກ່ອນ`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} ຊົ່ວໂມງກ່ອນ`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} ມື້ກ່ອນ`;
    };

    // Print request
    const handlePrintRequest = (request) => {
        const statusDisplay = getStatusDisplay(request.status);
        const priorityDisplay = getPriorityDisplay(request.priority);

        const printWindow = window.open('', '_blank');
        const printContent = `
      <html>
        <head>
          <title>ໃບເບີກສິນຄ້າ - ${request.id}</title>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #079578;
              padding-bottom: 20px;
            }
            .status-${request.status} {
              padding: 8px 16px;
              border-radius: 4px;
              color: white;
              font-weight: bold;
              display: inline-block;
            }
            .status-pending { background-color: #f57f17; }
            .status-approved { background-color: #2e7d32; }
            .status-rejected { background-color: #c62828; }
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
            }
            .summary { 
              margin-top: 20px; 
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏢 ລະບົບຄຸ້ມຄອງສາງ</h1>
            <h2>ໃບເບີກສິນຄ້າ - ${request.id}</h2>
            <div class="status-${request.status}">${statusDisplay.text}</div>
          </div>
          
          <div class="summary">
            <h3>📋 ຂໍ້ມູນການເບີກ</h3>
            <p><strong>ລະຫັດການເບີກ:</strong> ${request.id}</p>
            <p><strong>ວັນທີຂໍເບີກ:</strong> ${formatDate(request.requestDate)}</p>
            <p><strong>ຜູ້ຂໍເບີກ:</strong> ${request.userName} (${request.userId})</p>
            <p><strong>ລະດັບຄວາມສຳຄັນ:</strong> ${priorityDisplay.text}</p>
            <p><strong>ສະຖານະ:</strong> ${statusDisplay.text}</p>
            ${request.approvedBy ? `<p><strong>ອະນຸມັດໂດຍ:</strong> ${request.approvedBy}</p>` : ''}
            ${request.approvedDate ? `<p><strong>ວັນທີອະນຸມັດ:</strong> ${formatDate(request.approvedDate)}</p>` : ''}
            ${request.rejectedReason ? `<p><strong>ເຫດຜົນປະຕິເສດ:</strong> ${request.rejectedReason}</p>` : ''}
          </div>

          <h3>📦 ລາຍການສິນຄ້າ</h3>
          <table>
            <thead>
              <tr>
                <th>ລ/ດ</th>
                <th>ຊື່ສິນຄ້າ</th>
                <th>ປະເພດ</th>
                <th>ຍີ່ຫໍ້</th>
                <th>ຈຳນວນ</th>
                <th>ຫົວໜ່ວຍ</th>
              </tr>
            </thead>
            <tbody>
              ${request.items.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td>${item.category}</td>
                  <td>${item.brand || 'ບໍ່ລະບຸ'}</td>
                  <td style="text-align: center;">${item.requestedQuantity}</td>
                  <td>${item.unit}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          ${request.note ? `
            <div class="summary">
              <h3>📝 ໝາຍເຫດ</h3>
              <p>${request.note}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
            <p>ພິມເມື່ອ: ${new Date().toLocaleString('lo-LA')}</p>
          </div>
        </body>
      </html>
    `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // Request Row Component
    const RequestRow = ({ request }) => {
        const statusDisplay = getStatusDisplay(request.status);
        const priorityDisplay = getPriorityDisplay(request.priority);
        const isExpanded = expandedRow === request.id;

        return (
            <>
                <TableRow hover>
                    <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ bgcolor: "#079578", width: 32, height: 32 }}>
                                <AssignmentIcon fontSize="small" />
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                    {request.id}
                                </Typography>
                                <Typography variant="caption" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                    {getRelativeTime(request.requestDate)}
                                </Typography>
                            </Box>
                        </Box>
                    </TableCell>

                    <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CalendarTodayIcon fontSize="small" color="action" />
                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                {formatDate(request.requestDate)}
                            </Typography>
                        </Box>
                    </TableCell>

                    <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <InventoryIcon fontSize="small" color="action" />
                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                {request.totalItems} ລາຍການ ({request.totalQuantity} ລວມ)
                            </Typography>
                        </Box>
                    </TableCell>

                    <TableCell>
                        <Chip
                            label={priorityDisplay.text}
                            size="small"
                            sx={{
                                bgcolor: priorityDisplay.bgcolor,
                                color: priorityDisplay.color,
                                fontFamily: "Noto Sans Lao, sans-serif",
                            }}
                        />
                    </TableCell>

                    <TableCell>
                        <Tooltip title={statusDisplay.description}>
                            <Chip
                                icon={statusDisplay.icon}
                                label={statusDisplay.text}
                                size="small"
                                sx={{
                                    bgcolor: statusDisplay.bgcolor,
                                    color: statusDisplay.color,
                                    fontFamily: "Noto Sans Lao, sans-serif",
                                }}
                            />
                        </Tooltip>
                    </TableCell>

                    <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                                size="small"
                                onClick={() => setExpandedRow(isExpanded ? null : request.id)}
                                sx={{ bgcolor: "#e3f2fd", "&:hover": { bgcolor: "#bbdefb" } }}
                            >
                                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={() => handleViewDetails(request)}
                                sx={{ bgcolor: "#e8f5e9", "&:hover": { bgcolor: "#c8e6c9" } }}
                            >
                                <VisibilityIcon />
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={() => handlePrintRequest(request)}
                                sx={{ bgcolor: "#fff3e0", "&:hover": { bgcolor: "#ffe0b2" } }}
                            >
                                <PrintIcon />
                            </IconButton>
                        </Box>
                    </TableCell>
                </TableRow>

                {/* Expanded Row */}
                <TableRow>
                    <TableCell colSpan={6} sx={{ py: 0 }}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                                <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                                    ລາຍການສິນຄ້າທີ່ຂໍເບີກ:
                                </Typography>
                                <Grid container spacing={2}>
                                    {request.items.map((item, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                                            <Card sx={{ height: "100%" }}>
                                                <CardContent sx={{ p: 2 }}>
                                                    <Box sx={{ display: "flex", gap: 2 }}>
                                                        <Box
                                                            component="img"
                                                            src={item.imageUrl || "/placeholder-image.png"}
                                                            alt={item.name}
                                                            sx={{
                                                                width: 60,
                                                                height: 60,
                                                                objectFit: "cover",
                                                                borderRadius: 1,
                                                            }}
                                                            onError={(e) => {
                                                                e.target.src = "/placeholder-image.png";
                                                            }}
                                                        />
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                                                {item.name}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                                                {item.category} | {item.brand}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 1 }}>
                                                                ຂໍເບີກ: {item.requestedQuantity} {item.unit}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Show additional info for approved/rejected requests */}
                                {request.status === "approved" && request.approvedBy && (
                                    <Box sx={{ mt: 2, p: 2, bgcolor: "#e8f5e9", borderRadius: 1, borderLeft: "4px solid #2e7d32" }}>
                                        <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ✅ ອະນຸມັດໂດຍ: {request.approvedBy}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            ວັນທີ: {formatDate(request.approvedDate)}
                                        </Typography>
                                    </Box>
                                )}

                                {request.status === "rejected" && request.rejectedReason && (
                                    <Box sx={{ mt: 2, p: 2, bgcolor: "#ffebee", borderRadius: 1, borderLeft: "4px solid #c62828" }}>
                                        <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ❌ ເຫດຜົນປະຕິເສດ:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            {request.rejectedReason}
                                        </Typography>
                                    </Box>
                                )}

                                {request.note && (
                                    <Box sx={{ mt: 2, p: 2, bgcolor: "white", borderRadius: 1, borderLeft: "4px solid #079578" }}>
                                        <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            📝 ໝາຍເຫດ:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            {request.note}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    };

    // Mobile Card Component
    const RequestMobileCard = ({ request }) => {
        const statusDisplay = getStatusDisplay(request.status);
        const priorityDisplay = getPriorityDisplay(request.priority);

        return (
            <Card sx={{ mb: 2, border: `2px solid ${statusDisplay.color}` }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                {request.id}
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                {getRelativeTime(request.requestDate)}
                            </Typography>
                        </Box>
                        <Chip
                            icon={statusDisplay.icon}
                            label={statusDisplay.text}
                            size="small"
                            sx={{
                                bgcolor: statusDisplay.bgcolor,
                                color: statusDisplay.color,
                                fontFamily: "Noto Sans Lao, sans-serif",
                            }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                        <Chip
                            label={priorityDisplay.text}
                            size="small"
                            sx={{
                                bgcolor: priorityDisplay.bgcolor,
                                color: priorityDisplay.color,
                                fontFamily: "Noto Sans Lao, sans-serif",
                            }}
                        />
                        <Chip
                            label={`${request.totalItems} ລາຍການ`}
                            size="small"
                            variant="outlined"
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                        />
                    </Box>

                    <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                        📅 {formatDate(request.requestDate)}
                    </Typography>

                    {request.status === "rejected" && request.rejectedReason && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                <strong>ເຫດຜົນປະຕິເສດ:</strong> {request.rejectedReason}
                            </Typography>
                        </Alert>
                    )}

                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <Button
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewDetails(request)}
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                        >
                            ເບິ່ງລາຍລະອຽດ
                        </Button>
                        <Button
                            size="small"
                            startIcon={<PrintIcon />}
                            onClick={() => handlePrintRequest(request)}
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                        >
                            ພິມ
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ fontFamily: "Noto Sans Lao, sans-serif", p: 3 }}>
            {/* Header */}
            <Paper sx={{ p: 3, mb: 3, bgcolor: "#079578", color: "white" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontFamily: "Noto Sans Lao, sans-serif",
                                fontWeight: "bold",
                            }}
                        >
                            ສະຖານະການເບີກສິນຄ້າ
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 1, opacity: 0.9 }}
                        >
                            ເບິ່ງສະຖານະການເບີກສິນຄ້າທັງໝົດຂອງທ່ານ
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <IconButton
                            color="inherit"
                            onClick={handleRefresh}
                            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
                        >
                            <RefreshIcon />
                        </IconButton>
                        <Badge badgeContent={getCountByStatus("pending")} color="error">
                            <PendingIcon sx={{ fontSize: 30 }} />
                        </Badge>
                    </Box>
                </Box>
            </Paper>

            {/* Filters and Search */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="ຄົ້ນຫາດ້ວຍລະຫັດ ຫຼື ຊື່ສິນຄ້າ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                style: { fontFamily: "Noto Sans Lao, sans-serif" }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>ລະດັບຄວາມສຳຄັນ</InputLabel>
                            <Select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                label="ລະດັບຄວາມສຳຄັນ"
                                sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                            >
                                <MenuItem value="all" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    ທັງໝົດ
                                </MenuItem>
                                <MenuItem value="low" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    ບໍ່ດ່ວນ
                                </MenuItem>
                                <MenuItem value="normal" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    ປົກກະຕິ
                                </MenuItem>
                                <MenuItem value="urgent" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    ດ່ວນ
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>ຊ່ວງເວລາ</InputLabel>
                            <Select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                label="ຊ່ວງເວລາ"
                                sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                            >
                                <MenuItem value="all" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    ທັງໝົດ
                                </MenuItem>
                                <MenuItem value="today" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    ວັນນີ້
                                </MenuItem>
                                <MenuItem value="week" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    7 ມື້ຜ່ານມາ
                                </MenuItem>
                                <MenuItem value="month" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    30 ມື້ຜ່ານມາ
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            onClick={() => {
                                setSearchTerm("");
                                setPriorityFilter("all");
                                setDateFilter("all");
                            }}
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif", height: "40px" }}
                        >
                            ລ້າງຟິນເຕີ
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Statistics Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#fff8e1" }}>
                        <Typography variant="h4" sx={{ color: "#f57f17", fontWeight: "bold" }}>
                            {getCountByStatus("pending")}
                        </Typography>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ລໍຖ້າອະນຸມັດ
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#e8f5e9" }}>
                        <Typography variant="h4" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                            {getCountByStatus("approved")}
                        </Typography>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ອະນຸມັດແລ້ວ
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#ffebee" }}>
                        <Typography variant="h4" sx={{ color: "#c62828", fontWeight: "bold" }}>
                            {getCountByStatus("rejected")}
                        </Typography>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ປະຕິເສດ
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#e3f2fd" }}>
                        <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                            {requests.length}
                        </Typography>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ທັງໝົດ
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Paper sx={{ mb: 3 }}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, newValue) => setSelectedTab(newValue)}
                    sx={{
                        "& .MuiTab-root": {
                            fontFamily: "Noto Sans Lao, sans-serif",
                        },
                    }}
                >
                    <Tab
                        label={
                            <Badge badgeContent={requests.length} color="primary">
                                <Box sx={{ px: 1 }}>ທັງໝົດ</Box>
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={getCountByStatus("pending")} color="warning">
                                <Box sx={{ px: 1 }}>ລໍຖ້າອະນຸມັດ</Box>
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={getCountByStatus("approved")} color="success">
                                <Box sx={{ px: 1 }}>ອະນຸມັດແລ້ວ</Box>
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={getCountByStatus("rejected")} color="error">
                                <Box sx={{ px: 1 }}>ປະຕິເສດ</Box>
                            </Badge>
                        }
                    />
                </Tabs>
            </Paper>

            {/* Loading */}
            {loading && (
                <Paper sx={{ p: 3, textAlign: "center" }}>
                    <CircularProgress sx={{ color: "#079578" }} />
                    <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 2 }}>
                        ກຳລັງໂຫຼດຂໍ້ມູນ...
                    </Typography>
                </Paper>
            )}

            {/* Requests Table/Cards */}
            {!loading && (
                <>
                    {/* สำหรับหน้าจอใหญ่ - แสดงเป็นตาราง */}
                    {!isMobile ? (
                        <Paper sx={{ overflow: "hidden", mb: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ລະຫັດການເບີກ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ວັນທີຂໍເບີກ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ລາຍການສິນຄ້າ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ລະດັບຄວາມສຳຄັນ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ສະຖານະ
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                            ການຈັດການ
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRequests.map((request) => (
                                        <RequestRow key={request.id} request={request} />
                                    ))}
                                    {filteredRequests.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                                <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                                    {searchTerm || priorityFilter !== "all" || dateFilter !== "all"
                                                        ? "ບໍ່ພົບຂໍ້ມູນທີ່ຕົງກັບການຄົ້ນຫາ"
                                                        : "ບໍ່ມີຂໍ້ມູນການເບີກ"}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                    ) : (
                        /* สำหรับมือถือ - แสดงเป็น Card */
                        <Box sx={{ mb: 3 }}>
                            {filteredRequests.map((request) => (
                                <RequestMobileCard key={request.id} request={request} />
                            ))}
                            {filteredRequests.length === 0 && (
                                <Paper sx={{ p: 5, textAlign: "center" }}>
                                    <DescriptionIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
                                    <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                        {searchTerm || priorityFilter !== "all" || dateFilter !== "all"
                                            ? "ບໍ່ພົບຂໍ້ມູນທີ່ຕົງກັບການຄົ້ນຫາ"
                                            : "ບໍ່ມີຂໍ້ມູນການເບີກ"}
                                    </Typography>
                                </Paper>
                            )}
                        </Box>
                    )}
                </>
            )}

            {/* Detail Dialog */}
            <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    <DescriptionIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    ລາຍລະອຽດການເບີກສິນຄ້າ
                </DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <Box sx={{ pt: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                                        ຂໍ້ມູນການເບີກ
                                    </Typography>
                                    <Box sx={{ "& > *": { mb: 1 } }}>
                                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <strong>ລະຫັດ:</strong> {selectedRequest.id}
                                        </Typography>
                                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <strong>ວັນທີຂໍເບີກ:</strong> {formatDate(selectedRequest.requestDate)}
                                        </Typography>
                                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <strong>ລະດັບຄວາມສຳຄັນ:</strong>
                                            <Chip
                                                label={getPriorityDisplay(selectedRequest.priority).text}
                                                size="small"
                                                sx={{ ...getPriorityDisplay(selectedRequest.priority), ml: 1 }}
                                            />
                                        </Typography>
                                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <strong>ສະຖານະ:</strong>
                                            <Chip
                                                icon={getStatusDisplay(selectedRequest.status).icon}
                                                label={getStatusDisplay(selectedRequest.status).text}
                                                size="small"
                                                sx={{ ...getStatusDisplay(selectedRequest.status), ml: 1 }}
                                            />
                                        </Typography>
                                        {selectedRequest.approvedBy && (
                                            <>
                                                <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                                    <strong>ອະນຸມັດໂດຍ:</strong> {selectedRequest.approvedBy}
                                                </Typography>
                                                <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                                    <strong>ວັນທີອະນຸມັດ:</strong> {formatDate(selectedRequest.approvedDate)}
                                                </Typography>
                                            </>
                                        )}
                                        {selectedRequest.rejectedReason && (
                                            <Box sx={{ mt: 2, p: 2, bgcolor: "#ffebee", borderRadius: 1 }}>
                                                <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                                    <ErrorIcon sx={{ mr: 1, verticalAlign: "middle", color: "#c62828" }} />
                                                    ເຫດຜົນປະຕິເສດ:
                                                </Typography>
                                                <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 1 }}>
                                                    {selectedRequest.rejectedReason}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                                        ລາຍການສິນຄ້າທີ່ຂໍເບີກ ({selectedRequest.items.length} ລາຍການ)
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {selectedRequest.items.map((item) => (
                                            <Grid item xs={12} sm={6} key={item.id}>
                                                <Card>
                                                    <CardContent>
                                                        <Box sx={{ display: "flex", gap: 2 }}>
                                                            <Box
                                                                component="img"
                                                                src={item.imageUrl || "/placeholder-image.png"}
                                                                alt={item.name}
                                                                sx={{
                                                                    width: 80,
                                                                    height: 80,
                                                                    objectFit: "cover",
                                                                    borderRadius: 1,
                                                                }}
                                                                onError={(e) => {
                                                                    e.target.src = "/placeholder-image.png";
                                                                }}
                                                            />
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                                                    {item.category} | {item.brand || 'ບໍ່ລະບຸ'}
                                                                </Typography>
                                                                <Typography variant="body1" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 1 }}>
                                                                    ຂໍເບີກ: <strong>{item.requestedQuantity} {item.unit}</strong>
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {selectedRequest.note && (
                                        <Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1, borderLeft: "4px solid #079578" }}>
                                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                                📝 ໝາຍເຫດ:
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 1 }}>
                                                {selectedRequest.note}
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    {selectedRequest && (
                        <Button
                            startIcon={<PrintIcon />}
                            onClick={() => handlePrintRequest(selectedRequest)}
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                        >
                            ພິມ
                        </Button>
                    )}
                    <Button onClick={() => setDetailDialogOpen(false)} sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                        ປິດ
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

export default UserRequestStatus;