import { useAuth } from '../Context/AuthContext';

const API = 'http://localhost:3000/api';

const ArticuloCard = ({ articulo, onEditar, onEliminar, onAgregado }) => {
    const { usuario, esAdmin } = useAuth();

    const agregarAlCarrito = async () => {
        try {
            const res = await fetch(`${API}/carrito/agregar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id_usuario: usuario.id,
                    id_articulo: articulo.id_articulo,
                    cantidad: 1
                })
            });
            const data = await res.json();
            if (data.success && onAgregado) onAgregado();
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };

    return (
        <div style={styles.card}>
            {/* Imagen */}
            <div style={styles.imagenWrapper}>
                {articulo.imagen_url
                    ? <img src={articulo.imagen_url} alt={articulo.nombre} style={styles.imagen} />
                    : <div style={styles.sinImagen}>Sin imagen</div>
                }
                {/* Badge de estado */}
                <span style={{
                    ...styles.badge,
                    background: articulo.estado === 'activo' ? '#22c55e' : '#ef4444'
                }}>
                    {articulo.estado}
                </span>
            </div>

            {/* Info */}
            <div style={styles.info}>
                <h3 style={styles.nombre}>{articulo.nombre}</h3>
                <p style={styles.descripcion}>{articulo.descripcion || 'Sin descripción'}</p>

                <div style={styles.footer}>
                    <span style={styles.precio}>${Number(articulo.precio).toFixed(2)}</span>
                    <span style={styles.stock}>Stock: {articulo.stock}</span>
                </div>

                {/* Botones según rol */}
                <div style={styles.botones}>
                    {usuario && !esAdmin() && articulo.stock > 0 && (
                        <button style={styles.btnAgregar} onClick={agregarAlCarrito}>
                            + Agregar al carrito
                        </button>
                    )}

                    {esAdmin() && (
                        <>
                            <button style={styles.btnEditar} onClick={() => onEditar(articulo)}>
                                Editar
                            </button>
                            <button style={styles.btnEliminar} onClick={() => onEliminar(articulo.id_articulo)}>
                                Eliminar
                            </button>
                        </>
                    )}

                    {!usuario && (
                        <p style={styles.loginMsg}>Inicia sesión para comprar</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    imagenWrapper: {
        position: 'relative',
        height: '200px',
        background: '#f3f4f6',
    },
    imagen: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    sinImagen: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
        fontSize: '14px',
    },
    badge: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '2px 10px',
        borderRadius: '999px',
        color: '#fff',
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    info: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
    },
    nombre: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '700',
        color: '#111827',
    },
    descripcion: {
        margin: 0,
        fontSize: '13px',
        color: '#6b7280',
        lineHeight: '1.5',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4px',
    },
    precio: {
        fontSize: '20px',
        fontWeight: '800',
        color: '#111827',
    },
    stock: {
        fontSize: '12px',
        color: '#9ca3af',
    },
    botones: {
        marginTop: '8px',
        display: 'flex',
        gap: '8px',
    },
    btnAgregar: {
        flex: 1,
        padding: '10px',
        background: '#111827',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '13px',
    },
    btnEditar: {
        flex: 1,
        padding: '10px',
        background: '#f3f4f6',
        color: '#111827',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '13px',
    },
    btnEliminar: {
        flex: 1,
        padding: '10px',
        background: '#fee2e2',
        color: '#ef4444',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '13px',
    },
    loginMsg: {
        fontSize: '12px',
        color: '#9ca3af',
        margin: 0,
    }
};

export default ArticuloCard;
