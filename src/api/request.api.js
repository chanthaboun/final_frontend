// frontend/src/api/request.api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ===== USER REQUEST APIs =====

// Submit new request (ສົ່ງການເບີກສິນຄ້າ)
export const submitRequest = async (requestData) => {
    try {
        const response = await api.post('/requests', {
            userId: requestData.userId || 'User1', // Get from auth context
            items: requestData.items, // Array of { productId, quantity }
            note: requestData.note || '',
        });
        return {
            success: true,
            request: response.data.request,
            message: response.data.message
        };
    } catch (error) {
        console.error('Error submitting request:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'ບໍ່ສາມາດສົ່ງການເບີກໄດ້'
        };
    }
};

// Get user's requests (ເບິ່ງການເບີກຂອງຕົນເອງ)
export const getUserRequests = async (userId) => {
    try {
        const response = await api.get(`/requests/user/${userId}`);
        return {
            success: true,
            requests: response.data.requests
        };
    } catch (error) {
        console.error('Error fetching user requests:', error);
        return {
            success: false,
            requests: [],
            message: error.response?.data?.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນການເບີກໄດ້'
        };
    }
};

// ===== ADMIN APPROVAL APIs =====

// Get all requests for admin (ເບິ່ງການເບີກທັງໝົດ)
export const getAllRequests = async (status = null) => {
    try {
        const url = status ? `/requests?status=${status}` : '/requests';
        const response = await api.get(url);
        return {
            success: true,
            requests: response.data.requests
        };
    } catch (error) {
        console.error('Error fetching all requests:', error);
        return {
            success: false,
            requests: [],
            message: error.response?.data?.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນການເບີກໄດ້'
        };
    }
};

// Approve request (ອະນຸມັດການເບີກ)
export const approveRequest = async (requestId, adminId) => {
    try {
        const response = await api.put(`/requests/${requestId}/approve`, {
            adminId: adminId || 'Admin1', // Get from auth context
            approvedDate: new Date().toISOString()
        });
        return {
            success: true,
            request: response.data.request,
            message: response.data.message
        };
    } catch (error) {
        console.error('Error approving request:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'ບໍ່ສາມາດອະນຸມັດການເບີກໄດ້'
        };
    }
};

// Reject request (ປະຕິເສດການເບີກ)
export const rejectRequest = async (requestId, adminId, reason) => {
    try {
        const response = await api.put(`/requests/${requestId}/reject`, {
            adminId: adminId || 'Admin1', // Get from auth context
            reason: reason,
            rejectedDate: new Date().toISOString()
        });
        return {
            success: true,
            request: response.data.request,
            message: response.data.message
        };
    } catch (error) {
        console.error('Error rejecting request:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'ບໍ່ສາມາດປະຕິເສດການເບີກໄດ້'
        };
    }
};

// Get request details (ເບິ່ງລາຍລະອຽດການເບີກ)
export const getRequestDetails = async (requestId) => {
    try {
        const response = await api.get(`/requests/${requestId}`);
        return {
            success: true,
            request: response.data.request
        };
    } catch (error) {
        console.error('Error fetching request details:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'ບໍ່ສາມາດດຶງລາຍລະອຽດການເບີກໄດ້'
        };
    }
};

// ===== STATISTICS APIs =====

// Get request statistics (ສະຖິຕິການເບີກ)
export const getRequestStatistics = async (period = 'month') => {
    try {
        const response = await api.get(`/requests/statistics?period=${period}`);
        return {
            success: true,
            statistics: response.data.statistics
        };
    } catch (error) {
        console.error('Error fetching request statistics:', error);
        return {
            success: false,
            statistics: {},
            message: error.response?.data?.message || 'ບໍ່ສາມາດດຶງສະຖິຕິໄດ້'
        };
    }
};

export default {
    submitRequest,
    getUserRequests,
    getAllRequests,
    approveRequest,
    rejectRequest,
    getRequestDetails,
    getRequestStatistics
};

// ===========================
// BACKEND API STRUCTURE ທີ່ຄວນມີ
// ===========================

/*
// backend/routes/requestRoutes.js

const express = require('express');
const router = express.Router();
const Request = require('../models/Request'); // MongoDB/MySQL model
const Product = require('../models/Product');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// POST /api/requests - ສົ່ງການເບີກສິນຄ້າ
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { userId, items, note } = req.body;
    
    // Validate items availability
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.quantity < item.quantity) {
        return res.status(400).json({
          message: `ສິນຄ້າ ${product?.name || item.productId} ບໍ່ພຽງພໍ`
        });
      }
    }
    
    // Create request
    const request = new Request({
      id: generateRequestId(), // REQ001, REQ002, etc.
      userId,
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unit: item.unit
      })),
      status: 'pending',
      requestDate: new Date(),
      note
    });
    
    await request.save();
    
    res.status(201).json({
      message: 'ສົ່ງການເບີກສິນຄ້າສຳເລັດແລ້ວ',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/requests - ເບິ່ງການເບີກທັງໝົດ (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const requests = await Request.find(filter)
      .populate('userId', 'name email')
      .populate('items.productId', 'name category brand imageUrl')
      .sort({ requestDate: -1 });
    
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/requests/user/:userId - ເບິ່ງການເບີກຂອງ User
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const requests = await Request.find({ userId })
      .populate('items.productId', 'name category brand imageUrl')
      .sort({ requestDate: -1 });
    
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/requests/:id/approve - ອະນຸມັດການເບີກ (Admin only)
router.put('/:id/approve', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;
    
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'ບໍ່ພົບການເບີກນີ້' });
    }
    
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'ການເບີກນີ້ຖືກດຳເນີນການແລ້ວ' });
    }
    
    // Update product quantities
    for (let item of request.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.quantity } }
      );
    }
    
    // Update request status
    request.status = 'approved';
    request.approvedBy = adminId;
    request.approvedDate = new Date();
    await request.save();
    
    res.json({
      message: 'ອະນຸມັດການເບີກສຳເລັດແລ້ວ',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/requests/:id/reject - ປະຕິເສດການເບີກ (Admin only)
router.put('/:id/reject', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, reason } = req.body;
    
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'ບໍ່ພົບການເບີກນີ້' });
    }
    
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'ການເບີກນີ້ຖືກດຳເນີນການແລ້ວ' });
    }
    
    // Update request status
    request.status = 'rejected';
    request.rejectedBy = adminId;
    request.rejectedDate = new Date();
    request.rejectedReason = reason;
    await request.save();
    
    res.json({
      message: 'ປະຕິເສດການເບີກແລ້ວ',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
*/

/*
// backend/models/Request.js (MongoDB Schema)

const mongoose = require('mongoose');

const requestItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit: {
    type: String,
    required: true
  }
});

const requestSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true // REQ001, REQ002, etc.
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [requestItemSchema],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedDate: {
    type: Date
  },
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectedDate: {
    type: Date
  },
  rejectedReason: {
    type: String
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);
*/