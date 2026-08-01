import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute — wraps any route that requires authentication.
 * Checks localStorage for a valid user session token.
 * If no session found → redirects to /login.
 * If session found → renders the children normally.
 */
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Valid session requires both a user object AND a token
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
