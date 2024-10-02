const bcrypt = require("bcrypt")
const User = require("../models/UserModel")
const Otp = require("../models/OtpModel")
const otpGenerator = require('otp-generator')
const { insertOtp, isValidOtp } = require("./OtpService")
const { sendOtpEmail } = require("./EmailService")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
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
      let { _id, ...update } = user;

      let check = await User.findOne({
        _id: _id,
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

      let action = await User.findByIdAndUpdate(_id, update, { new: true });
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

const updateUserService = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { _id, ...update } = user;

      let check = await User.findOne({
        _id: _id,
      });

      if (!check) {
        resolve({
          status: 'ERR',
          message: 'User is not exits',
        });
      }

      let action = await User.findByIdAndUpdate(_id, update, { new: true });
      if (action) {
        resolve({
          status: 'OK',
          message: 'Update user user success!',
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

const getDetailUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
      try {
         if(!idUser) {
              resolve({
                  status: 'ERR',
                  message: "Data is null",
              })
         }

         let user = await User.findOne({
              _id: idUser
         })

         if(!user) {
              resolve({
                  status: 'ERR',
                  message: "User is not exits",
              })
         }else {
              resolve({
                  status: 'OK',
                  message: "Get detail user success",
                  data: user
              })
         }
      } catch (e) {
          reject(e)
      }
  })
}

const getDetailUserClient = (idUser) => {
  return new Promise(async (resolve, reject) => {
      try {
         if(!idUser) {
              resolve({
                  status: 'ERR',
                  message: "Data is null",
              })
         }

         let user = await User.findOne({
              _id: idUser
         })

         if(!user) {
              resolve({
                  status: 'ERR',
                  message: "User is not exits",
              })
         }else {
              resolve({
                  status: 'OK',
                  message: "Get detail user success",
                  data: user
              })
         }
      } catch (e) {
          reject(e)
      }
  })
}

const updatePassword = (id, currentPassword, newPassword) => {
  return new Promise(async (resolve, reject) => {
      try {
          if(!id || !currentPassword || !newPassword) {
              resolve({
                  status: 'ERR',
                  message: 'Data user is null'
              })
          }

          const checkUser = await User.findOne({
              _id: id
          })

          if(!checkUser) {
              resolve({
                  status: 'ERR',
                  message: 'The user is not defined'
              })
          }else {
              const compareCurrentPassword = await bcrypt.compareSync(currentPassword, checkUser.password)
              if(!compareCurrentPassword) {
                  resolve({
                      status: 'ERR',
                      message: 'Verify password current is false',
                  })
              }

              const comparePassword = bcrypt.compareSync(newPassword, checkUser.password)

              if(comparePassword) {
                  resolve({
                      status: 'ERR',
                      message: 'Nothing changes',
                  })
              }else {
                  const hash = bcrypt.hashSync(newPassword, 10)

                  const update = await User.findByIdAndUpdate(id, {
                      'password': hash
                  }, { new: true })
                   
                  resolve({
                      status: 'OK',
                      message: 'Update password success',
                      update
                  })
              }
          }
          

      } catch (e) {
          reject(e)
      }
  })
}

const lockUserAccount = (userId, type, lockDuration, lockReason) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!userId || !type || !lockDuration) {
        resolve({
          status: 'ERR',
          message: "Data is null"
      })
      }
      const lockUntil = new Date();
      const lockDurationInMinutes = 0
      if(type === "minutes") {
        lockDurationInMinutes = lockDuration
      }else {
        lockDurationInMinutes = parseInt(lockDuration) * 60;
      }
      
      lockUntil.setMinutes(lockUntil.getMinutes() + lockDurationInMinutes);
    
      await User.findByIdAndUpdate(userId, {
        accountLock: {
          isLocked: true,
          lockUntil: lockUntil,
          lockReason: lockReason
        }
      });
    
      resolve({
        status: 'OK',
        message: 'Khóa tài khoản thành công'
    })
    } catch (error) {
      resolve({
        status: 'ERR',
        error
    })
    }
  })
}

const checkAccountStatus = async (req, res, next) => {
  const { _id } = req.body;
  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(404).json({ message: 'Người dùng không tồn tại' });
  }

  const { isLocked, lockUntil, lockReason } = user.accountLock;

  if (isLocked && lockUntil > new Date()) {
    return res.status(403).json({ message: `Tài khoản của bạn đang bị khóa. Lý do: ${lockReason}` });
  } else if (isLocked && lockUntil <= new Date()) {
    await User.findByIdAndUpdate(user.id, {
      'accountLock.isLocked': false,
      'accountLock.lockUntil': null,
      'accountLock.lockReason': ''
    });
  }

  next();
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  registerUser,
  verifyEmail,
  loginUser,
  getDetailUser,
  updatePassword,
  getDetailUserClient,
  updateUserService,
  lockUserAccount,
  checkAccountStatus
};
