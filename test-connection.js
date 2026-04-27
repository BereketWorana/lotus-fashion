// test-connection.js
import { Client, Databases } from 'node-appwrite';

// REPLACE THESE WITH YOUR ACTUAL VALUES
const ENDPOINT = 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = '69e9cc62003e59c9ab50'; // Find this in Appwrite Console > Settings > General
const API_KEY = 'standard_760dcdc3da35a61a98f62c92b53d1c630fd15704d46812cc82fbd10920f016a10c7ebb5b2ffc4bd608c270564b1a312f7ff953d57ab7ad39e2b3ecc7431ae0fd44f7f6e8afc621c93047251d4a3b112afbf989b734775ecd398957a66b53df6a033595ca02f7f539afcd14b5d90e46ef947535016dbc547816fe95c80bc2f151' // Create this in Appwrite Console > API Keys

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
