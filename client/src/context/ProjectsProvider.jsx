import { createContext, useState } from "react";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [alertModal, setAlertModal] = useState({});
  const [task, setTask] = useState({});

  const showAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  const getProjects = async () => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get("/projects", config);
      console.log(data);
      setProjects(data.projects);
      setAlert({});
    } catch (error) {
      console.error(error);

      showAlert(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const getProject = async (id) => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get(`/projects/${id}`, config);

      console.log(data);
      setProject(data.project);
      setAlert({});
    } catch (error) {
      console.error(error);

      showAlert(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const storeProject = async (project) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      if (project.id) {
        const { data } = await clientAxios.put(
          `/projects/${project.id}`,
          project,
          config
        );

        const projectUpdated = projects.map((projectState) => {
          if (projectState._id === data.project._id) {
            return data.project;
          }
          return projectState;
        });

        setProjects(projectUpdated);

        Toast.fire({
          icon: "success",
          title: data.msg,
        });
      } else {
        const { data } = await clientAxios.post(`/projects`, project, config);
        setProjects([...projects, data.project]);

        Toast.fire({
          icon: "success",
          title: data.msg,
        });
      }

      navigate("projects");
    } catch (error) {
      console.error(error);

      const { response } = error;
      if (response?.status === 401) {
        navigate("/");
      } else {
        showAlert(response ? response.data.msg : "Upps.. hubo un error", false);
      }
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.delete(`/projects/${id}`, config);

      const projectsFiltered = projects.filter((project) => project._id !== id);

      setProjects(projectsFiltered);

      Toast.fire({
        icon: "success",
        title: data.msg,
      });

      navigate("projects");
    } catch (error) {
      console.error(error);
      const { response } = error;
      if (response?.status === 401) {
        navigate("/");
      } else {
        showAlert(response ? response.data.msg : "Upps.. hubo un error", false);
      }
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const showAlertModal = (msg, time = true) => {
    setAlertModal({
      msg,
    });
    if (time) {
      setTimeout(() => {
        setAlertModal({});
      }, 3000);
    }
  };

  const getTask = async (id) => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get(`/tasks/${id}`, config);

      console.log(data);
      setTask(data.task);
      setAlert({});
    } catch (error) {
      console.error(error);

      showAlert(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const storeTask = async (task) => {
    
    try {
   
      const token = sessionStorage.getItem("token");
      if (!token) return null;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      task.project = project._id;

      if (task.id) {
        const { data } = await clientAxios.put(`/tasks/${id}`, task, config);

        const taskUpdated = projects.tasks.map((task) => {
          if (task._id === data.task._id) {
            return data.task;
          }
          return task;
        });

        setProjects(taskUpdated);

        Toast.fire({
          icon: "success",
          title: data.msg,
        });
      } else {
       const { data } = await clientAxios.post("/tasks", task, config);

      project.tasks = [...project.tasks, data.task];

      setProject(project);
      setShowModal(false);

      Toast.fire({
        icon: "success",
        title: data.msg,
      });
      setAlert({});
   
      }
     /*  const { data } = await clientAxios.post("/tasks", task, config);

      project.tasks = [...project.tasks, data.task];

      setProject(project);
      setShowModal(false);

      Toast.fire({
        icon: "success",
        title: data.msg,
      });
      setAlert({}); */
    } catch (error) {
      console.log(error);
      showAlertModal(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

    /*   if (task.project === project._id) {
        
      } */
      const { data } = await clientAxios.delete(`/tasks/${id}`, config);

        console.log(data);

        const tasksFiltered = project.tasks.filter(
          (task) => task._id !== id
        );
        console.log(tasksFiltered, "tareas filtradas");
        project.tasks = [tasksFiltered];

        setProject(project);
        setShowModal(false);

        Toast.fire({
          icon: "success",
          title: data.msg,
        });

        setAlert({});

        navigate("projects");

    } catch (error) {
      console.error(error);
      const { response } = error;
      if (response?.status === 401) {
        navigate("/");
      } else {
        showAlert(response ? response.data.msg : "Upps.. hubo un error", false);
      }
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        loading,
        alert,
        showAlert,
        projects,
        getProjects,
        getProject,
        project,
        storeProject,
        deleteProject,
        showModal,
        setShowModal,
        handleShowModal,
        alertModal,
        setAlertModal,
        task,
        setTask,
        getTask,
        storeTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
