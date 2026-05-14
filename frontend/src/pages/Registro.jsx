import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = 'http://localhost:3000/api';

const Registro = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password_hash: '', confirmar: '', estado: 'activo', id_rol: 2 });
    const [error, setError]       = useState('');
    const [exito, setExito]       = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setError('');
        if (!form.nombre || !form.email || !form.password_hash) return setError('Nombre, email y contraseña son obligatorios.');
        if (form.password_hash !== form.confirmar) return setError('Las contraseñas no coinciden.');
        if (form.password_hash.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');

        setCargando(true);
        try {
            const res  = await fetch(`${API}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: form.nombre, apellido: form.apellido, email: form.email, password_hash: form.password_hash, estado: form.estado, id_rol: form.id_rol })
            });
            const data = await res.json();
            if (data.success) {
                setExito('¡Cuenta creada! Redirigiendo al login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Error al crear la cuenta.');
            }
        } catch {
            setError('Error de conexión con el servidor.');
        } finally {
            setCargando(false);
        }
    };

    const handleKey = e => { if (e.key === 'Enter') handleSubmit(); };

    return (
        <div style={s.page}>
            <div style={{ ...s.blob, background: '#FFE066', width: 350, height: 350, top: -120, right: -100 }} />
            <div style={{ ...s.blob, background: '#4ECDC4', width: 250, height: 250, bottom: -80, left: -80 }} />
            <div style={{ ...s.blob, background: '#FF6B9D', width: 150, height: 150, top: '30%', left: '5%' }} />

            <div style={s.card}>
                {/* Header */}
                <div style={s.cardTop}>
                    <Link to="/" style={s.back}>← Volver al inicio</Link>
                    <div style={s.iconBox}>🎒</div>
                    <h1 style={s.title}>¡Únete a nosotros!</h1>
                    <p style={s.subtitle}>Crea tu cuenta y empieza a comprar</p>

                    {/* Beneficios */}
                    <div style={s.beneficios}>
                        {['🛒 Carrito de compras', '📦 Seguimiento de pedidos', '⭐ Precios especiales'].map(b => (
                            <span key={b} style={s.beneficio}>{b}</span>
                        ))}
                    </div>
                </div>

                <div style={s.cardBody}>
                    {error && <div style={s.errorBox}>{error}</div>}
                    {exito && <div style={s.exitoBox}>{exito}</div>}

                    <div style={s.grid}>
                        <div style={s.field}>
                            <label style={s.label}>Nombre *</label>
                            <input style={s.input} name="nombre" placeholder="Juan" value={form.nombre} onChange={handleChange} onKeyDown={handleKey} />
                        </div>
                        <div style={s.field}>
                            <label style={s.label}>Apellido</label>
                            <input style={s.input} name="apellido" placeholder="Pérez" value={form.apellido} onChange={handleChange} onKeyDown={handleKey} />
                        </div>
                    </div>

                    <div style={s.field}>
                        <label style={s.label}>Correo electrónico *</label>
                        <input style={s.input} name="email" type="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} onKeyDown={handleKey} />
                    </div>

                    <div style={s.grid}>
                        <div style={s.field}>
                            <label style={s.label}>Contraseña *</label>
                            <input style={s.input} name="password_hash" type="password" placeholder="Mín. 6 caracteres" value={form.password_hash} onChange={handleChange} onKeyDown={handleKey} />
                        </div>
                        <div style={s.field}>
                            <label style={s.label}>Confirmar *</label>
                            <input style={s.input} name="confirmar" type="password" placeholder="Repite aquí" value={form.confirmar} onChange={handleChange} onKeyDown={handleKey} />
                        </div>
                    </div>

                    <button style={{ ...s.btn, opacity: cargando ? 0.7 : 1 }} onClick={handleSubmit} disabled={cargando}>
                        {cargando ? 'Creando cuenta...' : 'Crear cuenta 🎉'}
                    </button>

                    <p style={s.loginTxt}>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" style={s.loginLink}>Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const s = {
    page:      { minHeight: '100vh', background: '#FFFDF7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito','Segoe UI',sans-serif" },
    blob:      { position: 'absolute', borderRadius: '50%', opacity: 0.22, zIndex: 0 },
    card:      { position: 'relative', zIndex: 2, background: '#fff', borderRadius: '28px', boxShadow: '0 8px 48px rgba(0,0,0,0.12)', width: '100%', maxWidth: '480px', overflow: 'hidden' },
    cardTop:   { background: 'linear-gradient(135deg, #4ECDC4, #A78BFA)', padding: '36px 32px 28px', textAlign: 'center' },
    back:      { display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: '700', textDecoration: 'none', marginBottom: '16px', textAlign: 'left' },
    iconBox:   { fontSize: '44px', marginBottom: '10px' },
    title:     { fontSize: '26px', fontWeight: '900', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.5px' },
    subtitle:  { fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '0 0 16px', fontWeight: '500' },
    beneficios:{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' },
    beneficio: { background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' },
    cardBody:  { padding: '28px 32px 32px' },
    errorBox:  { background: '#FFF0F0', color: '#EF4444', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', borderLeft: '3px solid #EF4444', fontWeight: '600' },
    exitoBox:  { background: '#F0FFF4', color: '#16A34A', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', borderLeft: '3px solid #16A34A', fontWeight: '600' },
    grid:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
    field:     { marginBottom: '16px' },
    label:     { display: 'block', fontSize: '12px', fontWeight: '800', color: '#333', marginBottom: '7px', letterSpacing: '0.3px', textTransform: 'uppercase' },
    input:     { width: '100%', padding: '13px 16px', border: '2.5px solid #f0f0f0', borderRadius: '12px', fontSize: '14px', outline: 'none', background: '#FAFAFA', boxSizing: 'border-box', color: '#111', fontFamily: 'inherit', fontWeight: '600' },
    btn:       { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #4ECDC4, #A78BFA)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(78,205,196,0.4)', marginTop: '4px' },
    loginTxt:  { textAlign: 'center', fontSize: '13px', color: '#888', marginTop: '18px', fontWeight: '600' },
    loginLink: { color: '#4ECDC4', fontWeight: '800', textDecoration: 'none' },
};

export default Registro;
