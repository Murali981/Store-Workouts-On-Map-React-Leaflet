/* WHAT THIS PROTECTED ROUTE ACTUALLY DO AND HOW IT WORKS */
/* We are creating this specialized component  which will handle this redirecting and then wrap the entire application in the
   APP component
*/
/* eslint-disable */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
