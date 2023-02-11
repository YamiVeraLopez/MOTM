import React from "react";
import { FormProject } from "../components/FormProject";

export const ProjectAdd = () => {
  return (
    <>
      <div className="container w-full h-full p-3">
        <div className="bg-white/10 rounded-lg h-full p-4">
          <div>
            <h1 className="font-serif font-extrabold text-lg text-slate-700">
              Crear proyecto
            </h1>
          </div>
          <div className="container">
            <FormProject />
          </div>
        </div>
      </div>
    </>
  );
};
