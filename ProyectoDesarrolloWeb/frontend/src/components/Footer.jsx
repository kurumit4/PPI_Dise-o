export default function Footer() {
    return (
      <footer className="bg-[#7a2f0f] m-0 p-0">
        <div className="text-center text-white py-5 flex justify-center">
          <div className="text-center text-center p-4 border-r border-[#5a1f07]">
          <h3 className="font-bold mb-2">Contacto</h3>
          <p className="mb-3">servicioalcliente@mimos.com.co</p>
          <div className="flex justify-center gap-3">
            <div className="bg-[#5a1f07] rounded-full w-7 h-7 flex items-center justify-center">f</div>
            <div className="bg-[#5a1f07] rounded-full w-7 h-7 flex items-center justify-center">x</div>
            <div className="bg-[#5a1f07] rounded-full w-7 h-7 flex items-center justify-center">ig</div>
          </div>
        </div>

        <div className="text-center border-[#5a1f07] p-4 border-r">
          <h3 className="font-bold mb-2">Horario</h3>
          <p>Todos los días</p>
          <p className="mb-2">11AM-8PM</p>
          <p className="text-sm mb-4">Puede variar según punto de venta</p>
          <button className="border border-red-600 px-4 py-1 text-sm">
            Encuéntranos aquí
          </button>
        </div>

        <div className="text-center border-[#5a1f07] p-4">
          <h3 className="font-bold mb-3">Políticas</h3>
          <ul className="text-sm font-semibold space-y-1">
            <li>Aviso de Privacidad</li>
            <li>Política de Tratamiento de datos Personales</li>
            <li className="ml-4">Línea Ética</li>
            <li>Política de Cookies</li>
            <li>Formato de denuncias PTEE</li>
            <li>Términos y Condiciones</li>
            <li className="ml-4">Legales Promos</li>
          </ul>
        </div>
        </div>
        <div className="text-center text-sm text-white/80 bg-[#7a2f0f] text-white px-4 py-4 m-0">
        <div className="text-4xl mb-2"></div>
          <p>Mimos® - 2026. Todos los derechos reservados.</p>
        </div>

      </footer>
      
    );
  }