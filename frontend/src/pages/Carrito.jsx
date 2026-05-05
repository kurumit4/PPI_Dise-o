import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api';

const Carrito = ({ id_usuario }) => {
    const [items, setItems] = useState([]);

    const cargarCarrito = async () => {
        const res = await fetch(`${API}/carrito/${id_usuario}`);
        const data = await res.json();
        setItems(data.data || []);
    };

    useEffect(() => { cargarCarrito(); }, []);

    const cambiarCantidad = async (id_detalle, cantidad) => {
        if (cantidad < 1) return;
        await fetch(`${API}/carrito/cantidad/${id_detalle}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad })
        });
        cargarCarrito();
    };

    const quitar = async (id_detalle) => {
        await fetch(`${API}/carrito/quitar/${id_detalle}`, { method: 'DELETE' });
        cargarCarrito();
    };

    const confirmar = async () => {
        const res = await fetch(`${API}/carrito/confirmar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_usuario })
        });
        const data = await res.json();
        if (data.success) {
            alert(`Compra confirmada. Orden #${data.data.id_orden} - Total: $${data.data.total}`);
            cargarCarrito();
        }
    };

    const total = items.reduce((acc, item) => acc + item.subtotal, 0);

    return (
        <div>
            <h2>Mi Carrito</h2>

            {items.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    {items.map(item => (
                        <div key={item.id_detalle}>
                            <span>{item.nombre}</span>
                            <span>${item.precio_unitario}</span>

                            <button onClick={() => cambiarCantidad(item.id_detalle, item.cantidad - 1)}>-</button>
                            <span>{item.cantidad}</span>
                            <button onClick={() => cambiarCantidad(item.id_detalle, item.cantidad + 1)}>+</button>

                            <span>Subtotal: ${item.subtotal}</span>
                            <button onClick={() => quitar(item.id_detalle)}>Quitar</button>
                        </div>
                    ))}

                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={confirmar}>Confirmar compra</button>
                </>
            )}
        </div>
    );
};

export default Carrito;