const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, email, password, phone } = newUser;

      if (!email || !password) {
        resolve({
          status: 'ERR',
          message: 'Data is null',
        });
      }

      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isCheckEmail = reg.test(email);

      if (!isCheckEmail) {
        resolve({
          status: 'ERR',
          message: 'Email malformed',
        });
      }

      let checkUser = await User.findOne({
        email: email,
      });

      if (checkUser) {
        resolve({
          status: 'ERR',
          message: 'User already exits',
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      let createUser = await User.create({
        email,
        password: hash,
        name,
        phone,
      });

      if (createUser) {
        resolve({
          status: 'OK',
          message: 'Create user success!',
          data: createUser,
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

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUser = await User.findOne({
        _id: userId,
      });

      if (!checkUser) {
        resolve({
          status: 'ERR',
          message: 'User error',
        });
      }

      let deleteUser = await User.findByIdAndDelete(userId);
      if (deleteUser) {
        resolve({
          status: 'OK',
          message: 'Delete user success!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (user, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { idUser, ...update } = user;

      let check = await User.findOne({
        _id: idUser,
      });

      if (!check) {
        if (fileData) {
          cloudinary.uploader.destroy(fileData.filename);
        }

        resolve({
          status: 'ERR',
          message: 'User is not exits',
        });
      }

      let action = await User.findByIdAndUpdate(idUser, update, { new: true });
      if (action) {
        resolve({
          status: 'OK',
          message: 'Update user user success!',
          data: action,
        });
      }
    } catch (error) {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }

      resolve({
        status: 'ERR',
        message: 'ERR SYXTAX',
        error,
      });
    }
  });
};

const getAllUser = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await User.count();
      let getUsers = await User.find()
        .limit(limit)
        .skip(limit * page);

      resolve({
        status: 'OK',
        message: 'Get all user success!',
        data: getUsers,
        totalUsers: count,
        maxPage: count < limit ? 1 : Math.ceil(count / limit),
        // pageCurent: +page + 1
      });
    } catch (error) {
      reject(error);
    }
  });
};

const registerUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
      try {
          let { email, password, name, confirmPassword } = newUser

          if(!email || !password || !name || !confirmPassword) {
              resolve({
                  status: 'ERR',
                  message: 'Data is null'
              })
          }

          const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          const isCheckEmail = reg.test(email)

          if(!isCheckEmail) { 
              resolve({
                  status: 'ERR',
                  message: 'Email error'
              })
          }

          if(password !== confirmPassword) {
              resolve({
                  status: 'ERR',
                  message: 'Confirm Password error'
              })
              return
          }

          let checkUser = await User.findOne({
              email: email
          })

          if(checkUser) {
              resolve({
                  status: 'ERR',
                  message: 'User is exits'
              })
          }
          // const otp = otpGenerator.generate(6, {
          //     digits: true,
          //     lowerCaseAlphabets: false,
          //     upperCaseAlphabets: false,
          //     specialChars: false,
          // })
          // const hashPassword = await bcrypt.hashSync(password, 10)

          // await insertOtp({otp, email, hashPassword, name})
          // let sendEmail = await sendOtpEmail({email, otp})
          resolve({
              status: 'OK',
              message: 'Create otp success from resgister',
              // otp,
              // sendEmail
          })
      } catch (error) {
          reject(error)
      }
  })
}


const verifyEmail = (email, otp) => {
  return new Promise(async (resolve, reject) => {
      try {
          const checkOtp = await Otp.find({
              email
          })

          if(!checkOtp.length) {
              resolve({
                  status: 'ERR',
                  message: 'Email and otp not exist'
              })
          }

          const lastOtp = checkOtp[checkOtp.length - 1]

          const isValid = await isValidOtp(otp, lastOtp.otp)
      
          if(!isValid) {
              resolve({
                  status: 'ERR',
                  message: 'Verify email ERROR'
              })
          }

          if(isValid && email === lastOtp.email) {
              const newUser = await User.create({
                  email,
                  name: lastOtp.name,
                  password: lastOtp.password,
              })

              if(newUser) {
                  await Otp.deleteMany({
                      email
                  })
              }

              resolve({
                  status: 'OK',
                  message: "Create user success",
                  data: newUser
              })
          }
      } catch (error) {
          reject(error)
      }
  })
}

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
      try {
          const {email, password} = userLogin

          const checkUser = await User.findOne({
              email: email
          })

          if(checkUser === null) {
              resolve({
                  status: 'ERR',
                  message: 'The user is not defined'
              })
          }else {
              const comparePassword = await bcrypt.compareSync(password, checkUser.password)

              if(!comparePassword) {
                  resolve({
                      status: 'ERR',
                      message: 'Password error',
                  })
              }else {

                  const access_token = await generalAccessToken({
                      id: checkUser.id,
                      isAdmin: checkUser.isAdmin
                  })

                  const refresh_token = await generalRefreshToken({
                      id: checkUser.id,
                      isAdmin: checkUser.isAdmin
                  })
                   
                  resolve({
                      status: 'OK',
                      message: 'Login success',
                      access_token,
                      refresh_token
                  })
              }
          }
      } catch (e) {
          reject(e)
      }
  })
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  registerUser,
  verifyEmail,
  loginUser,
};
