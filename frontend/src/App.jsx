import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'; // <--- IMPORTANTE
import { RutaPrivada, RutaAdmin } from './components/ProtectedRoute';

import Principal      from './pages/principal.jsx';
import Login          from './pages/Login.jsx';
import Registro       from './pages/Registro.jsx';
import Menu           from './pages/Menu.jsx';
import Carrito        from './pages/Carrito.jsx';
import AdminArticulos from './pages/admin/AdminArticulos.jsx';
import AdminUsuarios  from './pages/admin/AdminUsuarios.jsx';

import './App.css';

function App() {
  return (
    <AuthProvider> {/* <--- Envuelve toda la app aquí */}
      <Router>
        <Routes>
          {/* Públicas */}
          <Route path="/"         element={<Principal />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/menu"     element={<Menu />} />

          {/* Protegidas */}
          <Route path="/carrito" element={<RutaPrivada><Carrito /></RutaPrivada>} />
          <Route path="/admin/articulos" element={<RutaAdmin><AdminArticulos /></RutaAdmin>} />
          <Route path="/admin/usuarios" element={<RutaAdmin><AdminUsuarios /></RutaAdmin>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;