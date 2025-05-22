// frontend/src/services/brandService.js
import axios from 'axios';

// ຕັ້ງຄ່າພື້ນຖານສຳລັບ axios
const API_URL = 'http://localhost:5001/api';

/**
 * ບໍລິການຈັດການຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
 */
const brandService = {
    /**
     * ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທັງໝົດ
     * @returns {Promise<Array>} ລາຍການຍີ່ຫໍ້ສິນຄ້າ
     */
    getAllBrands: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_URL}/brands`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching brands:', error);
            throw error;
        }
    },

    /**
     * ຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າດ້ວຍຄຳສັບ
     * @param {string} keyword - ຄຳສັບທີ່ໃຊ້ຄົ້ນຫາ
     * @returns {Promise<Array>} ລາຍການຍີ່ຫໍ້ສິນຄ້າທີ່ກົງກັບຄຳສັບຄົ້ນຫາ
     */
    searchBrands: async (keyword) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_URL}/brands/search`, {
                params: { keyword },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error searching brands:', error);
            throw error;
        }
    },

    /**
     * ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າຕາມ ID
     * @param {string} id - ລະຫັດຍີ່ຫໍ້ສິນຄ້າ
     * @returns {Promise<Object>} ຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
     */
    getBrandById: async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
            const numericId = id.toString().replace(/\D/g, '');

            const response = await axios.get(`${API_URL}/brands/${numericId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error fetching brand with ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * ສ້າງຍີ່ຫໍ້ສິນຄ້າໃໝ່
     * @param {Object} brandData - ຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການສ້າງ
     * @returns {Promise<Object>} ຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ຖືກສ້າງ
     */
    createBrand: async (brandData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.post(`${API_URL}/brands`, brandData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error creating brand:', error);
            throw error;
        }
    },

    /**
     * ອັບເດດຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
     * @param {string} id - ລະຫັດຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @param {Object} brandData - ຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @returns {Promise<Object>} ຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ຖືກອັບເດດ
     */
   

    updateBrand: async (id, brandData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
            const numericId = id.toString().replace(/\D/g, '');

            const response = await axios.put(`${API_URL}/brands/${numericId}`, brandData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error updating brand with ID ${id}:`, error);
            throw error;
        }
    },
    /**
     * ລຶບຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
     * @param {string} id - ລະຫັດຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການລຶບ
     * @returns {Promise<Object>} ຜົນລັບການລຶບຂໍ້ມູນ
     */
    deleteBrand: async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            // ຕັດຕົວອັກສອນທັງໝົດອອກ ເອົາແຕ່ຕົວເລກ
            const numericId = id.toString().replace(/\D/g, '');

            const response = await axios.delete(`${API_URL}/brands/${numericId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error deleting brand with ID ${id}:`, error);
            throw error;
        }
    },

};

export default brandService;