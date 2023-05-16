const superAdmin = require('../models/SuperAdmin');

const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;

  superAdmin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `SuperAdmin with ID ${id} not found`,
          data: null,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'SuperAdmin deleted!',
        data: null,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'Error occurred while deleting SuperAdmin',
      error,
    }));
};

module.exports = { deleteSuperAdmin };
