import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<><Login /><Copyright /></>} />
          <Route path="/register" element={<><Register /><Copyright /></>} />

          {/* Authenticated Dashboard Routes with Clean Sticky Sidebar Layout */}
          <Route path="/home" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/watchlist" element={<AppLayout><WatchList /></AppLayout>} />
          <Route path="/details" element={<AppLayout><Details /></AppLayout>} />
          <Route path="/news" element={<AppLayout><Newz /></AppLayout>} />
          <Route path="/ipo" element={<AppLayout><IPO /></AppLayout>} />
          <Route path="/buyStock" element={<AppLayout><BuyStock /></AppLayout>} />
          <Route path="/sellStock" element={<AppLayout><SellStock /></AppLayout>} />
          <Route path="/portfolio" element={<AppLayout><Portfolio /></AppLayout>} />
          <Route path="/orders" element={<AppLayout><Orders /></AppLayout>} />
          <Route path="/testimonials" element={<AppLayout><Testimonials /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
