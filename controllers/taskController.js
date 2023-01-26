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
        return res.status(201).json({
          ok: true,
          msg: "Tarea guardada",
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
  