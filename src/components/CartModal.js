// === FILE: src/components/CartModal.js ===
// Pindahkan komponen CartModal dari baris 683-804

import React, { useState } from 'react';
import { X, ShoppingCart, Plus, Minus, Edit3, User, MapPin, MessageSquare } from 'lucide-react';
import { formatCurrency } from '../utils/utils';

export const CartModal = ({ isOpen, onClose, cart, onUpdateCart, onRemoveItem, onEditItem }) => {
    // PINDAHKAN SEMUA HOOKS KE ATAS, SEBELUM CONDITIONAL RETURN
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [showQris, setShowQris] = useState(false);
    const [showDineInMessage, setShowDineInMessage] = useState(false);

    // CONDITIONAL RETURN SETELAH SEMUA HOOKS
    if (!isOpen) return null;

    const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const isTakeawayOrder = cart.some(item => item.orderType === 'Take-away');

    const handleOrder = () => {
        if (!customerName || !customerAddress) {
            alert("Nama dan Alamat wajib diisi!");
            return;
        }

        if (isTakeawayOrder) {
            setShowQris(true);
        } else {
            setShowDineInMessage(true);
        }
    };
    
    const generateWhatsAppMessage = () => {
        let message = `Halo, saya mau pesan:\n\n`;
        cart.forEach(item => {
            message += `*${item.quantity}x ${item.name}* (${item.orderType}) - ${formatCurrency(item.totalPrice)}\n`;
            Object.entries(item.options).forEach(([key, value]) => {
                let optionString = '';
                if (Array.isArray(value)) {
                    optionString = value.map(v => typeof v === 'object' ? `${v.name} (x${v.quantity})` : v).join(', ');
                } else if (typeof value === 'object' && value.name) {
                    optionString = value.name;
                }
                if(optionString) message += ` - ${key}: ${optionString}\n`;
            });
            message += '\n';
        });
        message += `*Total: ${formatCurrency(totalCartPrice)}*\n\n`;
        message += `Nama: ${customerName}\n`;
        message += `Alamat: ${customerAddress}\n`;
        message += `Catatan: ${notes || '-'}\n`;
        message += `Terima kasih!`;
        return encodeURIComponent(message);
    };

    const sendWhatsApp = () => {
        const phoneNumber = "6287865927598"; // Ganti dengan nomor WhatsApp Anda
        const message = generateWhatsAppMessage();
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank');
        onClose(); // Close cart after sending
    };

    if (showQris) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
                    <h3 className="text-xl font-bold mb-4">Pembayaran QRIS</h3>
                    <p className="mb-4">Silakan scan QR Code di bawah ini untuk pembayaran. Setelah itu, klik tombol di bawah untuk mengirim detail pesanan ke WhatsApp.</p>
                    <img src="img/pay/pay.jpg" alt="QRIS Code" className="mx-auto mb-4" />
                    <button onClick={sendWhatsApp} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                        Kirim Pesanan ke WhatsApp
                    </button>
                     <button onClick={() => setShowQris(false)} className="mt-2 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    if (showDineInMessage) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 text-center max-w-sm w-full">
                    <h3 className="text-2xl font-bold mb-4 text-orange-500">Pesanan Diterima!</h3>
                    <p className="text-lg">Silakan lakukan pembayaran di kasir saat Anda di restoran.</p>
                     <p className="text-sm mt-2">Jangan lupa konfirmasi pesanan Anda via WhatsApp.</p>
                    <button onClick={sendWhatsApp} className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600">
                        Kirim Pesanan ke WhatsApp & Selesai
                    </button>
                </div>
            </div>
        );
    }

    return (
         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-end z-40">
            <div className="bg-gray-100 w-full max-w-md h-full flex flex-col shadow-2xl">
                <div className="p-4 bg-white border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Keranjang Anda</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                {cart.length === 0 ? (
                    <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
                        <ShoppingCart size={64} className="text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-500">Keranjang masih kosong</h3>
                        <p className="text-gray-400">Yuk, pilih menu favoritmu!</p>
                    </div>
                ) : (
                    <>
                    <div className="flex-grow overflow-y-auto p-4">
                        {cart.map((item, index) => (
                            <div key={item.cartId} className="bg-white p-3 rounded-lg shadow-sm mb-3 flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.orderType}</p>
                                        </div>
                                        <p className="font-bold text-orange-500">{formatCurrency(item.totalPrice)}</p>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        {Object.entries(item.options).map(([key, value]) => {
                                            let optionString = '';
                                            if (Array.isArray(value)) {
                                                optionString = value.map(v => typeof v === 'object' ? `${v.name} (x${v.quantity})` : v).join(', ');
                                            } else if (typeof value === 'object' && value.name) {
                                                optionString = value.name;
                                            }
                                            return optionString ? <div key={key}>{`${key}: ${optionString}`}</div> : null;
                                        })}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => onEditItem(item)} className="text-blue-500 hover:text-blue-700"><Edit3 size={16}/></button>
                                            <button onClick={() => onRemoveItem(item.cartId)} className="text-red-500 hover:text-red-700"><X size={16}/></button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => onUpdateCart(item.cartId, item.quantity - 1)} className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 disabled:opacity-50" disabled={item.quantity <= 1}><Minus size={12}/></button>
                                            <span className="font-bold">{item.quantity}</span>
                                            <button onClick={() => onUpdateCart(item.cartId, item.quantity + 1)} className="bg-gray-200 rounded-full p-1 hover:bg-gray-300"><Plus size={12}/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-white border-t mt-auto">
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Nama Anda*</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="text" id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm" placeholder="John Doe"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-1">Alamat / No. Meja*</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="text" id="customerAddress" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm" placeholder="Jl. Merdeka No. 10 atau Meja 5"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
                                <div className="relative rounded-md shadow-sm">
                                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5 self-start">
                                        <MessageSquare className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm" rows="2" placeholder="Contoh: tidak pedas, tanpa bawang"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6 mb-4">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-2xl font-bold text-orange-500">{formatCurrency(totalCartPrice)}</span>
                        </div>
                        <button onClick={handleOrder} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                            Pesan Sekarang
                        </button>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};