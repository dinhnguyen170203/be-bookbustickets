const Otp = require('../models/OtpModel');
const bcrypt = require('bcrypt');

const insertOtp = ({ otp, email, hashPassword, name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(otp, salt);

      const createOtp = await Otp.create({
        email,
        otp: hash,
        password: hashPassword,
        name,
      });

      if (createOtp) {
        resolve({
          data: createOtp,
        });
        return;
      }
    } catch (error) {
      reject(error);
    }
  });
};

const insertOtpForgotPassword = ({ otp, email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(otp, salt);

      const createOtp = await Otp.create({
        email: email,
        otp: hash,
      });

      if (createOtp) {
        resolve({
          data: createOtp,
        });
        return;
      }
    } catch (error) {
      reject(error);
    }
  });
};

const isValidOtp = async (otp, hashOtp) => {
  try {
    const isValid = await bcrypt.compare(otp, hashOtp);

    return isValid;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  insertOtp,
  isValidOtp,
  insertOtpForgotPassword,
};
