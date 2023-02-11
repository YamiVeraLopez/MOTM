import { useState, useEffect, useRef } from "react";
import { useForm } from "../hooks/useForm";
import { Button } from "./Button";
import { InputFormProject } from "./InputFormProject";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";
import { useParams } from "react-router-dom";

export const FormTask = () => {

    const [sending, setSending] = useState(false);

  const { alert, showAlert, storeTask, project, getTask } = useProjects();

  const { idTask } = useParams();

console.log(idTask);

  const inputName = useRef(null);
  const inputDescription = useRef(null);
  const inputDateExpire = useRef(null);
  const inputPriority = useRef(null);

  const { formValues, handleInputChange, reset, setFormValues} = useForm({
    name: "",
    description: "",
    dateExpire: "",
    priority: "",
  });

 
  let { name, description, dateExpire, priority } = formValues;



   useEffect(() => {
    if (id) {


      inputName.current.value = task.name;
      inputDescription.current.value = task.description;
      inputDateExpire.current.value = task.dateExpire/* .split('T')[0]; */
      inputPriority.current.value = task.priority;

      setFormValues({
        name : task.name,
        description : task.description,
        dateExpire : task.dateExpire,
        priority : task.priority
      });      
    }

  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.table(name, description, priority, dateExpire);

    if ([name, description, priority, dateExpire].includes("")) {
      showAlert("Todos los campos son obligatorios");
      return null;
    }

    try {
        setSending(true);

        storeTask({
            id: id ? id : null,
            name,
            description,
            dateExpire,
            priority,
          });
     
        setSending(false);

        Swal.fire({
          icon: "info",
          tittle: "¡Tarea agregada con éxito!",
          text: data.msg,
        });
  
        reset();
    } catch (error) {
        console.log(error);
        showAlert(
          error.response ? error.response.data.msg : "Upps.. hubo un error",
          false
        );
        reset();
    }

  };

  return (
    <>
    
      <form
        onSubmit={handleSubmit}
        className="container min-w-full h-full p-3 bg-white/30 rounded-2xl"
      >
        {alert.msg && <Alert {...alert} />}

        <InputFormProject
          label="Nombre Proyecto"
          id="name"
          type="text"
          placeholder="Nombre del proyecto"
          value={name}
          name="name"
          cb={handleInputChange}
          reference={inputName}
        />

        <div className="my-2 m-auto flex flex-wrap justify-center items-center">
          <label
            htmlFor="description"
            className="font-serif font-medium text-purple-700 text-md w-full text-start ml-4"
          >
            Descripción
          </label>
          <textarea
            id="description"
            type="text"
            style={{ resize: "none" }}
            placeholder="Descripción del proyecto"
            className="placeholder:italic placeholder:text-violet-300 block bg-pink-100 w-full border border-b-violet-700 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none  focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm font-serif text-xs text-pink-900 m-2 max-w-lg"
            value={description}
            onChange={handleInputChange}
            name="description"
            ref={inputDescription}
          />
        </div>

        <InputFormProject
          label="Fecha de entrega"
          id="date-expire"
          type="date"
          value={dateExpire}
          cb={handleInputChange}
          name="dateExpire"
          reference={inputDateExpire}
        />

        <div className="my-2 m-auto flex flex-wrap justify-center items-center">
          <label
            htmlFor="priority"
            className="font-serif font-medium text-purple-700 text-md w-full text-start ml-4"
          >
            Prioridad
          </label>
          <select
            className="placeholder:italic placeholder:text-violet-300 block bg-pink-100 w-full border border-b-violet-700 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none  focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm font-serif text-xs text-pink-900 m-2 max-w-lg"
            name="priority"
            ref={inputPriority}
            onChange={handleInputChange}
          >
            <option value="" hidden defaultValue={true} key="">
              Seleccione...
            </option>
            {["Baja", "Media", "Alta"].map((prioridad) => (
              <option value={prioridad} key={prioridad}>
                {prioridad}
              </option>
            ))}
          </select>
        </div>

        <Button info="Guardar tarea" />
      </form>
    </>
  );
};
