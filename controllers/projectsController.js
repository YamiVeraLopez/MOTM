const createError = require("http-errors");
const Project = require("../database/models/Project");

const ObjectId = require("mongoose").Types.ObjectId

module.exports = {
    list: async (req, res) => {
      try {

        const projects = await Project.find().where('createBy').equals(req.user)

        return res.status(201).json({
          ok: true,
          msg: "Lista de proyectos",
          projects
        });
      } catch (error) {
        return res.status(error.status || 500).json({
          ok: false,
          msg: error.message || "Upss, hubo un error en PROJECTS-LIST",
        });
      }
    },
    store: async (req, res) => {

      try {

        const {name, description, client} = req.body;

        if ([name, description, client].includes("") || !name || !description || !client)  throw createError(400, "Todos los campos son obligatorios");

        if (!req.user) throw createError(401, "Error de autenticación");

        const project = new Project(req.body);
        
        project.createdBy = req.user._id
        
        //console.log(project);
        const projectStore = await project.save()

        return res.status(201).json({
          ok: true,
          msg: "Proyecto guardado",
          project: projectStore
        });
      } catch (error) {
        return res.status(error.status || 500).json({
          ok: false,
          msg: error.message || "Upss, hubo un error en STORE",
        });
      }
    },
    detail: async (req, res) => {
      try {

        const {id} = req.params;

        if(!ObjectId.isValid(id)){
          throw createError(400, "No es un id válido")
        }

        const project = await Project.findById(id);

        if (!project) throw createError(401, "Projecto no encontrado");    

        if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401, "No estás autorizado/a");  
        

        return res.status(201).json({
          ok: true,
          msg: "Detalle del proyecto",
          project
        });
      } catch (error) {
        return res.status(error.status || 500).json({
          ok: false,
          msg: error.message || "Upss, hubo un error en PROJECT-DETAIL",
        });
      }
    },
    update: async (req, res) => {
      try {

        const {id} = req.params;

        if(!ObjectId.isValid(id)){
          throw createError(400, "No es un id válido")
        }

        const project = await Project.findById(id);

        if (!project) throw createError(401, "Projecto no encontrado");    

        if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401, "No estás autorizado/a");  

        const {name, description, client, dataExpire} = req.body;

      /*   if ([name, description, client].includes("") || !name || !description || !client)  throw createError(400, "Todos los campos son obligatorios"); */

        project.name = name || req.body.name;
        project.description = description || req.body.description;
        project.client = client || req.body.client;
        project.dataExpire = dataExpire || req.body.dataExpire;

        const projectUdated = await project.save()

        return res.status(200).json({
          ok: true,
          msg: "Proyecto Actualizado",
          project: projectUdated
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

        const {id} = req.params;

        if(!ObjectId.isValid(id)){
          throw createError(400, "No es un id válido")
        }

        const project = await Project.findById(id);

        if (!project) throw createError(401, "Projecto no encontrado");    

        if (req.user._id.toString() !== project.createdBy.toString()) throw createError(401, "No estás autorizado/a");  

        await project.deleteOne();

        return res.status(200).json({
          ok: true,
          msg: "Proyecto eliminado con éxito",
        });
      } catch (error) {
        return res.status(error.status || 500).json({
          ok: false,
          msg: error.message || "Upss, hubo un error en PROYECT-REMOVE",
        });
      }
    },
    addCollaborator: async (req, res) => {
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
  