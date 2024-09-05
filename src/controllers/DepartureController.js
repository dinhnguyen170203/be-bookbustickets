const DepartService = require('../services/DepartureService');

const createDeparture = async (req, res) => {
  try {
    let newDeparture = req.body;
    let response = await DepartService.createDeparture(newDeparture);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const updateDeparture = async (req, res) => {
  try {
    let departure = req.body;
    let response = await DepartService.updateDeparture(departure);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const deleteDeparture = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Departure id is  not required',
      });
    }
    let response = await DepartService.deleteDeparture(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllDeparture = async (req, res) => {
  try {
    let response = await DepartService.getAllDeparture();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

module.exports = {
  createDeparture,
  updateDeparture,
  deleteDeparture,
  getAllDeparture,
};
