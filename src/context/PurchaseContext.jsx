// src/context/PurchaseContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const PurchaseContext = createContext();

export const usePurchase = () => {
    const context = useContext(PurchaseContext);
    if (!context) {
        throw new Error('usePurchase must be used within a PurchaseProvider');
    }
    return context;
};

export const PurchaseProvider = ({ children }) => {
    // Mock data ຜູ້ສະໜອງ
    const mockSuppliers = [
        {
            id: "SUP001",
            name: "ບໍລິສັດດິຕະດາ ຟອກລິຟທ໌ຂາຍ ຈຳກັດ",
            contact_person: "Chanthavong",
            phone: "020-55555555",
            email: "LCM@gamil.com",
            address: "ນະຄອນຫຼວງວຽງຈັນ, ເມືອງໄຊສົດ, ຕົກທົ້ງ"
        },
        {
            id: "SUP002",
            name: "DK Company",
            contact_person: "ດາຣາລັກ",
            phone: "020-77777777",
            email: "dk@company.la",
            address: "ວຽງຈັນ, ເມືອງໄຊເສດຖາ, ບ້ານດົງມະກ"
        }
    ];

    // Mock data ເບື້ອງຕົ້ນ
    const mockUsers = [
        { id: "1", username: "admin", name: "ຜູ້ດູແລລະບົບ", role: "admin" },
        { id: "2", username: "user1", name: "ພະນັກງານ 1", role: "user" },
        { id: "3", username: "user2", name: "ພະນັກງານ 2", role: "user" },
    ];

    const mockProducts = [
        {
            id: "1",
            name: "ຍາງລໍ້",
            price: 4000000,
            stock: 100,
            category: "5Ton",
            brand: "BYD5-Ton",
            unit: "ອັນ",
            supplier_id: "SUP001"
        },
        {
            id: "2",
            name: "ໄຟ",
            price: 60000,
            stock: 150,
            category: "5Ton",
            brand: "HaiYuan",
            unit: "ອັນ",
            supplier_id: "SUP002"
        },
        {
            id: "3",
            name: "ເອຄໃນ",
            price: 2500000,
            stock: 80,
            category: "5Ton",
            brand: "BYD5-Ton",
            unit: "ອັນ",
            supplier_id: "SUP001"
        },
        {
            id: "4",
            name: "ວົງລໍ້",
            price: 5000000,
            stock: 200,
            category: "5Ton",
            brand: "BYD5-Ton",
            unit: "ອັນ",
            supplier_id: "SUP002"
        },
    ];

    // ຂໍ້ມູນ Purchase orders ເບື້ອງຕົ້ນ
    const initialPurchases = [
        {
            id: "P001",
            date: "2025-05-10",
            user_id: "2",
            user_name: "ພະນັກງານ 1",
            invoice_no: "INV-001",
            supplier_id: "SUP001",
            supplier_info: mockSuppliers[0],
            total_amount: 6500000,
            items: [
                {
                    product_id: "1",
                    product_name: "ຍາງລໍ້",
                    category: "5Ton",
                    brand: "BYD5-Ton",
                    unit: "ອັນ",
                    quantity: 1,
                    price: 4000000,
                    subtotal: 4000000
                },
                {
                    product_id: "3",
                    product_name: "ເອຄໃນ",
                    category: "5Ton",
                    brand: "BYD5-Ton",
                    unit: "ອັນ",
                    quantity: 1,
                    price: 2500000,
                    subtotal: 2500000
                }
            ]
        },
        {
            id: "P002",
            date: "2025-05-15",
            user_id: "3",
            user_name: "ພະນັກງານ 2",
            invoice_no: "INV-002",
            supplier_id: "SUP002",
            supplier_info: mockSuppliers[1],
            total_amount: 5060000,
            items: [
                {
                    product_id: "2",
                    product_name: "ໄຟ",
                    category: "5Ton",
                    brand: "HaiYuan",
                    unit: "ອັນ",
                    quantity: 1,
                    price: 60000,
                    subtotal: 60000
                },
                {
                    product_id: "4",
                    product_name: "ວົງລໍ້",
                    category: "5Ton",
                    brand: "BYD5-Ton",
                    unit: "ອັນ",
                    quantity: 1,
                    price: 5000000,
                    subtotal: 5000000
                }
            ]
        }
    ];

    // States
    const [purchases, setPurchases] = useState(initialPurchases);
    const [users] = useState(mockUsers);
    const [products] = useState(mockProducts);
    const [suppliers] = useState(mockSuppliers);
    const [loading, setLoading] = useState(false);

    // ສ້າງເລກທີໃບສັ່ງຊື້ໃໝ່
    const generatePurchaseId = () => {
        const lastId = purchases.length > 0
            ? Math.max(...purchases.map(p => parseInt(p.id.replace('P', ''))))
            : 0;
        return `P${String(lastId + 1).padStart(3, '0')}`;
    };

    // ສ້າງເລກທີໃບແຈ້ງໜີ້ໃໝ່
    const generateInvoiceNo = () => {
        const lastInvoice = purchases.length > 0
            ? Math.max(...purchases.map(p => {
                const num = p.invoice_no?.replace('INV-', '');
                return num ? parseInt(num) : 0;
            }))
            : 0;
        return `INV-${String(lastInvoice + 1).padStart(3, '0')}`;
    };

    // ຫາຂໍ້ມູນຜູ້ສະໜອງຈາກ ID
    const getSupplierById = (supplierId) => {
        return suppliers.find(supplier => supplier.id === supplierId);
    };

    // ຫາຂໍ້ມູນສິນຄ້າຈາກ ID ພ້ອມຂໍ້ມູນເພີ່ມເຕີມ
    const getProductDetailsById = (productId) => {
        return products.find(product => product.id === productId);
    };

    // 🆕 ແຍກສິນຄ້າຕາມຜູ້ສະໜອງ
    const groupCartItemsBySupplier = (cartItems) => {
        const grouped = {};

        cartItems.forEach(item => {
            // ຫາຂໍ້ມູນສິນຄ້າທີ່ສົມບູນ
            const productDetails = getProductDetailsById(item.id);
            const supplierId = productDetails?.supplier_id || item.supplier_id || 'UNKNOWN';

            if (!grouped[supplierId]) {
                grouped[supplierId] = [];
            }

            // ເພີ່ມຂໍ້ມູນເພີ່ມເຕີມໃສ່ສິນຄ້າ
            const enhancedItem = {
                ...item,
                category: productDetails?.category || item.category || 'ບໍ່ລະບຸ',
                brand: productDetails?.brand || item.brand || 'ບໍ່ລະບຸ',
                unit: productDetails?.unit || item.unit || 'ອັນ',
                supplier_id: supplierId
            };

            grouped[supplierId].push(enhancedItem);
        });

        return grouped;
    };

    // 🆕 ເພີ່ມ Purchase order ໃໝ່ (ແຍກຕາມຜູ້ສະໜອງ)
    const addPurchase = async (cartItems, currentUser = null) => {
        setLoading(true);

        try {
            // ແຍກສິນຄ້າຕາມຜູ້ສະໜອງ
            const groupedItems = groupCartItemsBySupplier(cartItems);
            const newPurchases = [];

            // ສ້າງໃບສັ່ງຊື້ແຍກສຳລັບແຕ່ລະຜູ້ສະໜອງ
            for (const [supplierId, items] of Object.entries(groupedItems)) {
                const supplier = getSupplierById(supplierId);

                const newPurchase = {
                    id: generatePurchaseId(),
                    date: new Date().toISOString().split('T')[0],
                    user_id: currentUser?.id || "1",
                    user_name: currentUser?.name || "ຜູ້ດູແລລະບົບ",
                    invoice_no: generateInvoiceNo(),
                    supplier_id: supplierId,
                    supplier_info: supplier || {
                        id: supplierId,
                        name: "ຜູ້ສະໜອງບໍ່ລະບຸ",
                        contact_person: "ບໍ່ລະບຸ",
                        phone: "ບໍ່ລະບຸ",
                        email: "ບໍ່ລະບຸ",
                        address: "ບໍ່ລະບຸ"
                    },
                    total_amount: items.reduce((total, item) => {
                        return total + (item.price * item.quantity);
                    }, 0),
                    items: items.map(item => ({
                        product_id: item.id,
                        product_name: item.name,
                        category: item.category,
                        brand: item.brand,
                        unit: item.unit,
                        quantity: item.quantity,
                        price: item.price,
                        subtotal: item.price * item.quantity
                    }))
                };

                newPurchases.push(newPurchase);
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // ເພີ່ມໃບສັ່ງຊື້ທັງໝົດເຂົ້າໃນລາຍການ
            setPurchases(prev => [...newPurchases, ...prev]);

            setLoading(false);
            return newPurchases;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // ລຶບ Purchase order
    const deletePurchase = async (id) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setPurchases(prev => prev.filter(purchase => purchase.id !== id));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // ອັບເດດ Purchase order
    const updatePurchase = async (id, updatedData) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setPurchases(prev =>
                prev.map(purchase =>
                    purchase.id === id ? { ...purchase, ...updatedData } : purchase
                )
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    // ຊອກຫາຜູ້ໃຊ້ຈາກ ID
    const getUserById = (userId) => {
        return users.find(user => user.id === userId);
    };

    // ຊອກຫາສິນຄ້າຈາກ ID
    const getProductById = (productId) => {
        return products.find(product => product.id === productId);
    };

    // 🆕 ຟັງຊັນພິມໃບສັ່ງຊື້ (ປັບປຸງໃຫ້ມີຂໍ້ມູນຜູ້ສະໜອງ)
    const printPurchaseOrder = (purchase) => {
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>ໃບສັ່ງຊື້ ${purchase.invoice_no}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap');
                    body {
                        font-family: 'Noto Sans Lao', sans-serif;
                        margin: 20px;
                        line-height: 1.6;
                        font-size: 14px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #079578;
                        padding-bottom: 10px;
                    }
                    .company-name {
                        font-size: 24px;
                        font-weight: bold;
                        color: #079578;
                        margin-bottom: 5px;
                    }
                    .invoice-title {
                        font-size: 20px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .invoice-info {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        gap: 20px;
                    }
                    .info-box {
                        border: 1px solid #ddd;
                        padding: 15px;
                        border-radius: 5px;
                        flex: 1;
                    }
                    .supplier-info {
                        background-color: #f8f9fa;
                        border: 2px solid #079578;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        font-size: 12px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #079578;
                        color: white;
                        font-weight: bold;
                        font-size: 11px;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .text-center {
                        text-align: center;
                    }
                    .total-row {
                        background-color: #f8f9fa;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 50px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .signature-box {
                        width: 200px;
                        text-align: center;
                        border-top: 1px solid #000;
                        padding-top: 10px;
                        margin-top: 50px;
                    }
                    @media print {
                        body { margin: 0; font-size: 12px; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="company-name">ບໍລິສັດ ABC ຈຳກັດ</div>
                    <div>ທີ່ຢູ່: ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</div>
                    <div>ໂທ: 020-12345678 | Email: info@abc.la</div>
                </div>

                <div class="invoice-title">ໃບສັ່ງຊື້ສິນຄ້າ</div>

                <div class="invoice-info">
                    <div class="info-box">
                        <strong>ຂໍ້ມູນໃບສັ່ງຊື້:</strong><br>
                        ເລກທີໃບແຈ້ງໜີ້: ${purchase.invoice_no}<br>
                        ວັນທີ: ${new Date(purchase.date).toLocaleDateString('lo-LA')}<br>
                        ເລກທີສັ່ງຊື້: ${purchase.id}<br><br>
                        <strong>ຜູ້ສັ່ງຊື້:</strong><br>
                        ຊື່: ${purchase.user_name}<br>
                        ລະຫັດຜູ້ໃຊ້: ${purchase.user_id}
                    </div>
                    
                    <div class="info-box supplier-info">
                        <strong style="color: #079578;">ຂໍ້ມູນຜູ້ສະໜອງ:</strong><br>
                        <strong>ຊື່ບໍລິສັດ:</strong> ${purchase.supplier_info.name}<br>
                        <strong>ຜູ້ຕິດຕໍ່:</strong> ${purchase.supplier_info.contact_person}<br>
                        <strong>ເບີໂທ:</strong> ${purchase.supplier_info.phone}<br>
                        <strong>ອີເມວ:</strong> ${purchase.supplier_info.email}<br>
                        <strong>ທີ່ຢູ່:</strong> ${purchase.supplier_info.address}
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th style="width: 5%;">ລຳດັບ</th>
                            <th style="width: 25%;">ລາຍການສິນຄ້າ</th>
                            <th style="width: 12%;">ປະເພດ</th>
                            <th style="width: 12%;">ຍີ່ຫໍ້</th>
                            <th style="width: 8%;">ຈຳນວນ</th>
                            <th style="width: 8%;">ຫົວໜ່ວຍ</th>
                            <th style="width: 15%;">ລາຄາ/ຫົວໜ່ວຍ</th>
                            <th style="width: 15%;">ລາຄາລວມ</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${purchase.items.map((item, index) => `
                            <tr>
                                <td class="text-center">${index + 1}</td>
                                <td>${item.product_name}</td>
                                <td class="text-center">${item.category}</td>
                                <td class="text-center">${item.brand}</td>
                                <td class="text-center">${item.quantity}</td>
                                <td class="text-center">${item.unit}</td>
                                <td class="text-right">${item.price.toLocaleString()} ກີບ</td>
                                <td class="text-right">${item.subtotal.toLocaleString()} ກີບ</td>
                            </tr>
                        `).join('')}
                        <tr class="total-row">
                            <td colspan="7" class="text-right"><strong>ລາຄາລວມທັງໝົດ:</strong></td>
                            <td class="text-right"><strong>${purchase.total_amount.toLocaleString()} ກີບ</strong></td>
                        </tr>
                    </tbody>
                </table>

                <div class="footer">
                    <div>
                        <strong>ໝາຍເຫດ:</strong><br>
                        • ກະລຸນາກວດສອບສິນຄ້າໃຫ້ຄົບຖ້ວນກ່ອນຮັບສິນຄ້າ<br>
                        • ໃບສັ່ງຊື້ນີ້ມີຜົນບັງຄັບໃຊ້ 30 ວັນ<br>
                        • ສິນຄ້າທີ່ບໍ່ຕົງຕາມຄຸນນະພາບສາມາດແລກປ່ຽນໄດ້ພາຍໃນ 7 ວັນ
                    </div>
                    <div>
                        <div class="signature-box">
                            <div>ລາຍເຊັນຜູ້ສັ່ງຊື້</div>
                        </div>
                    </div>
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        };
                    };
                </script>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(printContent);
        printWindow.document.close();
    };

    const value = {
        purchases,
        users,
        products,
        suppliers,
        loading,
        addPurchase,
        deletePurchase,
        updatePurchase,
        getUserById,
        getProductById,
        getSupplierById,
        printPurchaseOrder
    };

    return (
        <PurchaseContext.Provider value={value}>
            {children}
        </PurchaseContext.Provider>
    );
};