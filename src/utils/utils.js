// === FILE: src/utils/utils.js ===
// Pindahkan function formatCurrency dari baris 288-289

export const formatCurrency = (number) => 
    new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(number);