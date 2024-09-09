const Trip = require('../models/TripModel');
const Time = require('../models/TimeModel');

const createTrip = (newTrip) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        time,
        dayStart,
        price,
        numberOfBooked,
        numberOfAvailable,
        departure,
        destination,
        car,
      } = newTrip.trip;
      if (!time || !dayStart || !numberOfBooked || !price || !departure || !destination || !car) {
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
        return;
      }

      // let check = await Car.findOne({
      //     name
      // })

      // if(check) {
      //     resolve({
      //         status: 'ERR',
      //         message: 'Car is already exits',
      //     })
      // }

      let create = await Trip.create({
        time,
        dayStart,
        numberOfBooked,
        numberOfAvailable,
        departure,
        destination,
        car,
        price,
      });

      if (create) {
        resolve({
          status: 'OK',
          message: 'Create trip success',
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

const updateTrip = (trip) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { _id, ...update } = trip.trip;

      let check = await Trip.findOne({
        _id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Trip is not exits',
        });
      }
      let action = await Trip.findByIdAndUpdate(_id, update, { new: true });

      if (action) {
        resolve({
          status: 'OK',
          message: 'Update trip success!',
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

const updateNumberOfSeats = (_id, number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await Trip.findOne({
        _id,
      });
      console.log('check', check);

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Trip is not exits',
        });
      }
      let amount = check?.numberOfAvailable - number;
      let action = await Trip.findByIdAndUpdate(_id, { numberOfAvailable: amount }, { new: true });
      if (action) {
        resolve({
          status: 'OK',
          message: 'Update trip success!',
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

const deleteTrip = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await Trip.findOne({
        _id: id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'Trip error',
        });
      }

      let deleteTrip = await Trip.findByIdAndDelete(id);
      if (deleteTrip) {
        resolve({
          status: 'OK',
          message: 'Delete trip success!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//time
const createTime = (newTime) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { value, key } = newTime;
      if (!value || !key) {
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
        return;
      }

      let check = await Time.findOne({
        key,
      });

      if (check) {
        resolve({
          status: 'ERR',
          message: 'Time is already exits',
        });
        return;
      }

      let create = await Time.create({
        key,
        value,
      });

      if (create) {
        resolve({
          status: 'OK',
          message: 'Create time success',
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

const getAllTrip = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await Trip.count();
      let getTrips = await Trip.find()
        .sort({ dayStart: -1 })
        .populate('time')
        .populate('departure')
        .populate('destination')
        .populate('car')
        .limit(limit)
        .skip(limit * page);

      resolve({
        status: 'OK',
        message: 'Get all trip success!',
        data: getTrips,
        totalCars: count,
        maxPage: count < limit ? 1 : Math.ceil(count / limit),
        pageCurent: +page + 1,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllTime = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let departures = await Time.find();

      resolve({
        status: 'OK',
        message: 'Get all time success!',
        data: departures,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const searchTrips = (departure, destination, day) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!departure || !destination || !day) {
        resolve({
          status: 'ERR',
          message: 'Data is null!',
        });
      }

      let findTrips = await Trip.find({
        departure,
        destination,
        dayStart: day,
      })
        .populate('time')
        .populate('departure')
        .populate('destination')
        .populate('car');

      if (findTrips) {
        resolve({
          status: 'OK',
          message: 'Search trip success!',
          data: findTrips,
        });
      } else {
        resolve({
          status: 'ERR',
          message: 'Data search not exits!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createTrip,
  updateTrip,
  deleteTrip,
  createTime,
  getAllTrip,
  getAllTime,
  searchTrips,
  updateNumberOfSeats,
};
