// frontend/src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // ຟັງຊັນເພີ່ມສິນຄ້າໃສ່ກະຕ່າ
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
            
            if (existingItemIndex !== -1) {
                // ຖ້າມີສິນຄ້ານີ້ແລ້ວ, ເພີ່ມຈຳນວນ
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += 1;
                return updatedItems;
            } else {
                // ຖ້າບໍ່ມີ, ເພີ່ມສິນຄ້າໃໝ່ພ້ອມ quantity = 1
                return [...prevItems, { 
                    ...product, 
                    quantity: 1,
                    status: product.status || "ພ້ອມ" 
                }];
            }
        });
    };

    // ຟັງຊັນອັບເດດຈຳນວນສິນຄ້າ
    const updateCartItemQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
            return;
        }
        
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // ຟັງຊັນລຶບສິນຄ້າອອກຈາກກະຕ່າ
    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // ຟັງຊັນລ້າງກະຕ່າທັງໝົດ
    const clearCart = () => {
        setCartItems([]);
    };

    // ຟັງຊັນຄິດໄລ່ຈຳນວນລວມ
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // ຟັງຊັນຫາສິນຄ້າໃນກະຕ່າ
    const getCartItem = (id) => {
        return cartItems.find(item => item.id === id);
    };

    // ຟັງຊັນກວດສອບວ່າສິນຄ້າມີໃນກະຕ່າບໍ່
    const isInCart = (id) => {
        return cartItems.some(item => item.id === id);
    };

    const value = {
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getCartItem,
        isInCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};