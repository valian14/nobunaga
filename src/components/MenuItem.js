// === FILE: src/components/MenuItem.js ===
// Pindahkan komponen MenuItem dari baris 309-323

import React from 'react';
import { formatCurrency } from '../utils/utils';

export const MenuItem = ({ item, onOrder }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col group">
        <div className="aspect-square w-full overflow-hidden">
            <img className="w-full h-full object-cover sm:group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/cccccc/000000?text=Image+Error'; }} />
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 sm:truncate">{item.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.category}</p>
            <div className="mt-auto pt-3 sm:pt-4">
                <p className="text-lg sm:text-xl font-bold text-orange-600">{formatCurrency(item.price)}</p>
                <button onClick={() => onOrder(item)} className="mt-2 sm:mt-3 w-full bg-orange-500 text-white font-bold py-2 sm:py-2.5 px-3 sm:px-4 text-sm sm:text-base rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Pesan
                </button>
            </div>
        </div>
    </div>
);