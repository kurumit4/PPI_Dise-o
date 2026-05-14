import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const API = 'http://localhost:3000/api';

const Login = () => {
    const { login }   = useAuth();
    const navigate    = useNavigate();
    const [form, setForm]         = useState({ email: '', password: '' });
    const [error, setError]       = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setError('');
        if (!form.email || !form.password) return setError('Completa todos los campos.');
        setCargando(true);
        try {
            const res  = await fetch(`${API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, password: form.password })
            });
            const data = await res.json();
            if (data.success) {
                login(data);
                navigate('/');
            } else {
                setError(data.message || 'Credenciales incorrectas.');
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
            {/* Decoración fondo */}
            <div style={{ ...s.blob, background: '#FFE066', width: 400, height: 400, top: -150, left: -150 }} />
            <div style={{ ...s.blob, background: '#4ECDC4', width: 300, height: 300, bottom: -100, right: -100 }} />
            <div style={{ ...s.blob, background: '#A78BFA', width: 200, height: 200, top: '40%', right: '10%' }} />

            <div style={s.card}>
                {/* Cabecera colorida */}
                <div style={s.cardTop}>
                    <Link to="/" style={s.back}>← Volver</Link>
                    <div style={s.iconBox}>✏️</div>
                    <h1 style={s.title}>¡Hola de nuevo!</h1>
                    <p style={s.subtitle}>Inicia sesión en tu cuenta</p>
                </div>

                <div style={s.cardBody}>
                    {error && <div style={s.errorBox}>{error}</div>}

                    <div style={s.field}>
                        <label style={s.label}>Correo electrónico</label>
                        <input style={s.input} name="email" type="email" placeholder="tu@correo.com"
                            value={form.email} onChange={handleChange} onKeyDown={handleKey} />
                    </div>

                    <div style={s.field}>
                        <label style={s.label}>Contraseña</label>
                        <input style={s.input} name="password" type="password" placeholder="••••••••"
                            value={form.password} onChange={handleChange} onKeyDown={handleKey} />
                    </div>

                    <button style={{ ...s.btn, opacity: cargando ? 0.7 : 1 }} onClick={handleSubmit} disabled={cargando}>
                        {cargando ? 'Ingresando...' : 'Ingresar 🚀'}
                    </button>

                    <p style={s.register}>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" style={s.registerLink}>Regístrate gratis</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const s = {
    page:        { minHeight: '100vh', background: '#FFFDF7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito','Segoe UI',sans-serif" },
    blob:        { position: 'absolute', borderRadius: '50%', opacity: 0.25, zIndex: 0 },
    card:        { position: 'relative', zIndex: 2, background: '#fff', borderRadius: '28px', boxShadow: '0 8px 48px rgba(0,0,0,0.12)', width: '100%', maxWidth: '420px', overflow: 'hidden' },
    cardTop:     { background: 'linear-gradient(135deg, #FF6B9D, #A78BFA)', padding: '40px 32px 32px', textAlign: 'center' },
    back:        { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '700', textDecoration: 'none', marginBottom: '20px', textAlign: 'left' },
    iconBox:     { fontSize: '48px', marginBottom: '12px' },
    title:       { fontSize: '28px', fontWeight: '900', color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' },
    subtitle:    { fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: '500' },
    cardBody:    { padding: '32px' },
    errorBox:    { background: '#FFF0F0', color: '#EF4444', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', borderLeft: '3px solid #EF4444', fontWeight: '600' },
    field:       { marginBottom: '20px' },
    label:       { display: 'block', fontSize: '13px', fontWeight: '800', color: '#333', marginBottom: '8px', letterSpacing: '0.3px' },
    input:       { width: '100%', padding: '14px 18px', border: '2.5px solid #f0f0f0', borderRadius: '14px', fontSize: '14px', outline: 'none', background: '#FAFAFA', boxSizing: 'border-box', color: '#111', fontFamily: 'inherit', fontWeight: '600' },
    btn:         { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #FF6B9D, #A78BFA)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', letterSpacing: '0.3px', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(255,107,157,0.4)' },
    register:    { textAlign: 'center', fontSize: '13px', color: '#888', marginTop: '20px', fontWeight: '600' },
    registerLink:{ color: '#FF6B9D', fontWeight: '800', textDecoration: 'none' },
};

export default Login;
