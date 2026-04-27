// lib/appwrite.ts
import { Client, Account, Databases, Storage, ID } from 'appwrite';

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69e9cc62003e59c9ab50';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '69e9d5c6001081a4459f';

export const COLLECTIONS = {
    categories: '69e9e7340034d1d07980',
    products: '69e9e7380009cc825fc0',
    users_profile: '69e9e74000132b1598df',
    cart_items: '69e9e7450007fd2d4090',
    orders: '69e9e74800165185a208',
} as const;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

export const getDatabaseId = () => DATABASE_ID;