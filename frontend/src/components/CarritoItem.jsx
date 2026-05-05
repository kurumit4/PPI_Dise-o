const API = 'http://localhost:3000/api';

const CarritoItem = ({ item, onActualizado }) => {

    const cambiarCantidad = async (nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        await fetch(`${API}/carrito/cantidad/${item.id_detalle}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ cantidad: nuevaCantidad })
        });
        onActualizado();
    };

    const quitar = async () => {
        await fetch(`${API}/carrito/quitar/${item.id_detalle}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        onActualizado();
    };

    return (
        <div style={styles.fila}>
            {/* Imagen */}
            <div style={styles.imagenWrapper}>
                {item.imagen_url
                    ? <img src={item.imagen_url} alt={item.nombre} style={styles.imagen} />
                    : <div style={styles.sinImagen}>📦</div>
                }
            </div>

            {/* Info */}
            <div style={styles.info}>
                <p style={styles.nombre}>{item.nombre}</p>
                <p style={styles.precio}>${Number(item.precio_unitario).toFixed(2)} c/u</p>
            </div>

            {/* Controles de cantidad */}
            <div style={styles.controles}>
                <button style={styles.btnCantidad} onClick={() => cambiarCantidad(item.cantidad - 1)}>−</button>
                <span style={styles.cantidad}>{item.cantidad}</span>
                <button style={styles.btnCantidad} onClick={() => cambiarCantidad(item.cantidad + 1)}>+</button>
            </div>

            {/* Subtotal */}
            <p style={styles.subtotal}>${Number(item.subtotal).toFixed(2)}</p>

            {/* Quitar */}
            <button style={styles.btnQuitar} onClick={quitar}>✕</button>
        </div>
    );
};

const styles = {
    fila: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    },
    imagenWrapper: {
        width: '64px',
        height: '64px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#f3f4f6',
        flexShrink: 0,
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
        fontSize: '24px',
    },
    info: {
        flex: 1,
    },
    nombre: {
        margin: 0,
        fontWeight: '600',
        fontSize: '14px',
        color: '#111827',
    },
    precio: {
        margin: '4px 0 0',
        fontSize: '12px',
        color: '#9ca3af',
    },
    controles: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    btnCantidad: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        border: '1.5px solid #e5e7eb',
        background: '#fff',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
    },
    cantidad: {
        fontWeight: '700',
        fontSize: '15px',
        minWidth: '20px',
        textAlign: 'center',
    },
    subtotal: {
        fontWeight: '800',
        fontSize: '15px',
        color: '#111827',
        minWidth: '70px',
        textAlign: 'right',
        margin: 0,
    },
    btnQuitar: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#9ca3af',
        fontSize: '16px',
        padding: '4px',
    }
};

export default CarritoItem;
