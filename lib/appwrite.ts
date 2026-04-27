// lib/appwrite.ts
import { Client, Account, Databases, Storage, ID } from 'appwrite';

const getEnvVar = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined. Please check your .env.local file.`);
    }
    return value;
};

// Appwrite Configuration
const ENDPOINT = getEnvVar('NEXT_PUBLIC_APPWRITE_ENDPOINT');
const PROJECT_ID = getEnvVar('NEXT_PUBLIC_APPWRITE_PROJECT_ID');
const DATABASE_ID = getEnvVar('NEXT_PUBLIC_APPWRITE_DATABASE_ID');

// Collection IDs
export const COLLECTIONS = {
    categories: getEnvVar('NEXT_PUBLIC_APPWRITE_CATEGORIES_ID'),
    products: getEnvVar('NEXT_PUBLIC_APPWRITE_PRODUCTS_ID'),
    users_profile: getEnvVar('NEXT_PUBLIC_APPWRITE_USERS_PROFILE_ID'),
    cart_items: getEnvVar('NEXT_PUBLIC_APPWRITE_CART_ITEMS_ID'),
    orders: getEnvVar('NEXT_PUBLIC_APPWRITE_ORDERS_ID'),
} as const;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

export const getDatabaseId = () => DATABASE_ID;