import { useState } from "react";

function Login() {
  // Este estado controla qué formulario se ve: "login" o "registro"
  const [vista, setVista] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7a2f0f] py-12 px-4">
      <div className="bg-yellow-400 rounded-lg shadow-xl p-8 max-w-md w-full">
        
        <div className="flex justify-center">
          <img
            src="https://www.mimos.com.co/wp-content/uploads/2022/07/newlogomimos.png"
            alt="Mimos logo"
            className="w-32 h-auto"
          />
        </div>

   
        {vista === "login" && (
          <>
            <div className="text-center">
              <p className="text-gray-600 m-4 font-bold">Inicia sesión en tu cuenta</p>
            </div>

            <form className="space-y-4">
              <input type="email" placeholder="Correo" className="w-full p-3 rounded-lg" />
              <input type="password" placeholder="Contraseña" className="w-full p-3 rounded-lg" />
              <button type="button" className="w-full bg-[#7a2f0f] text-white p-3 rounded-lg font-bold">
                Iniciar sesión
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-700 text-sm">
                ¿No tienes una cuenta?{" "}
                <button 
                  onClick={() => setVista("registro")}
                  className="text-[#7a2f0f] font-bold underline"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </>
        )}

  
        {vista === "registro" && (
          <>
            <div className="text-center">
              <p className="text-gray-600 m-4 font-bold">Crea tu cuenta nueva</p>
            </div>

            <form className="space-y-4">
              <input type="text" placeholder="Nombre completo" className="w-full p-3 rounded-lg" />
              <input type="email" placeholder="Correo electrónico" className="w-full p-3 rounded-lg" />
              <input type="password" placeholder="Contraseña" className="w-full p-3 rounded-lg" />
              <button type="button" className="w-full bg-[#7a2f0f] text-white p-3 rounded-lg font-bold">
                Crear cuenta
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => setVista("login")} 
                className="text-[#7a2f0f] text-sm font-bold underline"
              >
                Volver al inicio de sesión
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Login;