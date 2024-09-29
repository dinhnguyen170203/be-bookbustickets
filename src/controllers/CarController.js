const CarService = require('../services/CarService');

const createCar = async (req, res) => {
  try {
    const fileData = req.file;
    let newCar = req.body;

    let response = await CarService.createCar(newCar, fileData);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const updateCar = async (req, res) => {
  try {
    let fileData = req.file;
    let idCar = req.params.id;
    let car = req.body;
    let response = await CarService.updateCar(idCar, car, fileData);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Car id is  not required',
      });
    }
    let response = await CarService.deleteCar(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllCar = async (req, res) => {
  try {
    let { limit, page, sort, filter } = req.query;
    let response = await CarService.getAllCar(limit || 8, page || 0, sort, filter);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getCarsStatus = async (req, res) => {
  try {
    let { limit, page, sort, filter, status } = req.query;
    let response = await CarService.getCarsStatus(limit || 8, page || 0, sort, filter, status);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

//status
const createStatusCar = async (req, res) => {
  try {
    let newStatus = req.body;
    let response = await CarService.createStatusCar(newStatus);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllStatusCar = async (req, res) => {
  try {
    let response = await CarService.getAllStatusCar();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};
module.exports = {
  createCar,
  updateCar,
  deleteCar,
  createStatusCar,
  getAllCar,
  getAllStatusCar,
  getCarsStatus,
};
