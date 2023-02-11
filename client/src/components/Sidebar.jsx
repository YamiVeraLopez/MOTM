import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Sidebar = () => {
  const { auth } = useAuth();

const name = auth.name;
 
  return (
    <div className="container flex items-center justify-center">
        <div className="p-4">
            <h1 className="font-serif font-extrabold text-lg text-slate-700"> ¡Hola : {name ? name : "Nombre de usuario"} ! 👋 </h1>
        </div>
     {/*  <Link to="create-project">Nuevo proyecto</Link> */}
    </div>
  );
};
