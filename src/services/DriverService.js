const Driver = require('../models/DriverModel');

const createDriver = (newDriver) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        idNumber,
        name,
        address,
        phoneNumber,
        personalInformation,
        identification,
        workHistory,
      } = newDriver;
      if (
        !name ||
        !address ||
        !phoneNumber ||
        !identification ||
        !personalInformation ||
        !workHistory
      ) {
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
      }

      let check = await Driver.findOne({
        idNumber,
      });

      if (check) {
        resolve({
          status: 'ERR',
          message: 'Driver is already exits',
        });
        return;
      }

      let create = await Driver.create({
        idNumber,
        name,
        address,
        phoneNumber,
        personalInformation,
        identification,
        workHistory,
      });

      if (create) {
        resolve({
          status: 'OK',
          message: 'Create driver success',
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

const updateDriver = (driver) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { id, ...update } = driver;
      let check = await Driver.findOne({
        _id: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Driver is not exits',
        });
      }

      let action = await Driver.findByIdAndUpdate(id, update, { new: true });
      if (action) {
        resolve({
          status: 'OK',
          message: 'Update Driver user success!',
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

const deleteDriver = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await Driver.findOne({
        _id: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Driver error',
        });
      }

      let deleteDriver = await Driver.findByIdAndDelete(id);
      if (deleteDriver) {
        resolve({
          status: 'OK',
          message: 'Delete Driver success!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDriver = (page, limit, filter, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getDrivers = await Driver.find()
        .limit(limit)
        .skip(limit * page);
      let count = await Driver.count();

      resolve({
        status: 'OK',
        message: 'Get all Driver success!',
        data: Drivers,
        maxPage: count < limit ? 1 : Math.ceil(count / limit),
        // currentPage: page,
        totalDriver: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createDriver,
  updateDriver,
  deleteDriver,
  getAllDriver,
};
