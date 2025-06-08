// // frontend/src/api/product.api.js
// import axios from 'axios';

// const API_URL = 'http://localhost:5001/api';

// // ກຳນົດ headers ພື້ນຖານ
// const getHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': token ? `Bearer ${token}` : '',
//         }
//     };
// };

// // ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດ
// export const getAllProducts = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         throw error;
//     }
// };

// // ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
// export const searchProducts = async (query) => {
//     try {
//         const response = await axios.get(`${API_URL}/products/search?query=${query}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error searching products:', error);
//         throw error;
//     }
// };

// // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
// export const getProductById = async (id) => {
//     try {
//         const response = await axios.get(`${API_URL}/products/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching product ${id}:`, error);
//         throw error;
//     }
// };

// // ເພີ່ມສິນຄ້າໃໝ່
// export const createProduct = async (productData) => {
//     try {
//         // ສ້າງ FormData ສຳລັບອັບໂຫຼດໄຟລ໌
//         const formData = new FormData();

//         // ເພີ່ມຂໍ້ມູນທຳມະດາ
//         for (const key in productData) {
//             if (key !== 'image' && productData[key] !== undefined) {
//                 formData.append(key, productData[key]);
//             }
//         }

//         // ເພີ່ມໄຟລ໌ຮູບພາບ ຖ້າມີ
//         if (productData.image instanceof File) {
//             formData.append('image', productData.image);
//         }

//         const response = await axios.post(`${API_URL}/products`, formData, getHeaders());
//         return response.data;
//     } catch (error) {
//         console.error('Error creating product:', error);
//         throw error;
//     }
// };

// // ອັບເດດຂໍ້ມູນສິນຄ້າ
// export const updateProduct = async (id, productData) => {
//     try {
//         // ສ້າງ FormData ສຳລັບອັບໂຫຼດໄຟລ໌
//         const formData = new FormData();

//         // ເພີ່ມຂໍ້ມູນທຳມະດາ
//         for (const key in productData) {
//             if (key !== 'image' && productData[key] !== undefined) {
//                 formData.append(key, productData[key]);
//             }
//         }

//         // ເພີ່ມໄຟລ໌ຮູບພາບ ຖ້າມີ
//         if (productData.image instanceof File) {
//             formData.append('image', productData.image);
//         }

//         const response = await axios.put(`${API_URL}/products/${id}`, formData, getHeaders());
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating product ${id}:`, error);
//         throw error;
//     }
// };

// // ລຶບສິນຄ້າ
// export const deleteProduct = async (id) => {
//     try {
//         const response = await axios.delete(`${API_URL}/products/${id}`, getHeaders());
//         return response.data;
//     } catch (error) {
//         console.error(`Error deleting product ${id}:`, error);
//         throw error;
//     }
// };

// // ດຶງລາຍການໜ່ວຍສິນຄ້າ
// export const getUnits = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products/units/all`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching units:', error);
//         throw error;
//     }
// };

// // ດຶງລາຍການປະເພດສິນຄ້າ
// export const getCategories = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products/categories/all`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         throw error;
//     }
// };

// // ດຶງລາຍການຍີ່ຫໍ້ສິນຄ້າ
// export const getBrands = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products/brands/all`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching brands:', error);
//         throw error;
//     }
// };



// // frontend/src/api/product.api.js
// import axios from 'axios';

// const API_URL = 'http://localhost:5001/api';
// // ປ່ຽນເປັນ IP ຫຼື domain ຂອງ server ຕົວຈິງຂອງທ່ານ
// // ຕົວຢ່າງ: const API_URL = 'https://yourdomain.com/api';
// // ຫຼື: const API_URL = 'http://192.168.1.100:5001/api';

// // ກຳນົດ headers ສຳລັບການພິສູດຕົວຕົນ
// const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//         'Authorization': token ? `Bearer ${token}` : '',
//     };
// };

// // ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດ
// export const getAllProducts = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products`);
//         console.log('API response for getAllProducts:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         throw error;
//     }
// };

// // ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
// export const searchProducts = async (query) => {
//     try {
//         const response = await axios.get(`${API_URL}/products/search?query=${encodeURIComponent(query)}`);
//         console.log('API response for searchProducts:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error searching products:', error);
//         throw error;
//     }
// };

// // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
// export const getProductById = async (id) => {
//     try {
//         const response = await axios.get(`${API_URL}/products/${id}`);
//         console.log('API response for getProductById:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching product ${id}:`, error);
//         throw error;
//     }
// };

// // ເພີ່ມສິນຄ້າໃໝ່
// export const createProduct = async (productData) => {
//     try {
//         // ສ້າງ FormData ສຳລັບອັບໂຫຼດໄຟລ໌
//         const formData = new FormData();

//         // ເພີ່ມຂໍ້ມູນທຳມະດາ
//         for (const key in productData) {
//             if (key !== 'image' && productData[key] !== undefined) {
//                 formData.append(key, productData[key]);
//             }
//         }

//         // ເພີ່ມໄຟລ໌ຮູບພາບ ຖ້າມີ
//         if (productData.image instanceof File) {
//             formData.append('image', productData.image);
//             console.log('Adding image file to form data:', productData.image.name, productData.image.size);
//         }

//         // ສະແດງຂໍ້ມູນທີ່ຈະສົ່ງໄປຫາ server ສຳລັບການແກ້ໄຂບັນຫາ
//         console.log('Creating product with data:', Object.fromEntries(formData.entries()));

//         const headers = {
//             ...getAuthHeaders(),
//             // ບໍ່ຕ້ອງຕັ້ງຄ່າ Content-Type ເມື່ອໃຊ້ FormData, ບຣາວເຊີຈະກຳນົດໃຫ້ອັດຕະໂນມັດ
//         };

//         const response = await axios.post(`${API_URL}/products`, formData, { headers });
//         console.log('Product created successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating product:', error.response?.data || error.message);
//         throw error;
//     }
// };

// // ອັບເດດຂໍ້ມູນສິນຄ້າ
// export const updateProduct = async (id, productData) => {
//     try {
//         // ສ້າງ FormData ສຳລັບອັບໂຫຼດໄຟລ໌
//         const formData = new FormData();

//         // ເພີ່ມຂໍ້ມູນທຳມະດາ
//         for (const key in productData) {
//             if (key !== 'image' && productData[key] !== undefined) {
//                 formData.append(key, productData[key]);
//             }
//         }

//         // ເພີ່ມໄຟລ໌ຮູບພາບ ຖ້າມີ
//         if (productData.image instanceof File) {
//             formData.append('image', productData.image);
//             console.log('Adding image file to form data for update:', productData.image.name, productData.image.size);
//         }

//         // ສະແດງຂໍ້ມູນທີ່ຈະສົ່ງໄປຫາ server ສຳລັບການແກ້ໄຂບັນຫາ
//         console.log('Updating product', id, 'with data:', Object.fromEntries(formData.entries()));

//         const headers = {
//             ...getAuthHeaders(),
//             // ບໍ່ຕ້ອງຕັ້ງຄ່າ Content-Type ເມື່ອໃຊ້ FormData, ບຣາວເຊີຈະກຳນົດໃຫ້ອັດຕະໂນມັດ
//         };

//         const response = await axios.put(`${API_URL}/products/${id}`, formData, { headers });
//         console.log('Product updated successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating product ${id}:`, error.response?.data || error.message);
//         throw error;
//     }
// };

// // ລຶບສິນຄ້າ
// export const deleteProduct = async (id) => {
//     try {
//         const headers = {
//             headers: getAuthHeaders()
//         };

//         console.log('Deleting product:', id);
//         const response = await axios.delete(`${API_URL}/products/${id}`, headers);
//         console.log('Product deleted successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error(`Error deleting product ${id}:`, error.response?.data || error.message);
//         throw error;
//     }
// };

// // ດຶງລາຍການໜ່ວຍສິນຄ້າ
// export const getUnits = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products/units/all`);
//         console.log('API response for getUnits:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching units:', error);
//         throw error;
//     }
// };

// // ດຶງລາຍການປະເພດສິນຄ້າ
// export const getCategories = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products/categories/all`);
//         console.log('API response for getCategories:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         throw error;
//     }
// };

