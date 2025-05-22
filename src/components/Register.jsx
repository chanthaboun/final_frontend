// frontend/src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Alert
} from '@mui/material';
import { authService } from '../api';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authService.register(username, password, 'user');
            alert('ລົງທະບຽນສຳເລັດແລ້ວ! ກະລຸນາເຂົ້າສູ່ລະບົບ.');
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'ການລົງທະບຽນລົ້ມເຫລວ. ກະລຸນາລອງອີກຄັ້ງ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{
                marginTop: 8,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#1976d2',
                color: 'white'
            }}>
                <Typography component="h1" variant="h5" sx={{ color: 'white', mb: 2 }}>
                    ລົງທະບຽນຜູ້ໃຊ້ໃໝ່
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
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
                            backgroundColor: 'white',
                            borderRadius: 1
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
                            backgroundColor: 'white',
                            borderRadius: 1
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#4caf50',
                            '&:hover': {
                                backgroundColor: '#45a049',
                            }
                        }}
                        disabled={loading}
                    >
                        {loading ? 'ກຳລັງລົງທະບຽນ...' : 'ລົງທະບຽນ'}
                    </Button>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Link to="/" style={{ color: 'white' }}>
                            ມີບັນຊີແລ້ວ? ເຂົ້າສູ່ລະບົບ
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;