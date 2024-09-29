const DriverService = require('../services/DriverService');

const createDriver = async (req, res) => {
  try {
    const fileData = req.file;
    console.log('file image Driver', fileData);
    let newDriver = req.body;
    let response = await DriverService.createDriver(newDriver, fileData);
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
    console.log('UpdateDriver.Controller:', req.params.id, req.file, req.body);
    let id = req.params.id;
    let fileImage = req.file;
    let data = req.body;
    let response = await DriverService.updateDriver(id, data, fileImage);
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
    let { limit, page, sort, filter } = req.query;
    let response = await DriverService.getAllDriver(limit || 8, page || 0, sort, filter);
    return res.status(200).json(response);
  } catch (error) {
    console.log('error Controller.GetAllDriver:', error);
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
