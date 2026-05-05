import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api';

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [form, setForm]         = useState({ id_rol: '', nombre: '', apellido: '', email: '', estado: 'activo', password_hash: '' });
    const [editandoId, setEditandoId] = useState(null);
    const [error, setError]       = useState('');
    const [exito, setExito]       = useState('');

    const token   = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

    const cargar = async () => {
        const res  = await fetch(`${API}/usuarios`, { headers });
        const data = await res.json();
        setUsuarios(data.data || []);
    };

    useEffect(() => { cargar(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setError('');
        if (!form.nombre || !form.email || !form.id_rol) {
            return setError('Nombre, email y rol son obligatorios.');
        }
        if (!editandoId && !form.password_hash) {
            return setError('La contraseña es obligatoria al crear un usuario.');
        }

        const url    = editandoId ? `${API}/usuarios/${editandoId}` : `${API}/usuarios`;
        const method = editandoId ? 'PUT' : 'POST';

        const res  = await fetch(url, { method, headers, body: JSON.stringify(form) });
        const data = await res.json();

        if (data.success) {
            setExito(editandoId ? 'Usuario actualizado.' : 'Usuario creado.');
            setForm({ id_rol: '', nombre: '', apellido: '', email: '', estado: 'activo', password_hash: '' });
            setEditandoId(null);
            cargar();
            setTimeout(() => setExito(''), 3000);
        } else {
            setError(data.message);
        }
    };

    const handleEditar = (u) => {
        setForm({
            id_rol:   u.id_rol,
            nombre:   u.nombre,
            apellido: u.apellido || '',
            email:    u.email,
            estado:   u.estado,
            password_hash: '' // no se precarga por seguridad
        });
        setEditandoId(u.id_usuario);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEliminar = async (id) => {
        if (!confirm('¿Eliminar este usuario?')) return;
        await fetch(`${API}/usuarios/${id}`, { method: 'DELETE', headers });
        cargar();
    };

    const cancelar = () => {
        setForm({ id_rol: '', nombre: '', apellido: '', email: '', estado: 'activo', password_hash: '' });
        setEditandoId(null);
        setError('');
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.titulo}>Gestión de Usuarios</h1>

            {/* Formulario */}
            <div style={styles.card}>
                <h2 style={styles.subtitulo}>{editandoId ? 'Editar usuario' : 'Nuevo usuario'}</h2>

                {error && <p style={styles.error}>{error}</p>}
                {exito && <p style={styles.exito}>{exito}</p>}

                <div style={styles.grid}>
                    <input style={styles.input} name="nombre"   placeholder="Nombre *"   value={form.nombre}   onChange={handleChange} />
                    <input style={styles.input} name="apellido" placeholder="Apellido"    value={form.apellido} onChange={handleChange} />
                    <input style={styles.input} name="email"    placeholder="Email *"     value={form.email}    onChange={handleChange} type="email" />
                    <input style={styles.input} name="id_rol"   placeholder="ID Rol *"    value={form.id_rol}   onChange={handleChange} type="number" />
                    <input
                        style={styles.input}
                        name="password_hash"
                        placeholder={editandoId ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña *'}
                        value={form.password_hash}
                        onChange={handleChange}
                        type="password"
                    />
                    <select style={styles.input} name="estado" value={form.estado} onChange={handleChange}>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                <div style={styles.botonesForm}>
                    <button style={styles.btnGuardar} onClick={handleSubmit}>
                        {editandoId ? 'Actualizar' : 'Crear usuario'}
                    </button>
                    {editandoId && (
                        <button style={styles.btnCancelar} onClick={cancelar}>Cancelar</button>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div style={styles.card}>
                <h2 style={styles.subtitulo}>Usuarios ({usuarios.length})</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.tabla}>
                        <thead>
                            <tr>
                                {['ID', 'Nombre', 'Apellido', 'Email', 'Rol', 'Estado', 'Acciones'].map(h => (
                                    <th key={h} style={styles.th}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(u => (
                                <tr key={u.id_usuario}>
                                    <td style={styles.td}>{u.id_usuario}</td>
                                    <td style={styles.td}>{u.nombre}</td>
                                    <td style={styles.td}>{u.apellido}</td>
                                    <td style={styles.td}>{u.email}</td>
                                    <td style={styles.td}>{u.id_rol}</td>
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.badge,
                                            background: u.estado === 'activo' ? '#dcfce7' : '#fee2e2',
                                            color:      u.estado === 'activo' ? '#16a34a' : '#ef4444',
                                        }}>{u.estado}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <button style={styles.btnEditar}   onClick={() => handleEditar(u)}>Editar</button>
                                        <button style={styles.btnEliminar} onClick={() => handleEliminar(u.id_usuario)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page:        { maxWidth: '1100px', margin: '0 auto', padding: '32px 16px', fontFamily: 'sans-serif' },
    titulo:      { fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: '#111827' },
    subtitulo:   { fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#111827' },
    card:        { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '24px' },
    grid:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' },
    input:       { padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
    error:       { color: '#ef4444', fontSize: '13px', marginBottom: '12px' },
    exito:       { color: '#16a34a', fontSize: '13px', marginBottom: '12px' },
    botonesForm: { display: 'flex', gap: '10px', marginTop: '16px' },
    btnGuardar:  { padding: '10px 24px', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' },
    btnCancelar: { padding: '10px 24px', background: '#f3f4f6', color: '#111827', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' },
    tabla:       { width: '100%', borderCollapse: 'collapse' },
    th:          { textAlign: 'left', padding: '10px 14px', fontSize: '12px', fontWeight: '700', color: '#6b7280', borderBottom: '2px solid #f3f4f6', textTransform: 'uppercase' },
    td:          { padding: '12px 14px', fontSize: '14px', color: '#374151', borderBottom: '1px solid #f9fafb' },
    badge:       { padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' },
    btnEditar:   { padding: '6px 12px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px', marginRight: '6px' },
    btnEliminar: { padding: '6px 12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
};

export default AdminUsuarios;
