// setup.js - Master setup script for Lotus Fashion
import { Client, Databases, ID } from 'node-appwrite';

// ============================================
// REPLACE THESE TWO VALUES
// ============================================
const ENDPOINT = 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = '69e9cc62003e59c9ab50';
const API_KEY = 'standard_1c8fb159c4bae93c6215f7c14e2e5d143d029122dd742b8f7a9e396ea8b828c2a6c4b7d156b35d5ea537895ff722a5c9538d18d2089ccca1a2963788d592d4f4a6ef0452c86e5ba9c036f73a65a71cb75a820b646e93fa4554b5b1017b728189921d3195a8e3ba01234073eceef631fbdf78a732a65acbac0437ef43684e3775';
const DATABASE_ID = '69e9d5c6001081a4459f';
// ============================================

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function setupAll() {
    console.log('\n🪷 LOTUS FASHION - DATABASE SETUP\n');
    console.log('═══════════════════════════════════════════════\n');
    
    try {
        // First, verify connection and database exists
        console.log('📡 Verifying connection and database...');
        try {
            const db = await databases.get(DATABASE_ID);
            console.log(`✅ Connected to database: ${db.name} (${db.$id})\n`);
        } catch (error) {
            console.error('❌ Cannot access database. Check your Database ID!');
            console.error(`Error: ${error.message}\n`);
            return;
        }
        
        // Check existing collections
        console.log('📂 Checking existing collections...');
        const existingCollections = await databases.listCollections(DATABASE_ID);
        const existingNames = existingCollections.collections.map(c => c.name);
        console.log(`   Found ${existingCollections.total} existing collection(s):`);
        existingNames.forEach(name => console.log(`   - ${name}`));
        console.log('');
        
        // Define all collections we need
        const neededCollections = [
            { name: 'categories', create: createCategories },
            { name: 'products', create: createProducts },
            { name: 'users_profile', create: createUsersProfile },
            { name: 'cart_items', create: createCartItems },
            { name: 'orders', create: createOrders }
        ];
        
        const createdIds = {};
        
        // Create each missing collection
        for (const col of neededCollections) {
            if (existingNames.includes(col.name)) {
                console.log(`⏭️  ${col.name} - already exists`);
                // Get its ID
                const existing = existingCollections.collections.find(c => c.name === col.name);
                createdIds[col.name] = existing.$id;
            } else {
                console.log(`📂 Creating: ${col.name}...`);
                try {
                    const newCol = await col.create();
                    createdIds[col.name] = newCol.$id;
                    console.log(`   ✅ Created: ${newCol.$id}`);
                } catch (error) {
                    console.error(`   ❌ Failed: ${error.message}`);
                }
            }
        }
        
        // Summary
        console.log('\n═══════════════════════════════════════════════');
        console.log('✅ SETUP COMPLETE!');
        console.log('═══════════════════════════════════════════════');
        console.log('\n📊 Collection IDs (save these for Next.js):\n');
        for (const [name, id] of Object.entries(createdIds)) {
            console.log(`   ${name}: ${id}`);
        }
        console.log('\n🔐 Next Steps:');
        console.log('   1. Go to Appwrite Console > Databases > lotus-fashion');
        console.log('   2. For EACH collection: Settings > Permissions');
        console.log('   3. Add Role: Any (for development)');
        console.log('\n✨ Database ready! Proceed to Phase 1.3\n');
        
    } catch (error) {
        console.error('\n❌ Setup failed!');
        console.error(`Error: ${error.message}`);
    }
}

// Collection Creation Functions

async function createCategories() {
    const col = await databases.createCollection(DATABASE_ID, ID.unique(), 'categories');
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'name', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'slug', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'description', 2000, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'image', 2000, false);
    await databases.createIntegerAttribute(DATABASE_ID, col.$id, 'order', false);
    await databases.createBooleanAttribute(DATABASE_ID, col.$id, 'isActive', true);
    await databases.createIndex(DATABASE_ID, col.$id, 'slug_unique', 'unique', ['slug']);
    return col;
}

