const UserRouter = require('./UserRouter');
const CarRouter = require('./CarRouter');
const DepartureRouter = require('./DepartureRouter');
const DestinationRouter = require('./DestinationRouter');
const DriverRouter = require('./DriverRouter');
const TripRouter = require('./TripRouter');
const StatisticRouter = require('./StatisticRouter');
const PaymentRouter = require('./PaymentRouter');
const TicketRouter = require('./TicketRouter');

const routes = (app) => {
  app.use('/api/user', UserRouter);
  app.use('/api/car', CarRouter);
  app.use('/api/departure', DepartureRouter);
  app.use('/api/destination', DestinationRouter);
  app.use('/api/driver', DriverRouter);
  app.use('/api/trip', TripRouter);
  app.use('/api/statistic', StatisticRouter);
  app.use('/api/payment', PaymentRouter);
  app.use('/api/ticket', TicketRouter);
  app.use((req, res, next) => {
    try {
      res.status(404);
      res.json({
        status: 'ERR',
        message: '404 NOT FOUND!',
      });
    } catch (error) {
      console.log('error: ', error);
    }
  });
};

module.exports = routes;
