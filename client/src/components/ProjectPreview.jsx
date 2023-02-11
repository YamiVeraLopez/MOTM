import React from "react";
import { Link } from "react-router-dom";
/* import plus from "/plus-solid.svg"; */

export const ProjectPreview = ({
  name,
  _id,
  client,
  createdAt,
  collaborators,
}) => {
  const formateador = new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" });
  const fecha = new Date(createdAt);
  const fechaFormateada = formateador.format(fecha);

  return (
    <>
      <div className="w-2/3 bg-gradient-to-tr from-bg-purple-500 to-pink-300 rounded-2xl p-3 shadow-md shadow-purple-400 hover:scale-105 hover:transition-all m-4">
        <p className="font-serif font-thin text-xs text-start text-slate-700">
          {fechaFormateada}
          {/* {createdAt} */}
        </p>

        <div>
          <h3 className="font-serif font-bold capitalize text-violet-900 text-center text-lg my-2">
            {name}
          </h3>
          <h4 className="font-serif font-thin capitalize text-violet-900 text-center text-lg my-2">
            {/* Cliente */} {client}
          </h4>
        </div>

        <div>
          <p className="font-serif font-semibold text-sm text-start text-slate-700">
            Progreso
          </p>
          <div>barra de progreso</div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {collaborators.length ? collaborators.map((collaborator) => (
               <div className=" w-8 h-8 p-2 rounded-full bg-violet-400 items-center justify-center flex ml-0 my-3 shadow-sm shadow-pink-500">
               <p className="font-serif font-thin text-xs text-center text-pink-50">
                 {collaborator.name.charAt(0)}
               </p>
               {/*  colaboradores */}
             </div>
            )): ""}

              {/* {[1, 2].map((collaborator) => (
              <Collaborator />
            ))} */}

            {/*   <div className=" w-8 h-8 p-2 rounded-full bg-violet-400 items-center justify-center flex ml-0 my-3 shadow-sm shadow-pink-500">
                <p className="font-serif font-thin text-xs text-center text-pink-50">
                  Y
                </p>
              </div> */}
              <div className=" w-8 h-8 p-2 rounded-full bg-violet-400 items-center justify-center flex ml-0 my-3 shadow-sm shadow-pink-500">
                <Link to={``} className="font-serif font-extrabold text-md text-center text-pink-50 ">
                  +
                </Link>
                {/*  colaboradores */}
              </div>
            </div>

            <div className="w-max h-min p-2 bg-violet-500 rounded-2xl shadow-sm shadow-pink-500">
              <Link
                to={`/projects/${_id}`}
                className="font-serif font-thin text-xs text-center text-pink-100"
              >
                Ver proyecto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
