// scripts/seed-all-products.js
import { Client, Databases, ID, Query } from 'node-appwrite';

const ENDPOINT = 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = '69e9cc62003e59c9ab50';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = '69e9d5c6001081a4459f';
const PRODUCTS_ID = '69e9e7380009cc825fc0';
const CATEGORIES_ID = '69e9e7340034d1d07980';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function getCategoryId(slug) {
    const result = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_ID,
        [Query.equal('slug', slug)]
    );
    return result.documents[0]?.$id;
}

const allProducts = [
    { id: 1, name: "Habesha Silk Gown", price: 340, originalPrice: 480, tag: "Heritage", category: "Women", origin: "Addis Ababa", image: "https://images.pexels.com/photos/18158251/pexels-photo-18158251.jpeg", images: ["https://images.pexels.com/photos/18158251/pexels-photo-18158251.jpeg"], description: "A masterpiece of Ethiopian craftsmanship, this silk gown features intricate traditional Habesha patterns woven by master artisans in Addis Ababa.", sizes: ["XS", "S", "M", "L", "XL"], inStock: true, featured: true, sku: "LOT-W-001", slug: "habesha-silk-gown", priceUSD: 340, priceETB: 18700, material: "100% Ethiopian silk", careInstructions: "Dry clean only" },
    { id: 2, name: "Shamma Linen Coat", price: 295, tag: "New", category: "Women", origin: "Gondar Weave", image: "https://images.pexels.com/photos/35672844/pexels-photo-35672844.jpeg", images: ["https://images.pexels.com/photos/35672844/pexels-photo-35672844.jpeg"], description: "Inspired by the traditional Shamma garment, this modern linen coat brings Ethiopian elegance to contemporary fashion.", sizes: ["XS", "S", "M", "L", "XL"], inStock: true, featured: true, sku: "LOT-W-002", slug: "shamma-linen-coat", priceUSD: 295, priceETB: 16225, material: "100% Ethiopian linen" },
    { id: 3, name: "Tibeb Wrap Dress", price: 220, originalPrice: 290, tag: "Sale", category: "Women", origin: "Habesha Weave", image: "https://images.pexels.com/photos/18262359/pexels-photo-18262359.jpeg", images: ["https://images.pexels.com/photos/18262359/pexels-photo-18262359.jpeg"], description: "The Tibeb Wrap Dress showcases the iconic Ethiopian border design known as 'tibeb'.", sizes: ["XS", "S", "M", "L", "XL"], inStock: true, featured: true, sku: "LOT-W-003", slug: "tibeb-wrap-dress", priceUSD: 220, priceETB: 12100, material: "Cotton blend" },
    { id: 4, name: "Highland Blazer", price: 265, tag: "New", category: "Men", origin: "Addis Ababa", image: "https://images.pexels.com/photos/37206267/pexels-photo-37206267.jpeg", images: ["https://images.pexels.com/photos/37206267/pexels-photo-37206267.jpeg"], description: "Tailored in the heart of Addis Ababa, the Highland Blazer combines European sophistication with Ethiopian flair.", sizes: ["S", "M", "L", "XL", "XXL"], inStock: true, featured: true, sku: "LOT-M-001", slug: "highland-blazer", priceUSD: 265, priceETB: 14575, material: "Wool blend" },
    { id: 5, name: "Selam Wide Trouser", price: 185, tag: "New", category: "Men", origin: "Addis Ababa", image: "https://images.pexels.com/photos/32111687/pexels-photo-32111687.jpeg", images: ["https://images.pexels.com/photos/32111687/pexels-photo-32111687.jpeg"], description: "The Selam Wide Trouser embodies relaxed Ethiopian elegance.", sizes: ["28", "30", "32", "34", "36", "38"], inStock: true, featured: true, sku: "LOT-M-002", slug: "selam-wide-trouser", priceUSD: 185, priceETB: 10175, material: "Premium local cotton" },
    { id: 6, name: "Bloom Oversized Tee", price: 95, tag: "New", category: "Streetwear", origin: "Addis Ababa", image: "https://images.pexels.com/photos/35130077/pexels-photo-35130077.jpeg", images: ["https://images.pexels.com/photos/35130077/pexels-photo-35130077.jpeg"], description: "Part of our urban collection, the Bloom Tee represents the spirit of Ethiopian youth culture.", sizes: ["S", "M", "L", "XL", "XXL"], inStock: true, featured: false, sku: "LOT-S-001", slug: "bloom-oversized-tee", priceUSD: 95, priceETB: 5225, material: "Premium cotton" },
    { id: 7, name: "Rise Cargo Pants", price: 155, originalPrice: 200, tag: "Sale", category: "Streetwear", origin: "Urban Addis", image: "https://images.pexels.com/photos/5365676/pexels-photo-5365676.jpeg", images: ["https://images.pexels.com/photos/5365676/pexels-photo-5365676.jpeg"], description: "The Rise Cargo Pants blend functionality with Ethiopian street aesthetics.", sizes: ["28", "30", "32", "34", "36"], inStock: true, featured: false, sku: "LOT-S-002", slug: "rise-cargo-pants", priceUSD: 155, priceETB: 8525, material: "Durable cotton" },
    { id: 8, name: "Kaba Modern Dress", price: 310, tag: "Heritage", category: "Women", origin: "Habesha Design", image: "https://images.pexels.com/photos/20516608/pexels-photo-20516608.jpeg", images: ["https://images.pexels.com/photos/20516608/pexels-photo-20516608.jpeg"], description: "The Kaba Modern Dress reinterprets traditional Ethiopian bridal elements for contemporary wear.", sizes: ["XS", "S", "M", "L", "XL"], inStock: true, featured: true, sku: "LOT-W-004", slug: "kaba-modern-dress", priceUSD: 310, priceETB: 17050, material: "Silk blend" },
    { id: 9, name: "Addis Hoodie", price: 130, tag: "New", category: "Streetwear", origin: "Urban Addis", image: "https://images.pexels.com/photos/19887012/pexels-photo-19887012.jpeg", images: ["https://images.pexels.com/photos/19887012/pexels-photo-19887012.jpeg"], description: "Representing Addis Ababa's vibrant street culture, this premium hoodie features subtle Ethiopian motifs.", sizes: ["S", "M", "L", "XL", "XXL"], inStock: true, featured: false, sku: "LOT-S-003", slug: "addis-hoodie", priceUSD: 130, priceETB: 7150, material: "Cotton fleece" },
    { id: 10, name: "Nile Linen Shirt", price: 145, originalPrice: 175, tag: "Sale", category: "Men", origin: "Jimma Cotton", image: "https://images.pexels.com/photos/8053518/pexels-photo-8053518.jpeg", images: ["https://images.pexels.com/photos/8053518/pexels-photo-8053518.jpeg"], description: "Crafted from Jimma's finest cotton, the Nile Linen Shirt offers breathable elegance.", sizes: ["S", "M", "L", "XL", "XXL"], inStock: true, featured: false, sku: "LOT-M-003", slug: "nile-linen-shirt", priceUSD: 145, priceETB: 7975, material: "Jimma cotton" },
    { id: 11, name: "Lalibela Maxi Skirt", price: 195, tag: "New", category: "Women", origin: "Lalibela Craft", image: "https://images.pexels.com/photos/22392080/pexels-photo-22392080.jpeg", images: ["https://images.pexels.com/photos/22392080/pexels-photo-22392080.jpeg"], description: "Inspired by the ancient rock-hewn churches of Lalibela, this maxi skirt features geometric patterns.", sizes: ["XS", "S", "M", "L", "XL"], inStock: true, featured: false, sku: "LOT-W-005", slug: "lalibela-maxi-skirt", priceUSD: 195, priceETB: 10725, material: "Cotton blend" },
    { id: 12, name: "Become Sweatshirt", price: 110, tag: "New", category: "Streetwear", origin: "Addis Ababa", image: "https://images.pexels.com/photos/33982750/pexels-photo-33982750.jpeg", images: ["https://images.pexels.com/photos/33982750/pexels-photo-33982750.jpeg"], description: "The Become Sweatshirt embodies our brand philosophy.", sizes: ["S", "M", "L", "XL", "XXL"], inStock: true, featured: false, sku: "LOT-S-004", slug: "become-sweatshirt", priceUSD: 110, priceETB: 6050, material: "Sustainable fabric" }
];

