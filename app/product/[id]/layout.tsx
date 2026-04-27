import { Metadata } from 'next'
import { getProductById } from '@/lib/products'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id)
  
  try {
    const product = await getProductById(productId)
    if (!product) {
      return {
        title: 'Product Not Found | LOTUS',
      }
    }
    
    return {
      title: `${product.name} | LOTUS`,
      description: product.description,
      openGraph: {
        title: `${product.name} | LOTUS`,
        description: product.description,
        images: [{ url: product.image }],
      },
    }
  } catch (error) {
    return {
      title: 'LOTUS',
    }
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
