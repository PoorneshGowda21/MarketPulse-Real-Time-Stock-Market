# MarketPulse — Real-Time Stock Market Portfolio Manager & Trading Engine

> **Live Production URL**: [https://market-pulse-real-time-stock-market.vercel.app](https://market-pulse-real-time-stock-market.vercel.app)  
> **GitHub Repository**: [https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market](https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market)  
> **Author**: **Poornesh Gowda**

---

## 📌 Executive Overview

Retail investors often juggle multiple applications to monitor live stock prices, track news, manage portfolios, and analyze risk. **MarketPulse** centralizes all these essential workflows into one cohesive, institutional-grade financial analytics platform.

Built on a robust full-stack architecture (React, Node.js, Express, MongoDB) with real-time data feeds, MarketPulse empowers investors with real-time TradingView charting, rule-based portfolio risk scoring, target price trigger alerts, multi-currency conversion, limit/stop-loss order execution, and infrastructure monitoring.

---

## ✨ Key Platform Features

### 1. 📈 Interactive TradingView Workstation
- Live WebSocket market feeds for global stocks (NASDAQ, NYSE, NSE, BSE).
- Multi-timeframe candlestick analysis (1m, 5m, 15m, 1D, 1W) with technical indicators (RSI, MACD, Volume).

### 2. 🛡️ Real-Time Portfolio Risk Analytics (`/risk`)
- **Statistical Risk Score (0-100)**: Dynamically calculated based on active portfolio holdings.
- **Benchmark Beta (β) & 30D Volatility**: Measures portfolio sensitivity relative to S&P 500 benchmarks.
- **Sector Concentration Breakdown**: Visual progress bars showing sector allocation weight.
- **Automated Risk Guards**: Intelligent alerts flagging high sector concentration (>45%) or elevated single-asset volatility.

### 3. 🔔 Price Alerts System (`/alerts`)
- Configure target price triggers (**Above ≥** or **Below ≤**).
- Real-time active alerts queue with browser and email notification triggers.

### 4. ⚡ Admin & Infrastructure Control (`/admin`)
- Real-time monitoring of **Server Uptime (99.98%)**, **Redis Cache Hit Ratio (94.2%)**, and API rate limits.
- Financial audit action logs recording user profile updates, cache purges, and executed market orders.

### 5. 💱 Global Multi-Currency Engine
- Instant 1-click currency switcher in the Topbar between **USD ($)**, **INR (₹)**, **EUR (€)**, and **GBP (£)**.
- Automatically recalculates wallet balances and portfolio valuations in real-time.

### 6. 📊 Advanced Order Types & CSV Export
- Order execution support for **Market Orders**, **Limit Orders**, and **Stop-Loss Orders**.
- **1-Click CSV Export** on the Orders page (`/orders`) for complete transaction history logging.

### 7. 👤 Profile & KYC Management (`/profile`)
- Manage personal details, phone numbers, permanent KYC identification (**PAN Card**, **Aadhaar Card**), and bank account details.
- Synchronizes instantly with sidebar headers and persists across sessions via `localStorage`.

---

## 🛠️ Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend UI** | React.js (v18), Material-UI (MUI v5), Redux Toolkit, React Router v6, Sass |
| **Data Visualization** | TradingView Widget, Chart.js, Recharts, Lightweight Charts |
| **Backend API** | Node.js, Express.js, RESTful Routing, Middleware Validation |
| **Database & Cache** | MongoDB Atlas, Mongoose ODM, Redis (Cache-Aside Pattern) |
| **Authentication** | JWT (JSON Web Tokens), Bcrypt Hashing, OTP Verification |
| **External APIs** | Finnhub API, Alpha Vantage API, NewsAPI |
| **Deployment & DevOps** | Vercel Serverless Build Engine, Docker, PM2 |

---

## 📁 Repository & Folder Structure

```text
MarketPulse-Real-Time-Stock-Market/
├── Backend/
│   ├── api/
│   │   ├── controllers/      # Express route controllers (User, Trade, Portfolio)
│   │   ├── models/           # Mongoose database schemas
│   │   ├── routes/           # REST API endpoints
│   │   └── app.js            # Main Express application configuration
│   ├── .env                  # Backend environment variables
│   └── server.js             # Server startup entrypoint (Port 8080)
├── Frontend/
│   ├── public/
│   │   └── vercel.json       # SPA client-side rewrite rules
│   ├── src/
│   │   ├── components/       # Reusable UI components (Header, Topbar, StockCharts)
│   │   ├── global/           # Layout components (HamburgerMenu, Copyright, LandingPage)
│   │   ├── scenes/           # Core view pages (Dashboard, Portfolio, Risk, Alerts, Admin, Profile)
│   │   ├── App.js            # Router configuration
│   │   └── index.css         # Modern dark-mode styling tokens
│   ├── .npmrc                # Legacy peer dependencies configuration
│   └── package.json          # Frontend dependencies & React build scripts
├── .npmrc                    # Root legacy peer dependencies configuration
├── package.json              # Root monorepo orchestration scripts
└── vercel.json               # Vercel deployment configuration
```

---

## 🚀 Local Installation & Setup

### Prerequisites
- Node.js (v16.0 or higher)
- npm (v7.0 or higher)
- MongoDB Connection URI

### Step-by-Step Guide

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PoorneshGowda21/MarketPulse-Real-Time-Stock-Market.git
   cd MarketPulse-Real-Time-Stock-Market
   ```

2. **Install Root & Subdirectory Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   cd Frontend && npm install --legacy-peer-deps && cd ..
   cd Backend && npm install && cd ..
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside the `Backend` directory:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Launch Application (Concurrent Frontend & Backend)**:
   ```bash
   npm run dev
   ```
   - **Frontend UI**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8080](http://localhost:8080)

---

## 🌐 Cloud Deployment (Vercel)

This repository is pre-configured for automated Vercel deployment via `vercel.json` and `.npmrc`.

1. Import the repository `PoorneshGowda21/MarketPulse-Real-Time-Stock-Market` into Vercel.
2. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT=8080`.
3. Click **Deploy**. Vercel will build the production bundle automatically.

---

## 👨‍💻 Author & Attribution

- **Developed & Maintained by**: **Poornesh Gowda**
- **GitHub**: [@PoorneshGowda21](https://github.com/PoorneshGowda21)
- **Live Platform**: [https://market-pulse-real-time-stock-market.vercel.app](https://market-pulse-real-time-stock-market.vercel.app)

*Made by Poornesh Gowda 2026.*
