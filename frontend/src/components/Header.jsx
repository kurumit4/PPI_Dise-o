import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
    const { usuario, logout, esAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <header style={s.header}>
            <div style={s.inner}>
                {/* Logo */}
                <Link to="/" style={s.logo}>
                    <span style={s.logoEmoji}>✏️</span>
                    <span style={s.logoText}>Pape<span style={s.logoAccent}>lería</span></span>
                </Link>

                {/* Nav */}
                <nav style={s.nav}>
                    <Link to="/"     style={s.navLink}>Inicio</Link>
                    <Link to="/menu" style={s.navLink}>Catálogo</Link>
                    {esAdmin() && <Link to="/admin/articulos" style={s.navLink}>Artículos</Link>}
                    {esAdmin() && <Link to="/admin/usuarios"  style={s.navLink}>Usuarios</Link>}
                </nav>

                {/* Acciones */}
                <div style={s.actions}>
                    {usuario ? (
                        <>
                            {!esAdmin() && (
                                <Link to="/carrito" style={s.carritoBtn}>
                                    🛒 <span>Carrito</span>
                                </Link>
                            )}
                            <div style={s.userChip}>
                                <span style={s.userAvatar}>{usuario.nombre?.charAt(0).toUpperCase()}</span>
                                <span style={s.userName}>{usuario.nombre}</span>
                            </div>
                            <button style={s.logoutBtn} onClick={handleLogout}>Salir</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"    style={s.navLink}>Iniciar sesión</Link>
                            <Link to="/registro" style={s.btnRegistro}>Registrarse 🎉</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

const s = {
    header:     { background: '#fff', borderBottom: '3px solid #FFE066', position: 'sticky', top: 0, zIndex: 100, fontFamily: "'Nunito','Segoe UI',sans-serif" },
    inner:      { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' },
    logo:       { display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' },
    logoEmoji:  { fontSize: '22px' },
    logoText:   { fontSize: '22px', fontWeight: '900', color: '#111', letterSpacing: '-0.5px' },
    logoAccent: { color: '#FF6B9D' },
    nav:        { display: 'flex', gap: '24px' },
    navLink:    { fontSize: '14px', fontWeight: '700', color: '#555', textDecoration: 'none' },
    actions:    { display: 'flex', alignItems: 'center', gap: '12px' },
    carritoBtn: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '800', color: '#333', textDecoration: 'none', padding: '8px 16px', background: '#FFF9E6', border: '2px solid #FFE066', borderRadius: '999px' },
    userChip:   { display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F0FF', padding: '6px 14px', borderRadius: '999px' },
    userAvatar: { width: '28px', height: '28px', background: 'linear-gradient(135deg,#FF6B9D,#A78BFA)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '900' },
    userName:   { fontSize: '13px', fontWeight: '800', color: '#333' },
    logoutBtn:  { fontSize: '13px', fontWeight: '800', color: '#FF6B9D', background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
    btnRegistro:{ padding: '9px 20px', background: 'linear-gradient(135deg,#FF6B9D,#A78BFA)', color: '#fff', borderRadius: '999px', fontSize: '13px', fontWeight: '900', textDecoration: 'none', boxShadow: '0 2px 12px rgba(255,107,157,0.35)' },
};

export default Header;
