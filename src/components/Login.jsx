
// frontend/src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Alert,
    CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authService } from "../api";
import "../App.css";


// ສ້າງ theme ພ້ອມ font family Noto Sans Lao
const theme = createTheme({
    typography: {
        fontFamily: '"Noto Sans Lao", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;500;700&display=swap');
            `,
        },
    },
});


const backgroundImageUrl = "/images/byd-warehouse.png";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ກວດສອບວ່າມີການເຂົ້າສູ່ລະບົບແລ້ວຫຼືບໍ່ ແລະໃຫ້ redirect ຕາມບົດບາດ
    useEffect(() => {
        if (authService.isAuthenticated()) {
            const role = authService.getUserRole();
            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ກວດສອບຂໍ້ມູນເຂົ້າ
        if (!username || !password) {
            setError("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await authService.login(username, password);

            // ບັນທຶກຂໍ້ມູນພະນັກງານ (ຖ້າມີ)
            if (data.user.employee_id) {
                localStorage.setItem("employee_id", data.user.employee_id);
                localStorage.setItem("employee_name", data.user.employee_name || "");
            }

            // ນຳທາງໄປຕາມບົດບາດຂອງຜູ້ໃຊ້
            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (err) {
            setError(err.message || "ການເຂົ້າສູ່ລະບົບລົ້ມເຫລວ. ກະລຸນາກວດສອບຂໍ້ມູນຂອງທ່ານ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    padding: 2,
                }}
            >
                <Container component="main" maxWidth="xs">
                    <Paper
                        elevation={6}
                        sx={{
                            padding: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "rgba(25, 118, 210, 0.9)", // ສີພື້ນຫຼັງແບບໂປ່ງໃສ
                            color: "white",
                            fontFamily: '"Noto Sans Lao", sans-serif',
                            borderRadius: 2,
                            backdropFilter: "blur(5px)", // ເພີ່ມ blur effect ເພື່ອເຮັດໃຫ້ ໜ່ອຍນຶ່ງໂປ່ງແສງ
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ color: "white", mb: 2, fontWeight: "bold" }}
                        >
                            ເຂົ້າສູ່ລະບົບ
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ mt: 1, width: "100%" }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="ປ້ອນຊື່ຜູ້ໃຊ້"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    borderRadius: 1,
                                    "& .MuiInputLabel-root": {
                                        fontFamily: '"Noto Sans Lao", sans-serif',
                                    },
                                    "& .MuiInputBase-input": {
                                        fontFamily: '"Noto Sans Lao", sans-serif',
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="ປ້ອນລະຫັດຜ່ານ"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    borderRadius: 1,
                                    "& .MuiInputLabel-root": {
                                        fontFamily: '"Noto Sans Lao", sans-serif',
                                    },
                                    "& .MuiInputBase-input": {
                                        fontFamily: '"Noto Sans Lao", sans-serif',
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: "#4caf50",
                                    "&:hover": {
                                        backgroundColor: "#45a049",
                                    },
                                    fontFamily: '"Noto Sans Lao", sans-serif',
                                    fontWeight: "bold",
                                    py: 1.2,
                                }}
                                disabled={loading}
                            >
                                {loading ? "ກຳລັງເຂົ້າສູ່ລະບົບ..." : "ເຂົ້າສູ່ລະບົບ"}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Login;