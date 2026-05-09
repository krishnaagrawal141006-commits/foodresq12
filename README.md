# FoodResQ AI — AI-Powered Food Rescue Network

FoodResQ AI is a complete AI-powered humanitarian logistics platform built for hackathons and investor demos. It connects restaurants, hotels, and canteens with nearby NGOs and shelters to reduce food waste using real-time logistics and Gemini AI automation.

## 🔥 Tech Stack

- **Frontend:** Next.js 15, TypeScript, TailwindCSS, Framer Motion, Zustand
- **Backend:** Firebase (Firestore, Auth, Storage)
- **AI:** Google Gemini (Vision & Text)
- **Maps:** MapsMyIndia (Mappls APIs)
- **Charts:** Recharts
- **Icons:** Lucide React

## 🚀 Key Features

- **Cinematic SaaS Landing Page:** Premium futuristic design with glassmorphism and animations.
- **AI Food Analysis:** Upload a photo of leftover food and Gemini Vision AI automatically detects the food type, quantity, and urgency.
- **Role-Based Panels:** Dedicated dashboards for Donors, NGOs, Delivery Partners, and Admins.
- **Real-time Logistics:** Live tracking simulation for delivery partners and food status.
- **Smart Matching:** AI-driven matching of donations to the nearest available NGOs.
- **Investor Demo Ready:** Includes comprehensive mock data to look fully functional without immediate API keys.

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ installed.
- Firebase project created.
- Gemini API key.
- MapsMyIndia (Mappls) API key.

### 2. Installation
```bash
# Clone the repository
# (Assuming you've downloaded the files)

# Install dependencies
npm install
```

### 3. Environment Variables
Rename `.env.local.example` (or create a new `.env.local`) and add your keys:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_GEMINI_API_KEY=...
NEXT_PUBLIC_MAPPLS_API_KEY=...
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the platform.

## 📱 User Roles for Demo

- **Donor:** `Hotel/Restaurant` view to upload food and track pickups.
- **NGO:** `Receiver` view to find nearby food and manage distribution.
- **Delivery:** `Rider` view with live navigation and reward system.
- **Admin:** `Command Center` view for global ops monitoring and AI insights.

---
Built with 💜 for Social Impact.
