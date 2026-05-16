# 🪷 Lotus Fashion - Premium E-Commerce Platform

A modern, high-performance e-commerce platform showcasing Ethiopian luxury fashion. Built with Next.js, TypeScript, and Appwrite, featuring a beautiful UI powered by Tailwind CSS and Framer Motion animations.

> *From the mud, the lotus blooms.* — An elegant platform for premium fashion enthusiasts.

## 🎯 Project Overview

Lotus Fashion is a full-featured e-commerce application that demonstrates:
- **Modern Web Development**: Next.js 16, TypeScript, and advanced React patterns
- **Backend Integration**: Appwrite for authentication, database, and real-time data management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Experience**: Smooth animations with Framer Motion
- **State Management**: Complex cart and order management
- **Real-time Updates**: Cart synchronization and order tracking

## 🚀 Live Demo

**[Visit Lotus Fashion](https://lotus-fashion.vercel.app)** ✨

## ✨ Key Features

- 🛍️ **Product Browsing**: Browse fashion items by categories
- 🔍 **Advanced Search**: Filter and search products easily
- 🛒 **Shopping Cart**: Persistent cart with Appwrite integration
- 👤 **User Authentication**: Secure sign-up and login with Appwrite
- 💳 **Order Management**: View order history and track purchases
- 💌 **User Profiles**: Manage personal information and preferences
- 🎨 **Luxury UI**: High-end visual design with smooth animations
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🌙 **Dark Mode Support**: Theme switching with next-themes

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + PostCSS |
| **Backend/Database** | Appwrite |
| **Authentication** | Appwrite Auth |
| **Animations** | Framer Motion |
| **UI Components** | Radix UI |
| **Forms** | React Hook Form + Zod Validation |
| **Deployment** | Vercel |
| **Analytics** | Vercel Analytics |

## 📋 Prerequisites

Before getting started, ensure you have:
- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager
- **Appwrite Account**: [Create free account](https://appwrite.io)
- **Vercel Account** (optional): For deployment

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BereketWorana/lotus-fashion.git
cd lotus-fashion
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

### 4. Set Up Appwrite

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Create a database and collections for:
   - **Categories** - Fashion categories
   - **Products** - Product details
   - **Users Profile** - User information
   - **Cart Items** - Shopping cart data
   - **Orders** - Order history

4. Get your credentials:
   - Project ID
   - Database ID
   - API Endpoint
   - Collection IDs (for each collection)

### 5. Fill Environment Variables

Edit `.env.local` with your Appwrite credentials:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id

# Collection IDs
NEXT_PUBLIC_APPWRITE_CATEGORIES_ID=your_categories_collection_id
NEXT_PUBLIC_APPWRITE_PRODUCTS_ID=your_products_collection_id
NEXT_PUBLIC_APPWRITE_USERS_PROFILE_ID=your_users_profile_collection_id
NEXT_PUBLIC_APPWRITE_CART_ITEMS_ID=your_cart_items_collection_id
NEXT_PUBLIC_APPWRITE_ORDERS_ID=your_orders_collection_id

# Server-side API Key (Optional, for admin operations)
APPWRITE_API_KEY=your_api_key
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
lotus-fashion/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   └── orders/            # Order management
├── components/            # Reusable React components
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── Cart/
│   └── ...
├── lib/                   # Utility functions & API
│   ├── appwrite.ts        # Appwrite client
│   ├── auth.ts            # Authentication service
│   ├── products.ts        # Product service
│   ├── cart.ts            # Cart service
│   └── ...
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── ...
├── styles/                # Global styles
│   └── globals.css
├── public/                # Static assets
├── .env.example           # Environment variables template
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json
```

## 🎨 Key Components

### Authentication Flow
- Secure user registration and login
- Persistent session management
- Protected routes

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent storage with Appwrite
- Real-time synchronization

### Product Management
- Browse by categories
- Search and filter
- Detailed product pages
- Image galleries

### Order System
- Checkout process
- Order history
- Order status tracking

## 🔐 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint | `https://cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID | `65a1b2c3d4e5f6g7h8i9j0k1` |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Appwrite database ID | `fashion_db_001` |
| `NEXT_PUBLIC_APPWRITE_CATEGORIES_ID` | Categories collection ID | `categories_col_001` |
| `NEXT_PUBLIC_APPWRITE_PRODUCTS_ID` | Products collection ID | `products_col_001` |
| `NEXT_PUBLIC_APPWRITE_USERS_PROFILE_ID` | User profiles collection ID | `users_col_001` |
| `NEXT_PUBLIC_APPWRITE_CART_ITEMS_ID` | Cart items collection ID | `cart_col_001` |
| `NEXT_PUBLIC_APPWRITE_ORDERS_ID` | Orders collection ID | `orders_col_001` |
| `APPWRITE_API_KEY` | Server-side API key (optional) | `your_api_key_here` |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables from `.env.local`
6. Click "Deploy"

**Live URL**: https://lotus-fashion.vercel.app

### Alternative: Manual Deployment

```bash
npm run build
# Deploy the .next folder to your hosting provider
```

## 📊 Performance Optimization

- ⚡ **Next.js Optimization**: Image optimization, code splitting
- 🎯 **Component Lazy Loading**: Dynamic imports for better performance
- 📦 **Production Build**: Optimized bundle size
- 🔄 **Real-time Sync**: Efficient Appwrite queries

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Bereket Worana**
- GitHub: [@BereketWorana](https://github.com/BereketWorana)
- Email: [Add your email]

## 🎓 Learning Value

This project demonstrates:
- ✅ Full-stack web development with Next.js
- ✅ TypeScript for type safety
- ✅ Backend integration with Appwrite
- ✅ State management patterns
- ✅ Responsive design principles
- ✅ Real-time data synchronization
- ✅ User authentication flows
- ✅ E-commerce platform architecture

---

**Made with ❤️ by Bereket Worana**

*From the mud, the lotus blooms.*
