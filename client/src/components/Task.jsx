import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import trash from "/trash.svg";
import edit from "/edit.svg";
import Swal from "sweetalert2";

export const Task = ({name, description, dateExpire, priority, id }) => {

/*   const { id } = useParams(); */
  

  const {
    getProject,
    task,
    setTask,
    getTask,
    deleteTask,

  } = useProjects();

/*   const {
    loading,
    alert,
    getProject,
    project,
    deleteProject,
    handleShowModal,
    showModal,
    setShowModal,
  } = useProjects(); */

 /*  const { name, description, dateExpire, client, tasks } = project; */

  /* useEffect(() => {
    getTask(id);
  }, [id]); */

  const handleDeleteTask = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar la tarea?",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
      }
    });
  };


  return (
    <div className="container min-w-full h-full p-3 bg-white/30 rounded-2xl">
      <div>
        <p className="font-serif font-bold text-slate-600 text-sm mx-1 mt-2 ">
          {name}
        </p>
        <p className="font-serif font-extraligth text-slate-600 text-xs mx-1 mt-2">
          {description}
        </p>
        <p className="font-serif font-extraligth text-slate-600 text-xs mx-1 mt-2">
          {dateExpire}
        </p>
        <p className="font-serif font-extraligth text-slate-600 text-xs mx-1 mt-2">
          {priority}
        </p>
      </div>
      <div className="flex justify-around items-center my-3">
        <div
          className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-violet-300 rounded-lg hover:bg-gradient-to-r from-bg-purple-300 to-pink-300 "
          /* onClick={handleModalAddCollaborator} */
        >
          <Link to={`edit-task/${id}`}
            className="flex justify-center items-center " /* onClick={handleDelete} */
          >
            <img src={edit} alt="" className="w-5 h-5 mx-1" />
            <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
              Editar
            </p>
          </Link>
        </div>
        <div
          className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-violet-300 rounded-lg hover:bg-gradient-to-r from-bg-purple-300 to-pink-300 " >
          <button
            className="flex justify-center items-center " /* onClick={} */
          >
            {/* <img src={trash} alt="" className="w-5 h-5 mx-1" /> */}
            <p className="font-serif font-extralight text-slate-500 text-xs mx-1 h-5 text-center">
            Completa/Incompleta
            </p>
          </button>
        </div>
        <div
          className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-pink-300 rounded-lg hover:bg-pink-300 "
          /* onClick={} */
        >
          <button
            className="flex justify-center items-center " onClick={handleDeleteTask}
          >
            <img src={trash} alt="" className="w-5 h-5 mx-1" />
            <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
              Eliminar
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
