import { useState } from "react";

function Login() {
  // 👇 ahora inicia en LOGIN
  const [vista, setVista] = useState("login");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 REGISTRO
  const handleRegister = async () => {
    if (!nombre || !apellido || !email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_rol: 1,
          nombre,
          apellido,
          email,
          password: password,
          estado: "activo",
        }),
      });

      const data = await response.json();
      alert(data.message);

      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");

      // 👇 volver a login después de registrar
      setVista("login");

    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  // 🔹 LOGIN (simulado por ahora)
  const handleLogin = () => {
    if (!email || !password) {
      alert("Ingresa email y contraseña");
      return;
    }

    alert("Login exitoso (simulado)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7a2f0f]">
      <div className="bg-yellow-400 p-8 rounded-lg w-96">

        {/* 🔹 LOGIN */}
        {vista === "login" && (
          <>
            <h2 className="text-center font-bold mb-4">Iniciar Sesión</h2>

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-2"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-[#7a2f0f] text-white p-2"
            >
              Iniciar sesión
            </button>

            {/* 👇 REDIRECCIÓN A REGISTRO */}
            <p className="text-center mt-4 text-sm">
              ¿No tienes cuenta?{" "}
              <span
                onClick={() => setVista("registro")}
                className="text-blue-700 cursor-pointer underline"
              >
                Crear cuenta
              </span>
            </p>
          </>
        )}

        {/* 🔹 REGISTRO */}
        {vista === "registro" && (
          <>
            <h2 className="text-center font-bold mb-4">Registro</h2>

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 mb-2"
            />

            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full p-2 mb-2"
            />

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-2"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-[#7a2f0f] text-white p-2"
            >
              Crear cuenta
            </button>

            {/* 👇 VOLVER A LOGIN */}
            <p className="text-center mt-4 text-sm">
              ¿Ya tienes cuenta?{" "}
              <span
                onClick={() => setVista("login")}
                className="text-blue-700 cursor-pointer underline"
              >
                Iniciar sesión
              </span>
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default Login;