async function createProducts() {
    const col = await databases.createCollection(DATABASE_ID, ID.unique(), 'products');
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'name', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'slug', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'description', 5000, true);
    await databases.createFloatAttribute(DATABASE_ID, col.$id, 'priceUSD', true);
    await databases.createFloatAttribute(DATABASE_ID, col.$id, 'priceETB', true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'categoryId', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'images', 2000, true, null, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'sizes', 50, false, null, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'colors', 50, false, null, true);
    await databases.createBooleanAttribute(DATABASE_ID, col.$id, 'inStock', true);
    await databases.createBooleanAttribute(DATABASE_ID, col.$id, 'featured', true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'material', 255, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'careInstructions', 1000, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'sku', 100, true);
    await databases.createDatetimeAttribute(DATABASE_ID, col.$id, 'createdAt', true);
    await databases.createDatetimeAttribute(DATABASE_ID, col.$id, 'updatedAt', true);
    await databases.createIndex(DATABASE_ID, col.$id, 'slug_unique', 'unique', ['slug']);
    await databases.createIndex(DATABASE_ID, col.$id, 'sku_unique', 'unique', ['sku']);
    await databases.createIndex(DATABASE_ID, col.$id, 'categoryId_index', 'key', ['categoryId']);
    return col;
}

async function createUsersProfile() {
    const col = await databases.createCollection(DATABASE_ID, ID.unique(), 'users_profile');
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'userId', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'firstName', 100, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'lastName', 100, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'phone', 20, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'address', 500, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'city', 100, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'country', 100, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'postalCode', 20, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'avatar', 2000, false);
    await databases.createDatetimeAttribute(DATABASE_ID, col.$id, 'createdAt', true);
    await databases.createIndex(DATABASE_ID, col.$id, 'userId_unique', 'unique', ['userId']);
    return col;
}

async function createCartItems() {
    const col = await databases.createCollection(DATABASE_ID, ID.unique(), 'cart_items');
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'userId', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'productId', 255, true);
    await databases.createIntegerAttribute(DATABASE_ID, col.$id, 'quantity', true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'size', 50, false);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'color', 50, false);
    await databases.createDatetimeAttribute(DATABASE_ID, col.$id, 'addedAt', true);
    await databases.createIndex(DATABASE_ID, col.$id, 'userId_index', 'key', ['userId']);
    return col;
}

async function createOrders() {
    const col = await databases.createCollection(DATABASE_ID, ID.unique(), 'orders');
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'userId', 255, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'orderNumber', 50, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'items', 10000, true);
    await databases.createFloatAttribute(DATABASE_ID, col.$id, 'subtotal', true);
    await databases.createFloatAttribute(DATABASE_ID, col.$id, 'shipping', true);
    await databases.createFloatAttribute(DATABASE_ID, col.$id, 'tax', true);
    await databases.createFloatAttribute(DATABASE_ID, col.$id, 'total', true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'currency', 3, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'status', 50, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'shippingAddress', 1000, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'paymentMethod', 50, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'paymentStatus', 50, true);
    await databases.createStringAttribute(DATABASE_ID, col.$id, 'notes', 1000, false);
    await databases.createDatetimeAttribute(DATABASE_ID, col.$id, 'createdAt', true);
    await databases.createDatetimeAttribute(DATABASE_ID, col.$id, 'updatedAt', true);
    await databases.createIndex(DATABASE_ID, col.$id, 'orderNumber_unique', 'unique', ['orderNumber']);
    await databases.createIndex(DATABASE_ID, col.$id, 'userId_index', 'key', ['userId']);
    await databases.createIndex(DATABASE_ID, col.$id, 'status_index', 'key', ['status']);
    return col;
}

// Run it
setupAll();
