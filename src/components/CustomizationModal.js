// === FILE: src/components/CustomizationModal.js ===
// Pindahkan komponen CustomizationModal dari baris 347-659

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { customizationOptions } from '../data/customizationData';
import { formatCurrency } from '../utils/utils';
import { BirthdayOptionItem } from './BirthdayOptionItem';
import { OptionGroup, OptionBox } from './OptionComponents';

export const CustomizationModal = ({ item, isOpen, onClose, onAddToCart, editingCartItem }) => {
    // Pindahkan semua hooks ke atas sebelum conditional return
    const [quantity, setQuantity] = useState(editingCartItem ? editingCartItem.quantity : 1);
    const [options, setOptions] = useState(editingCartItem ? editingCartItem.options : {});
    const [orderType, setOrderType] = useState(editingCartItem ? editingCartItem.orderType : 'Dine-in');
    
    useEffect(() => {
        if (item) {
            setQuantity(editingCartItem ? editingCartItem.quantity : 1);
            setOptions(editingCartItem ? editingCartItem.options : {});
            setOrderType(editingCartItem ? editingCartItem.orderType : 'Dine-in');
        }
    }, [item, editingCartItem, isOpen]);

    // Sekarang conditional return bisa ditempatkan setelah hooks
    if (!isOpen || !item) return null;

    const handleOptionChange = (category, value, price, isMultiSelect = false, limit = 0) => {
        setOptions(prev => {
            const newOptions = { ...prev };
            if (isMultiSelect) {
                if (!newOptions[category]) newOptions[category] = [];
                const currentIndex = newOptions[category].findIndex(opt => opt.name === value);
                if (currentIndex > -1) {
                    newOptions[category] = newOptions[category].filter(opt => opt.name !== value);
                } else {
                    if (limit === 0 || newOptions[category].length < limit) {
                       newOptions[category].push({ name: value, price });
                    }
                }
            } else {
                if (newOptions[category] && newOptions[category].name === value) {
                    delete newOptions[category];
                } else {
                    newOptions[category] = { name: value, price };
                }
            }
            return newOptions;
        });
    };
    
    const handlePackageOptionChange = (groupTitle, optionName, limit) => {
        setOptions(prev => {
            const newOptions = { ...prev };
            const currentSelection = newOptions[groupTitle] || [];
            const isSelected = currentSelection.includes(optionName);

            if (isSelected) {
                newOptions[groupTitle] = currentSelection.filter(name => name !== optionName);
            } else {
                if (currentSelection.length < limit) {
                    newOptions[groupTitle] = [...currentSelection, optionName];
                }
            }
            return newOptions;
        });
    };
    
    const handleBirthdayOptionQuantityChange = (groupTitle, optionName, newQuantity, limit) => {
        setOptions(prev => {
            const newOptions = { ...prev };
            let group = [...(newOptions[groupTitle] || [])];
            const itemIndex = group.findIndex(i => i.name === optionName);
            const currentItem = itemIndex > -1 ? group[itemIndex] : null;

            const totalOfOtherItems = group.reduce((sum, item) => (item.name !== optionName ? sum + item.quantity : sum), 0);

            if (totalOfOtherItems + newQuantity > limit) {
                alert(`Anda tidak bisa memilih lebih dari ${limit} item untuk grup ini.`);
                return prev;
            }

            if (newQuantity > 0) {
                if (currentItem) {
                    group[itemIndex] = { ...currentItem, quantity: newQuantity };
                } else {
                    group.push({ name: optionName, quantity: newQuantity });
                }
            } else {
                if (currentItem) {
                    group = group.filter(i => i.name !== optionName);
                }
            }

            newOptions[groupTitle] = group;
            return newOptions;
        });
    };

    // New handler for Dinner Delight quantity options
    const handleDinnerDelightQuantityChange = (groupTitle, optionName, newQuantity, limit) => {
        setOptions(prev => {
            const newOptions = { ...prev };
            let group = [...(newOptions[groupTitle] || [])];
            const itemIndex = group.findIndex(i => i.name === optionName);
            const currentItem = itemIndex > -1 ? group[itemIndex] : null;

            // Calculate total quantity of all items in this group
            const totalOfOtherItems = group.reduce((sum, item) => (item.name !== optionName ? sum + (item.quantity || 1) : sum), 0);

            if (totalOfOtherItems + newQuantity > limit) {
                alert(`Anda tidak bisa memilih lebih dari ${limit} item untuk grup ini.`);
                return prev;
            }

            if (newQuantity > 0) {
                if (currentItem) {
                    group[itemIndex] = { ...currentItem, quantity: newQuantity };
                } else {
                    group.push({ name: optionName, quantity: newQuantity });
                }
            } else {
                if (currentItem) {
                    group = group.filter(i => i.name !== optionName);
                }
            }

            newOptions[groupTitle] = group;
            return newOptions;
        });
    };

    // Check if an item needs quantity selector for Dinner Delight
    const needsQuantitySelector = (itemName, groupTitle, groupType) => {
        if (item.category !== 'Dinner Delight') return false;
        
        // ALL Dinner Delight menus - tropical drinks need quantity
        if (groupType === 'drink') {
            return true;
        }
        
        // For Dinner Delight 2C - ramen needs quantity
        if (item.name === 'Dinner Delight 2C' && groupTitle.toLowerCase().includes('ramen')) {
            return true;
        }
        
        // For Dinner Delight 4A, 4B, 4C, 4D - takoyaki and ramen need quantity
        if ((item.name === 'Dinner Delight 4A' || item.name === 'Dinner Delight 4B' || 
             item.name === 'Dinner Delight 4C' || item.name === 'Dinner Delight 4D')) {
            return groupTitle.toLowerCase().includes('takoyaki') || groupTitle.toLowerCase().includes('ramen');
        }
        
        return false;
    };

    const calculateTotalPrice = () => {
        let total = item.price;
        let takeawayFee = 0;

        Object.values(options).forEach(opt => {
            if (Array.isArray(opt)) {
                opt.forEach(subOpt => {
                    const itemPrice = subOpt.price || 0;
                    const itemQuantity = subOpt.quantity || 1;
                    total += itemPrice * itemQuantity;
                });
            } else if (opt && typeof opt === 'object') {
                total += opt.price || 0;
            }
        });

        if (orderType === 'Take-away') {
            switch(item.category) {
                case 'Ramen':
                case 'Sushi':
                case 'Rice':
                case 'Takoyaki':
                case 'Okonomiyaki':
                case 'Paket':
                    takeawayFee = 1000;
                    if ((item.category === 'Sushi' && (item.name.includes('Fusion') || item.name.includes('Mentai'))) ||
                        (item.category === 'Rice' && !item.name.includes('Mentai Rice'))) {
                        takeawayFee = 1000;
                    } else if (item.category === 'Rice' && item.name.includes('Mentai Rice')) {
                        takeawayFee = 0;
                    }
                    break;
                case 'Happy Hour':
                    let foodItemCount = 0;
                    const hhOptions = customizationOptions['Happy Hour'][item.name] || [];
                    hhOptions.forEach(group => {
                        const selections = options[group.title] || [];
                        if (group.type === 'food') {
                            foodItemCount += selections.length;
                        }
                    });
                    takeawayFee = foodItemCount * 1000;
                    break;
                case 'Dinner Delight':
                    if (item.name === 'Dinner Delight 2C' || item.name === 'Dinner Delight 2D') takeawayFee = 3000;
                    else if (item.name === 'Dinner Delight 4A' || item.name === 'Dinner Delight 4B') takeawayFee = 5000;
                    else if (item.name === 'Dinner Delight 4C') takeawayFee = 6000;
                    else if (item.name === 'Dinner Delight 4D') takeawayFee = 6000;
                    else {
                        let ddItemCount = 0;
                        const ddOptions = customizationOptions['Dinner Delight'][item.name] || [];
                        ddOptions.forEach(group => {
                            const selections = options[group.title] || [];
                            if (group.type !== 'drink') {
                                ddItemCount += selections.length;
                            }
                        });
                        takeawayFee = ddItemCount * 1000;
                    }
                    break;
                default:
                    takeawayFee = 0;
                    break;
            }
        }
        
        total += takeawayFee;
        return total * quantity;
    };

    const finalPrice = calculateTotalPrice();

    const handleSubmit = () => {
        if (item.category === 'Birthday' || item.category === 'Happy Hour' || item.category === 'Dinner Delight') {
            const packageOptions = customizationOptions[item.category][item.name] || [];
            for (const group of packageOptions) {
                const currentGroupSelections = options[group.title] || [];
                let totalQuantityInGroup;
                
                if (item.category === 'Birthday') {
                    totalQuantityInGroup = currentGroupSelections.reduce((sum, item) => sum + item.quantity, 0);
                } else if (item.category === 'Dinner Delight' && needsQuantitySelector(item.name, group.title, group.type)) {
                    totalQuantityInGroup = currentGroupSelections.reduce((sum, item) => sum + (item.quantity || 1), 0);
                } else {
                    totalQuantityInGroup = currentGroupSelections.length;
                }
                
                if (totalQuantityInGroup < group.limit) {
                    alert(`Harap pilih total ${group.limit} item untuk kategori "${group.title}".`);
                    return;
                }
            }
        }

        const cartItem = {
            ...item,
            cartId: editingCartItem ? editingCartItem.cartId : Date.now(),
            quantity,
            options,
            orderType,
            totalPrice: finalPrice
        };
        onAddToCart(cartItem, !!editingCartItem);
        onClose();
    };

    const renderOptions = () => {
        switch (item.category) {
            case 'Ramen':
                return (
                    <>
                        <OptionGroup title="Pilihan Isian">
                            {customizationOptions.Ramen.isian.map(opt => (
                                <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.isian?.name === opt.name} onChange={() => handleOptionChange('isian', opt.name, opt.price)} />
                            ))}
                        </OptionGroup>
                        <OptionGroup title="Level Pedas">
                            {customizationOptions.Ramen.level.map(opt => (
                                <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.level?.name === opt.name} onChange={() => handleOptionChange('level', opt.name, opt.price)} />
                            ))}
                        </OptionGroup>
                    </>
                );
            case 'Sushi':
                if (item.name.includes('Fusion') || item.name.includes('Mentai')) return null;
                return (
                    <OptionGroup title="Extra">
                        {customizationOptions.Sushi.extra.map(opt => (
                            <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.extra?.some(e => e.name === opt.name)} onChange={() => handleOptionChange('extra', opt.name, opt.price, true)} />
                        ))}
                    </OptionGroup>
                );
            case 'Rice':
                 if (item.name.includes('Mentai')) return null;
                 if (item.name.includes('Katsudon')) {
                     return (
                        <OptionGroup title="Extra">
                            {customizationOptions.Rice.extra.map(opt => (
                                <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.extra?.name === opt.name} onChange={() => handleOptionChange('extra', opt.name, opt.price)} />
                            ))}
                        </OptionGroup>
                     );
                 }
                return (
                    <>
                        <OptionGroup title="Extra">
                            {customizationOptions.Rice.extra.map(opt => (
                                <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.extra?.name === opt.name} onChange={() => handleOptionChange('extra', opt.name, opt.price)} />
                            ))}
                        </OptionGroup>
                        <OptionGroup title="Level Pedas">
                            {customizationOptions.Rice.level.map(opt => (
                                <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.level?.name === opt.name} onChange={() => handleOptionChange('level', opt.name, opt.price)} />
                            ))}
                        </OptionGroup>
                    </>
                );
            case 'Dorayaki':
                return (
                     <OptionGroup title="Extra">
                        {customizationOptions.Dorayaki.extra.map(opt => (
                            <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.extra?.name === opt.name} onChange={() => handleOptionChange('extra', opt.name, opt.price)} />
                        ))}
                    </OptionGroup>
                );
            case 'Takoyaki':
                return (
                    <OptionGroup title="Extra">
                        {customizationOptions.Takoyaki.extra.map(opt => (
                            <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.extra?.some(e => e.name === opt.name)} onChange={() => handleOptionChange('extra', opt.name, opt.price, true)} />
                        ))}
                    </OptionGroup>
                );
            case 'Okonomiyaki':
                const isMix = item.name.includes('Mix Filling');
                const limit = item.name.endsWith('2') ? 2 : (item.name.endsWith('3') ? 3 : 0);
                return (
                    <>
                        {isMix && (
                            <OptionGroup title={`Pilih Isian (Maks ${limit})`}>
                                {customizationOptions.Okonomiyaki.isian.map(opt => (
                                    <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.isian?.some(i => i.name === opt.name)} onChange={() => handleOptionChange('isian', opt.name, opt.price, true, limit)} />
                                ))}
                            </OptionGroup>
                        )}
                        <OptionGroup title="Extra">
                            {customizationOptions.Okonomiyaki.extra.map(opt => (
                                <OptionBox key={opt.name} name={opt.name} price={opt.price} selected={options.extra?.some(e => e.name === opt.name)} onChange={() => handleOptionChange('extra', opt.name, opt.price, true)} />
                            ))}
                        </OptionGroup>
                    </>
                );
            case 'Birthday':
                const birthdayOptions = customizationOptions[item.category]?.[item.name];
                if (!birthdayOptions) return null;
                return birthdayOptions.map(group => {
                    const currentGroupSelections = options[group.title] || [];
                    const totalQuantityInGroup = currentGroupSelections.reduce((sum, item) => sum + item.quantity, 0);
                    return (
                        <OptionGroup key={group.title} title={`${group.title} (Pilih ${group.limit})`}>
                            <div className="w-full text-right text-sm text-gray-500 mb-2">
                                Terpilih: {totalQuantityInGroup} / {group.limit}
                            </div>
                            <div className="w-full space-y-2">
                            {group.options.map(optName => {
                                const selectedItem = currentGroupSelections.find(i => i.name === optName);
                                const currentQuantity = selectedItem ? selectedItem.quantity : 0;
                                return (
                                    <BirthdayOptionItem
                                        key={optName}
                                        name={optName}
                                        quantity={currentQuantity}
                                        onQuantityChange={(newQuantity) => handleBirthdayOptionQuantityChange(group.title, optName, newQuantity, group.limit)}
                                        disableAdd={totalQuantityInGroup >= group.limit}
                                    />
                                );
                            })}
                            </div>
                        </OptionGroup>
                    );
                });
            case 'Happy Hour':
            case 'Dinner Delight':
                const packageOptions = customizationOptions[item.category]?.[item.name];
                if (!packageOptions) return <p className="text-center text-gray-500">Paket ini tidak memiliki pilihan isian.</p>;
                return packageOptions.map(group => {
                    const needsQuantity = needsQuantitySelector(item.name, group.title, group.type);
                    const currentGroupSelections = options[group.title] || [];
                    
                    if (needsQuantity) {
                        const totalQuantityInGroup = currentGroupSelections.reduce((sum, item) => sum + (item.quantity || 1), 0);
                        return (
                            <OptionGroup key={group.title} title={`${group.title} (Pilih ${group.limit})`}>
                                <div className="w-full text-right text-sm text-gray-500 mb-2">
                                    Terpilih: {totalQuantityInGroup} / {group.limit}
                                </div>
                                <div className="w-full space-y-2">
                                {group.options.map(optName => {
                                    const selectedItem = currentGroupSelections.find(i => i.name === optName);
                                    const currentQuantity = selectedItem ? selectedItem.quantity : 0;
                                    return (
                                        <BirthdayOptionItem
                                            key={optName}
                                            name={optName}
                                            quantity={currentQuantity}
                                            onQuantityChange={(newQuantity) => handleDinnerDelightQuantityChange(group.title, optName, newQuantity, group.limit)}
                                            disableAdd={totalQuantityInGroup >= group.limit}
                                        />
                                    );
                                })}
                                </div>
                            </OptionGroup>
                        );
                    } else {
                        return (
                            <OptionGroup key={group.title} title={`${group.title} (Pilih ${group.limit})`}>
                                {group.options.map(optName => (
                                    <OptionBox
                                        key={optName}
                                        name={optName}
                                        selected={(options[group.title] || []).includes(optName)}
                                        onChange={() => handlePackageOptionChange(group.title, optName, group.limit)}
                                        disabled={(options[group.title] || []).length >= group.limit && !(options[group.title] || []).includes(optName)}
                                    />
                                ))}
                            </OptionGroup>
                        );
                    }
                });
            default:
                return null;
        }
    };
    
    const hasTakeawayOption = item.category !== 'Birthday';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {renderOptions()}
                    {hasTakeawayOption && (
                         <OptionGroup title="Tipe Pesanan">
                            <OptionBox name="Dine-in" selected={orderType === 'Dine-in'} onChange={() => setOrderType('Dine-in')} />
                            <OptionBox name="Take-away" selected={orderType === 'Take-away'} onChange={() => setOrderType('Take-away')} />
                        </OptionGroup>
                    )}
                </div>
                 <div className="p-4 mt-auto bg-gray-50 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Jumlah:</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"><Minus size={16}/></button>
                            <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"><Plus size={16}/></button>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Total Harga</p>
                        <p className="text-2xl font-bold text-orange-500">{formatCurrency(finalPrice)}</p>
                    </div>
                    <button onClick={handleSubmit} className="mt-4 w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                        {editingCartItem ? 'Update Pesanan' : 'Tambah ke Keranjang'}
                    </button>
                </div>
            </div>
        </div>
    );
};