import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRouter = ({ children }) => {
    
  const token = Cookies.get("login_token");

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children;
};

export default ProtectedRouter
