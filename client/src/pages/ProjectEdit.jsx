import React from "react";
import { Button } from "../components/Button";
import { FormProject } from "../components/FormProject";
import { useProjects } from "../hooks/useProjects";
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";
import trash from "/trash.svg";

export const ProjectEdit = () => {

  const {deleteProject, project} = useProjects();
  const {id} = useParams();

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro de eliminar el proyecto?',
      showCancelButton: true,
      confirmButtonColor : 'red',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(project._id)
      } 
    })
  }

  return (
    <>
      <div className="container w-full h-full p-3">
        <div className="bg-white/10 rounded-lg h-full p-4">
          <div className=" w-full flex justify-between items-center my-3">
            <h1 className="font-serif font-extrabold text-lg text-slate-700">
              Editar proyecto: Nombre del proyecto
            </h1>

            <div className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-violet-300 rounded-lg hover:bg-gradient-to-r from-bg-purple-300 to-pink-300">
              <button className="flex justify-center items-center" onClick={handleDelete}>
                <img src={trash} alt="" className="w-5 h-5 mx-1" />
                <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
                  Eliminar
                </p>
              </button>
            </div>
          </div>

          <div className="container">
            <FormProject />
          </div>
        </div>
      </div>
    </>
  );
};
