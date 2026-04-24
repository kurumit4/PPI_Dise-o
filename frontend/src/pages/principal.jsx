const productos = [
  {
    nombre: "Mixer",
    imagen: "https://www.mimos.com.co/wp-content/uploads/2022/07/mixercategory2.png",
  },
  {
    nombre: "Mundo Mágico",
    imagen: "https://www.mimos.com.co/wp-content/uploads/2024/08/ninoscategory6.png",
  },
  {
    nombre: "Sundae",
    imagen: "https://www.mimos.com.co/wp-content/uploads/2022/07/sundacategory1.png",
  },
  {
    nombre: "Mimos",
    imagen: "https://www.mimos.com.co/wp-content/uploads/2022/07/mimoscategory3.png",
  },
  {
    nombre: "Malteadas",
    imagen: "https://www.mimos.com.co/wp-content/uploads/2022/07/malteadascategory4.png",
  },
  {
    nombre: "Copas",
    imagen: "https://www.mimos.com.co/wp-content/uploads/2022/07/copascategory5.png",
  },
  {
    nombre: "Empacados",
    imagen: "https://www.mimos.com.co/wp-content/uploads/2022/07/empacadoscategory7.png",
  }
];

function Principal() {
  return (
    <div>
      <Hero />
      <Menu />
      <Invitacion />
    </div>
  );
}

function Hero() {
  return (
    <div className="w-full m-0">
      <img
        src="https://www.mimos.com.co/wp-content/uploads/2026/02/BANNER-WEB_JUMBO.jpg.jpeg"
        alt="Helados Mimos - Banner promocional"
        className="w-full h-auto block m-0"
      />
    </div>
  );
}

function Menu() {
  return (
    <div className="py-10 px-4">
      <h2 className="text-4xl font-bold text-center pb-6">
        Nuestro <span className="text-red-500">Menú</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
        {productos.map((producto) => (
          <Tarjeta
            key={producto.nombre}
            nombre={producto.nombre}
            imagen={producto.imagen}
          />
        ))}
      </div>
    </div>
  );
}

function Tarjeta({ nombre, imagen }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <img
        src={imagen}
        className="w-full h-48 object-contain p-6 bg-pink-50"
      />
      <div className="p-4">
        <h3 className="text-center font-bold">
          {nombre}
        </h3>
        <button className="mx-auto block w-40 py-2.5 rounded-full bg-red-500 text-white font-semibold">
          Ver producto
        </button>
      </div>
    </div>
  );
}

function Invitacion() {
  return (
    <div className="w-full">
      <img
        src="https://www.mimos.com.co/wp-content/uploads/2022/07/imagenfranquicia.png"
        alt="Invitación a franquicias Helados Mimos"
        className="w-full h-auto block bg-orange-500"
      />
    </div>
  );
}

export default Principal;