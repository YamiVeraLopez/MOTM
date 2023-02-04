import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { clientAxios } from "../config/clientAxios";
import lockIcon from "../../public/lockIcon.svg";
import { Input } from "../components/Input";
import { BaseForms } from "../components/BaseForms";

export const RecoverPassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });

    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await clientAxios.get(
          `/auth/reset-password?token=${token}`
        );

        setTokenChecked(true);
      } catch (error) {
        console.error(error);
        handleShowAlert(error.response?.data.msg);
      }
    };

    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      handleShowAlert("La contraseña es requerida");
      return null;
    }

    try {
      const { data } = await clientAxios.post(
        `/auth/reset-password?token=${token}`,
        {
          password,
        }
      );

      Swal.fire({
        icon: "info",
        tittle: "¡Contraseña actualizada!",
        text: data.msg,
        confirmButtonText: "Iniciá sesión",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setPassword("");
          navigate("/");
        }
      });
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
      setPassword("");
    }
  };

  return (
    <>
      <BaseForms>
        <h1 className="font-serif font-bold text-violet-900 text-2xl text-center italic underline underline-offset-8 uppercase my-5">
          Reestablecé tu contraseña
        </h1>

        {alert.msg && <Alert {...alert} />}

        {tokenChecked ? (
          <form onSubmit={handleSubmit}>
            {/* <div>
      <label htmlFor="password">Nueva contraseña</label>
      <input
        id="password"
        type="password"
        placeholder="Escribí tu nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div> */}
            <Input
              autoComplete="off"
              id="password"
              type="password"
              placeholder="Escribí tu nueva contraseña"
              value={password}
              name="password"
              cb={(e) => setPassword(e.target.value)}
              icon={lockIcon}
            />
            <Button info="Reestablecer contraseña" />
          </form>
        ) : (
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
        )}
      </BaseForms>
    </>
  );
};
