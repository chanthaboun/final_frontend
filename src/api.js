
// frontend/src/api.js
import axios from 'axios';

// ສ້າງ instance ຂອງ axios ພ້ອມກຳນົດ URL ພື້ນຖານ
const API_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ເພີ່ມ token ໃນ header ຂອງຄຳຮ້ອງຂໍທຸກຄັ້ງ
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ບໍລິການສຳລັບການພິສູດຕົວຕົນ
export const authService = {
    // ເຂົ້າສູ່ລະບົບ
    login: async (username, password) => {
        try {
            const response = await api.post('/login', { username, password });

            // ເກັບ token ແລະ ຂໍ້ມູນຜູ້ໃຊ້ໄວ້ໃນ localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // ເກັບຂໍ້ມູນພະນັກງານຖ້າມີ
            if (response.data.user.employee_id) {
                localStorage.setItem('employee_id', response.data.user.employee_id);
                localStorage.setItem('employee_name', response.data.user.employee_name || '');
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ລົງທະບຽນຜູ້ໃຊ້ໃໝ່
    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ດຶງຂໍ້ມູນຜູ້ໃຊ້ປັດຈຸບັນ
    getCurrentUser: async () => {
        try {
            const response = await api.get('/user');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ດຶງຂໍ້ມູນຜູ້ໃຊ້ທັງໝົດ (ສຳລັບ admin)
    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ອັບເດດຂໍ້ມູນຜູ້ໃຊ້
    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ອອກຈາກລະບົບ
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('employee_id');
        localStorage.removeItem('employee_name');
    },

    // ກວດສອບວ່າມີການເຂົ້າສູ່ລະບົບແລ້ວຫຼືບໍ່
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // ດຶງບົດບາດຂອງຜູ້ໃຊ້
    getUserRole: () => {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user).role;
        }
        return null;
    },

    // ດຶງຂໍ້ມູນພະນັກງານປັດຈຸບັນ (ຖ້າມີ)
    getCurrentEmployee: () => {
        const employeeId = localStorage.getItem('employee_id');
        const employeeName = localStorage.getItem('employee_name');

        return employeeId ? { id: employeeId, name: employeeName } : null;
    },

    // ກວດສອບວ່າເປັນ admin ຫຼືບໍ່
    isAdmin: () => {
        return authService.getUserRole() === 'admin';
    }
};

// ບໍລິການສຳລັບຈັດການພະນັກງານ
export const employeeService = {
    // ດຶງຂໍ້ມູນພະນັກງານທັງໝົດ
    getAllEmployees: async () => {
        try {
            const response = await api.get('/employees');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ດຶງຂໍ້ມູນພະນັກງານຕາມ ID
    getEmployeeById: async (id) => {
        try {
            const response = await api.get(`/employees/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ສ້າງພະນັກງານໃໝ່
    createEmployee: async (employeeData) => {
        try {
            const response = await api.post('/employees', employeeData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ອັບເດດຂໍ້ມູນພະນັກງານ
    updateEmployee: async (id, employeeData) => {
        try {
            const response = await api.put(`/employees/${id}`, employeeData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ລຶບພະນັກງານ
    deleteEmployee: async (id, deleteUser = false) => {
        try {
            const url = deleteUser ? `/employees/${id}?deleteUser=true` : `/employees/${id}`;
            const response = await api.delete(url);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    },

    // ຄົ້ນຫາພະນັກງານ
    searchEmployees: async (query) => {
        try {
            const response = await api.get(`/employees/search?query=${query}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່' };
        }
    }
};

export default api;