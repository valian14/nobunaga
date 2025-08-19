// === FILE: src/components/Toast.js ===
// Pindahkan komponen Toast dari baris 293-307

import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Toast = ({ message, show, onHide }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onHide();
            }, 2500); // Duration of the toast
            return () => clearTimeout(timer);
        }
    }, [show, onHide]);

    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
            <div className="flex items-center gap-3 bg-green-600 text-white py-3 px-5 rounded-lg shadow-2xl">
                <CheckCircle2 size={24} />
                <span className="font-semibold">{message}</span>
            </div>
        </div>
    );
};