// scripts/set-permissions.js
// Sets public read access on all collections for development
import { Client, Databases, Permission, Role } from 'node-appwrite';

const ENDPOINT = 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = '69e9cc62003e59c9ab50';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = '69e9d5c6001081a4459f';

const COLLECTIONS = {
    categories: '69e9e7340034d1d07980',
    products: '69e9e7380009cc825fc0',
    users_profile: '69e9e74000132b1598df',
    cart_items: '69e9e7450007fd2d4090',
    orders: '69e9e74800165185a208',
};

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function setPermissions() {
    console.log('\n🔐 Setting collection permissions for development...\n');

    for (const [name, collectionId] of Object.entries(COLLECTIONS)) {
        try {
            // Update collection with public read + authenticated write permissions
            await databases.updateCollection(
                DATABASE_ID,
                collectionId,
                name,                    // collection name
                undefined,               // permissions param — we set doc-level security below
                false,                   // documentSecurity: false = collection-level permissions apply
                true                     // enabled
            );

            // Now update again with the actual permissions
            await databases.updateCollection(
                DATABASE_ID,
                collectionId,
                name,
                [
                    Permission.read(Role.any()),       // Anyone can read (including unauthenticated)
                    Permission.create(Role.users()),    // Only authenticated users can create
                    Permission.update(Role.users()),    // Only authenticated users can update
                    Permission.delete(Role.users()),    // Only authenticated users can delete
                ],
                false,                   // documentSecurity
                true                     // enabled
            );

            console.log(`   ✅ ${name} — public read enabled`);
        } catch (error) {
            console.error(`   ❌ ${name}: ${error.message}`);
        }
    }

    console.log('\n🎉 Permissions updated! Your frontend can now read data without authentication.\n');
}

setPermissions().catch(console.error);
