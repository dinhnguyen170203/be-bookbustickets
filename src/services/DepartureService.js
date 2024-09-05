const Departure = require('../models/DepartureModel');

const createDeparture = (newDeparture) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { key, value, detail } = newDeparture;
      if (!key || !value) {
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
      }

      let check = await Departure.findOne({
        key,
      });

      if (check) {
        resolve({
          status: 'ERR',
          message: 'Departure is already exits',
        });
        return;
      }

      let create = await Departure.create({
        key,
        value,
        detail,
      });

      if (create) {
        resolve({
          status: 'OK',
          message: 'Create departure success',
          data: create,
        });
      }
    } catch (error) {
      resolve({
        status: 'ERR',
        message: 'ERR SYXTAX',
        error,
      });
    }
  });
};

const updateDeparture = (departure) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { id, ...update } = departure;

      let check = await Departure.findOne({
        _id: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Departure is not exits',
        });
      }

      let action = await Departure.findByIdAndUpdate(id, update, { new: true });
      if (action) {
        resolve({
          status: 'OK',
          message: 'Update departure user success!',
          data: action,
        });
      }
    } catch (error) {
      resolve({
        status: 'ERR',
        message: 'ERR SYXTAX',
        error,
      });
    }
  });
};

const deleteDeparture = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await Departure.findOne({
        _id: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Departure not exist',
        });
      }

      let deleteDeparture = await Departure.findByIdAndDelete(id);
      if (deleteDeparture) {
        resolve({
          status: 'OK',
          message: 'Delete departure success!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDeparture = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let departures = await Departure.find();
      resolve({
        status: 'OK',
        message: 'Get all departure success!',
        data: departures,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createDeparture,
  updateDeparture,
  deleteDeparture,
  getAllDeparture,
};
