// frontend/src/components/AdminRequestApproval.jsx - ແກ້ໄຂແລ້ວ
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
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Tab,
    Tabs,
    Avatar,
    Badge,
    Fab,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PendingIcon from "@mui/icons-material/Pending";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InventoryIcon from "@mui/icons-material/Inventory";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";

// Import MockRequestService
import MockRequestService from "../services/MockRequestService";

const AdminRequestApproval = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // States
    const [requests, setRequests] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0); // 0: pending, 1: approved, 2: rejected
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [expandedRow, setExpandedRow] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    // Notification
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // โหลดข้อมูลจาก MockRequestService
    const loadData = useCallback(() => {
        setLoading(true);
        try {
            // โหลดคำขอเบิก
            const allRequests = MockRequestService.getAllRequests();
            setRequests(allRequests);

            // โหลด notifications
            const allNotifications = MockRequestService.getAdminNotifications();
            setNotifications(allNotifications);

            // นับ notifications ที่ยังไม่อ่าน
            const unreadCount = MockRequestService.getUnreadNotificationCount();
            setUnreadCount(unreadCount);

            console.log("📊 Loaded data:", {
                requests: allRequests.length,
                notifications: allNotifications.length,
                unread: unreadCount
            });

        } catch (error) {
            console.error("❌ Error loading data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // โหลดข้อมูลเมื่อ component mount
    useEffect(() => {
        loadData();

        // ตั้ง interval เพื่อ refresh ข้อมูลทุก 10 วินาที
        const interval = setInterval(() => {
            loadData();
        }, 10000);

        return () => clearInterval(interval);
    }, [loadData]);

    // Filter requests by status
    const getFilteredRequests = () => {
        const statusMap = ["pending", "approved", "rejected"];
        const status = statusMap[selectedTab];
        return requests.filter(req => req.status === status);
    };

    // Get status display
    const getStatusDisplay = (status) => {
        switch (status) {
            case "pending":
                return { color: "#f57f17", bgcolor: "#fff8e1", text: "ລໍຖ້າອະນຸມັດ", icon: <PendingIcon /> };
            case "approved":
                return { color: "#2e7d32", bgcolor: "#e8f5e9", text: "ອະນຸມັດແລ້ວ", icon: <CheckCircleIcon /> };
            case "rejected":
                return { color: "#c62828", bgcolor: "#ffebee", text: "ປະຕິເສດ", icon: <CancelIcon /> };
            default:
                return { color: "#666", bgcolor: "#f5f5f5", text: status, icon: <PendingIcon /> };
        }
    };

    // Get count by status
    const getCountByStatus = (status) => {
        return requests.filter(req => req.status === status).length;
    };

    // Notification helpers
    const showNotification = (message, severity = "success") => {
        setNotification({ open: true, message, severity });
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    // Handle view details
    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setDetailDialogOpen(true);
    };

    // Handle approve request
    const handleApproveRequest = (request) => {
        setSelectedRequest(request);
        setApprovalDialogOpen(true);
    };

    // Handle reject request
    const handleRejectRequest = (request) => {
        setSelectedRequest(request);
        setRejectReason("");
        setRejectDialogOpen(true);
    };

    // Submit approval โดยใช้ MockRequestService
    const handleSubmitApproval = async () => {
        try {
            console.log("✅ Approving request:", selectedRequest.id);

            const response = MockRequestService.approveRequest(selectedRequest.id, "Admin1");

            if (response.success) {
                // รีโหลดข้อมูล
                loadData();
                setApprovalDialogOpen(false);
                showNotification(response.message, "success");
            } else {
                showNotification(response.message, "error");
            }
        } catch (error) {
            console.error("❌ Error approving request:", error);
            showNotification("ບໍ່ສາມາດອະນຸມັດການເບີກໄດ້", "error");
        }
    };

    // Submit rejection โดยใช้ MockRequestService
    const handleSubmitRejection = async () => {
        if (!rejectReason.trim()) {
            showNotification("ກະລຸນາລະບຸເຫດຜົນການປະຕິເສດ", "error");
            return;
        }

        try {
            console.log("❌ Rejecting request:", selectedRequest.id, "Reason:", rejectReason);

            const response = MockRequestService.rejectRequest(selectedRequest.id, "Admin1", rejectReason);

            if (response.success) {
                // รีโหลดข้อมูล
                loadData();
                setRejectDialogOpen(false);
                showNotification(response.message, "warning");
            } else {
                showNotification(response.message, "error");
            }
        } catch (error) {
            console.error("❌ Error rejecting request:", error);
            showNotification("ບໍ່ສາມາດປະຕິເສດການເບີກໄດ້", "error");
        }
    };

    // Refresh data manually
    const handleRefresh = () => {
        loadData();
        showNotification("ອັບເດດຂໍ້ມູນແລ້ວ", "info");
    };

    // Mark notification as read
    const markNotificationAsRead = (notificationId) => {
        MockRequestService.markNotificationAsRead(notificationId);
        loadData(); // รีโหลดเพื่ออัพเดท badge
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

    // Request Row Component
    const RequestRow = ({ request }) => {
        const statusDisplay = getStatusDisplay(request.status);
        const isExpanded = expandedRow === request.id;

        return (
            <>
                <TableRow hover>
                    <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ bgcolor: "#079578", width: 32, height: 32 }}>
                                <PersonIcon fontSize="small" />
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                    {request.id}
                                </Typography>
                                <Typography variant="caption" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                    {request.userName}
                                </Typography>
                            </Box>
                        </Box>
                    </TableCell>

                    <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CalendarTodayIcon fontSize="small" color="action" />
                            <Box>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    {formatDate(request.requestDate)}
                                </Typography>
                                <Typography variant="caption" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                    {getRelativeTime(request.requestDate)}
                                </Typography>
                            </Box>
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
                            icon={statusDisplay.icon}
                            label={statusDisplay.text}
                            size="small"
                            sx={{
                                bgcolor: statusDisplay.bgcolor,
                                color: statusDisplay.color,
                                fontFamily: "Noto Sans Lao, sans-serif",
                            }}
                        />
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

                            {request.status === "pending" && (
                                <>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleApproveRequest(request)}
                                        sx={{ bgcolor: "#e8f5e9", "&:hover": { bgcolor: "#c8e6c9" } }}
                                    >
                                        <CheckCircleIcon />
                                    </IconButton>

                                    <IconButton
                                        size="small"
                                        onClick={() => handleRejectRequest(request)}
                                        sx={{ bgcolor: "#ffebee", "&:hover": { bgcolor: "#ffcdd2" } }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    </TableCell>
                </TableRow>

                {/* Expanded Row */}
                <TableRow>
                    <TableCell colSpan={5} sx={{ py: 0 }}>
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
                            ການອະນຸມັດການເບີກສິນຄ້າ
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 1, opacity: 0.9 }}
                        >
                            ຈັດການແລະອະນຸມັດການຂໍເບີກສິນຄ້າຂອງພະນັກງານ
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        {/* Notification Badge */}
                        <Badge badgeContent={unreadCount} color="error">
                            <NotificationsIcon sx={{ fontSize: 30 }} />
                        </Badge>

                        {/* Refresh Button */}
                        <IconButton
                            color="inherit"
                            onClick={handleRefresh}
                            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>

            {/* Recent Notifications */}
            {notifications.length > 0 && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: "#fff3e0", border: "1px solid #ffb74d" }}>
                    <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 1 }}>
                        🔔 ການແຈ້ງເຕືອນຫຼ້າສຸດ
                    </Typography>
                    <Box sx={{ maxHeight: 150, overflowY: "auto" }}>
                        {notifications.slice(0, 5).map((notif) => (
                            <Box
                                key={notif.id}
                                sx={{
                                    p: 1,
                                    mb: 1,
                                    bgcolor: notif.read ? "rgba(0,0,0,0.05)" : "white",
                                    borderRadius: 1,
                                    cursor: "pointer",
                                    "&:hover": { bgcolor: "rgba(0,0,0,0.1)" }
                                }}
                                onClick={() => markNotificationAsRead(notif.id)}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: "Noto Sans Lao, sans-serif",
                                        fontWeight: notif.read ? "normal" : "bold"
                                    }}
                                >
                                    {notif.message}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}
                                >
                                    {getRelativeTime(notif.createdAt)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            )}

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

            {/* Stats Summary */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#fff8e1" }}>
                        <Typography variant="h4" sx={{ color: "#f57f17", fontWeight: "bold" }}>
                            {getCountByStatus("pending")}
                        </Typography>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ລໍຖ້າອະນຸມັດ
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#e8f5e9" }}>
                        <Typography variant="h4" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                            {getCountByStatus("approved")}
                        </Typography>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ອະນຸມັດແລ້ວ
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: "#ffebee" }}>
                        <Typography variant="h4" sx={{ color: "#c62828", fontWeight: "bold" }}>
                            {getCountByStatus("rejected")}
                        </Typography>
                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                            ປະຕິເສດ
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Requests Table */}
            <Paper sx={{ overflow: "hidden" }}>
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
                                ສະຖານະ
                            </TableCell>
                            <TableCell sx={{ fontFamily: "Noto Sans Lao, sans-serif", fontWeight: "bold" }}>
                                ການຈັດການ
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getFilteredRequests().map((request) => (
                            <RequestRow key={request.id} request={request} />
                        ))}
                        {getFilteredRequests().length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                                    <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                        ບໍ່ມີຂໍ້ມູນການເບີກໃນໝວດນີ້
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>

            {/* Floating Refresh Button */}
            <Fab
                color="primary"
                aria-label="refresh"
                onClick={handleRefresh}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                }}
            >
                <RefreshIcon />
            </Fab>

            {/* Detail Dialog */}
            <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
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
                                            <strong>ຜູ້ຂໍເບີກ:</strong> {selectedRequest.userName} ({selectedRequest.userId})
                                        </Typography>
                                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <strong>ວັນທີຂໍເບີກ:</strong> {formatDate(selectedRequest.requestDate)}
                                        </Typography>
                                        <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                            <strong>ສະຖານະ:</strong> {getStatusDisplay(selectedRequest.status).text}
                                        </Typography>
                                        {selectedRequest.approvedBy && (
                                            <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                                <strong>ອະນຸມັດໂດຍ:</strong> {selectedRequest.approvedBy}
                                            </Typography>
                                        )}
                                        {selectedRequest.rejectedReason && (
                                            <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                                <strong>ເຫດຜົນປະຕິເສດ:</strong> {selectedRequest.rejectedReason}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                                        ລາຍການສິນຄ້າ
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
                                                            <Box>
                                                                <Typography variant="h6" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                                                    {item.category} | {item.brand}
                                                                </Typography>
                                                                <Typography variant="body1" sx={{ fontFamily: "Noto Sans Lao, sans-serif", mt: 1 }}>
                                                                    ຂໍເບີກ: <strong>{item.requestedQuantity} {item.unit}</strong>
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif", color: "text.secondary" }}>
                                                                    ມີໃນສາງ: {item.availableQuantity} {item.unit}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailDialogOpen(false)} sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                        ປິດ
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Approval Dialog */}
            <Dialog open={approvalDialogOpen} onClose={() => setApprovalDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    ຢືນຢັນການອະນຸມັດ
                </DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <Box sx={{ pt: 2 }}>
                            <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                                ທ່ານຕ້ອງການອະນຸມັດການເບີກສິນຄ້າ <strong>{selectedRequest.id}</strong> ຂອງ <strong>{selectedRequest.userName}</strong> ແມ່ນບໍ່?
                            </Typography>
                            <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                                <Typography variant="body2" sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                                    ລວມ: {selectedRequest.totalItems} ລາຍການ ({selectedRequest.totalQuantity} ຊິ້ນ)
                                </Typography>
                            </Paper>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setApprovalDialogOpen(false)} sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                        ຍົກເລີກ
                    </Button>
                    <Button
                        onClick={handleSubmitApproval}
                        variant="contained"
                        sx={{
                            bgcolor: "#079578",
                            "&:hover": { bgcolor: "#046c56" },
                            fontFamily: "Noto Sans Lao, sans-serif",
                        }}
                    >
                        ຢືນຢັນອະນຸມັດ
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Rejection Dialog */}
            <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                    ປະຕິເສດການເບີກ
                </DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <Box sx={{ pt: 2 }}>
                            <Typography sx={{ fontFamily: "Noto Sans Lao, sans-serif", mb: 2 }}>
                                ປະຕິເສດການເບີກສິນຄ້າ <strong>{selectedRequest.id}</strong> ຂອງ <strong>{selectedRequest.userName}</strong>
                            </Typography>
                            <TextField
                                label="ເຫດຜົນການປະຕິເສດ"
                                fullWidth
                                multiline
                                rows={4}
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                required
                                sx={{ mt: 2 }}
                                InputLabelProps={{
                                    style: { fontFamily: "Noto Sans Lao, sans-serif" },
                                }}
                                InputProps={{
                                    style: { fontFamily: "Noto Sans Lao, sans-serif" },
                                }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRejectDialogOpen(false)} sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}>
                        ຍົກເລີກ
                    </Button>
                    <Button
                        onClick={handleSubmitRejection}
                        variant="contained"
                        color="error"
                        sx={{ fontFamily: "Noto Sans Lao, sans-serif" }}
                    >
                        ຢືນຢັນປະຕິເສດ
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

export default AdminRequestApproval;