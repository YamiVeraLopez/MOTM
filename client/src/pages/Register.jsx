import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import imgLogo from "../../public/motm.png";
import envelope from "../../public/envelope.svg";
import lockIcon from "../../public/lockIcon.svg";
import userIcon from "../../public/userIcon.svg";
import { Input } from "../components/Input";
import { BaseForms } from "../components/BaseForms";
import { Button } from "../components/Button";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {
  const [alert, setAlert] = useState({});
  const [sending, setSending] = useState(false);

  const { formValues, handleInputChange, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formValues);

    if ([name, email, password, password2].includes("")) {
      handleShowAlert("Todos los campos son obligatorios");
      return null;
    }

    if (!exRegEmail.test) {
      handleShowAlert("El email tiene un formato no válido");
      return null;
    }

    if (password !== password2) {
      handleShowAlert("Las contraseñas no coinciden");
      return null;
    }

    try {
      setSending(true);

      const { data } = await clientAxios.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(data.msg);

      setSending(false);

      Swal.fire({
        icon: "info",
        tittle: "¡Gracias por registrarte!",
        text: data.msg,
      });

      reset();
    } catch (error) {
      console.log(error);
      handleShowAlert(error.response?.data.msg);
      reset();
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
              Creá tu cuenta
            </h1>

            {alert.msg && <Alert {...alert} />}
            <form onSubmit={handleSubmit}>
              <Input
                autoComplete="off"
                id="name"
                type="text"
                placeholder="Ingrese su nombre"
                value={name}
                name="name"
                cb={handleInputChange}
                icon={userIcon}
              />

              <Input
                autoComplete="off"
                id="email"
                type="email"
                placeholder="Ingrese su email"
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

              <Input
                autoComplete="off"
                id="password2"
                type="password"
                placeholder="Reingrese su contraseña"
                value={password2}
                name="password2"
                cb={handleInputChange}
                icon={lockIcon}
              />              
              <Button info="Crear cuenta" />
            </form>
            <nav className="md:flex md:justify-between">
              <Link
                to={"/"}
                className=" text-violet-800 block text-center my-3 text-sm font-semibold"
              >
                ¿Estás registrado?{" "}
                <span className="hover:underline decoration-violet-800 underline-offset-4">
                  Iniciá sesión
                </span>{" "}
              </Link>
            </nav>
      </BaseForms>
    </>
  );
};
