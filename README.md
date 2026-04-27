# 🪷 Lotus Fashion

Lotus Fashion is an Ethiopian luxury fashion e-commerce platform designed to showcase and sell editorial-grade fashion pieces. It features a stunning, high-end visual identity with real-time currency conversion and a seamless shopping experience.

## 🚀 Live Demo
[https://lotus-fashion-f17k.vercel.app](https://lotus-fashion-f17k.vercel.app)

## 🛠️ Tech Stack
- **Framework:** Next.js
- **Language:** TypeScript
- **Backend/Auth/Database:** Appwrite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion

## 📋 Prerequisites
- Node.js 18+
- Appwrite account
- Vercel account

## ⚙️ Setup Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BereketWorana/lotus-fashion.git
   cd lotus-fashion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Fill in your credentials:**
   Open `.env.local` and add your Appwrite endpoint, project ID, database ID, and collection IDs.

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Environment Variables

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Your Appwrite instance URL (e.g., https://cloud.appwrite.io/v1) |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Your Appwrite database ID |
| `NEXT_PUBLIC_APPWRITE_CATEGORIES_ID` | Collection ID for fashion categories |
| `NEXT_PUBLIC_APPWRITE_PRODUCTS_ID` | Collection ID for fashion products |
| `NEXT_PUBLIC_APPWRITE_USERS_PROFILE_ID` | Collection ID for user profile data |
| `NEXT_PUBLIC_APPWRITE_CART_ITEMS_ID` | Collection ID for persistent cart storage |
| `NEXT_PUBLIC_APPWRITE_ORDERS_ID` | Collection ID for order history |
| `APPWRITE_API_KEY` | (Optional) Server-side API key for administrative tasks |

## 📁 Project Structure
- `app/` - Next.js App Router pages and layouts.
- `components/` - Reusable UI components (Navbar, Cart, Product Cards).
- `lib/` - Service layers (Auth, Products, Cart) and Appwrite configuration.
- `hooks/` - Custom React hooks for animations and scroll effects.
- `public/` - Static assets and SVG graphics.
- `styles/` - Global CSS and Tailwind configurations.

## 👨‍💻 Author
**Bereket Worana**

---
*From the mud, the lotus blooms.*
