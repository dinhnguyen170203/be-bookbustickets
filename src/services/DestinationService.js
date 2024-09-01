const Destination = require("../models/DestinationModel")

const createDestination = (newDestination) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { key, value, detail } = newDestination
            if(!key || !value) {
                resolve({
                    status: 'ERR',
                    message: 'Data is null',
                })
            }

            let check = await Destination.findOne({
                key
            })

            if(check) {
                resolve({
                    status: 'ERR',
                    message: 'Destination is already exits',
                })
                return
            }

            let create = await Destination.create({
                key,
                value,
                detail
            })

            if(create) {
                resolve({
                    status: 'OK',
                    message: 'Create Destination success',
                    data: create
                })
            }
        } catch (error) {
            resolve({
                status: 'ERR',
                message: 'ERR SYXTAX',
                error
            })
        }
    })
}

const updateDestination = (destination) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { id, ...update} = destination
            
            let check = await Destination.findOne({
                _id: id
            })

            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'Destination is not exits',
                })
            }

            let action = await Destination.findByIdAndUpdate(id, update, {new: true})
            if(action) {
                resolve({
                    status: 'OK',
                    message: 'Update Destination user success!',
                    data: action
                })
            }
        } catch (error) {
            resolve({
                status: 'ERR',
                message: 'ERR SYXTAX',
                error
            })
        }
    })
}

const deleteDestination = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await Destination.findOne({
                _id: id
            })

            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'Destination error'
                })
            }

            let deleteDestination = await Destination.findByIdAndDelete(id)
            if(deleteDestination) {
                resolve({
                    status: 'OK',
                    message: 'Delete Destination success!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllDestination = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let destinations = await Destination.find()

            resolve({
                status: 'OK',
                message: 'Get all destination success!',
                data: destinations,
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createDestination,
    updateDestination,
    deleteDestination,
    getAllDestination
}