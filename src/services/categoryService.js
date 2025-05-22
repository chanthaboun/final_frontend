// // frontend/src/services/categoryService.js
// import axios from 'axios';

// // ຕັ້ງຄ່າພື້ນຖານສຳລັບ axios
// const API_URL = 'http://localhost:5001/api';

// /**
//  * ບໍລິການຈັດການຂໍ້ມູນປະເພດສິນຄ້າ
//  */
// const categoryService = {
//     /**
//      * ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
//      * @returns {Promise<Array>} ລາຍການປະເພດສິນຄ້າ
//      */
//     getAllCategories: async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//             }

//             const response = await axios.get(`${API_URL}/categories`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             throw error;
//         }
//     },

//     /**
//      * ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
//      * @param {string} keyword - ຄຳສັບທີ່ໃຊ້ຄົ້ນຫາ
//      * @returns {Promise<Array>} ລາຍການປະເພດສິນຄ້າທີ່ກົງກັບຄຳສັບຄົ້ນຫາ
//      */
//     searchCategories: async (keyword) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//             }

//             const response = await axios.get(`${API_URL}/categories/search`, {
//                 params: { keyword },
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error('Error searching categories:', error);
//             throw error;
//         }
//     },

//     /**
//      * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຕາມ ID
//      * @param {string} id - ລະຫັດປະເພດສິນຄ້າ
//      * @returns {Promise<Object>} ຂໍ້ມູນປະເພດສິນຄ້າ
//      */
//     // getCategoryById: async (id) => {
//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         if (!token) {
//     //             throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//     //         }

//     //         const response = await axios.get(`${API_URL}/categories/${id}`, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`
//     //             }
//     //         });

//     //         return response.data;
//     //     } catch (error) {
//     //         console.error(`Error fetching category with ID ${id}:`, error);
//     //         throw error;
//     //     }
//     // },

//     getCategoryById: async (id) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//             }

//             // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
//             const numericId = id.toString().replace(/\D/g, '');

//             const response = await axios.get(`${API_URL}/categories/${numericId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error(`Error fetching category with ID ${id}:`, error);
//             throw error;
//         }
//     },


//     /**
//      * ສ້າງປະເພດສິນຄ້າໃໝ່
//      * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການສ້າງ
//      * @returns {Promise<Object>} ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຖືກສ້າງ
//      */
//     createCategory: async (categoryData) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//             }

//             const response = await axios.post(`${API_URL}/categories`, categoryData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error('Error creating category:', error);
//             throw error;
//         }
//     },

//     /**
//      * ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າ
//      * @param {string} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
//      * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
//      * @returns {Promise<Object>} ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຖືກອັບເດດ
//      */
//     // updateCategory: async (id, categoryData) => {
//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         if (!token) {
//     //             throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//     //         }

//     //         const response = await axios.put(`${API_URL}/categories/${id}`, categoryData, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`
//     //             }
//     //         });

//     //         return response.data;
//     //     } catch (error) {
//     //         console.error(`Error updating category with ID ${id}:`, error);
//     //         throw error;
//     //     }
//     // },


//     updateCategory: async (id, categoryData) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//             }

//             // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
//             const numericId = id.toString().replace(/\D/g, '');

//             const response = await axios.put(`${API_URL}/categories/${numericId}`, categoryData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error(`Error updating category with ID ${id}:`, error);
//             throw error;
//         }
//     },
//     /**
//      * ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
//      * @param {string} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການລຶບ
//      * @returns {Promise<Object>} ຜົນລັບການລຶບຂໍ້ມູນ
//      */
//     // deleteCategory: async (id) => {
//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         if (!token) {
//     //             throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//     //         }

//     //         const response = await axios.delete(`${API_URL}/categories/${id}`, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`
//     //             }
//     //         });

//     //         return response.data;
//     //     } catch (error) {
//     //         console.error(`Error deleting category with ID ${id}:`, error);
//     //         throw error;
//     //     }
//     // }

//     deleteCategory: async (id) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
//             }

//             // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
//             const numericId = id.toString().replace(/\D/g, '');

//             const response = await axios.delete(`${API_URL}/categories/${numericId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.error(`Error deleting category with ID ${id}:`, error);
//             throw error;
//         }
//     }
// };

// export default categoryService;




// frontend/src/services/categoryService.js
import axios from 'axios';

// ຕັ້ງຄ່າພື້ນຖານສຳລັບ axios
const API_URL = 'http://localhost:5001/api';

/**
 * ບໍລິການຈັດການຂໍ້ມູນປະເພດສິນຄ້າ
 */
const categoryService = {
    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
     * @param {boolean} hierarchical - ຕ້ອງການຂໍ້ມູນແບບລຳດັບຊັ້ນຫຼືບໍ່
     * @returns {Promise<Array>} ລາຍການປະເພດສິນຄ້າ
     */
    getAllCategories: async (hierarchical = false) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_URL}/categories`, {
                params: { hierarchical },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຫຼັກທີ່ບໍ່ມີແມ່
     * @returns {Promise<Array>} ລາຍການປະເພດສິນຄ້າຫຼັກ
     */
    getMainCategories: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_URL}/categories/main`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching main categories:', error);
            throw error;
        }
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຍ່ອຍຕາມ parentId
     * @param {string} parentId - ລະຫັດຂອງປະເພດສິນຄ້າແມ່
     * @returns {Promise<Array>} ລາຍການປະເພດສິນຄ້າຍ່ອຍ
     */
    getSubCategories: async (parentId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_URL}/categories/sub/${parentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error fetching subcategories for parent ${parentId}:`, error);
            throw error;
        }
    },

    /**
     * ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
     * @param {string} keyword - ຄຳສັບທີ່ໃຊ້ຄົ້ນຫາ
     * @returns {Promise<Array>} ລາຍການປະເພດສິນຄ້າທີ່ກົງກັບຄຳສັບຄົ້ນຫາ
     */
    searchCategories: async (keyword) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_URL}/categories/search`, {
                params: { keyword },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error searching categories:', error);
            throw error;
        }
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຕາມ ID
     * @param {string} id - ລະຫັດປະເພດສິນຄ້າ
     * @returns {Promise<Object>} ຂໍ້ມູນປະເພດສິນຄ້າ
     */
    getCategoryById: async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
            const numericId = id.toString().replace(/\D/g, '');

            const response = await axios.get(`${API_URL}/categories/${numericId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error fetching category with ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * ສ້າງປະເພດສິນຄ້າໃໝ່
     * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການສ້າງ
     * @returns {Promise<Object>} ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຖືກສ້າງ
     */
    createCategory: async (categoryData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.post(`${API_URL}/categories`, categoryData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    /**
     * ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າ
     * @param {string} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @returns {Promise<Object>} ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຖືກອັບເດດ
     */
    updateCategory: async (id, categoryData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
            const numericId = id.toString().replace(/\D/g, '');

            const response = await axios.put(`${API_URL}/categories/${numericId}`, categoryData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error updating category with ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
     * @param {string} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການລຶບ
     * @returns {Promise<Object>} ຜົນລັບການລຶບຂໍ້ມູນ
     */
    deleteCategory: async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
            const numericId = id.toString().replace(/\D/g, '');

            const response = await axios.delete(`${API_URL}/categories/${numericId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error deleting category with ID ${id}:`, error);
            throw error;
        }
    }
};

export default categoryService;





