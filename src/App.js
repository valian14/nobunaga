// === FILE: src/App.js ===
// Pindahkan komponen App dari baris 961-1084 dan import yang diperlukan

import React, { useState, useMemo } from 'react';
import { ShoppingCart, BrainCircuit } from 'lucide-react';

// Import components
import { menuData, categories } from './data/menuData';
import { Toast } from './components/Toast';
import { MenuItem } from './components/MenuItem';
import { CustomizationModal } from './components/CustomizationModal';
import { CartModal } from './components/CartModal';
import { AiIntroModal, BirthdayWarningModal, GeminiModal } from './components/Modals';

// Komponen Utama Aplikasi
export default function App() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);
    const [editingCartItem, setEditingCartItem] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isAiIntroOpen, setIsAiIntroOpen] = useState(false);
    const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
    const [showBirthdayWarning, setShowBirthdayWarning] = useState(false);

    const filteredMenu = useMemo(() =>
        menuData.filter(item => item.category === selectedCategory),
        [selectedCategory]
    );

    const handleOrderClick = (item) => {
        setModalItem(item);
        setEditingCartItem(null);
    };
    
    const handleEditItem = (cartItem) => {
        const originalMenuItem = menuData.find(menuItem => menuItem.id === cartItem.id);
        setModalItem(originalMenuItem);
        setEditingCartItem(cartItem);
        setIsCartOpen(false); // Close cart to show customization modal
    };

    const handleAddToCart = (item, isEditing = false) => {
        setCart(prevCart => {
            if (isEditing) {
                setToastMessage('Pesanan anda sudah diupdate');
                return prevCart.map(cartItem => cartItem.cartId === item.cartId ? item : cartItem);
            } else {
                setToastMessage('Pesanan anda sudah di tambahkan');
                const existingItem = prevCart.find(cartItem => cartItem.id === item.id && JSON.stringify(cartItem.options) === JSON.stringify(item.options) && cartItem.orderType === item.orderType);
                if (existingItem) {
                    return prevCart.map(cartItem => cartItem.cartId === existingItem.cartId ? { ...cartItem, quantity: cartItem.quantity + item.quantity, totalPrice: cartItem.totalPrice + item.totalPrice } : cartItem);
                }
                return [...prevCart, item];
            }
        });
        setShowToast(true);
        setModalItem(null);
        setEditingCartItem(null);
    };

    const handleUpdateCartQuantity = (cartId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem(cartId);
            return;
        }
        setCart(cart => cart.map(item => {
            if (item.cartId === cartId) {
                const pricePerItem = item.totalPrice / item.quantity;
                return { ...item, quantity: newQuantity, totalPrice: pricePerItem * newQuantity };
            }
            return item;
        }));
    };

    const handleRemoveItem = (cartId) => {
        setCart(cart => cart.filter(item => item.cartId !== cartId));
    };

    const handleCategoryClick = (category) => {
        if (category === 'Birthday' && selectedCategory !== 'Birthday') {
            setShowBirthdayWarning(true);
        } else {
            setSelectedCategory(category);
        }
    };
    
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <BirthdayWarningModal 
                isOpen={showBirthdayWarning}
                onClose={() => {
                    setShowBirthdayWarning(false);
                    setSelectedCategory('Birthday');
                }}
            />

            <header className="bg-white shadow-md sticky top-0 z-30">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="/img/logo/logo1.png" alt="" width="50" height="30"></img>
                         <span className="sr-only">Katalog Kuliner</span>
                    </div>
                    <div className="flex items-center gap-4">
                         <button onClick={() => setIsAiIntroOpen(true)} className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                            <BrainCircuit size={20} />
                            <span className="hidden sm:inline">Tanya AI</span>
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="relative text-gray-700 hover:text-orange-500 transition-colors">
                            <ShoppingCart size={28} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>
                            )}
                        </button>
                    </div>
                </div>
                <nav className="bg-white border-t border-b overflow-x-auto">
                    <div className="container mx-auto px-4 flex gap-2 sm:gap-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-300 ${selectedCategory === category ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-500'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </nav>
            </header>

            <main className="container mx-auto p-4 sm:p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredMenu.map(item => (
                        <MenuItem key={item.id} item={item} onOrder={handleOrderClick} />
                    ))}
                </div>
            </main>
            
            <Toast message={toastMessage} show={showToast} onHide={() => setShowToast(false)} />
            
            <CustomizationModal 
                isOpen={!!modalItem} 
                onClose={() => { setModalItem(null); setEditingCartItem(null); }} 
                item={modalItem} 
                onAddToCart={handleAddToCart}
                editingCartItem={editingCartItem}
            />

            <CartModal 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                cart={cart} 
                onUpdateCart={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveItem}
                onEditItem={handleEditItem}
            />
            
            <AiIntroModal
                isOpen={isAiIntroOpen}
                onClose={() => setIsAiIntroOpen(false)}
                onProceed={() => {
                    setIsAiIntroOpen(false);
                    setIsGeminiModalOpen(true);
                }}
            />
            
            <GeminiModal isOpen={isGeminiModalOpen} onClose={() => setIsGeminiModalOpen(false)} />
        </div>
    );
}