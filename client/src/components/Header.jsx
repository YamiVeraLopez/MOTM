import React from "react";
import { Link } from "react-router-dom";
import motm from "/motm.png";
import searchIcon from "/searchIcon-solid.svg";
import userIcon from "/userIcon-solid.svg";
import briefcase from "/briefcase-solid.svg";
import logout from "/logout-solid.svg";
import plus from "/plus-solid.svg";
import menu from "/menu-bars.svg";
import close from "/close.svg";
import { useState } from "react";

export const Header = () => {
    const [visible, setVisible] = useState(false)

    const handleMenu = (e) => {
        setVisible(!visible)
    }

  return (
    <div className="relative ml-0">
      <aside className={visible ?"py-6 px-4 max-w-xs min-h-full rounded-2xl bg-white/30" : "py-6 px-4 w-16 overflow-hidden min-h-full rounded-2xl bg-white/30"}>
        <button onClick={handleMenu}>
          <img
            src={visible? close : menu}
            alt="menu"
            className="object-contain w-10 h-10 rounded-md shadow-sm shadow-violet-400 hover:scale-105 "
          />
        </button>

        <div className="my-8">
          <img
            src={motm}
            alt="Logo"
            className={visible ? "object-contain w-28 h-28 rounded-full shadow-md shadow-violet-400" : "w-12 h-10 object-fit rounded-full shadow-sm shadow-violet-400"}
          />
        </div>

        <div className={visible ?"grid grid-cols-1 gap-2 py-8 border-y-2 border-pink-200" : "hidden"}>
          <h2 className="font-serif uppercase font-semibold text-violet-900 text-center">
            Projects Manager
          </h2>
        </div>



        <div className="grid grid-cols-4 gap-1 py-8 border-b-2 border-pink-200">
            { visible ? (<> <label htmlFor="search" className="w-10 h-9 py-1.5 bg-transparent ">
            <img
              src={searchIcon}
              alt="searchIcon"
              className="w-3/4 max-h-fit text-pink-50"
            />
          </label>

          
          <input
            id="search"
            type="text"
            placeholder="Buscar proyecto..."
            className="placeholder:italic placeholder:text-violet-300 block bg-white/20 w-full border border-b-violet-700 rounded-md py-1 pl-5 pr-3 shadow-sm focus:outline-none  focus:border-purple-500  sm:text-sm font-serif text-xs text-pink-900 col-span-3"
          /> </>) : (<div className="w-10 h-9 py-1.5 bg-transparent ">
          <img
            src={searchIcon}
            alt="searchIcon"
            className="w-3/4 max-h-fit text-pink-50"
          />
        </div>) }
          
        </div>

        <div className="pt-2">
          <Link
            to="/users/profile"
            className="grid grid-cols-4 gap-1 justify-items-center items-center py-4 border-b-2 border-pink-200"
          >
            <div className="w-10 h-9 py-1.5 bg-transparent ">
              <img
                src={userIcon}
                alt="profile"
                className="w-3/4 max-h-fit text-pink-50"
              />
            </div>
            <span className={visible ? "font-serif text-center text-gray-400  col-span-3" : "hidden"}>
              Mi perfil
            </span>{" "}
          </Link>
        </div>

        <div className="pt-2 hover:bg-gradient-to-r from-bg-purple-500 to-pink-300 hover:border-l-4 hover:border-violet-800">
          <Link
            to="/projects"
            className="grid grid-cols-4 gap-1 justify-items-center items-center py-4 border-b-2 border-pink-200"
          >
            <div className="w-10 h-9 py-1.5 bg-transparent ">
              <img src={briefcase} alt="projects" className="w-3/4 max-h-fit" />
            </div>
            <span className={visible ? "font-serif text-center text-gray-400  col-span-3" : "hidden"}>
              Proyectos
            </span>{" "}
          </Link>
        </div>
        <div className="pt-2">
          <Link
            to="create-project"
            className="grid grid-cols-4 gap-1 justify-items-center items-center py-4 border-b-2 border-pink-200"
          >
            <div className="w-10 h-9 py-1.5 bg-transparent ">
              <img
                src={plus}
                alt="addProject"
                className="w-3/4 max-h-fit text-pink-50"
              />
            </div>
            <span className={visible ? "font-serif text-center text-gray-400 col-span-3" : "hidden"}>
              Nuevo proyecto
            </span>{" "}
          </Link>
        </div>
        <div className="pt-2 grid grid-cols-1 gap-1">
          <button
            type="button"
            /* onClick={closeSession} */
            className="grid grid-cols-4 gap-1 justify-items-center items-center py-4 border-b-2 border-pink-200"
          >
            <div className="w-10 h-9 py-1.5 bg-transparent ">
              <img src={logout} alt="logout" className="w-3/4 max-h-fit" />
            </div>
            <span className={visible ? "font-serif text-center text-gray-400  col-span-3" : "hidden"}>
              Cerrar sesión
            </span>
          </button>
        </div>

        <div></div>
      </aside>
    </div>
  );
};
