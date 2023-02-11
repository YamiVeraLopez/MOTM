import { useState, useEffect, useRef } from "react";
import { useForm } from "../hooks/useForm";
import { Button } from "./Button";
import { InputFormProject } from "./InputFormProject";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";
import { useParams } from "react-router-dom";

export const FormProject = () => {
  const [sending, setSending] = useState(false);

  const { alert, showAlert, storeProject, project } = useProjects();

  const { id } = useParams();

  const inputName = useRef(null);
  const inputDescription = useRef(null);
  const inputDateExpire = useRef(null);
  const inputClient = useRef(null);

  const { formValues, handleInputChange, reset, setFormValues } = useForm({
    name: "",
    description: "",
    dateExpire: "",
    client: "",
  });

  let { name, description, dateExpire, client } = formValues;

  useEffect(() => {
    if (id) {
      //const { name, description, dateExpire, client } = project;

      inputName.current.value = project.name;
      inputDescription.current.value = project.description;
      inputDateExpire.current.value = project.dateExpire/* .split('T')[0]; */
      inputClient.current.value = project.client;

      setFormValues({
        name : project.name,
        description : project.description,
        dateExpire : project.dateExpire,
        client : project.client
      });      
    }

  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, dateExpire, client].includes("")) {
      showAlert("Todos los campos son obligatorios", true);

      return null;
    }

    try {
      setSending(true);

      /* console.log(name, description, dateExpire, client);

      return null */

      storeProject({
        id : id ? id : null,
        name,
        description,
        dateExpire,
        client,
      });

      console.log(data.msg);

      setSending(false);

      Swal.fire({
        icon: "info",
        tittle: "¡Proyecto agregado con éxito!",
        text: data.msg,
      });

      reset();
    } catch (error) {
      console.log(error);
      /*  showAlert(error.response ?.data.msg); */
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

        <InputFormProject
          label="Nombre Cliente"
          id="client"
          type="text"
          placeholder="Nombre del cliente"
          value={client}
          cb={handleInputChange}
          name="client"
          reference={inputClient}
        />

        <Button info="guardar" />
      </form>
    </>
  );
};
