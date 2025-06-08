// frontend/src/services/MockRequestService.js
// ຈຳລອງລະບົບການເບີກສິນຄ້າຜ່ານ localStorage

class MockRequestService {
    static STORAGE_KEY = 'withdrawal_requests';

    // ດຶງລາຍການການເບີກທັງໝົດ
    static getAllRequests() {
        try {
            const requests = localStorage.getItem(this.STORAGE_KEY);
            return requests ? JSON.parse(requests) : [];
        } catch (error) {
            console.error('Error getting requests:', error);
            return [];
        }
    }

    // ສ້າງການເບີກໃໝ່
    static createRequest(requestData) {
        try {
            const requests = this.getAllRequests();
            const newRequest = {
                id: this.generateRequestId(),
                ...requestData,
                status: 'pending',
                requestDate: new Date().toISOString(),
                approvedBy: null,
                approvedDate: null,
                rejectedBy: null,
                rejectedDate: null,
                rejectedReason: null
            };

            requests.push(newRequest);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));

            // แจ้งเตือน Admin (จำลอง notification)
            this.notifyAdmin(newRequest);

            return {
                success: true,
                request: newRequest,
                message: `ສົ່ງການເບີກສິນຄ້າສຳເລັດແລ້ວ! ລະຫັດ: ${newRequest.id}`
            };
        } catch (error) {
            console.error('Error creating request:', error);
            return {
                success: false,
                message: 'ບໍ່ສາມາດສ້າງການເບີກໄດ້'
            };
        }
    }

    // ອະນຸມັດການເບີກ
    static approveRequest(requestId, adminId) {
        try {
            const requests = this.getAllRequests();
            const requestIndex = requests.findIndex(req => req.id === requestId);

            if (requestIndex === -1) {
                return { success: false, message: 'ບໍ່ພົບການເບີກນີ້' };
            }

            if (requests[requestIndex].status !== 'pending') {
                return { success: false, message: 'ການເບີກນີ້ຖືກດຳເນີນການແລ້ວ' };
            }

            requests[requestIndex].status = 'approved';
            requests[requestIndex].approvedBy = adminId;
            requests[requestIndex].approvedDate = new Date().toISOString();

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));

            return {
                success: true,
                request: requests[requestIndex],
                message: 'ອະນຸມັດການເບີກສຳເລັດແລ້ວ'
            };
        } catch (error) {
            console.error('Error approving request:', error);
            return {
                success: false,
                message: 'ບໍ່ສາມາດອະນຸມັດການເບີກໄດ້'
            };
        }
    }

    // ປະຕິເສດການເບີກ
    static rejectRequest(requestId, adminId, reason) {
        try {
            const requests = this.getAllRequests();
            const requestIndex = requests.findIndex(req => req.id === requestId);

            if (requestIndex === -1) {
                return { success: false, message: 'ບໍ່ພົບການເບີກນີ້' };
            }

            if (requests[requestIndex].status !== 'pending') {
                return { success: false, message: 'ການເບີກນີ້ຖືກດຳເນີນການແລ້ວ' };
            }

            requests[requestIndex].status = 'rejected';
            requests[requestIndex].rejectedBy = adminId;
            requests[requestIndex].rejectedDate = new Date().toISOString();
            requests[requestIndex].rejectedReason = reason;

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));

            return {
                success: true,
                request: requests[requestIndex],
                message: 'ປະຕິເສດການເບີກແລ້ວ'
            };
        } catch (error) {
            console.error('Error rejecting request:', error);
            return {
                success: false,
                message: 'ບໍ່ສາມາດປະຕິເສດການເບີກໄດ້'
            };
        }
    }

    // ດຶງການເບີກຕາມສະຖານະ
    static getRequestsByStatus(status) {
        const requests = this.getAllRequests();
        return status ? requests.filter(req => req.status === status) : requests;
    }

    // ດຶງການເບີກຂອງ User
    static getUserRequests(userId) {
        const requests = this.getAllRequests();
        return requests.filter(req => req.userId === userId);
    }

    // ສ້າງລະຫັດການເບີກ
    static generateRequestId() {
        const timestamp = Date.now().toString().slice(-6);
        return `REQ${timestamp}`;
    }

    // ແຈ້ງເຕືອນ Admin (จำลอง)
    static notifyAdmin(request) {
        // สร้าง notification counter
        const notificationKey = 'admin_notifications';
        let notifications = localStorage.getItem(notificationKey);
        notifications = notifications ? JSON.parse(notifications) : [];

        const notification = {
            id: Date.now(),
            type: 'new_request',
            requestId: request.id,
            message: `ມີການເບີກສິນຄ້າໃໝ່ຈາກ ${request.userName || request.userId}`,
            createdAt: new Date().toISOString(),
            read: false
        };

        notifications.unshift(notification);

        // เก็บไว้ 50 notification ล่าสุด
        if (notifications.length > 50) {
            notifications = notifications.slice(0, 50);
        }

        localStorage.setItem(notificationKey, JSON.stringify(notifications));
    }

    // ดึง notifications สำหรับ Admin
    static getAdminNotifications() {
        try {
            const notifications = localStorage.getItem('admin_notifications');
            return notifications ? JSON.parse(notifications) : [];
        } catch (error) {
            console.error('Error getting notifications:', error);
            return [];
        }
    }

    // ทำเครื่องหมายว่าอ่านแล้ว
    static markNotificationAsRead(notificationId) {
        try {
            const notifications = this.getAdminNotifications();
            const updatedNotifications = notifications.map(notification =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            );
            localStorage.setItem('admin_notifications', JSON.stringify(updatedNotifications));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    // นับ notification ที่ยังไม่อ่าน
    static getUnreadNotificationCount() {
        const notifications = this.getAdminNotifications();
        return notifications.filter(notification => !notification.read).length;
    }

    // ลบ notification
    static clearNotifications() {
        localStorage.removeItem('admin_notifications');
    }

    // ล้างข้อมูลทั้งหมด (สำหรับ testing)
    static clearAllData() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem('admin_notifications');
    }

    // สร้างข้อมูลตัวอย่าง
    static createSampleData() {
        const sampleRequests = [
            {
                id: 'REQ001',
                userId: 'User1',
                userName: 'ທ້າວ ສົມໃດ',
                items: [
                    {
                        id: 'PROD001',
                        name: 'ຫຼອດໄຟ LED',
                        category: 'ອິເລັກໂຕຣນິກ',
                        brand: 'PHILLIPS',
                        unit: 'ອັນ',
                        requestedQuantity: 5,
                        imageUrl: '/images/led-light.jpg'
                    }
                ],
                note: 'ເພື່ອນຳໄປໃຊ້ໃນສຳນັກງານ',
                priority: 'normal',
                status: 'pending',
                requestDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 นาทีที่แล้ว
                totalItems: 1,
                totalQuantity: 5
            },
            {
                id: 'REQ002',
                userId: 'User1',
                userName: 'ທ້າວ ສົມໃດ',
                items: [
                    {
                        id: 'PROD002',
                        name: 'ແບັດເຕີຣີ',
                        category: 'ອິເລັກໂຕຣນິກ',
                        brand: 'DURACELL',
                        unit: 'ຊຸດ',
                        requestedQuantity: 2,
                        imageUrl: '/images/battery.jpg'
                    }
                ],
                note: 'ສຳລັບເຄື່ອງມື',
                priority: 'urgent',
                status: 'approved',
                requestDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 ชั่วโมงที่แล้ว
                approvedBy: 'Admin1',
                approvedDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                totalItems: 1,
                totalQuantity: 2
            }
        ];

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleRequests));

        // สร้าง notification ตัวอย่าง
        const sampleNotifications = [
            {
                id: Date.now(),
                type: 'new_request',
                requestId: 'REQ001',
                message: 'ມີການເບີກສິນຄ້າໃໝ່ຈາກ ທ້າວ ສົມໃດ',
                createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                read: false
            }
        ];

        localStorage.setItem('admin_notifications', JSON.stringify(sampleNotifications));
    }
}

export default MockRequestService;