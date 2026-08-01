import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./global/Topbar";
import HamburgerMenu from "./global/HamburgerMenu";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login/Login";
import Register from "./scenes/register/Register";
import WatchList from "./scenes/dashboard/watchlist";
import Details from "./scenes/dashboard/details";
import BuyStock from "./scenes/dashboard/buyStock";
import SellStock from "./scenes/dashboard/sellStock";
import LandingPage from "./global/LandingPage";
import Newz from "./scenes/dashboard/news";
import IPO from "./scenes/dashboard/ipo";
import Copyright from "./global/Copyright";
import Portfolio from "./scenes/dashboard/Portfolio";
import Orders from "./scenes/dashboard/tradeHistory.js";
import Testimonials from "./global/Testimonials.jsx";
import Profile from "./scenes/dashboard/profile.jsx";
import RiskDashboard from "./scenes/dashboard/riskDashboard.jsx";
import PriceAlerts from "./scenes/dashboard/priceAlerts.jsx";
import AdminDashboard from "./scenes/dashboard/adminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = ({ children }) => (
  <div className="app" style={{ display: 'flex', minHeight: '100vh', width: '100%', position: 'relative' }}>
    <HamburgerMenu />
    <main className="context" style={{ flexGrow: 1, minWidth: 0, marginLeft: '250px', width: 'calc(100% - 250px)', overflowX: 'hidden' }}>
      <Topbar display="flex" />
      {children}
      <Copyright />
    </main>
  </div>
);

// Helper: wrap route content with ProtectedRoute + AppLayout
const AuthRoute = ({ element }) => (
  <ProtectedRoute>
    <AppLayout>{element}</AppLayout>
  </ProtectedRoute>
);

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<><Login /><Copyright /></>} />
          <Route path="/register" element={<><Register /><Copyright /></>} />

          {/* Protected dashboard routes — redirect to /login if not authenticated */}
          <Route path="/home"        element={<AuthRoute element={<Dashboard />} />} />
          <Route path="/watchlist"   element={<AuthRoute element={<WatchList />} />} />
          <Route path="/details"     element={<AuthRoute element={<Details />} />} />
          <Route path="/news"        element={<AuthRoute element={<Newz />} />} />
          <Route path="/ipo"         element={<AuthRoute element={<IPO />} />} />
          <Route path="/buyStock"    element={<AuthRoute element={<BuyStock />} />} />
          <Route path="/sellStock"   element={<AuthRoute element={<SellStock />} />} />
          <Route path="/portfolio"   element={<AuthRoute element={<Portfolio />} />} />
          <Route path="/orders"      element={<AuthRoute element={<Orders />} />} />
          <Route path="/tradeHistory" element={<AuthRoute element={<Orders />} />} />
          <Route path="/testimonials" element={<AuthRoute element={<Testimonials />} />} />
          <Route path="/profile"     element={<AuthRoute element={<Profile />} />} />
          <Route path="/risk"        element={<AuthRoute element={<RiskDashboard />} />} />
          <Route path="/alerts"      element={<AuthRoute element={<PriceAlerts />} />} />
          <Route path="/admin"       element={<AuthRoute element={<AdminDashboard />} />} />

          {/* Catch-all — redirect unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
