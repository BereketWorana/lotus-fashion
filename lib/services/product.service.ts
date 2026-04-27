// lib/services/product.service.ts
import { databases, getDatabaseId, COLLECTIONS, ID } from '../appwrite';
import { Query } from 'appwrite';

// Product interface matching BOTH Appwrite schema and UI expectations
export interface Product {
  $id?: string;
  id: number;           // UI uses this, we'll map from Appwrite
  name: string;
  slug: string;
  description: string;
  price: number;        // UI uses this (mapped from priceUSD)
  originalPrice?: number;
  priceUSD: number;
  priceETB: number;
  tag: string;          // "Heritage" | "New" | "Sale"
  category: string;      // "Women" | "Men" | "Streetwear"
  categoryId: string;    // Appwrite reference
  origin: string;
  images: string[];      // Appwrite uses array
  image: string;         // UI uses single string (we'll map from images[0])
  sizes: string[];
  colors?: string[];
  inStock: boolean;
  featured: boolean;
  material?: string;
  careInstructions?: string;
  sku: string;
  createdAt?: string;
  updatedAt?: string;
}

const databaseId = getDatabaseId();
const collectionId = COLLECTIONS.products;

// Helper: Map Appwrite document to Product interface
function mapToProduct(doc: any): Product {
  return {
    ...doc,
    id: doc.id || 0,
    price: doc.priceUSD || doc.price || 0,
    image: doc.image || (doc.images && doc.images.length > 0 ? doc.images[0] : ''),
    category: doc.category || 'Women',
  };
}

export const productService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      return response.documents.map(mapToProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get featured products
  async getFeatured(limit: number = 4): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.equal('featured', true),
          Query.equal('inStock', true),
          Query.limit(limit)
        ]
      );
      return response.documents.map(mapToProduct);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  // Get product by ID (number)
  async getById(id: number): Promise<Product | null> {
    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [Query.equal('id', id)]
      );
      if (response.documents.length > 0) {
        return mapToProduct(response.documents[0]);
      }
      return null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  },

  // Get product by slug
  async getBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [Query.equal('slug', slug)]
      );
      if (response.documents.length > 0) {
        return mapToProduct(response.documents[0]);
      }
      return null;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    try {
      let queries: string[] = [];

      if (category === 'All') {
        // No filter needed
      } else if (category === 'New In') {
        queries.push(Query.equal('tag', 'New'));
      } else if (category === 'Sale') {
        queries.push(Query.equal('tag', 'Sale'));
      } else {
        queries.push(Query.equal('category', category));
      }

      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        queries
      );
      return response.documents.map(mapToProduct);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Create a product (for admin use)
  async create(data: Omit<Product, '$id' | 'createdAt' | 'updatedAt'>) {
    return await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  },
};