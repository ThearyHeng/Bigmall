# LAY LONG24 - Cambodia's Marketplace & Vendor Workspace

A faithful, responsive clone and recreation of [LAY LONG24 (https://www.hang24.shop/)](https://www.hang24.shop/) and the official [LAY LONG24 Vendor Workspace (https://vendor.hang24.shop/register)](https://vendor.hang24.shop/register).

## 🚀 Key Features

### 1. Main Marketplace Landing Page (`/` and `/kh`)
- **Exact Brand Identity**: Blue & gold color scheme (`#1a365d`, `#8b6914`, `#d4b878`), Google Fonts (*Inter* & *Kantumruy Pro*), and floating iPhone 15 mockup.
- **Bilingual Switcher**: Instant `EN` / `ខ្មែរ` language toggle.
- **Interactive Tabs**: "For Buyers" and "For Merchants" steps.
- **Trusted Brands**: NINE, Skechers, Mont Blanc, G2000, Dove, Vaseline, Sunsilk, Confirel, Soko, Jaya.
- **10 Category Grid**: Hover micro-interactions and icons across all departments.

### 2. Full Vendor Registration Portal (`/register`)
- **Step 1 - Create Account**: Full Name, Date of Birth, Gender, Cambodian Phone (`012...` / ABA format), Email, Password, Terms & Privacy.
- **Step 2 - Verification**: 6-digit OTP code entry with resend timer.
- **Step 3 - Account Type**: Individual Merchant vs Registered Business/Company.
- **Step 4 - Business Details**: Company Name, Business Type, Tax ID (TIN), Company Contact.
- **Step 5 - Store Setup**: Store Name, Categories Multi-select, Description, and Logo Upload preview.
- **Step 6 - Store Location**: Cambodia Province, District/Khan, Commune/Sangkat, Street & Unit address, Landmark directions for drivers.
- **Step 7 - Book Onsite Visit**: Phnom Penh in-person verification meeting slot & location picker.
- **Step 8 - Application Confirmation**: Reference tracking ID (`#HG24-...`), SLA review timeline (2-3 business days), and Telegram community links.

### 3. Vendor Sign In & Workspace (`/login` & `/dashboard`)
- **Vendor Login**: Phone/Email & Password authentication with one-click Demo login.
- **Vendor Dashboard**: Overview metrics (Revenue in USD and KHR Riel, Orders, Active Products), Recent Orders table, and Product inventory management.

## 🛠 Tech Stack

- **React 19**
- **React Router 7**
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide Icons**

## 💻 Running the Project

```bash
cd /Users/theary/.gemini/antigravity/scratch/hang24-website

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
