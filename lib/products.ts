export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  tag: 'Heritage' | 'New' | 'Sale'
  category: 'Women' | 'Men' | 'Streetwear'
  origin: string
  image: string
  description: string
  sizes: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Habesha Silk Gown",
    price: 340,
    originalPrice: 480,
    tag: "Heritage",
    category: "Women",
    origin: "Addis Ababa",
    image: "https://images.pexels.com/photos/33968170/pexels-photo-33968170.jpeg",
    description: "A masterpiece of Ethiopian craftsmanship, this silk gown features intricate traditional Habesha patterns woven by master artisans in Addis Ababa. The flowing silhouette and luxurious fabric make it perfect for elegant occasions while honoring your heritage.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Shamma Linen Coat",
    price: 295,
    tag: "New",
    category: "Women",
    origin: "Gondar Weave",
    image: "https://images.pexels.com/photos/29076955/pexels-photo-29076955.jpeg",
    description: "Inspired by the traditional Shamma garment, this modern linen coat brings Ethiopian elegance to contemporary fashion. Hand-woven in Gondar using techniques passed down through generations.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Tibeb Wrap Dress",
    price: 220,
    originalPrice: 290,
    tag: "Sale",
    category: "Women",
    origin: "Habesha Weave",
    image: "https://images.pexels.com/photos/28635266/pexels-photo-28635266.jpeg",
    description: "The Tibeb Wrap Dress showcases the iconic Ethiopian border design known as 'tibeb'. Each piece is unique, featuring hand-embroidered patterns that tell stories of Ethiopian artistry.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Highland Blazer",
    price: 265,
    tag: "New",
    category: "Men",
    origin: "Addis Ababa",
    image: "https://images.pexels.com/photos/17430755/pexels-photo-17430755.jpeg",
    description: "Tailored in the heart of Addis Ababa, the Highland Blazer combines European sophistication with Ethiopian flair. Premium fabrics and expert construction ensure a distinguished presence.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 5,
    name: "Selam Wide Trouser",
    price: 185,
    tag: "New",
    category: "Men",
    origin: "Addis Ababa",
    image: "https://images.pexels.com/photos/19179683/pexels-photo-19179683.jpeg",
    description: "The Selam Wide Trouser embodies relaxed Ethiopian elegance. Crafted from premium local cotton, these trousers offer both comfort and style for the modern gentleman.",
    sizes: ["28", "30", "32", "34", "36", "38"]
  },
  {
    id: 6,
    name: "Bloom Oversized Tee",
    price: 95,
    tag: "New",
    category: "Streetwear",
    origin: "Addis Ababa",
    image: "https://images.pexels.com/photos/32430590/pexels-photo-32430590.jpeg",
    description: "Part of our urban collection, the Bloom Tee represents the spirit of Ethiopian youth culture. Premium cotton with subtle LOTUS branding celebrates the new wave of Addis street style.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 7,
    name: "Rise Cargo Pants",
    price: 155,
    originalPrice: 200,
    tag: "Sale",
    category: "Streetwear",
    origin: "Urban Addis",
    image: "https://images.pexels.com/photos/34579430/pexels-photo-34579430.jpeg",
    description: "The Rise Cargo Pants blend functionality with Ethiopian street aesthetics. Multiple pockets and durable construction make them perfect for the urban explorer.",
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: 8,
    name: "Kaba Modern Dress",
    price: 310,
    tag: "Heritage",
    category: "Women",
    origin: "Habesha Design",
    image: "https://images.pexels.com/photos/11440539/pexels-photo-11440539.jpeg",
    description: "The Kaba Modern Dress reinterprets traditional Ethiopian bridal elements for contemporary wear. Delicate embroidery and flowing lines create an unforgettable silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 9,
    name: "Addis Hoodie",
    price: 130,
    tag: "New",
    category: "Streetwear",
    origin: "Urban Addis",
    image: "https://images.pexels.com/photos/28460995/pexels-photo-28460995.jpeg",
    description: "Representing Addis Ababa's vibrant street culture, this premium hoodie features subtle Ethiopian motifs and exceptional comfort for everyday wear.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 10,
    name: "Nile Linen Shirt",
    price: 145,
    originalPrice: 175,
    tag: "Sale",
    category: "Men",
    origin: "Jimma Cotton",
    image: "https://images.pexels.com/photos/3298594/pexels-photo-3298594.jpeg",
    description: "Crafted from Jimma's finest cotton, the Nile Linen Shirt offers breathable elegance. Perfect for both casual and formal occasions with its versatile design.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 11,
    name: "Lalibela Maxi Skirt",
    price: 195,
    tag: "New",
    category: "Women",
    origin: "Lalibela Craft",
    image: "https://images.pexels.com/photos/33968170/pexels-photo-33968170.jpeg",
    description: "Inspired by the ancient rock-hewn churches of Lalibela, this maxi skirt features geometric patterns that echo Ethiopia's architectural heritage.",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 12,
    name: "Become Sweatshirt",
    price: 110,
    tag: "New",
    category: "Streetwear",
    origin: "Addis Ababa",
    image: "https://images.pexels.com/photos/32430590/pexels-photo-32430590.jpeg",
    description: "The Become Sweatshirt embodies our brand philosophy. Soft, sustainable fabric meets minimalist design with the LOTUS motto subtly embroidered.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
]

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All') return products
  if (category === 'New In') return products.filter(p => p.tag === 'New')
  if (category === 'Sale') return products.filter(p => p.tag === 'Sale')
  return products.filter(p => p.category === category)
}
