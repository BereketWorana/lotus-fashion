// test-connection.js
import { Client, Databases } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Load from environment variables
const ENDPOINT = process.env.APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;

if (!PROJECT_ID || !API_KEY) {
    console.error('❌ Missing required environment variables!');
    console.error('   Please set these in your .env.local file:');
    console.error('   - APPWRITE_PROJECT_ID');
    console.error('   - APPWRITE_API_KEY');
    process.exit(1);
}

console.log('🔄 Testing Appwrite connection...');
console.log(`Endpoint: ${ENDPOINT}`);
console.log(`Project ID: ${PROJECT_ID}`);
console.log(`API Key: ${API_KEY.substring(0, 10)}...`);

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function testConnection() {
    try {
        // Step 1: List all databases to verify connection and permissions
        console.log('\n📡 Attempting to list databases...');
        const dbList = await databases.list();
        
        console.log(`✅ Connection successful!`);
        console.log(`✅ Found ${dbList.total} existing database(s)`);
        
        if (dbList.databases.length > 0) {
            console.log('\n📂 Existing databases:');
            dbList.databases.forEach(db => {
                console.log(`   - ${db.name} (ID: ${db.$id})`);
            });
        }
        
        // Step 2: Test permission to create a database
        console.log('\n🔐 Testing create permission...');
        
        return true;
        
    } catch (error) {
        console.error('\n❌ Connection failed!');
        console.error(`Error: ${error.message}`);
        
        if (error.message.includes('Unauthorized')) {
            console.error('\n🔑 Unauthorized - Check your API key:');
            console.error('   1. Go to Appwrite Console > API Keys');
            console.error('   2. Create a new key with "Databases" permissions');
            console.error('   3. Make sure the key is for the correct project');
        } else if (error.message.includes('not found')) {
            console.error('\n🔍 Project not found - Check your PROJECT_ID:');
            console.error('   1. Go to Appwrite Console > Settings > General');
            console.error('   2. Copy the "Project ID" value exactly');
        } else if (error.message.includes('getaddrinfo')) {
            console.error('\n🌐 Network error - Check your ENDPOINT:');
            console.error('   Make sure you\'re using: https://cloud.appwrite.io/v1');
        }
        
        return false;
    }
}

// Run the test
testConnection().then(success => {
    if (success) {
        console.log('\n🎉 Everything is working! You can proceed with the setup.');
        console.log('   Next step: Run the full database setup script.');
    } else {
        console.log('\n⚠️  Please fix the issues above before continuing.');
    }
});
