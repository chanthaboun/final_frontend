// // frontend/src/services/productService.js
// import axios from 'axios';

// // ກຳນົດ base URL ສຳລັບ API
// const API_URL = 'http://localhost:5001/api';

// // ສ້າງ instance ຂອງ axios ທີ່ມີການຕັ້ງຄ່າພື້ນຖານ
// const apiClient = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // ເພີ່ມ interceptor ສຳລັບການເພີ່ມ token ໃນການຮ້ອງຂໍ
// apiClient.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// // ສ້າງ service object ສຳລັບຈັດການກັບຂໍ້ມູນສິນຄ້າ
// const productService = {
//     // ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດພ້ອມການຄົ້ນຫາແລະການແບ່ງໜ້າ
//     getAllProducts: async (page = 0, limit = 10, search = '') => {
//         try {
//             const response = await apiClient.get('/products', {
//                 params: { page, limit, search }
//             });
//             return response.data;
//         } catch (error) {
//             console.error('ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ:', error);
//             throw error;
//         }
//     },

//     // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
//     getProductById: async (id) => {
//         try {
//             const response = await apiClient.get(`/products/${id}`);
//             return response.data;
//         } catch (error) {
//             console.error(`ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ ID ${id}:`, error);
//             throw error;
//         }
//     },

//     // ສ້າງສິນຄ້າໃໝ່ ພ້ອມການອັບໂຫລດຮູບພາບ
//     createProduct: async (productData) => {
//         try {
//             // ສ້າງ FormData ສຳລັບການສົ່ງຂໍ້ມູນທີ່ມີຮູບພາບ
//             const formData = new FormData();

//             // ເພີ່ມຂໍ້ມູນສິນຄ້າເຂົ້າໃນ FormData
//             Object.keys(productData).forEach(key => {
//                 if (key !== 'image') {
//                     formData.append(key, productData[key]);
//                 }
//             });

//             // ເພີ່ມຮູບພາບຖ້າມີ
//             if (productData.image) {
//                 formData.append('image', productData.image);
//             }

//             const response = await apiClient.post('/products', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error('ຜິດພາດໃນການສ້າງສິນຄ້າ:', error);
//             throw error;
//         }
//     },

//     // ອັບເດດຂໍ້ມູນສິນຄ້າທີ່ມີຢູ່ແລ້ວ ພ້ອມການອັບໂຫລດຮູບພາບ
//     updateProduct: async (id, productData) => {
//         try {
//             // ສ້າງ FormData ສຳລັບການສົ່ງຂໍ້ມູນທີ່ມີຮູບພາບ
//             const formData = new FormData();

//             // ເພີ່ມຂໍ້ມູນສິນຄ້າເຂົ້າໃນ FormData
//             Object.keys(productData).forEach(key => {
//                 if (key !== 'image') {
//                     formData.append(key, productData[key]);
//                 }
//             });

//             // ເພີ່ມຮູບພາບຖ້າມີ
//             if (productData.image) {
//                 formData.append('image', productData.image);
//             }

//             const response = await apiClient.put(`/products/${id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error(`ຜິດພາດໃນການອັບເດດສິນຄ້າ ID ${id}:`, error);
//             throw error;
//         }
//     },

//     // ລຶບສິນຄ້າ
//     deleteProduct: async (id) => {
//         try {
//             const response = await apiClient.delete(`/products/${id}`);
//             return response.data;
//         } catch (error) {
//             console.error(`ຜິດພາດໃນການລຶບສິນຄ້າ ID ${id}:`, error);
//             throw error;
//         }
//     },

//     // ດຶງຂໍ້ມູນສິນຄ້າທີ່ມີຈຳນວນຕໍ່າກວ່າຂີດຈຳກັດ
//     getLowStockProducts: async () => {
//         try {
//             const response = await apiClient.get('/products/low-stock');
//             return response.data;
//         } catch (error) {
//             console.error('ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າຈຳນວນຕໍ່າ:', error);
//             throw error;
//         }
//     },

//     // ອັບເດດຈຳນວນສິນຄ້າ
//     updateProductQuantity: async (id, quantity) => {
//         try {
//             const response = await apiClient.patch(`/products/${id}/quantity`, { quantity });
//             return response.data;
//         } catch (error) {
//             console.error(`ຜິດພາດໃນການອັບເດດຈຳນວນສິນຄ້າ ID ${id}:`, error);
//             throw error;
//         }
//     }
// };

// export default productService;