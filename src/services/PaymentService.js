const Payment = require("../models/Payments")

const createPayment = (newPayment) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { key, value, description } = newPayment
            if(!key || !value) {
                resolve({
                    status: 'ERR',
                    message: 'Data is null',
                })
            }

            let check = await Payment.findOne({
                key
            })

            if(check) {
                resolve({
                    status: 'ERR',
                    message: 'Payment is already exits',
                })
                return
            }

            let create

            if(description) {
                create = await Payment.create({
                    key, value, description
                })
            }else {
                create = await Payment.create({
                    key, value
                })
            }

            if(create) {
                resolve({
                    status: 'OK',
                    message: 'Create payment car success',
                    data: create
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllPayment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let getPayments = await Payment.find()

            resolve({
                status: 'OK',
                message: 'Get all payment success!',
                data: getPayments,
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createPayment,
    getAllPayment
}