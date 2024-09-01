const PaymentService = require('../service/PaymentService');

const createPayment = async (req, res) => {
  try {
    let newPayment = req.body;
    let response = await PaymentService.createPayment(newPayment);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllPayment = async (req, res) => {
  try {
    let response = await PaymentService.getAllPayment();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};
module.exports = {
  createPayment,
  getAllPayment,
};
