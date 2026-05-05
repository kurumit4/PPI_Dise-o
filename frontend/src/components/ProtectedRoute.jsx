import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// Solo usuarios logueados
export const RutaPrivada = ({ children }) => {
    const { usuario } = useAuth();
    return usuario ? children : <Navigate to="/login" replace />;
};

// Solo admin
export const RutaAdmin = ({ children }) => {
    const { esAdmin } = useAuth();
    return esAdmin() ? children : <Navigate to="/" replace />;
};
