import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import useAuth from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import imgLogo from "../../public/motm.png";
import envelope from "../../public/envelope.svg";
import lockIcon from "../../public/lockIcon.svg";
import { Input } from "../components/Input";

export const Login = () => {
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();

  const handleShowAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }

    reset();
  };

  const { formValues, handleInputChange, reset } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      handleShowAlert("Todos los campos son obligatorios");
      return null;
    }

    try {
      const { data } = await clientAxios.post("/auth/login", {
        email,
        password,
      });

      //console.log(data);

      setAuth(data.user);
      sessionStorage.setItem("token", data.token);

     /*  navigate('/') */
    } catch (error) {
      console.log(error);
      handleShowAlert(error.response?.data.msg);
    }
  };

  return (
    <>
      <div className="container flex justify-center items-center mx-auto mt-20 md:mt-10 p-5 md:flex md:justify-center ">
        <div className="md:w-2/3 lg:w-2/5 ">
          <div className="p-10 max-w-auto mx-auto h-min backdrop-blur-sm bg-white/30 shadow-violet-400 rounded-3xl shadow-lg items-center">
            <div className="w-40 h-40 rounded-full shadow-violet-400 shadow-lg">
              <img
                src={imgLogo}
                alt="Logo"
                className="object-contain w-40 h-40 rounded-full"
              />
            </div>

            <h1 className="font-serif font-bold text-violet-900 text-2xl text-center italic underline underline-offset-8 uppercase my-5">
              Inicia sesión
            </h1>

            {alert.msg && <Alert {...alert} />}

            <form onSubmit={handleSubmit} noValidate>
              <Input
                autoComplete="off"
                id="email"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                name="email"
                cb={handleInputChange}
                icon={envelope}
              />

              <Input
                autoComplete="off"
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                name="password"
                cb={handleInputChange}
                icon={lockIcon}
              />

              <button
                type="submit"
                /* disabled={sending} */
                className="w-full py-3 my-3 text-violet-800 uppercase font-mono font-bold bg-transparent border-2 border-violet-800 rounded-2xl content-center justify-center hover:bg-violet-600 hover:border-transparent hover:text-pink-100 transition-colors mb-4 shadow-violet-400 shadow-md"
              >
                Iniciar sesión
              </button>
            </form>
            <nav className="md:flex md:justify-between">
              <Link
                to={"/register"}
                className=" text-violet-800 block text-center my-3 text-sm font-semibold"
              >
                ¿No tenés una cuenta?{" "}
                <span className="hover:underline decoration-violet-800 underline-offset-4">
                  Registrate
                </span>
              </Link>
              <Link
                to={"/forget-password"}
                className=" text-violet-800 block text-center my-3 text-sm font-semibold"
              >
                <span className="hover:underline decoration-violet-800 underline-offset-4">
                  Olvidé mi password
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
