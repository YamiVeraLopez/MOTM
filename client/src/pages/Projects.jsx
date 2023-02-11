import React from "react";
import { useEffect } from "react";
import { Alert } from "../components/Alert";
import { ProjectPreview } from "../components/ProjectPreview";
import { useProjects } from "../hooks/useProjects";

export const Projects = () => {

  const {loading, alert, projects, getProjects} = useProjects();

  useEffect(() => {     
    getProjects()
  }, [])
  
  if(alert.msg){
    return <Alert {...alert}/>
    }
   
  return (
    <>
      <div className="ml-4 my-5">
        <h1 className="font-serif font-extrabold text-lg text-slate-700">
          Proyectos
        </h1>

        <div className="container w-full h-full flex flex-wrap">
          { loading ? 

          <p>Cargando...</p> :

          projects.length ? (
            projects.map((project) => <ProjectPreview key={project._id}
            {...project} />)
          ) : (
            <p>No hay proyectos agregados</p>
          )}
        </div>
      </div>
    </>
  );
};
