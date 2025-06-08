// hooks/useSuppliers.js
import { useState, useEffect, useMemo } from 'react';
import supplierService from '../services/supplierService';

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ດຶງຂໍ້ມູນຜູ້ສະໜອງ
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                setLoading(true);
                const allSuppliersData = await supplierService.getAllSuppliers();

                if (Array.isArray(allSuppliersData) && allSuppliersData.length > 0) {
                    setSuppliers(allSuppliersData);
                } else {
                    setSuppliers([]);
                }
            } catch (err) {
                console.error('Error fetching suppliers:', err);
                setError(err.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນຜູ້ສະໜອງໄດ້');
                setSuppliers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    // ສ້າງ lookup map ເພື່ອຊອກຫາໄດ້ງ່າຍ
    const supplierLookup = useMemo(() => {
        const lookup = {};
        suppliers.forEach(supplier => {
            lookup[supplier.name] = supplier;
            lookup[supplier.id] = supplier;
        });
        return lookup;
    }, [suppliers]);

    // ຟັງຊັນຊ່ວຍສຳລັບຊອກຫາຜູ້ສະໜອງ
    const getSupplierById = (id) => supplierLookup[id] || null;
    const getSupplierByName = (name) => supplierLookup[name] || null;
    const getSupplierInfo = (nameOrId) => supplierLookup[nameOrId] || null;

    // ຟັງຊັນສຳລັບ filter
    const getActiveSuppliers = () => suppliers.filter(s => s.status !== false);
    const getSupplierNames = () => suppliers.map(s => s.name);
    const getSuppliersForSelect = () => suppliers.map(s => ({
        value: s.name,
        label: s.name,
        id: s.id,
        data: s
    }));

    return {
        suppliers,
        loading,
        error,
        supplierLookup,
        getSupplierById,
        getSupplierByName,
        getSupplierInfo,
        getActiveSuppliers,
        getSupplierNames,
        getSuppliersForSelect
    };
};

// ວິທີໃຊ້ໃນ component:
// import { useSuppliers } from '../hooks/useSuppliers';
//
// const MyComponent = () => {
//     const {
//         suppliers,
//         loading,
//         getSupplierInfo,
//         getSuppliersForSelect
//     } = useSuppliers();
//
//     // ໃຊ້ໃນຕາຕະລາງ
//     const supplierInfo = getSupplierInfo(product.supplier);
//
//     // ໃຊ้ໃນ dropdown
//     const supplierOptions = getSuppliersForSelect();
//
//     return (
//         // JSX content
//     );
// };