// // ດຶງລາຍການຍີ່ຫໍ້ສິນຄ້າ
// export const getBrands = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products/brands/all`);
//         console.log('API response for getBrands:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching brands:', error);
//         throw error;
//     }
// };

// // ອັບເດດຈຳນວນສິນຄ້າ
// export const updateProductQuantity = async (id, quantity) => {
//     try {
//         const headers = {
//             headers: {
//                 ...getAuthHeaders(),
//                 'Content-Type': 'application/json'
//             }
//         };

//         console.log('Updating product quantity:', id, 'to', quantity);
//         const response = await axios.patch(`${API_URL}/products/${id}/quantity`, { quantity }, headers);
//         console.log('Product quantity updated successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating product quantity for ${id}:`, error.response?.data || error.message);
//         throw error;
//     }
// };





// frontend/src/api/product.api.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';
// ປ່ຽນເປັນ IP ຫຼື domain ຂອງ server ຕົວຈິງຂອງທ່ານ
// ຕົວຢ່າງ: const API_URL = 'https://yourdomain.com/api';
// ຫຼື: const API_URL = 'http://192.168.1.100:5001/api';

// ກຳນົດ headers ສຳລັບການພິສູດຕົວຕົນ
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

// ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດ
export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        console.log('API response for getAllProducts:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
export const searchProducts = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/products/search?query=${encodeURIComponent(query)}`);
        console.log('API response for searchProducts:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

// ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        console.log('API response for getProductById:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

// ເພີ່ມສິນຄ້າໃໝ່
export const createProduct = async (productData) => {
    try {
        // ສ້າງ FormData ສຳລັບອັບໂຫຼດໄຟລ໌
        const formData = new FormData();

        // ເພີ່ມຂໍ້ມູນທຳມະດາ
        for (const key in productData) {
            if (key !== 'image' && productData[key] !== undefined) {
                formData.append(key, productData[key]);
            }
        }

        // ເພີ່ມໄຟລ໌ຮູບພາບ ຖ້າມີ
        if (productData.image instanceof File) {
            formData.append('image', productData.image);
            console.log('Adding image file to form data:', productData.image.name, productData.image.size);
        }

        // ສະແດງຂໍ້ມູນທີ່ຈະສົ່ງໄປຫາ server ສຳລັບການແກ້ໄຂບັນຫາ
        console.log('Creating product with data:', Object.fromEntries(formData.entries()));

        const headers = {
            ...getAuthHeaders(),
            // ບໍ່ຕ້ອງຕັ້ງຄ່າ Content-Type ເມື່ອໃຊ້ FormData, ບຣາວເຊີຈະກຳນົດໃຫ້ອັດຕະໂນມັດ
        };

        const response = await axios.post(`${API_URL}/products`, formData, { headers });
        console.log('Product created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error.response?.data || error.message);
        throw error;
    }
};

// ອັບເດດຂໍ້ມູນສິນຄ້າ
export const updateProduct = async (id, productData) => {
    try {
        // ສ້າງ FormData ສຳລັບອັບໂຫຼດໄຟລ໌
        const formData = new FormData();

        // ເພີ່ມຂໍ້ມູນທຳມະດາ
        for (const key in productData) {
            if (key !== 'image' && productData[key] !== undefined) {
                formData.append(key, productData[key]);
            }
        }

        // ເພີ່ມໄຟລ໌ຮູບພາບ ຖ້າມີ
        if (productData.image instanceof File) {
            formData.append('image', productData.image);
            console.log('Adding image file to form data for update:', productData.image.name, productData.image.size);
        }

        // ສະແດງຂໍ້ມູນທີ່ຈະສົ່ງໄປຫາ server ສຳລັບການແກ້ໄຂບັນຫາ
        console.log('Updating product', id, 'with data:', Object.fromEntries(formData.entries()));

        const headers = {
            ...getAuthHeaders(),
            // ບໍ່ຕ້ອງຕັ້ງຄ່າ Content-Type ເມື່ອໃຊ້ FormData, ບຣາວເຊີຈະກຳນົດໃຫ້ອັດຕະໂນມັດ
        };

        const response = await axios.put(`${API_URL}/products/${id}`, formData, { headers });
        console.log('Product updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating product ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// ລຶບສິນຄ້າ
export const deleteProduct = async (id) => {
    try {
        const headers = {
            headers: getAuthHeaders()
        };

        console.log('Deleting product:', id);
        const response = await axios.delete(`${API_URL}/products/${id}`, headers);
        console.log('Product deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// ດຶງລາຍການໜ່ວຍສິນຄ້າ
export const getUnits = async () => {
    try {
        const response = await axios.get(`${API_URL}/products/units/all`);
        console.log('API response for getUnits:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching units:', error);
        throw error;
    }
};

// ດຶງລາຍການປະເພດສິນຄ້າ (ຮູບແບບເດີມ)
export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/products/categories/all`);
        console.log('API response for getCategories:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// 🆕 ດຶງລາຍການປະເພດສິນຄ້າແບບ hierarchical
export const getCategoriesHierarchical = async () => {
    try {
        const headers = {
            headers: getAuthHeaders()
        };

        const response = await axios.get(`${API_URL}/categories?hierarchical=true`, headers);
        console.log('API response for getCategoriesHierarchical:', response.data);

        return {
            success: true,
            flatList: response.data.flatList || [],
            hierarchical: response.data.hierarchical || []
        };
    } catch (error) {
        console.error('Error fetching hierarchical categories:', error);
        return {
            success: false,
            error: error.response?.data?.message || error.message,
            flatList: [],
            hierarchical: []
        };
    }
};

// 🆕 ດຶງລາຍການປະເພດສິນຄ້າຍ່ອຍຕາມ parentId
export const getSubCategories = async (parentId) => {
    try {
        // ເອົາເລກອອກຈາກ ID (ຖ້າມີ 'C' ນຳໜ້າ)
        const numericParentId = parentId.toString().replace(/\D/g, '');

        const headers = {
            headers: getAuthHeaders()
        };

        const response = await axios.get(`${API_URL}/categories/sub/${numericParentId}`, headers);
        console.log('API response for getSubCategories:', response.data);

        return {
            success: true,
            categories: response.data || []
        };
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return {
            success: false,
            error: error.response?.data?.message || error.message,
            categories: []
        };
    }
};

// 🆕 ດຶງຂໍ້ມູນປະເພດສິນຄ້າຕາມ ID
export const getCategoryById = async (categoryId) => {
    try {
        // ເອົາເລກອອກຈາກ ID (ຖ້າມີ 'C' ນຳໜ້າ)
        const numericId = categoryId.toString().replace(/\D/g, '');

        const headers = {
            headers: getAuthHeaders()
        };

        const response = await axios.get(`${API_URL}/categories/${numericId}`, headers);
        console.log('API response for getCategoryById:', response.data);

        return {
            success: true,
            category: response.data || null
        };
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        return {
            success: false,
            error: error.response?.data?.message || error.message,
            category: null
        };
    }
};

// ດຶງລາຍການຍີ່ຫໍ້ສິນຄ້າ
export const getBrands = async () => {
    try {
        const response = await axios.get(`${API_URL}/products/brands/all`);
        console.log('API response for getBrands:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
    }
};

// ອັບເດດຈຳນວນສິນຄ້າ
export const updateProductQuantity = async (id, quantity) => {
    try {
        const headers = {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            }
        };

        console.log('Updating product quantity:', id, 'to', quantity);
        const response = await axios.patch(`${API_URL}/products/${id}/quantity`, { quantity }, headers);
        console.log('Product quantity updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating product quantity for ${id}:`, error.response?.data || error.message);
        throw error;
    }
};


// 🆕 ດຶງລາຍການຜູ້ສະໜອງ
export const getSuppliers = async () => {
    try {
        const response = await axios.get(`${API_URL}/products/suppliers/all`);
        console.log('API response for getSuppliers:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);

        // ຖ້າ endpoint ບໍ່ມີ, ສົ່ງຄືນຂໍ້ມູນຫວ່າງ
        if (error.response?.status === 404) {
            console.warn('Suppliers endpoint not found');
            return { success: false, suppliers: [] };
        }

        throw error;
    }
};