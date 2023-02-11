const createError = require("http-errors");
const errorResponse = require("../helpers/errorResponse");
const Task = require("../database/models/Task");
const Project = require("../database/models/Project");

module.exports = {
  list: async (req, res) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: "Lista de tareas",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en LIST",
      });
    }
  },
  store: async (req, res) => {
    try {
      const { name, description, priority, project: projectId } = req.body;

      if (
        [name, description, priority].includes("") ||
        !name ||
        !description ||
        !priority
      )
        throw createError(400, "Todos los campos son obligatorios");

      const project = await Project.findById(projectId);

      if (req.user._id.toString() !== project.createdBy.toString())
        throw createError(403, "No estás autorizado");

      const taskStore = await Task.create(req.body);

      project.tasks.push(taskStore._id);
      await project.save();

      return res.status(201).json({
        ok: true,
        msg: "Tarea guardada",
        task: taskStore,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "STORE-TASK");
    }
  },
  detail: async (req, res) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: "Detalle de la tarea",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en DETAIL",
      });
    }
  },
  update: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Tarea actualizada",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en UPDATE",
      });
    }
  },
  remove: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Tarea eliminada",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en TASK-REMOVE",
      });
    }
  },
  changeState: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Colaborador agregado",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en ADD-COLLABORATOR",
      });
    }
  },
  removeCollaborator: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Colaborador eliminado",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en REMOVE-COLLABORATOR",
      });
    }
  },
};
