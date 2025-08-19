import React from 'react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Phone, ShoppingCart, X, Plus, Minus, Edit3, BrainCircuit, Send, Cake, CheckCircle2, User, MapPin, MessageSquare } from 'lucide-react';

// --- DATA MENU ---
// Data ini bisa Anda pindahkan ke file JSON atau API di kemudian hari
const menuData = [
  // Ramen
  { id: 1, name: 'Ramen Miso', category: 'Ramen', price: 25000, image: 'https://placehold.co/300x300/f8b400/FFF?text=Ramen+Miso' },
  { id: 2, name: 'Ramen Curry', category: 'Ramen', price: 26000, image: 'https://placehold.co/300x300/f8b400/FFF?text=Ramen+Curry' },
  { id: 3, name: 'Ramen Shoyu', category: 'Ramen', price: 25000, image: 'https://placehold.co/300x300/f8b400/FFF?text=Ramen+Shoyu' },
  { id: 4, name: 'Ramen Tomyam', category: 'Ramen', price: 27000, image: 'https://placehold.co/300x300/f8b400/FFF?text=Ramen+Tomyam' },
  // Sushi
  { id: 5, name: 'Sushi Chicken', category: 'Sushi', price: 15000, image: 'https://placehold.co/300x300/e74c3c/FFF?text=Sushi+Chicken' },
  { id: 6, name: 'Sushi Beef', category: 'Sushi', price: 16000, image: 'https://placehold.co/300x300/e74c3c/FFF?text=Sushi+Beef' },
  { id: 7, name: 'Sushi Sosis', category: 'Sushi', price: 14000, image: 'https://placehold.co/300x300/e74c3c/FFF?text=Sushi+Sosis' },
  { id: 8, name: 'Sushi Crab', category: 'Sushi', price: 15000, image: 'https://placehold.co/300x300/e74c3c/FFF?text=Sushi+Crab' },
  { id: 9, name: 'Sushi Octopus', category: 'Sushi', price: 17000, image: 'https://placehold.co/300x300/e74c3c/FFF?text=Sushi+Octopus' },
  { id: 10, name: 'Sushi Shrimp', category: 'Sushi', price: 16000, image: 'https://placehold.co/300x300/e74c3c/FFF?text=Sushi+Shrimp' },
  { id: 11, name: 'Fusion Beef Cheese Roll', category: 'Sushi', price: 22000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+Beef' },
  { id: 12, name: 'Fusion Tuna Spicy Roll', category: 'Sushi', price: 21000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+Tuna' },
  { id: 13, name: 'Fusion California Roll', category: 'Sushi', price: 20000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+Cali' },
  { id: 14, name: 'Fusion Pizza Roll', category: 'Sushi', price: 23000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+Pizza' },
  { id: 15, name: 'Fusion BBQ Roll', category: 'Sushi', price: 22000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+BBQ' },
  { id: 16, name: 'Fusion Spicy California Roll', category: 'Sushi', price: 21000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+Spicy+Cali' },
  { id: 17, name: 'Fusion Ocean Roll', category: 'Sushi', price: 24000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+Ocean' },
  { id: 18, name: 'Fusion Ebi Tempura Roll', category: 'Sushi', price: 23000, image: 'https://placehold.co/300x300/c0392b/FFF?text=Fusion+Ebi' },
  { id: 19, name: 'Mentai Crab', category: 'Sushi', price: 18000, image: 'https://placehold.co/300x300/d35400/FFF?text=Mentai+Crab' },
  { id: 20, name: 'Mentai Sosis', category: 'Sushi', price: 17000, image: 'https://placehold.co/300x300/d35400/FFF?text=Mentai+Sosis' },
  { id: 21, name: 'Mentai Shrimp', category: 'Sushi', price: 19000, image: 'https://placehold.co/300x300/d35400/FFF?text=Mentai+Shrimp' },
  // Rice
  { id: 22, name: 'Beef Curry Rice', category: 'Rice', price: 30000, image: 'https://placehold.co/300x300/27ae60/FFF?text=Beef+Curry' },
  { id: 23, name: 'Chicken Curry Rice', category: 'Rice', price: 28000, image: 'https://placehold.co/300x300/27ae60/FFF?text=Chicken+Curry' },
  { id: 24, name: 'Teriyaki Katsudon', category: 'Rice', price: 29000, image: 'https://placehold.co/300x300/27ae60/FFF?text=Teriyaki+Katsudon' },
  { id: 25, name: 'Blackpaper Katsudon', category: 'Rice', price: 29000, image: 'https://placehold.co/300x300/27ae60/FFF?text=Blackpaper+Katsudon' },
  { id: 26, name: 'Salmon Kani Mentai Rice', category: 'Rice', price: 35000, image: 'https://placehold.co/300x300/2ecc71/FFF?text=Salmon+Mentai' },
  { id: 27, name: 'Beef Mentai Rice', category: 'Rice', price: 32000, image: 'https://placehold.co/300x300/2ecc71/FFF?text=Beef+Mentai' },
  { id: 28, name: 'Chicken Mentai Rice', category: 'Rice', price: 30000, image: 'https://placehold.co/300x300/2ecc71/FFF?text=Chicken+Mentai' },
  // Drink
  { id: 29, name: 'Strawberry Punch', category: 'Drink', price: 15000, image: 'https://placehold.co/300x300/3498db/FFF?text=Strawberry+Punch' },
  { id: 30, name: 'Ocha Lychee', category: 'Drink', price: 12000, image: 'https://placehold.co/300x300/3498db/FFF?text=Ocha+Lychee' },
  { id: 31, name: 'Sparkling Moca', category: 'Drink', price: 16000, image: 'https://placehold.co/300x300/3498db/FFF?text=Sparkling+Moca' },
  { id: 32, name: 'Lychee Jell', category: 'Drink', price: 14000, image: 'https://placehold.co/300x300/3498db/FFF?text=Lychee+Jell' },
  { id: 33, name: 'Mango Squash', category: 'Drink', price: 15000, image: 'https://placehold.co/300x300/3498db/FFF?text=Mango+Squash' },
  { id: 34, name: 'Orange Juice', category: 'Drink', price: 12000, image: 'https://placehold.co/300x300/3498db/FFF?text=Orange+Juice' },
  { id: 35, name: 'Ocha Original', category: 'Drink', price: 8000, image: 'https://placehold.co/300x300/2980b9/FFF?text=Ocha+Original' },
  { id: 36, name: 'Ocha Lemon', category: 'Drink', price: 10000, image: 'https://placehold.co/300x300/2980b9/FFF?text=Ocha+Lemon' },
  { id: 37, name: 'Ocha Milk', category: 'Drink', price: 12000, image: 'https://placehold.co/300x300/2980b9/FFF?text=Ocha+Milk' },
  // Dorayaki
  { id: 38, name: 'Dorayaki Coklat', category: 'Dorayaki', price: 10000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Dorayaki+Coklat' },
  { id: 39, name: 'Dorayaki Kacang', category: 'Dorayaki', price: 10000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Dorayaki+Kacang' },
  { id: 40, name: 'Dorayaki Strawberry', category: 'Dorayaki', price: 10000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Dorayaki+Strawberry' },
  { id: 41, name: 'Dorayaki Cheese', category: 'Dorayaki', price: 12000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Dorayaki+Cheese' },
  { id: 42, name: 'Dorayaki Milo', category: 'Dorayaki', price: 11000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Dorayaki+Milo' },
  { id: 43, name: 'Dorayaki Srikaya', category: 'Dorayaki', price: 11000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Dorayaki+Srikaya' },
  // Takoyaki
  { id: 44, name: 'Takoyaki Mix', category: 'Takoyaki', price: 18000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Mix' },
  { id: 45, name: 'Takoyaki Cheese', category: 'Takoyaki', price: 16000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Cheese' },
  { id: 46, name: 'Takoyaki Crab', category: 'Takoyaki', price: 15000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Crab' },
  { id: 47, name: 'Takoyaki Chicken', category: 'Takoyaki', price: 15000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Chicken' },
  { id: 48, name: 'Takoyaki Beef', category: 'Takoyaki', price: 16000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Beef' },
  { id: 49, name: 'Takoyaki Octopus', category: 'Takoyaki', price: 17000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Octopus' },
  { id: 50, name: 'Takoyaki Shrimp', category: 'Takoyaki', price: 16000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Shrimp' },
  { id: 51, name: 'Takoyaki Sosis', category: 'Takoyaki', price: 14000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Sosis' },
  { id: 52, name: 'Takoyaki Mozzarella', category: 'Takoyaki', price: 18000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoyaki+Mozzarella' },
  // Dimsum
  { id: 53, name: 'Dimsum Cakalang', category: 'Dimsum', price: 15000, image: 'https://placehold.co/300x300/f1c40f/FFF?text=Dimsum+Cakalang' },
  { id: 54, name: 'Dimsum Mayoseaweed', category: 'Dimsum', price: 16000, image: 'https://placehold.co/300x300/f1c40f/FFF?text=Dimsum+Mayoseaweed' },
  { id: 55, name: 'Dimsum Mozzarella', category: 'Dimsum', price: 17000, image: 'https://placehold.co/300x300/f1c40f/FFF?text=Dimsum+Mozzarella' },
  { id: 56, name: 'Dimsum Tobiko', category: 'Dimsum', price: 18000, image: 'https://placehold.co/300x300/f1c40f/FFF?text=Dimsum+Tobiko' },
  // Okonomiyaki
  { id: 57, name: 'Okonomiyaki Crab', category: 'Okonomiyaki', price: 20000, image: 'https://placehold.co/300x300/e67e22/FFF?text=Okonomiyaki+Crab' },
  { id: 58, name: 'Okonomiyaki Beef', category: 'Okonomiyaki', price: 22000, image: 'https://placehold.co/300x300/e67e22/FFF?text=Okonomiyaki+Beef' },
  { id: 59, name: 'Okonomiyaki Chicken', category: 'Okonomiyaki', price: 20000, image: 'https://placehold.co/300x300/e67e22/FFF?text=Okonomiyaki+Chicken' },
  { id: 60, name: 'Okonomiyaki Sosis', category: 'Okonomiyaki', price: 19000, image: 'https://placehold.co/300x300/e67e22/FFF?text=Okonomiyaki+Sosis' },
  { id: 61, name: 'Okonomiyaki Tuna', category: 'Okonomiyaki', price: 21000, image: 'https://placehold.co/300x300/e67e22/FFF?text=Okonomiyaki+Tuna' },
  { id: 62, name: 'Okonomiyaki Shrimp', category: 'Okonomiyaki', price: 22000, image: 'https://placehold.co/300x300/e67e22/FFF?text=Okonomiyaki+Shrimp' },
  { id: 63, name: 'Okonomiyaki Octopus', category: 'Okonomiyaki', price: 23000, image: 'https://placehold.co/300x300/e67e22/FFF?text=Okonomiyaki+Octopus' },
  { id: 64, name: 'Okonomiyaki Mix Filling 2', category: 'Okonomiyaki', price: 13000, image: 'https://placehold.co/300x300/d35400/FFF?text=Okonomiyaki+Mix+2' },
  { id: 65, name: 'Okonomiyaki Mix Filling 3', category: 'Okonomiyaki', price: 13000, image: 'https://placehold.co/300x300/d35400/FFF?text=Okonomiyaki+Mix+3' },
  // Paket
  { id: 66, name: 'Sweet Couple', category: 'Paket', price: 50000, image: 'https://placehold.co/300x300/9b59b6/FFF?text=Sweet+Couple' },
  { id: 67, name: 'Spicy Couple', category: 'Paket', price: 52000, image: 'https://placehold.co/300x300/9b59b6/FFF?text=Spicy+Couple' },
  { id: 68, name: 'Daimyo A', category: 'Paket', price: 75000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Daimyo+A' },
  { id: 69, name: 'Daimyo B', category: 'Paket', price: 80000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Daimyo+B' },
  { id: 70, name: 'Daimyo C', category: 'Paket', price: 85000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Daimyo+C' },
  { id: 71, name: 'Daimyo D', category: 'Paket', price: 90000, image: 'https://placehold.co/300x300/8e44ad/FFF?text=Daimyo+D' },
  // Birthday
  { id: 72, name: 'Rokuon Set', category: 'Birthday', price: 150000, image: 'https://placehold.co/300x300/1abc9c/FFF?text=Rokuon+Set' },
  { id: 73, name: 'Kofuku Set', category: 'Birthday', price: 160000, image: 'https://placehold.co/300x300/1abc9c/FFF?text=Kofuku+Set' },
  { id: 74, name: 'Ruriko Set', category: 'Birthday', price: 170000, image: 'https://placehold.co/300x300/1abc9c/FFF?text=Ruriko+Set' },
  { id: 75, name: 'Horyu Set', category: 'Birthday', price: 250000, image: 'https://placehold.co/300x300/16a085/FFF?text=Horyu+Set' },
  { id: 76, name: 'Todai Set', category: 'Birthday', price: 200000, image: 'https://placehold.co/300x300/16a085/FFF?text=Todai+Set' },
  { id: 77, name: 'Tou Set', category: 'Birthday', price: 180000, image: 'https://placehold.co/300x300/16a085/FFF?text=Tou+Set' },
  { id: 78, name: 'Chuson Set', category: 'Birthday', price: 280000, image: 'https://placehold.co/300x300/16a085/FFF?text=Chuson+Set' },
  { id: 79, name: 'Senso Set', category: 'Birthday', price: 300000, image: 'https://placehold.co/300x300/16a085/FFF?text=Senso+Set' },
  { id: 80, name: 'Shintenno Set', category: 'Birthday', price: 100000, image: 'https://placehold.co/300x300/16a085/FFF?text=Shintenno+Set' },
  { id: 81, name: 'Takoparty', category: 'Birthday', price: 120000, image: 'https://placehold.co/300x300/16a085/FFF?text=Takoparty' },
  // Happy Hour
  { id: 82, name: 'Happy Hour 1', category: 'Happy Hour', price: 40000, image: 'https://placehold.co/300x300/34495e/FFF?text=Happy+Hour+1' },
  { id: 83, name: 'Happy Hour 2', category: 'Happy Hour', price: 45000, image: 'https://placehold.co/300x300/34495e/FFF?text=Happy+Hour+2' },
  { id: 84, name: 'Happy Hour 3', category: 'Happy Hour', price: 45000, image: 'https://placehold.co/300x300/34495e/FFF?text=Happy+Hour+3' },
  { id: 85, name: 'Happy Hour 4', category: 'Happy Hour', price: 42000, image: 'https://placehold.co/300x300/34495e/FFF?text=Happy+Hour+4' },
  // Dinner Delight
  { id: 86, name: 'Dinner Delight 2A', category: 'Dinner Delight', price: 100000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+2A' },
  { id: 87, name: 'Dinner Delight 2B', category: 'Dinner Delight', price: 105000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+2B' },
  { id: 88, name: 'Dinner Delight 2C', category: 'Dinner Delight', price: 110000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+2C' },
  { id: 89, name: 'Dinner Delight 2D', category: 'Dinner Delight', price: 115000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+2D' },
  { id: 90, name: 'Dinner Delight 4A', category: 'Dinner Delight', price: 200000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+4A' },
  { id: 91, name: 'Dinner Delight 4B', category: 'Dinner Delight', price: 195000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+4B' },
  { id: 92, name: 'Dinner Delight 4C', category: 'Dinner Delight', price: 210000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+4C' },
  { id: 93, name: 'Dinner Delight 4D', category: 'Dinner Delight', price: 220000, image: 'https://placehold.co/300x300/2c3e50/FFF?text=Dinner+4D' },
];

const categories = [...new Set(menuData.map(item => item.category))];

// --- DATA KUSTOMISASI ---
const customizationOptions = {
    Ramen: {
        isian: [
            { name: 'Katsu', price: 8000 }, { name: 'Ebi Tempura', price: 7000 },
            { name: 'Gyoza', price: 6000 }, { name: 'Fishball', price: 5000 },
            { name: 'Gyuniku', price: 10000 }
        ],
        level: [
            { name: 'Level 1', price: 1000 }, { name: 'Level 2', price: 2000 },
            { name: 'Level 3', price: 3000 }
        ]
    },
    Sushi: {
        extra: [
            { name: 'Fried', price: 2000 }, { name: 'Spicy', price: 1000 }
        ]
    },
    Rice: {
        extra: [ { name: 'Katsu', price: 8000 } ],
        level: [
            { name: 'Level 1', price: 1000 }, { name: 'Level 2', price: 2000 },
            { name: 'Level 3', price: 3000 }
        ]
    },
    Dorayaki: {
        extra: [ { name: 'Cheese', price: 2000 } ]
    },
    Takoyaki: {
        extra: [
            { name: 'Cheese', price: 3000 }, { name: 'Spicy', price: 1000 }
        ]
    },
    Okonomiyaki: {
        isian: [
            { name: 'Crab', price: 5000 }, { name: 'Chicken', price: 5000 },
            { name: 'Beef', price: 6000 }, { name: 'Sosis', price: 4000 },
            { name: 'Tuna', price: 5000 }, { name: 'Shrimp', price: 6000 },
            { name: 'Octopus', price: 7000 }
        ],
        extra: [
            { name: 'Fried Egg', price: 4000 }, { name: 'Potato Chips', price: 3000 },
            { name: 'Melted Cheese', price: 5000 }, { name: 'Spicy', price: 1000 }
        ],
    },
    Birthday: {
        'Rokuon Set': [
            { title: 'Fusion Sushi', limit: 3, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Original Sushi', limit: 4, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
            { title: 'Mentai Sushi', limit: 1, options: ['Mentai Crab', 'Mentai Sosis', 'Mentai Shrimp'] },
            { title: 'Mentai Rice', limit: 1, options: ['Beef Mentai Rice', 'Salmon Kani Mentai Rice', 'Chicken Mentai Rice'] },
            { title: 'Takoyaki', limit: 2, options: ['Crab', 'Chicken', 'Beef', 'Shrimp', 'Sosis', 'Octopus'] },
        ],
        'Kofuku Set': [
            { title: 'Fusion Sushi', limit: 3, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Original Sushi', limit: 10, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
            { title: 'Original Daimyo Sushi', limit: 1, options: ['Chicken', 'Crab', 'Beef', 'Tuna'] },
        ],
        'Ruriko Set': [
            { title: 'Fusion Sushi', limit: 4, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
        ],
        'Horyu Set': [
            { title: 'Fusion Sushi', limit: 8, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Fusion Daimyo Sushi', limit: 3, options: ['Tuna Spicy Roll', 'Beef Cheese Roll', 'BBQ Roll', 'Spicy California Roll'] },
            { title: 'Original Sushi', limit: 2, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
            { title: 'Mentai Sushi', limit: 1, options: ['Mentai Crab', 'Mentai Sosis', 'Mentai Shrimp'] },
            { title: 'Mentai Rice', limit: 1, options: ['Beef Mentai Rice', 'Salmon Kani Mentai Rice', 'Chicken Mentai Rice'] },
        ],
        'Todai Set': [
            { title: 'Fusion Sushi', limit: 6, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Fusion Daimyo Sushi', limit: 1, options: ['Tuna Spicy Roll', 'Beef Cheese Roll', 'BBQ Roll', 'Spicy California Roll'] },
            { title: 'Original Sushi', limit: 1, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
        ],
        'Tou Set': [
            { title: 'Fusion Sushi', limit: 4, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Original Sushi', limit: 1, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
            { title: 'Mentai Sushi', limit: 1, options: ['Mentai Crab', 'Mentai Sosis', 'Mentai Shrimp'] },
        ],
        'Chuson Set': [
            { title: 'Fusion Sushi', limit: 9, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Fusion Daimyo Sushi', limit: 3, options: ['Tuna Spicy Roll', 'Beef Cheese Roll', 'BBQ Roll', 'Spicy California Roll'] },
            { title: 'Original Sushi', limit: 3, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
            { title: 'Mentai Sushi', limit: 1, options: ['Mentai Crab', 'Mentai Sosis', 'Mentai Shrimp'] },
        ],
        'Senso Set': [
            { title: 'Fusion Sushi', limit: 10, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Fusion Daimyo Sushi', limit: 1, options: ['Tuna Spicy Roll', 'Beef Cheese Roll', 'BBQ Roll', 'Spicy California Roll'] },
            { title: 'Original Sushi', limit: 1, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
        ],
        'Shintenno Set': [
            { title: 'Fusion Sushi', limit: 2, options: ['Beef Cheese Roll', 'Tuna Spicy Roll', 'Pizza Roll', 'BBQ Roll', 'California Roll', 'Ebi Tempura Roll', 'California Spicy Roll', 'Ocean Roll'] },
            { title: 'Original Sushi', limit: 1, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
            { title: 'Mentai Rice', limit: 1, options: ['Beef Mentai Rice', 'Salmon Kani Mentai Rice', 'Chicken Mentai Rice'] },
        ],
        'Takoparty': [
            // Assuming Takoparty is a fixed set, no choices needed. If it has choices, add them here.
        ]
    },
    'Happy Hour': {
        'Happy Hour 1': [
            { title: 'Fusion Sushi', limit: 1, options: ['Beef Cheese Roll', 'Pizza Roll', 'BBQ Roll'], type: 'food' },
            { title: 'Dorayaki', limit: 1, options: ['Cheese', 'Milo', 'Coklat'], type: 'snack' },
            { title: 'Minuman', limit: 1, options: ['Mango Squash'], type: 'drink' },
        ],
        'Happy Hour 2': [
            { title: 'Original Sushi', limit: 1, options: ['Crab', 'Chicken', 'Sosis'], type: 'food' },
            { title: 'Ramen', limit: 1, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Minuman', limit: 1, options: ['Orange Juice'], type: 'drink' },
        ],
        'Happy Hour 3': [
            { title: 'Takoyaki', limit: 1, options: ['Crab', 'Chicken', 'Sosis'], type: 'food' },
            { title: 'Ramen', limit: 1, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Minuman', limit: 1, options: ['Orange Juice'], type: 'drink' },
        ],
        'Happy Hour 4': [
            { title: 'Main Course', limit: 1, options: ['Chicken Curry Rice'], type: 'food' },
            { title: 'Dorayaki', limit: 1, options: ['Cheese', 'Milo', 'Coklat'], type: 'snack' },
            { title: 'Minuman', limit: 1, options: ['Lychee Jell'], type: 'drink' },
        ],
    },
    'Dinner Delight': {
        'Dinner Delight 2A': [
            { title: 'Fusion Sushi', limit: 1, options: ['BBQ Roll', 'Beef Cheese Roll', 'Tuna Spicy Roll'], type: 'food' },
            { title: 'Takoyaki', limit: 1, options: ['Sosis', 'Chicken', 'Beef'], type: 'food' },
            { title: 'Ramen', limit: 1, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Tropikal Drink', limit: 2, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
        'Dinner Delight 2B': [
            { title: 'Main Course', limit: 1, options: ['Chicken Curry Rice'], type: 'food' },
            { title: 'Takoyaki', limit: 1, options: ['Sosis', 'Chicken', 'Beef'], type: 'food' },
            { title: 'Ramen', limit: 1, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Tropikal Drink', limit: 2, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
        'Dinner Delight 2C': [
            { title: 'Ramen', limit: 2, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Takoyaki', limit: 1, options: ['Sosis', 'Chicken', 'Beef'], type: 'food' },
            { title: 'Tropikal Drink', limit: 2, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
        'Dinner Delight 2D': [
            { title: 'Main Course', limit: 2, options: ['Chicken Curry Rice'], type: 'food' },
            { title: 'Takoyaki', limit: 1, options: ['Sosis', 'Chicken', 'Beef'], type: 'food' },
            { title: 'Tropikal Drink', limit: 2, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
        'Dinner Delight 4A': [
            { title: 'Paket Couple', limit: 1, options: ['Spicy Couple'], type: 'package' },
            { title: 'Takoyaki', limit: 2, options: ['Sosis', 'Chicken', 'Beef'], type: 'food' },
            { title: 'Ramen', limit: 2, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Tropikal Drink', limit: 2, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
        'Dinner Delight 4B': [
            { title: 'Paket Couple', limit: 1, options: ['Sweet Couple'], type: 'package' },
            { title: 'Takoyaki', limit: 2, options: ['Sosis', 'Chicken', 'Beef'], type: 'food' },
            { title: 'Ramen', limit: 2, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Tropikal Drink', limit: 2, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
        'Dinner Delight 4C': [
            { title: 'Fusion Sushi', limit: 1, options: ['BBQ Roll', 'Beef Cheese Roll', 'Tuna Spicy Roll'], type: 'food' },
            { title: 'Original Sushi', limit: 1, options: ['Beef', 'Chicken', 'Sosis'], type: 'food' },
            { title: 'Takoyaki', limit: 2, options: ['Beef', 'Cheese', 'Sosis'], type: 'food' },
            { title: 'Ramen', limit: 1, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Main Course', limit: 1, options: ['Chicken Curry Rice'], type: 'food' },
            { title: 'Tropikal Drink', limit: 4, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
        'Dinner Delight 4D': [
            { title: 'Main Course', limit: 2, options: ['Chicken Curry Rice'], type: 'food' },
            { title: 'Takoyaki', limit: 2, options: ['Beef', 'Chicken', 'Sosis'], type: 'food' },
            { title: 'Ramen', limit: 2, options: ['Miso', 'Curry', 'Shoyu'], type: 'food' },
            { title: 'Tropikal Drink', limit: 4, options: ['Orange Juice', 'Sparkling Moca', 'Mango Squash', 'Lychee Jell'], type: 'drink' },
        ],
    }
};

// --- HELPER FUNCTIONS ---
const formatCurrency = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

// --- COMPONENTS ---

// Komponen untuk menampilkan notifikasi (Toast)
const Toast = ({ message, show, onHide }) => {
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

// Komponen untuk setiap item menu di halaman utama
const MenuItem = ({ item, onOrder }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col group">
        <div className="h-48 w-full overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/cccccc/000000?text=Image+Error'; }} />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-800 truncate">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
            <div className="mt-auto pt-4">
                <p className="text-xl font-bold text-orange-600">{formatCurrency(item.price)}</p>
                <button onClick={() => onOrder(item)} className="mt-3 w-full bg-orange-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Pesan
                </button>
            </div>
        </div>
    </div>
);

// Komponen untuk opsi dengan kuantitas di menu Birthday
const BirthdayOptionItem = ({ name, quantity, onQuantityChange, disableAdd }) => {
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


// Komponen Modal untuk kustomisasi pesanan
const CustomizationModal = ({ item, isOpen, onClose, onAddToCart, editingCartItem }) => {
    if (!isOpen || !item) return null;

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
                const totalQuantityInGroup = currentGroupSelections.reduce((sum, item) => sum + (item.quantity || 1), 0);
                
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
                return packageOptions.map(group => (
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
                ));
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

const OptionGroup = ({ title, children }) => (
    <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2">
            {children}
        </div>
    </div>
);

const OptionBox = ({ name, price, selected, onChange, disabled = false }) => (
    <button
        onClick={onChange}
        disabled={disabled}
        className={`border-2 rounded-lg p-3 text-left transition-all duration-200 ${selected ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-orange-400'}`}
    >
        <p className={`font-semibold ${selected ? 'text-orange-600' : 'text-gray-800'}`}>{name}</p>
        {price && <p className={`text-sm ${selected ? 'text-orange-500' : 'text-gray-500'}`}>+ {formatCurrency(price)}</p>}
    </button>
);


// Komponen Modal Keranjang Belanja
const CartModal = ({ isOpen, onClose, cart, onUpdateCart, onRemoveItem, onEditItem }) => {
    if (!isOpen) return null;

    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [showQris, setShowQris] = useState(false);
    const [showDineInMessage, setShowDineInMessage] = useState(false);

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
        const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp Anda
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
                    <img src="https://placehold.co/300x300/ffffff/000000?text=Contoh+QRIS" alt="QRIS Code" className="mx-auto mb-4" />
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

// Komponen Modal Intro AI
const AiIntroModal = ({ isOpen, onClose, onProceed }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm text-center p-8">
                <div className="flex justify-center mb-4">
                    <BrainCircuit size={48} className="text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tanya Asisten AI Kami!</h3>
                <p className="text-gray-600 mb-6">Tanyakan kepada AI untuk rekomendasi menu best seller di katalog kami.</p>
                <div className="flex justify-end gap-3">
                     <button onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">Tutup</button>
                     <button onClick={onProceed} className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">Mulai Bertanya</button>
                </div>
            </div>
        </div>
    );
};

// Birthday warning popup
const BirthdayWarningModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm text-center p-6">
                 <div className="flex justify-center mb-4">
                    <Cake size={40} className="text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Perhatian</h3>
                <p className="text-gray-700 font-semibold mb-4">Untuk menu Birthday, minimal pemesanan H-1.</p>
                <button onClick={onClose} className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Mengerti
                </button>
            </div>
        </div>
    )
}


// Komponen Modal Gemini (Chat)
const GeminiModal = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'ai', text: 'Halo! Ada yang bisa saya bantu? Anda bisa menanyakan menu best seller atau rekomendasi lainnya.' }
    ]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const query = userInput.trim().toLowerCase();
        if (!query || isLoading) return;

        setChatHistory(prev => [...prev, { sender: 'user', text: userInput.trim() }]);
        setUserInput('');
        setIsLoading(true);
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            let simulatedText = "Maaf, saya hanya bisa memberikan informasi seputar menu di katalog kami.";

            if (query.includes('best seller') || query.includes('rekomendasi')) {
                if (query.includes('ramen')) {
                    simulatedText = `Tentu! Untuk kategori Ramen, menu best seller kami adalah:\n\n1. **Ramen Curry**: Kuah kari Jepang kami yang kental dan kaya rempah, favorit banyak orang!\n\n2. **Ramen Tomyam**: Rasa asam pedas yang menyegarkan, pilihan tepat untuk Anda yang suka tantangan rasa.`;
                } else if (query.includes('sushi')) {
                    simulatedText = `Pilihan bagus! Untuk Sushi, yang paling laris adalah:\n\n1. **Fusion Beef Cheese Roll**: Kombinasi sempurna antara daging sapi gurih dan keju leleh yang di-torch.\n\n2. **Fusion Pizza Roll**: Sensasi unik makan pizza dalam bentuk sushi, wajib coba!`;
                } else {
                    // General best seller
                    simulatedText = `Tentu, ini menu best seller di katalog kami:\n\n**Ramen:**\n1. Ramen Curry\n2. Ramen Tomyam\n\n**Sushi:**\n1. Fusion Beef Cheese Roll\n2. Fusion Pizza Roll`;
                }
            }
            
            setChatHistory(prev => [...prev, { sender: 'ai', text: simulatedText }]);

        } catch (error) {
            console.error("Error fetching recommendation:", error);
            setChatHistory(prev => [...prev, { sender: 'ai', text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[80vh]">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2"><BrainCircuit className="text-purple-500"/> Asisten AI</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div ref={chatContainerRef} className="p-6 flex-grow overflow-y-auto bg-gray-50">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                             {msg.sender === 'ai' && <BrainCircuit className="text-purple-500 flex-shrink-0" size={24}/>}
                            <div className={`rounded-lg p-3 max-w-xs lg:max-w-md shadow-sm ${msg.sender === 'user' ? 'bg-purple-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start mb-4">
                             <BrainCircuit className="text-purple-500 flex-shrink-0" size={24}/>
                            <div className="bg-white text-gray-800 rounded-lg p-3 rounded-bl-none shadow-sm">
                                <div className="flex items-center justify-center gap-1">
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-0"></span>
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-150"></span>
                                    <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input 
                            type="text" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ketik pertanyaan Anda..."
                            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !userInput} className="bg-purple-500 text-white font-bold p-3 rounded-lg hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center">
                            <Send size={20}/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


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
                        <img src="/img/logo/logo.png" alt="" width="50" height="34"></img>
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
