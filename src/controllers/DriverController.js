const DriverService = require('../service/DriverService');

const createDriver = async (req, res) => {
  try {
    let newDriver = req.body;
    let response = await DriverService.createDriver(newDriver);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const updateDriver = async (req, res) => {
  try {
    let data = req.body;
    let response = await DriverService.updateDriver(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const deleteDriver = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Id is not required',
      });
    }
    let response = await DriverService.deleteDriver(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllDriver = async (req, res) => {
  try {
    let response = await DriverService.getAllDriver();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

module.exports = {
  createDriver,
  updateDriver,
  deleteDriver,
  getAllDriver,
};
