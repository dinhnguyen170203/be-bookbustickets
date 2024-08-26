const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try{
            let {name, email, password, phone} = newUser

            if(!email || !password) {
                resolve({
                    status: 'ERR',
                    message: 'Data is null',
                })
            }

            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)

            if(!isCheckEmail) {
                resolve({
                    status: 'ERR',
                    message: 'Email malformed',
                })
            }

            let checkUser = await User.findOne({
                email: email
            })

            if(checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'User already exits',
                })
            }

            const hash = bcrypt.hashSync(password, 10)
            let createUser = await User.create({
                email,
                password: hash,
                name,
                phone
            })

            if(createUser) {
                resolve({
                    status: 'OK',
                    message: 'Create user success!',
                    data: createUser
                })
            }
        }catch(error) {
            resolve({
                status: 'ERR',
                message: 'ERR SYXTAX',
                error
            })
        }
    })
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await User.findOne({
                _id: userId
            })

            if(!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'User error'
                })
            }

            let deleteUser = await User.findByIdAndDelete(userId)
            if(deleteUser) {
                resolve({
                    status: 'OK',
                    message: 'Delete user success!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (user, fileData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { idUser, ...update} = user
            
            let check = await User.findOne({
                _id: idUser
            })

            if(!check) {
                if(fileData) {
                    cloudinary.uploader.destroy(fileData.filename)
                }

                resolve({
                    status: 'ERR',
                    message: 'User is not exits',
                })
            }

            let action = await User.findByIdAndUpdate(idUser, update, {new: true})
            if(action) {
                resolve({
                    status: 'OK',
                    message: 'Update user user success!',
                    data: action
                })
            }
        } catch (error) {
            if(fileData) {
                cloudinary.uploader.destroy(fileData.filename)
            }

            resolve({
                status: 'ERR',
                message: 'ERR SYXTAX',
                error
            })
        }
    })
}

const getAllUser = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await User.count()
            let getUsers = await User.find().limit(limit).skip(limit * page)

            resolve({
                status: 'OK',
                message: 'Get all user success!',
                data: getUsers,
                totalUsers: count,
                maxPage: count < limit ? 1 : Math.ceil(count / limit),
                // pageCurent: +page + 1
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
}