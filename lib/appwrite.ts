// lib/appwrite.ts
import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Appwrite Configuration
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

// Collection IDs
export const COLLECTIONS = {
    categories: process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_ID!,
    products: process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_ID!,
    users_profile: process.env.NEXT_PUBLIC_APPWRITE_USERS_PROFILE_ID!,
    cart_items: process.env.NEXT_PUBLIC_APPWRITE_CART_ITEMS_ID!,
    orders: process.env.NEXT_PUBLIC_APPWRITE_ORDERS_ID!,
} as const;

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

// Export services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

// Helper: Get database ID
export const getDatabaseId = () => DATABASE_ID;