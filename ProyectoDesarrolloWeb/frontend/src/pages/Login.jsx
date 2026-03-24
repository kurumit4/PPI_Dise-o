import { useState } from "react"; // useState para manejar el estado de los inputs 

function login(){

  
    const [email, setEmail] = useState(""); //declaramos el estado para el email y la función para actualizarlo
    const [password, setPassword] = useState(""); //declaramos el estado para la contraseña y la función para actualizarlo

 
    const LogicaLogin= (e) => { //función que se ejecuta al enviar el formulario
        e.preventDefault();

        if (email === "admin@test.com" && password === "1234") { //validamos el email y la contraseña
            alert("Inicio de sesión exitoso");
        } else {
            alert("Datos incorrectos");
        }
    };

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

                <div className="text-center">
                    <p className="text-gray-600 m-4">Inicia sesión en tu cuenta</p>
                </div>

                
                <form onSubmit={LogicaLogin} className="space-y-4"> //cuando se envíe el formulario se ejecutará la función LogicaLogin

                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} //actualizamos el estado del email cada vez que el usuario escribe en el input
                        className="w-full p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#7a2f0f] text-white p-3 rounded-lg"
                    >
                        Iniciar sesión
                    </button>

                </form>

            </div>
        </div>
    )
}

export default login;