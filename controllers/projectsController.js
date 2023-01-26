module.exports = {
    list: async (req, res) => {
      try {
        return res.status(201).json({
          ok: true,
          msg: "Lista de proyectos",
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
          msg: "Store",
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
          msg: "Detalle del proyecto",
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
          msg: "Proyecto Actualizado",
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
          msg: "Proyecto eliminado",
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
  