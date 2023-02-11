import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import edit from "/edit.svg";
import trash from "/trash.svg";
import plus from "/plus-solid.svg";
import addUser from "/addUser.svg";
import { Alert } from "../components/Alert";
import { Collaborator } from "../components/Collaborator";
import { Task } from "../components/Task";
import Swal from "sweetalert2";

export const Project = () => {
  const { id } = useParams();

  const { loading, alert, getProject, project, deleteProject } = useProjects();

  const { name, description, dateExpire, client, tasks, collaborators } = project;

  useEffect(() => {
    getProject(id);
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el proyecto?",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(project._id);
      }
    });
  };

  if (alert.msg) return <Alert {...alert} />;

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="container min-w-full h-full p-3 bg-white/30 rounded-2xl">
            <div className="flex items-center justify-between py-4 ml-4">
              <h1 className="font-serif font-extrabold text-xl uppercase text-violet-900">
                {name}
              </h1>

              <div className="flex items-center mr-4">
                <div className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-violet-300 rounded-lg hover:bg-gradient-to-r from-bg-purple-300 to-pink-300 mr-4">
                  <Link
                    to={`/projects/edit-project/${id}`}
                    className="flex justify-center items-center"
                  >
                    <img src={edit} alt="" className="w-5 h-5 mx-1" />
                    <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
                      Editar
                    </p>
                  </Link>
                </div>
                <div
                  className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-pink-300 rounded-lg hover:bg-pink-300 "
                  /* onClick={} */
                >
                  <button
                    className="flex justify-center items-center " onClick={handleDelete}
                  >
                    <img src={trash} alt="" className="w-5 h-5 mx-1" />
                    <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
                      Eliminar
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="container min-w-full h-full p-3 bg-white/30 rounded-2xl flex justify-between items-center">
              <p className="font-serif font-extrabold text-md text-slate-600">
                Tareas del proyecto
              </p>

              <div
                className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-violet-300 rounded-lg hover:bg-gradient-to-r from-bg-purple-300 to-pink-300 mr-1"
                /*  onClick={handleModalForm} */
              >
                <Link to={'/projects/created-task'}
                  className="flex justify-center items-center"
                >
                  <img src={plus} alt="" className="w-5 h-5 mx-1" />
                  <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
                    Nueva Tarea
                  </p>
                </Link>
              </div>
            </div>
            Aquí se mostrarán todas las tareas //todo: componente Task
            {tasks ? tasks.map((task) => (
              <Task key={task.name} name={task.name} description={task.description} dateExpire={task.dateExpire} id={task._id} priority={task.priority} />
            )) : "" }
            <div className="container min-w-full h-full p-3 bg-white/30 rounded-2xl flex justify-between items-center">
              <p className="font-serif font-extrabold text-md text-slate-600">
                Colaboradores
              </p>

              <div
                className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-violet-300 rounded-lg hover:bg-gradient-to-r from-bg-purple-300 to-pink-300 mr-1"
                /* onClick={handleModalAddCollaborator} */
              >
                <button className="flex justify-center items-center">
                  <img src={addUser} alt="" className="w-5 h-5 mx-1" />
                  <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
                    Agregar colaborador
                  </p>
                </button>
              </div>
            </div>
            Aquí se mostrarán todos los colaboradores //todo: componente
            Collaborator
            {[1, 2].map((collaborator) => (
              <Collaborator key={collaborator} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
