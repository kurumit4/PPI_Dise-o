import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API = 'http://localhost:3000/api';

const Menu = () => {

    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch(`${API}/articulos`)
            .then(res => res.json())
            .then(data => setArticulos(data.data || []))
            .finally(() => setCargando(false));
    }, []);

    return (
        <div style={s.page}>

            <Header />

            {/* HERO */}
            <section style={s.hero}>
                <h1 style={s.title}>🛍️ Nuestro Catálogo</h1>
                <p style={s.subtitle}>
                    Encuentra todos los productos escolares y de papelería.
                </p>
            </section>

            {/* PRODUCTOS */}
            <section style={s.container}>

                {cargando ? (
                    <p style={s.loading}>Cargando productos... ⏳</p>
                ) : articulos.length === 0 ? (
                    <p style={s.loading}>No hay productos disponibles.</p>
                ) : (
                    <div style={s.grid}>

                        {articulos.map((a, i) => {

                            const colores = [
                                '#FFE066',
                                '#FF6B9D',
                                '#4ECDC4',
                                '#A78BFA',
                                '#FF9F43',
                                '#6BCB77',
                                '#4D96FF',
                                '#FF6B6B'
                            ];

                            const bg = colores[i % colores.length];

                            return (
                                <div key={a.id_articulo} style={s.card}>

                                    <div style={{ ...s.cardImg, background: bg }}>

                                        {a.imagen_url ? (
                                            <img
                                                src={a.imagen_url}
                                                alt={a.nombre}
                                                style={s.img}
                                            />
                                        ) : (
                                            <span style={s.emoji}>📦</span>
                                        )}

                                        {a.stock < 5 && a.stock > 0 && (
                                            <span style={s.badge}>
                                                Últimas unidades
                                            </span>
                                        )}

                                    </div>

                                    <div style={s.cardBody}>

                                        <h3 style={s.nombre}>
                                            {a.nombre}
                                        </h3>

                                        <p style={s.descripcion}>
                                            {a.descripcion || 'Sin descripción'}
                                        </p>

                                        <div style={s.footer}>

                                            <span style={s.precio}>
                                                ${Number(a.precio).toFixed(2)}
                                            </span>

                                            <button style={{
                                                ...s.btn,
                                                background: bg
                                            }}>
                                                Agregar 🛒
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );

                        })}

                    </div>
                )}

                <div style={s.back}>
                    <Link to="/" style={s.backBtn}>
                        ← Volver al inicio
                    </Link>
                </div>

            </section>

            <Footer />

        </div>
    );
};

const s = {

    page: {
        minHeight: '100vh',
        background: '#FFFDF7',
        fontFamily: "'Nunito','Segoe UI',sans-serif"
    },

    hero: {
        padding: '80px 20px 40px',
        textAlign: 'center'
    },

    title: {
        fontSize: 'clamp(40px,6vw,70px)',
        fontWeight: '900',
        color: '#111',
        marginBottom: '16px'
    },

    subtitle: {
        fontSize: '18px',
        color: '#666'
    },

    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
    },

    loading: {
        textAlign: 'center',
        padding: '60px',
        color: '#888',
        fontSize: '18px'
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
        gap: '24px'
    },

    card: {
        background: '#fff',
        borderRadius: '22px',
        overflow: 'hidden',
        border: '2px solid #f1f1f1',
        transition: '0.3s',
        boxShadow: '0 4px 18px rgba(0,0,0,0.06)'
    },

    cardImg: {
        height: '220px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    },

    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

    emoji: {
        fontSize: '60px'
    },

    badge: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: '#FF4D4D',
        color: '#fff',
        padding: '5px 12px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: '800'
    },

    cardBody: {
        padding: '20px'
    },

    nombre: {
        fontSize: '18px',
        fontWeight: '800',
        color: '#111',
        marginBottom: '8px'
    },

    descripcion: {
        fontSize: '14px',
        color: '#777',
        lineHeight: '1.5',
        minHeight: '40px'
    },

    footer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    precio: {
        fontSize: '24px',
        fontWeight: '900',
        color: '#111'
    },

    btn: {
        border: 'none',
        padding: '10px 18px',
        borderRadius: '999px',
        fontWeight: '800',
        cursor: 'pointer'
    },

    back: {
        marginTop: '50px',
        textAlign: 'center'
    },

    backBtn: {
        textDecoration: 'none',
        background: '#111',
        color: '#fff',
        padding: '14px 28px',
        borderRadius: '999px',
        fontWeight: '800'
    }

};

export default Menu;