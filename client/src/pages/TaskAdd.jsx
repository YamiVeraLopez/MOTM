import React from "react";
import { FormTask } from "../components/FormTask";

export const TaskAdd = () => {
  return (
    <>
      <div className="container w-full h-full p-3">
        <div className="bg-white/10 rounded-lg h-full p-4">
          <div>
            <h1 className="font-serif font-extrabold text-lg text-slate-700">
              Crear Tarea
            </h1>
          </div>
          <div className="container">
            <FormTask />
          </div>
        </div>
      </div>
    </>
  );
};
