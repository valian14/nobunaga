// === FILE: src/data/customizationData.js ===
// Pindahkan data customizationOptions dari baris 116-286

export const customizationOptions = {
    Ramen: {
        isian: [
            { name: 'ChickenKatsu', price: 8000 }, { name: 'Ebi Katsu', price: 8000 },
            { name: 'Gyoza', price: 7000 }, { name: 'Fishball', price: 6000 },
            { name: 'Gyuniku', price: 10000 }
        ],
        level: [
            { name: 'Level 1', price: 1000 }, { name: 'Level 2', price: 2000 },
            { name: 'Level 3', price: 3000 }
        ]
    },
    Sushi: {
        extra: [
            { name: 'Fried', price: 3000 }, { name: 'Spicy', price: 3000 }
        ]
    },
    Rice: {
        extra: [ { name: 'Katsu', price: 8000 } ],
        level: [
            { name: 'Level 1'}, { name: 'Level 2'},
            { name: 'Level 3'}
        ]
    },
    Dorayaki: {
        extra: [ { name: 'Cheese', price: 2000 } ]
    },
    Takoyaki: {
        extra: [
            { name: 'Cheese', price: 2000 }, { name: 'Spicy', price: 2000 }
        ]
    },
    Okonomiyaki: {
        isian: [
            { name: 'Crab', price: 3000 }, { name: 'Chicken', price: 3000 },
            { name: 'Beef', price: 3000 }, { name: 'Sosis', price: 3000 },
            { name: 'Tuna', price: 3000 }, { name: 'Shrimp', price: 3000 },
            { name: 'Octopus', price: 3000 }
        ],
        extra: [
            { name: 'Fried Egg', price: 5000 }, { name: 'Potato Chips', price: 3000 },
            { name: 'Melted Cheese', price: 4000 }, { name: 'Extra Spicy', price: 3000 }
        ],
    },
    Paket: {
        'Sweet Couple': {
            extra: [
                { name: 'Extra Fried', price: 3000 }, 
                { name: 'Extra Spicy', price: 3000 }
            ]
        },
        'Spicy Couple': {
            extra: [
                { name: 'Extra Fried', price: 3000 }, 
                { name: 'Extra Spicy', price: 3000 }
            ]
        },
        'Daimyo A': {
            extra: [
                { name: 'Extra Fried', price: 3000 }, 
                { name: 'Extra Spicy', price: 3000 }
            ]
        },
        'Daimyo B': {
            extra: [
                { name: 'Extra Fried', price: 3000 }, 
                { name: 'Extra Spicy', price: 3000 }
            ]
        },
        'Daimyo C': {
            extra: [
                { name: 'Extra Fried', price: 3000 }, 
                { name: 'Extra Spicy', price: 3000 }
            ]
        },
        'Daimyo D': {
            extra: [
                { name: 'Extra Fried', price: 3000 }, 
                { name: 'Extra Spicy', price: 3000 }
            ]
        }
        // Mentai Dimsum, Dimsum Yaki, Gyoza Mentai tidak ada extra (sesuai permintaan)
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
            { title: 'Original Sushi', limit: 2, options: ['Beef', 'Chicken', 'Crab', 'Octopus', 'Shrimp', 'Sosis'] },
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
}