// === FILE: src/components/OptionComponents.js ===
// Pindahkan komponen OptionGroup dan OptionBox dari baris 661-680

import React from 'react';
import { formatCurrency } from '../utils/utils';

export const OptionGroup = ({ title, children }) => (
    <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2">
            {children}
        </div>
    </div>
);

export const OptionBox = ({ name, price, selected, onChange, disabled = false }) => (
    <button
        onClick={onChange}
        disabled={disabled}
        className={`border-2 rounded-lg p-3 text-left transition-all duration-200 ${selected ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-orange-400'}`}
    >
        <p className={`font-semibold ${selected ? 'text-orange-600' : 'text-gray-800'}`}>{name}</p>
        {price && <p className={`text-sm ${selected ? 'text-orange-500' : 'text-gray-500'}`}>+ {formatCurrency(price)}</p>}
    </button>
);