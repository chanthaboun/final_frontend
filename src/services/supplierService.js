// frontend/src/services/supplierService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * ບໍລິການເຊື່ອມຕໍ່ກັບ API ຂໍ້ມູນຜູ້ສະໜອງ
 */
class SupplierService {
    /**
     * ດຶງຂໍ້ມູນຜູ້ສະໜອງທັງໝົດ
     */
    async getAllSuppliers() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_BASE_URL}/suppliers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            throw error;
        }
    }

    /**
     * ດຶງຂໍ້ມູນຜູ້ສະໜອງຕາມ ID
     */
    async getSupplierById(id) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_BASE_URL}/suppliers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error fetching supplier ${id}:`, error);
            throw error;
        }
    }

    /**
     * ຄົ້ນຫາຜູ້ສະໜອງຕາມ query
     */
    async searchSuppliers(query) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.get(`${API_BASE_URL}/suppliers/search`, {
                params: { query },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error searching suppliers:', error);
            throw error;
        }
    }

    /**
     * ສ້າງຜູ້ສະໜອງໃໝ່
     */
    async createSupplier(supplierData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.post(`${API_BASE_URL}/suppliers`, supplierData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error creating supplier:', error);
            throw error;
        }
    }

    /**
     * ອັບເດດຂໍ້ມູນຜູ້ສະໜອງ
     */
    async updateSupplier(id, supplierData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.put(`${API_BASE_URL}/suppliers/${id}`, supplierData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error updating supplier ${id}:`, error);
            throw error;
        }
    }

    /**
     * ລຶບຂໍ້ມູນຜູ້ສະໜອງ
     */
    async deleteSupplier(id) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ');
            }

            const response = await axios.delete(`${API_BASE_URL}/suppliers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error deleting supplier ${id}:`, error);
            throw error;
        }
    }
}

export default new SupplierService();




