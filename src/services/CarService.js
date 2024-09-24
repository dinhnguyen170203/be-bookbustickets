const Car = require('../models/CarModel');
const StatusCar = require('../models/StatusCarModel');
const cloudinary = require('cloudinary').v2;

const createCar = (newCar, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, licensePlate, numberOfSeats, yearOfManufacture, type, color, status, note } =
        newCar;
      if (
        (!name ||
          !licensePlate ||
          !numberOfSeats ||
          !yearOfManufacture ||
          !type ||
          !color ||
          !status) &&
        !fileData
      ) {
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
      }

      let check = await Car.findOne({
        name,
      });

      if (check) {
        resolve({
          status: 'ERR',
          message: 'Car exits',
        });
      }

      let create = await Car.create({
        name,
        licensePlate,
        numberOfSeats,
        yearOfManufacture,
        type,
        color,
        image: fileData?.path,
        status,
        note,
      });

      if (create) {
        resolve({
          status: 'OK',
          message: 'Create car success',
          data: create,
        });
      }
    } catch (error) {
      console.log('ERR createCar.Service', error);
      reject(error);
    }
  });
};

const updateCar = (car, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { id, ...update } = car;

      let check = await Car.findOne({
        id_: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Car is not exits',
        });
      }
      if (fileData !== null) {
        cloudinary.uploader.destroy(check.image);
      }

      let action = await Car.findByIdAndUpdate(id, update, fileData, { new: true });

      if (action) {
        resolve({
          status: 'OK',
          message: 'Update car user success!',
          data: action,
        });
      }
    } catch (error) {
      console.log('ERR updateCar.Service', error);
      reject(error);
    }
  });
};

const deleteCar = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await Car.findOne({
        _id: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Car not exist',
        });
      } else {
        cloudinary.uploader.destroy(check.image);
      }

      let deleteCar = await Car.findByIdAndDelete(id);

      if (deleteCar) {
        resolve({
          status: 'OK',
          message: 'Delete car success!',
        });
      }
    } catch (error) {
      console.log('ERR delete.Service', error);
      reject(error);
    }
  });
};

const getAllCar = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await Car.count();
      let getCars = await Car.find()
        .limit(limit)
        .skip(limit * page);

      resolve({
        status: 'OK',
        message: 'Get all car success!',
        data: getCars,
        totalCars: count,
        maxPage: count < limit ? 1 : Math.ceil(count / limit),
        pageCurrent: +page + 1,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCarsStatus = (limit, page, sort, filter, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await Car.count();
      let getCars = await Car.find({
        status: status,
      })
        .populate('status')
        .limit(limit)
        .skip(limit * page);

      resolve({
        status: 'OK',
        message: 'Get all car status success!',
        data: getCars,
        totalCars: count,
        maxPage: count < limit ? 1 : Math.ceil(count / limit),
        // pageCurrent: +page + 1,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createStatusCar = (newStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { key, value } = newStatus;
      if (!key || !value) {
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
      }

      let check = await StatusCar.findOne({
        key,
      });

      if (check) {
        resolve({
          status: 'ERR',
          message: 'Status car is already exits',
        });
        return;
      }

      let create = await StatusCar.create({
        key,
        value,
      });

      if (create) {
        resolve({
          status: 'OK',
          message: 'Create  status car success',
          data: create,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllStatusCar = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let getStatusCars = await StatusCar.find();

      resolve({
        status: 'OK',
        message: 'Get all status car success!',
        data: getStatusCars,
      });
    } catch (error) {
      reject(error);
    }
  });
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
