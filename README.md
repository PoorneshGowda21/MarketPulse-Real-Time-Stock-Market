# MarketPulse — Stock Market Portfolio Manager & Analytics Platform

> **Live Application URL**: [https://market-pulse-real-time-stock-market.vercel.app](https://market-pulse-real-time-stock-market.vercel.app)  
> **GitHub Repository**: [https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market](https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market)  
> **Author**: **Poornesh Gowda**

---

## 📌 Project Overview

**MarketPulse** is a full-stack web application designed for retail investors to track market trends, execute virtual stock trades, manage portfolio holdings, analyze risk exposure, and configure price alerts from a single interface.

Built using the MERN stack (MongoDB, Express.js, React, Node.js), MarketPulse combines live market data from TradingView chart widgets with client-side portfolio risk calculations, multi-currency conversion, and an in-memory API rate limiter.

---

## ✨ Features Implemented

### 1. 📈 Interactive TradingView Workstation
- Real-time technical charting widgets powered by TradingView.
- Supports multi-timeframe analysis (1m, 5m, 15m, 1D, 1W) with technical indicators (RSI, MACD, Volume).

### 2. 🛡️ Dynamic Portfolio Risk & Volatility Analytics (`/risk`)
- **Portfolio Risk Score (0-100)**: Dynamically calculated based on active portfolio equity holdings.
- **Benchmark Beta (β) & Sector Diversification**: Evaluates sector concentration and market sensitivity relative to baseline benchmarks.
- **Rule-Based Risk Guards**: Flags concentrated sector allocations (>45%) or high single-asset volatility.
- **Empty Baseline Support**: Displays a zero-risk baseline (`0/100`) when a user has no active holdings.

### 3. 🔔 Target Price Alerts System (`/alerts`)
- Configure price triggers (**Above ≥** or **Below ≤**) for watched stock symbols.
- Active target alerts queue with status badges and notification prompts.

### 4. ⚡ Admin & Infrastructure Status (`/admin`)
- Monitor system status, active API rate limit usage, and response times.
- Security and financial audit logs recording user profile updates, order executions, and system events.

### 5. 💱 Multi-Currency Topbar Engine
- 1-click Topbar dropdown switcher between **USD ($)**, **INR (₹)**, **EUR (€)**, and **GBP (£)**.
- Automatically converts wallet balance and portfolio asset values using live conversion multipliers.

### 6. 📊 Order Execution & CSV Export
- Order entry interface with **Market**, **Limit**, and **Stop-Loss** order selection.
- **1-Click CSV Export** button on the Orders page (`/orders`) to download complete transaction records.

### 7. 👤 Profile & KYC Management (`/profile`)
- Manage personal details, phone numbers, permanent KYC identification (**PAN Card**, **Aadhaar Card**), and bank account details.
- Persists data via `localStorage` and synchronizes instantly across navigation sidebars and headers.

---

## 🛠️ Technology Stack

| Layer | Implementation |
| :--- | :--- |
| **Frontend** | React.js (v18), Material-UI (MUI v5), Redux Toolkit, React Router v6, Sass |
| **Charting & Visualization** | TradingView Widget, Chart.js, Recharts, Lightweight Charts |
| **Backend API** | Node.js, Express.js, Custom In-Memory Sliding Window Rate Limiter |
| **Database & Auth** | MongoDB Atlas, Mongoose ODM, JWT Authentication, Local Storage Persistence |
| **Deployment** | Vercel Serverless Platform (`vercel.json`, `.npmrc` legacy peer deps) |

---

## 📁 Repository Structure

```text
MarketPulse-Real-Time-Stock-Market/
├── Backend/
│   ├── api/
│   │   ├── controllers/      # Express route handlers (User, Trade, Portfolio)
│   │   ├── middleware/       # Custom in-memory rate limiter middleware
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express API endpoints
│   │   └── app.js            # Express application setup
│   ├── .env                  # Backend environment variables
│   └── server.js             # HTTP server entrypoint
├── Frontend/
│   ├── public/
│   │   └── vercel.json       # SPA client-side rewrite rules
│   ├── src/
│   │   ├── components/       # Reusable header and chart components
│   │   ├── global/           # Topbar, HamburgerMenu, LandingPage, Copyright
│   │   ├── scenes/           # Core view pages (Dashboard, Portfolio, Risk, Alerts, Admin, Profile)
│   │   ├── App.js            # Application routes layout
│   │   └── index.css         # Styling system & dark theme tokens
│   ├── .npmrc                # Legacy peer dependencies configuration
│   └── package.json          # Frontend dependencies & React build scripts
├── .npmrc                    # Root legacy peer dependencies configuration
├── package.json              # Root build & start scripts
└── vercel.json               # Vercel deployment configuration
```

---

## 🚀 Local Installation & Running

### Prerequisites
- Node.js (v16.0 or higher)
- npm (v7.0 or higher)
- MongoDB Database URI

### Steps

1. **Clone Repository**:
   ```bash
   git clone https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market.git
   cd MarketPulse-Real-Time-Stock-Market
   ```

2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   cd Frontend && npm install --legacy-peer-deps && cd ..
   ```

3. **Configure Backend Environment (`Backend/.env`)**:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_atlas_connection_url
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start Development Servers**:
   ```bash
   npm run dev
   ```
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:8080](http://localhost:8080)

---

## 🌐 Vercel Deployment

This project is configured for Vercel deployment.

1. Import the repository `PoorneshGowda21/MarketPulse-Real-Time-Stock-Market` into Vercel.
2. Ensure environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT=8080`) are added.
3. Vercel automatically uses `vercel.json` and `.npmrc` to build the static React bundle.

---

## 👨‍💻 Author & Attribution

- **Developed by**: **Poornesh Gowda**
- **GitHub Repository**: [https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market](https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market)
- **Live Site**: [https://market-pulse-real-time-stock-market.vercel.app](https://market-pulse-real-time-stock-market.vercel.app)

*Made by Poornesh Gowda 2026.*
