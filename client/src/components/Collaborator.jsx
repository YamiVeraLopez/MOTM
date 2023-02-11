import React from "react";
import { Button } from "./Button";
import trash from "/trash.svg"

export const Collaborator = (/* {name, email} */) => {
  return (
    <>      
      <div className="flex justify-between items-center my-6" /* key={id} */>
        <p className="font-serif font-bold text-slate-600 text-md mx-1">
          Nombre de colaborador | 
          <span className="font-serif font-extralight text-slate-600 text-sm mx-1"> Email</span>
        </p>
        <div
        className="w-max h-min py-2 px-4 bg-pink-100 border-2 border-pink-300 rounded-lg hover:bg-pink-300 mr-1"
        /* onClick={handleModalAddCollaborator} */
      >
        <button className="flex justify-center items-center "  /* onClick={handleDelete} */ >
          <img src={trash} alt="" className="w-5 h-5 mx-1" />
          <p className="font-serif font-extralight text-slate-500 text-xs mx-1">
            Eliminar colaborador
          </p>
        </button>
      </div>
      </div>
    </>
  );
};
