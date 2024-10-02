const Driver = require('../models/DriverModel');
const cloudinary = require('cloudinary').v2;

const createDriver = (newDriver, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { idNumber, name,  address, phoneNumber,  personalInformation, workHistory} = newDriver;
      
      if (  !idNumber ||    !name || !address || !phoneNumber  || !personalInformation || !workHistory
        // !dateOfBirth | 
      ) {
        if (fileData) {
          cloudinary.uploader.destroy(fileData.filename);
        }
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
      }

      let check = await Driver.findOne({
        idNumber,
      });

      if (check) {
        if (fileData) {
          cloudinary.uploader.destroy(fileData.filename);
        }
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
        // dateOfBirth,
        image: fileData?.path,
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
      console.log('error createDriver.Service:', error);
      resolve({
        status: 'ERR',
        message: 'ERR SYXTAX',
        error,
      });
    }
  });
};

const updateDriver = (id, driver, fileImage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { image, ...update } = driver;
      let check = await Driver.findOne({
        _id: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Driver is not exits',
        });
      }
      image = fileImage?.path;
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
        data: getDrivers,
        maxPage: count < limit ? 1 : Math.ceil(count / limit),
        currentPage: +page + 1,
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
