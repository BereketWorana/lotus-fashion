// scripts/seed-data.js
import { Client, Databases, ID, Query } from 'node-appwrite';

const ENDPOINT = 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = '69e9cc62003e59c9ab50';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = '69e9d5c6001081a4459f';
const CATEGORIES_ID = '69e9e7340034d1d07980';
const PRODUCTS_ID = '69e9e7380009cc825fc0';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function getOrCreateCategory(slug, data) {
    // Check if category exists by slug
    const existing = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_ID,
        [Query.equal('slug', slug)]
    );

    if (existing.total > 0) {
        console.log(`   ✅ Using existing: ${data.name} (${existing.documents[0].$id})`);
        return existing.documents[0];
    }

    const newCat = await databases.createDocument(
        DATABASE_ID,
        CATEGORIES_ID,
        ID.unique(),
        data
    );
    console.log(`   ✅ Created: ${data.name} (${newCat.$id})`);
    return newCat;
}

async function seedData() {
    console.log('\n🌱 Seeding Lotus Fashion data...\n');

    // Get or create categories
    console.log('📂 Setting up categories...');

    const womenCat = await getOrCreateCategory('women', {
        name: 'Women',
        slug: 'women',
        description: 'Luxury Ethiopian fashion for women',
        isActive: true,
        order: 1
    });

    const menCat = await getOrCreateCategory('men', {
        name: 'Men',
        slug: 'men',
        description: 'Contemporary Ethiopian menswear',
        isActive: true,
        order: 2
    });

    const accessoriesCat = await getOrCreateCategory('accessories', {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Handcrafted Ethiopian accessories',
        isActive: true,
        order: 3
    });

    console.log('');

    // Check existing products
    console.log('📦 Setting up products...');
    const existingProducts = await databases.listDocuments(DATABASE_ID, PRODUCTS_ID);
    const existingSKUs = existingProducts.documents.map(p => p.sku);
    console.log(`   Found ${existingProducts.total} existing product(s)\n`);

    const products = [
        {
            name: 'Habesha Silk Gown',
            slug: 'habesha-silk-gown',
            description: 'Elegant floor-length gown featuring traditional Ethiopian tibeb embroidery. Handwoven silk with gold thread accents.',
            priceUSD: 299.99,
            priceETB: 16500,
            categoryId: womenCat.$id,
            images: ['https://images.pexels.com/photos/33968170/pexels-photo-33968170.jpeg'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: ['Gold', 'Emerald', 'Ruby'],
            inStock: true,
            featured: true,
            material: '100% Ethiopian silk',
            careInstructions: 'Dry clean only',
            sku: 'LOT-W-001'
        },
        {
            name: 'Shamma Linen Coat',
            slug: 'shamma-linen-coat',
            description: 'Contemporary interpretation of the traditional Ethiopian shamma. Lightweight linen with hand-twisted fringe details.',
            priceUSD: 249.99,
            priceETB: 13750,
            categoryId: womenCat.$id,
            images: ['https://images.pexels.com/photos/29076955/pexels-photo-29076955.jpeg'],
            sizes: ['S', 'M', 'L'],
            colors: ['Natural', 'Indigo'],
            inStock: true,
            featured: true,
            material: '100% Ethiopian linen',
            sku: 'LOT-W-002'
        },
        {
            name: 'Highland Blazer',
            slug: 'highland-blazer',
            description: 'Tailored blazer inspired by Ethiopian highland textures. Premium wool blend with traditional pattern lining.',
            priceUSD: 349.99,
            priceETB: 19250,
            categoryId: menCat.$id,
            images: ['https://images.pexels.com/photos/17430755/pexels-photo-17430755.jpeg'],
            sizes: ['38R', '40R', '42R', '44R'],
            colors: ['Charcoal', 'Brown'],
            inStock: true,
            featured: true,
            material: 'Wool blend',
            sku: 'LOT-M-001'
        },
        {
            name: 'Tibeb Wrap Dress',
            slug: 'tibeb-wrap-dress',
            description: 'Modern wrap dress with handwoven tibeb border details. Perfect for both casual and formal occasions.',
            priceUSD: 189.99,
            priceETB: 10450,
            categoryId: womenCat.$id,
            images: ['https://images.pexels.com/photos/28635266/pexels-photo-28635266.jpeg'],
            sizes: ['XS', 'S', 'M', 'L'],
            colors: ['White', 'Black', 'Burgundy'],
            inStock: true,
            featured: true,
            material: 'Cotton blend',
            sku: 'LOT-W-003'
        }
    ];

    let createdCount = 0;
    for (const product of products) {
        if (existingSKUs.includes(product.sku)) {
            console.log(`   ⏭️  ${product.name} - already exists (SKU: ${product.sku})`);
        } else {
            try {
                const doc = await databases.createDocument(
                    DATABASE_ID,
                    PRODUCTS_ID,
                    ID.unique(),
                    {
                        ...product,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                );
                console.log(`   ✅ ${product.name} (${doc.$id})`);
                createdCount++;
            } catch (error) {
                console.error(`   ❌ ${product.name} - ${error.message}`);
            }
        }
    }

    console.log('\n═══════════════════════════════════════════════');
    console.log(`🎉 Seed complete!`);
    console.log(`   Created: ${createdCount} new product(s)`);
    console.log(`   Total: ${existingProducts.total + createdCount} product(s) in database`);
    console.log('═══════════════════════════════════════════════');
    console.log('\n✨ Next: Run "npm run dev" and visit http://localhost:3000/test-appwrite\n');
}

seedData().catch(console.error);