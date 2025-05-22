import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

const ProductInfo = () => {
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        ຂໍ້ມູນສິນຄ້າ
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        ຍັງຢູ່ໃນຂັ້ນຕອນກຳລັງພັດທະນາ
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProductInfo;