import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // Admin → full access
  if (user.role === "admin") {
    return children;
  }

  // Seller → seller + buyer access
  if (user.role === "seller") {
    if (allowedRoles.includes("seller") || allowedRoles.includes("buyer")) {
      return children;
    }
  }

  // Buyer → only buyer
  if (user.role === "buyer") {
    if (allowedRoles.includes("buyer")) {
      return children;
    }
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;