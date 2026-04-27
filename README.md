# 🪷 Lotus Fashion

An Ethiopian luxury fashion e-commerce platform built with Next.js, TypeScript, Appwrite, and Framer Motion.

## 🌐 Live Demo

👉 [View Live](https://lotus-fashion.vercel.app)

## ✨ Features

- 🛍️ **Product Shop** — Browse 12+ luxury Ethiopian fashion pieces
- 🔍 **Category Filtering** — Women, Men, Streetwear, New In, Sale
- 🛒 **Full Cart System** — Add/remove items, select sizes, quantity controls
- 💱 **Live Currency Toggle** — USD ⇄ ETB with real-time exchange rates
- 👤 **User Authentication** — Sign up, login, logout via Appwrite Auth
- 📦 **Persistent Cart** — Saved to database, survives refreshes
- 💳 **Checkout Flow** — Multi-step: Cart → Shipping → Order Confirmation
- 🎨 **Custom Animations** — Framer Motion parallax, zoom, and scroll effects
- 🪷 **Custom Lotus SVG Logo** — Animated brand identity
- 📱 **Fully Responsive** — Mobile, tablet, and desktop

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **UI Components** | Radix UI, Lucide Icons |
| **Backend/Database** | Appwrite (PostgreSQL) |
| **Auth** | Appwrite Auth |
| **Hosting** | Vercel |
| **AI Assistant** | CodeAnt Gravity, DeepSeek |

## 📁 Project Structure
lotus-fashion/
├── app/ # Next.js App Router pages
│ ├── auth/ # Login & Signup
│ ├── checkout/ # Multi-step checkout
│ ├── product/[id]/ # Product detail pages
│ └── shop/ # Shop with filtering
├── components/ # React components
│ ├── home/ # Homepage sections
│ └── ui/ # shadcn/ui components
├── lib/ # Services & utilities
│ ├── services/ # Appwrite services
│ │ ├── auth.service.ts
│ │ ├── product.service.ts
│ │ ├── category.service.ts
│ │ └── currency.service.ts
│ ├── appwrite.ts # Appwrite client config
│ ├── products.ts # Product data bridge
│ └── cart-context.tsx # Cart state management
├── hooks/ # Custom React hooks
├── scripts/ # Database seed scripts
└── styles/ # Global styles


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Appwrite account (free tier)
- Vercel account (for deployment)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/BereketWorana/lotus-fashion.git
cd lotus-fashion
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Environment Variables**
Create a `.env.local` file in the root directory and add your Appwrite API Key:
```env
APPWRITE_API_KEY=your_appwrite_api_key
```
*(Note: Client-side Appwrite Project ID and Database ID are configured in `lib/appwrite.ts`)*

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the luxury.

## 👨‍💻 Author

**Bereket Worana** — [github.com/BereketWorana](https://github.com/BereketWorana)

---
*From the mud, the lotus blooms.*
