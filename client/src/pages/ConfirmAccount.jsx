import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { BaseForms } from "../components/BaseForms";

export const ConfirmAccount = () => {
  const {token} = useParams();

  const navigate = useNavigate();

  const [alert, setAlert] = useState({});

  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });

    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clientAxios.get(`/auth/checked?token=${token}`);

        Swal.fire({
          icon: "info",
          tittle: "¡Felicitaciones!",
          text: data.msg,
          confirmButtonText: "Iniciá sesión",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } catch (error) {
        console.error(error);
        handleShowAlert(error.response?.data.msg);
      }
    };

    confirmAccount();
  }, []);

  return (
    <>
    <BaseForms>
    <h1 className="font-serif font-bold text-violet-900 text-2xl text-center italic underline underline-offset-8 uppercase my-5">
        Confirma tu cuenta
      </h1>
      {/* <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white"> */}
        {alert.msg && (
          <>
            <Alert {...alert} />
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
          </>
        )}
    {/*   </div> */}
    </BaseForms>
      
    </>
  );
};
