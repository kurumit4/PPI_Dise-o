import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api';

const formVacio = {
    id_categoria: '',
    nombre: '',
    descripcion: '',
    imagen_url: '',
    stock: '',
    precio: '',
    estado: 'activo'
};

const AdminArticulos = () => {
    const [articulos, setArticulos]   = useState([]);
    const [form, setForm]             = useState(formVacio);
    const [editandoId, setEditandoId] = useState(null);
    const [error, setError]           = useState('');
    const [exito, setExito]           = useState('');

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const cargar = async () => {
        const res  = await fetch(`${API}/articulos`);
        const data = await res.json();
        setArticulos(data.data || []);
    };

    useEffect(() => { cargar(); }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setError('');
        if (!form.nombre || !form.precio || !form.stock || !form.id_categoria) {
            return setError('Nombre, precio, stock y categoría son obligatorios.');
        }

        const url    = editandoId ? `${API}/articulos/${editandoId}` : `${API}/articulos`;
        const method = editandoId ? 'PUT' : 'POST';

        const res  = await fetch(url, { method, headers, body: JSON.stringify(form) });
        const data = await res.json();

        if (data.success) {
            setExito(editandoId ? 'Artículo actualizado.' : 'Artículo creado.');
            setForm(formVacio);
            setEditandoId(null);
            cargar();
            setTimeout(() => setExito(''), 3000);
        } else {
            setError(data.message);
        }
    };

    const handleEditar = (a) => {
        setForm({
            id_categoria: a.id_categoria,
            nombre:       a.nombre,
            descripcion:  a.descripcion || '',
            imagen_url:   a.imagen_url  || '',
            stock:        a.stock,
            precio:       a.precio,
            estado:       a.estado
        });
        setEditandoId(a.id_articulo);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEliminar = async (id) => {
        if (!confirm('¿Eliminar este artículo?')) return;
        await fetch(`${API}/articulos/${id}`, { method: 'DELETE', headers });
        cargar();
    };

    const cancelar = () => {
        setForm(formVacio);
        setEditandoId(null);
        setError('');
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.titulo}>Gestión de Artículos</h1>

            {/* Formulario */}
            <div style={styles.card}>
                <h2 style={styles.subtitulo}>{editandoId ? 'Editar artículo' : 'Nuevo artículo'}</h2>

                {error  && <p style={styles.error}>{error}</p>}
                {exito  && <p style={styles.exito}>{exito}</p>}

                <div style={styles.grid}>
                    <input style={styles.input} name="nombre"       placeholder="Nombre *"      value={form.nombre}       onChange={handleChange} />
                    <input style={styles.input} name="id_categoria" placeholder="ID Categoría *" value={form.id_categoria} onChange={handleChange} type="number" />
                    <input style={styles.input} name="precio"       placeholder="Precio *"       value={form.precio}       onChange={handleChange} type="number" />
                    <input style={styles.input} name="stock"        placeholder="Stock *"        value={form.stock}        onChange={handleChange} type="number" />
                    <input style={styles.input} name="imagen_url"   placeholder="URL de imagen"  value={form.imagen_url}   onChange={handleChange} />
                    <select style={styles.input} name="estado" value={form.estado} onChange={handleChange}>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                <textarea
                    style={{ ...styles.input, gridColumn: 'span 2', resize: 'vertical', minHeight: '80px' }}
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                />

                {/* Preview imagen */}
                {form.imagen_url && (
                    <div style={styles.preview}>
                        <p style={styles.previewLabel}>Preview:</p>
                        <img src={form.imagen_url} alt="preview" style={styles.previewImg} />
                    </div>
                )}

                <div style={styles.botonesForm}>
                    <button style={styles.btnGuardar} onClick={handleSubmit}>
                        {editandoId ? 'Actualizar' : 'Crear artículo'}
                    </button>
                    {editandoId && (
                        <button style={styles.btnCancelar} onClick={cancelar}>Cancelar</button>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div style={styles.card}>
                <h2 style={styles.subtitulo}>Artículos ({articulos.length})</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.tabla}>
                        <thead>
                            <tr>
                                {['ID', 'Nombre', 'Precio', 'Stock', 'Estado', 'Acciones'].map(h => (
                                    <th key={h} style={styles.th}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {articulos.map(a => (
                                <tr key={a.id_articulo} style={styles.tr}>
                                    <td style={styles.td}>{a.id_articulo}</td>
                                    <td style={styles.td}>{a.nombre}</td>
                                    <td style={styles.td}>${Number(a.precio).toFixed(2)}</td>
                                    <td style={styles.td}>{a.stock}</td>
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.badge,
                                            background: a.estado === 'activo' ? '#dcfce7' : '#fee2e2',
                                            color:      a.estado === 'activo' ? '#16a34a' : '#ef4444',
                                        }}>{a.estado}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <button style={styles.btnEditar}   onClick={() => handleEditar(a)}>Editar</button>
                                        <button style={styles.btnEliminar} onClick={() => handleEliminar(a.id_articulo)}>Eliminar</button>
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
    page:         { maxWidth: '1100px', margin: '0 auto', padding: '32px 16px', fontFamily: 'sans-serif' },
    titulo:       { fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: '#111827' },
    subtitulo:    { fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#111827' },
    card:         { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '24px' },
    grid:         { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' },
    input:        { padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
    error:        { color: '#ef4444', fontSize: '13px', marginBottom: '12px' },
    exito:        { color: '#16a34a', fontSize: '13px', marginBottom: '12px' },
    preview:      { marginTop: '12px' },
    previewLabel: { fontSize: '12px', color: '#6b7280', marginBottom: '6px' },
    previewImg:   { height: '100px', borderRadius: '8px', objectFit: 'cover' },
    botonesForm:  { display: 'flex', gap: '10px', marginTop: '16px' },
    btnGuardar:   { padding: '10px 24px', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' },
    btnCancelar:  { padding: '10px 24px', background: '#f3f4f6', color: '#111827', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' },
    tabla:        { width: '100%', borderCollapse: 'collapse' },
    th:           { textAlign: 'left', padding: '10px 14px', fontSize: '12px', fontWeight: '700', color: '#6b7280', borderBottom: '2px solid #f3f4f6', textTransform: 'uppercase' },
    td:           { padding: '12px 14px', fontSize: '14px', color: '#374151', borderBottom: '1px solid #f9fafb' },
    tr:           { transition: 'background 0.15s' },
    badge:        { padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' },
    btnEditar:    { padding: '6px 12px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px', marginRight: '6px' },
    btnEliminar:  { padding: '6px 12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
};

export default AdminArticulos;
