import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { auth, loading } = useAuth();
/*   console.log(auth); */

  {
    if (loading) {
      return <p>Cargando...</p>;
    }
  }

  return (
    <>
      {auth._id ? (
        <div /* className="grid grid-cols-5 grid-flow-auto gap-2 m-7 bg-white/30 rounded-2xl" */ className="flex justify-start m-7 bg-white/30 rounded-2xl">
          <Header />
          <div className="container w-3/4">
            <Sidebar />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
