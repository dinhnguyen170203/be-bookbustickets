const User = require('../models/UserModel');
const Car = require('../models/CarModel');
const Trip = require('../models/TripModel');

const getAllStatistics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let countUser = await User.count();
      let countCar = await Car.count();
      let countTrip = await Trip.count();

      resolve({
        status: 'OK',
        message: 'Get All Statistics success!',
        countUser,
        countCar,
        countTrip,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllStatistics,
};
