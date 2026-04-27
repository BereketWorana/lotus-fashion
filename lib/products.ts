// lib/products.ts
import { productService, type Product } from './services/product.service';

export type { Product };

// Re-export products as a function that returns a Promise
export function products(): Promise<Product[]> {
  return productService.getAll();
}

// Get a single product by ID
export async function getProductById(id: number): Promise<Product | undefined> {
  const product = await productService.getById(id);
  return product || undefined;
}

// Get products filtered by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  return productService.getByCategory(category);
}