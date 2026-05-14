import { Link } from 'react-router-dom';

const Footer = () => (
    <footer style={s.footer}>
        {/* Franja de colores decorativa */}
        <div style={s.rainbow}>
            {['#FF6B9D','#FFE066','#4ECDC4','#A78BFA','#FF9F43','#6BCB77'].map(c => (
                <div key={c} style={{ flex: 1, background: c, height: '100%' }} />
            ))}
        </div>

        <div style={s.inner}>
            <div style={s.col}>
                <p style={s.logoText}>✏️ Pape<span style={s.logoAccent}>lería</span></p>
                <p style={s.desc}>Tu tienda colorida de útiles escolares, artículos de oficina y suministros creativos.</p>
            </div>

            <div style={s.col}>
                <p style={s.colTitle}>Tienda</p>
                <Link to="/menu"    style={s.link}>🛍️ Catálogo</Link>
                <Link to="/carrito" style={s.link}>🛒 Carrito</Link>
            </div>

            <div style={s.col}>
                <p style={s.colTitle}>Cuenta</p>
                <Link to="/login"    style={s.link}>🔑 Iniciar sesión</Link>
                <Link to="/registro" style={s.link}>🎉 Registrarse</Link>
            </div>

            <div style={s.col}>
                <p style={s.colTitle}>Contacto</p>
                <p style={s.link}>📧 info@papeleria.com</p>
                <p style={s.link}>📞 +57 300 000 0000</p>
                <p style={s.link}>📍 Medellín, Colombia</p>
            </div>
        </div>

        <div style={s.bottom}>
            <p style={s.copy}>© {new Date().getFullYear()} Papelería. Hecho con 💛 en Colombia.</p>
        </div>
    </footer>
);

const s = {
    footer:     { background: '#111', fontFamily: "'Nunito','Segoe UI',sans-serif", marginTop: '80px' },
    rainbow:    { display: 'flex', height: '6px' },
    inner:      { maxWidth: '1200px', margin: '0 auto', padding: '56px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '40px' },
    col:        { display: 'flex', flexDirection: 'column', gap: '10px' },
    logoText:   { fontSize: '22px', fontWeight: '900', color: '#fff', margin: 0 },
    logoAccent: { color: '#FF6B9D' },
    desc:       { fontSize: '13px', color: '#666', lineHeight: '1.7', margin: 0 },
    colTitle:   { fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: '#FFE066', margin: '0 0 4px' },
    link:       { fontSize: '13px', color: '#888', textDecoration: 'none', margin: 0, fontWeight: '600' },
    bottom:     { borderTop: '1px solid #222', padding: '20px 24px', textAlign: 'center' },
    copy:       { fontSize: '12px', color: '#555', margin: 0, fontWeight: '600' },
};

export default Footer;
