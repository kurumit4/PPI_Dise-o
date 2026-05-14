import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API = 'http://localhost:3000/api';

const Principal = () => {
    const { usuario } = useAuth();
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando]   = useState(true);

    useEffect(() => {
        fetch(`${API}/articulos`)
            .then(r => r.json())
            .then(d => setArticulos((d.data || []).slice(0, 8)))
            .finally(() => setCargando(false));
    }, []);

    return (
        <div style={s.page}>
            <Header />

            {/* HERO */}
            <section style={s.hero}>
                <div style={{ ...s.burbuja, width: 320, height: 320, background: '#FFE066', top: -80, right: -60, borderRadius: '60% 40% 70% 30%' }} />
                <div style={{ ...s.burbuja, width: 180, height: 180, background: '#FF6B9D', top: 40, right: 280, borderRadius: '40% 60% 30% 70%' }} />
                <div style={{ ...s.burbuja, width: 120, height: 120, background: '#4ECDC4', bottom: 40, left: 80, borderRadius: '50%' }} />
                <div style={{ ...s.burbuja, width: 80,  height: 80,  background: '#A78BFA', bottom: 100, right: 200, borderRadius: '50%' }} />

                <div style={s.heroContent}>
                    <div style={s.heroBadge}>🎒 ¡Todo para tu regreso a clases!</div>
                    <h1 style={s.heroTitle}>
                        La papelería<br />
                        <span style={s.heroAccent}>más colorida</span><br />
                        de la ciudad.
                    </h1>
                    <p style={s.heroSub}>Cuadernos, colores, bolígrafos y más. Todo lo que necesitas para estudiar, crear y expresarte.</p>
                    <div style={s.heroBtns}>
                        <Link to="/menu" style={s.btnPrimary}>Ver catálogo 🛍️</Link>
                        {!usuario && <Link to="/registro" style={s.btnSecondary}>Crear cuenta gratis</Link>}
                    </div>
                </div>
            </section>

            {/* CATEGORÍAS */}
            <section style={s.catsWrap}>
                {[
                    { emoji: '✏️', label: 'Escritura',    color: '#FFE066', text: '#333' },
                    { emoji: '📓', label: 'Cuadernos',    color: '#FF6B9D', text: '#fff' },
                    { emoji: '🎨', label: 'Arte',          color: '#4ECDC4', text: '#fff' },
                    { emoji: '🗂️', label: 'Organización', color: '#A78BFA', text: '#fff' },
                    { emoji: '✂️', label: 'Manualidades', color: '#FF9F43', text: '#fff' },
                ].map(c => (
                    <Link to="/menu" key={c.label} style={{ ...s.catCard, background: c.color, color: c.text }}>
                        <span style={s.catEmoji}>{c.emoji}</span>
                        <span style={s.catLabel}>{c.label}</span>
                    </Link>
                ))}
            </section>

            {/* PRODUCTOS */}
            <section style={s.productos}>
                <div style={s.secHeader}>
                    <div>
                        <p style={s.secEyebrow}>⭐ Lo más popular</p>
                        <h2 style={s.secTitle}>Productos destacados</h2>
                    </div>
                    <Link to="/menu" style={s.verTodos}>Ver todos →</Link>
                </div>

                {cargando ? (
                    <p style={s.cargando}>Cargando productos... ⏳</p>
                ) : articulos.length === 0 ? (
                    <p style={s.cargando}>No hay productos disponibles aún.</p>
                ) : (
                    <div style={s.grid}>
                        {articulos.map((a, i) => {
                            const colores = ['#FFE066','#FF6B9D','#4ECDC4','#A78BFA','#FF9F43','#6BCB77','#4D96FF','#FF6B6B'];
                            const bg = colores[i % colores.length];
                            return (
                                <div key={a.id_articulo} style={s.card}>
                                    <div style={{ ...s.cardImg, background: bg }}>
                                        {a.imagen_url
                                            ? <img src={a.imagen_url} alt={a.nombre} style={s.img} />
                                            : <span style={s.cardEmoji}>📦</span>
                                        }
                                        {a.stock < 5 && a.stock > 0 && (
                                            <span style={s.badgeStock}>¡Últimas unidades!</span>
                                        )}
                                    </div>
                                    <div style={s.cardBody}>
                                        <p style={s.cardNombre}>{a.nombre}</p>
                                        <p style={s.cardDesc}>{a.descripcion || ''}</p>
                                        <div style={s.cardFooter}>
                                            <span style={s.cardPrecio}>${Number(a.precio).toFixed(2)}</span>
                                            {usuario
                                                ? <Link to="/menu" style={{ ...s.btnCard, background: bg }}>+ Agregar</Link>
                                                : <Link to="/login" style={s.btnCardOutline}>Iniciar sesión</Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* CTA */}
            {!usuario && (
                <section style={s.cta}>
                    <div style={s.ctaDeco1} />
                    <div style={s.ctaDeco2} />
                    <div style={s.ctaContent}>
                        <span style={s.ctaTag}>🎉 Oferta especial</span>
                        <h2 style={s.ctaTitle}>¿Primera vez aquí?</h2>
                        <p style={s.ctaSub}>Regístrate hoy y accede a precios especiales en toda la tienda.</p>
                        <Link to="/registro" style={s.btnPromo}>Quiero mi cuenta 🚀</Link>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

const s = {
    page:       { fontFamily: "'Nunito','Segoe UI',sans-serif", background: '#FFFDF7', minHeight: '100vh' },

    hero:       { position: 'relative', overflow: 'hidden', background: '#FFFDF7', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '80px 24px' },
    burbuja:    { position: 'absolute', opacity: 0.85, zIndex: 0 },
    heroContent:{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto', textAlign: 'center' },
    heroBadge:  { display: 'inline-block', background: '#FFE066', color: '#333', padding: '8px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: '800', marginBottom: '24px' },
    heroTitle:  { fontSize: 'clamp(36px,6vw,72px)', fontWeight: '900', color: '#111', lineHeight: '1.1', margin: '0 0 20px', letterSpacing: '-1px' },
    heroAccent: { color: '#FF6B9D' },
    heroSub:    { fontSize: '18px', color: '#666', lineHeight: '1.7', marginBottom: '40px' },
    heroBtns:   { display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' },
    btnPrimary: { padding: '16px 32px', background: '#FF6B9D', color: '#fff', borderRadius: '999px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(255,107,157,0.4)' },
    btnSecondary:{ padding: '16px 32px', background: '#fff', color: '#333', border: '2.5px solid #111', borderRadius: '999px', fontWeight: '800', fontSize: '15px', textDecoration: 'none' },

    catsWrap:   { display: 'flex', gap: '12px', padding: '0 24px 60px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' },
    catCard:    { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 32px', borderRadius: '20px', textDecoration: 'none', fontWeight: '800', minWidth: '120px', gap: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
    catEmoji:   { fontSize: '32px' },
    catLabel:   { fontSize: '13px' },

    productos:  { maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 80px' },
    secHeader:  { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' },
    secEyebrow: { fontSize: '13px', fontWeight: '700', color: '#FF6B9D', margin: '0 0 6px' },
    secTitle:   { fontSize: '32px', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-0.5px' },
    verTodos:   { fontSize: '14px', fontWeight: '800', color: '#FF6B9D', textDecoration: 'none' },
    cargando:   { textAlign: 'center', padding: '60px', color: '#aaa' },
    grid:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '20px' },

    card:       { background: '#fff', border: '2px solid #f5f5f5', borderRadius: '20px', overflow: 'hidden' },
    cardImg:    { height: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' },
    img:        { width: '100%', height: '100%', objectFit: 'cover' },
    cardEmoji:  { fontSize: '56px' },
    badgeStock: { position: 'absolute', bottom: 10, left: 10, background: '#FF6B6B', color: '#fff', fontSize: '10px', fontWeight: '800', padding: '3px 10px', borderRadius: '999px' },
    cardBody:   { padding: '18px' },
    cardNombre: { fontSize: '15px', fontWeight: '800', color: '#111', margin: '0 0 4px' },
    cardDesc:   { fontSize: '12px', color: '#aaa', margin: '0 0 14px', lineHeight: '1.5', minHeight: '32px' },
    cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    cardPrecio: { fontSize: '20px', fontWeight: '900', color: '#111' },
    btnCard:    { padding: '8px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: '800', textDecoration: 'none', color: '#333' },
    btnCardOutline: { padding: '8px 16px', background: 'transparent', color: '#333', border: '2px solid #e5e7eb', borderRadius: '999px', fontSize: '12px', fontWeight: '800', textDecoration: 'none' },

    cta:        { position: 'relative', overflow: 'hidden', background: '#111', padding: '80px 24px' },
    ctaDeco1:   { position: 'absolute', width: 300, height: 300, background: '#FFE066', borderRadius: '50%', top: -100, right: -50, opacity: 0.12 },
    ctaDeco2:   { position: 'absolute', width: 200, height: 200, background: '#FF6B9D', borderRadius: '50%', bottom: -80, left: 100, opacity: 0.12 },
    ctaContent: { position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
    ctaTag:     { display: 'inline-block', background: '#FFE066', color: '#333', padding: '6px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: '800', marginBottom: '20px' },
    ctaTitle:   { fontSize: '48px', fontWeight: '900', color: '#fff', margin: '0 0 16px', letterSpacing: '-1px' },
    ctaSub:     { fontSize: '16px', color: '#aaa', lineHeight: '1.7', margin: '0 0 32px' },
    btnPromo:   { display: 'inline-block', padding: '16px 36px', background: '#FF6B9D', color: '#fff', borderRadius: '999px', fontWeight: '900', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 24px rgba(255,107,157,0.5)' },
};

export default Principal;