async function seedAll() {
    console.log('\n🌱 Clearing existing products and re-seeding ALL 12 products to Appwrite...\n');

    const womenCatId = await getCategoryId('women');
    const menCatId = await getCategoryId('men');

    const categoryMap = {
        'Women': womenCatId,
        'Men': menCatId
    };

    // Delete existing products
    const existing = await databases.listDocuments(DATABASE_ID, PRODUCTS_ID);
    console.log(`Deleting ${existing.documents.length} existing products...`);
    for (const doc of existing.documents) {
        await databases.deleteDocument(DATABASE_ID, PRODUCTS_ID, doc.$id);
    }
    console.log('Cleared existing products.');

    let created = 0;
    let skipped = 0;

    for (const product of allProducts) {
        try {
            await databases.createDocument(DATABASE_ID, PRODUCTS_ID, ID.unique(), {
                ...product,
                categoryId: categoryMap[product.category] || womenCatId,
                colors: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log(`   ✅ ${product.name} (${product.tag} · ${product.origin})`);
            created++;
        } catch (error) {
            console.error(`   ❌ ${product.name}: ${error.message}`);
        }
    }

    const total = await databases.listDocuments(DATABASE_ID, PRODUCTS_ID);
    console.log(`\n🎉 Done! Created: ${created}, Skipped: ${skipped}, Total: ${total.total}\n`);
}

seedAll().catch(console.error);