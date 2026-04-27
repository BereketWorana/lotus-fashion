// lib/services/category.service.ts
import { databases, getDatabaseId, COLLECTIONS } from '../appwrite';
import { Query } from 'appwrite';

export interface Category {
    $id?: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    order?: number;
    isActive: boolean;
}

const databaseId = getDatabaseId();
const collectionId = COLLECTIONS.categories;

export const categoryService = {
    async getAll() {
        try {
            const response = await databases.listDocuments(
                databaseId,
                collectionId,
                [
                    Query.equal('isActive', true),
                    Query.orderAsc('order')
                ]
            );
            return response.documents as Category[];
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    async getBySlug(slug: string) {
        try {
            const response = await databases.listDocuments(
                databaseId,
                collectionId,
                [Query.equal('slug', slug)]
            );
            return response.documents[0] as Category || null;
        } catch (error) {
            console.error('Error fetching category:', error);
            return null;
        }
    }
};
