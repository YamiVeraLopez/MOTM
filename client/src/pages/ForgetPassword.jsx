import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { BaseForms } from "../components/BaseForms";
import envelope from "../../public/envelope.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const ForgetPassword = () => {
  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      handleShowAlert("El email es requerido");
      return null;
    }

    try {
      setSending(true);

      const { data } = await clientAxios.post("/auth/send-token", {
        email,
      });

      setSending(false);

      Swal.fire({
        icon: "info",
        tittle: "Revisa tu casilla de correo",
        text: data.msg,
        confirmButtonText: "Entendido",
        allowOutsideClick: false,
      });

      setEmail("");
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);

      setEmail("");
    }
  };

  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });

    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  return (
    <>
      <BaseForms>
        <h1 className="font-serif font-bold text-violet-900 text-2xl text-center italic underline underline-offset-8 uppercase my-5">
          Recupera tu acceso
        </h1>
        {alert.msg && <Alert {...alert} />}

        <form onSubmit={handleSubmit}>

          <Input
            autoComplete="off"
            id="email"
            type="email"
            placeholder="Ingrese su email"
            value={email}
            name="email"
            cb={(e) => setEmail(e.target.value)}
            icon={envelope}
          />

          <Button info="Recuperar contraseña" />
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
            to={"/"}
            className=" text-violet-800 block text-center my-3 text-sm font-semibold"
          >
            ¿Estás registrado?{" "}
            <span className="hover:underline decoration-violet-800 underline-offset-4">
              Iniciá sesión
            </span>
          </Link>
        </nav>
      </BaseForms>
    </>
  );
};
