// === FILE: src/components/BirthdayOptionItem.js ===
// Pindahkan komponen BirthdayOptionItem dari baris 325-344

import React from 'react';
import { Plus, Minus } from 'lucide-react';

export const BirthdayOptionItem = ({ name, quantity, onQuantityChange, disableAdd }) => {
    return (
        <div className="w-full flex items-center justify-between p-3 border rounded-lg bg-white">
            <span className="font-semibold text-gray-800">{name}</span>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => onQuantityChange(quantity - 1)} 
                    disabled={quantity === 0}
                    className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Minus size={16}/>
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button 
                    onClick={() => onQuantityChange(quantity + 1)} 
                    disabled={disableAdd && quantity === 0}
                    className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={16}/>
                </button>
            </div>
        </div>
    );
};