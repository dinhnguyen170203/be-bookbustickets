const Ticket = require("../models/TicketModel")
const Trip = require("../models/TripModel")

const createTicket = (newTicket) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { dayBooked, numberOfBooked, trip, user, totalPrice } = newTicket
            if(!dayBooked || !numberOfBooked || !trip || !user || !totalPrice) {
                resolve({
                    status: 'ERR',
                    message: 'Data is null',
                })
            }

            // let check = await Ticket.findOne({
            //     name
            // })

            // if(check) {
            //     resolve({
            //         status: 'ERR',
            //         message: 'Car is already exits',
            //     })
            // }

            let create = await Ticket.create({
                dayBooked, numberOfBooked, trip, user, totalPrice
            })

            if(create) {
                
                resolve({
                    status: 'OK',
                    message: 'Create ticket success',
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

const updateTicket = (ticket) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { id, ...update} = ticket
            
            let check = await Ticket.findOne({
                _id: id
            })

            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'Ticket is not exits',
                })
            }

            let action = await Ticket.findByIdAndUpdate(id, update, {new: true})
            if(action) {
                resolve({
                    status: 'OK',
                    message: 'Update Ticket user success!',
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

const deleteTicket = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await Ticket.findOne({
                _id: id
            })

            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'Car error'
                })
            }

            let deleteCar = await Ticket.findByIdAndDelete(id)
            if(deleteCar) {
                resolve({
                    status: 'OK',
                    message: 'Delete Ticket success!',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllTicketFromUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!id) {
                resolve({
                    status: 'ERR',
                    message: 'Data is null'
                })
            }

            let check = await Ticket.find({
                user: id
            }).populate("trip").populate("user").populate("payment").populate({
                path: "trip",
                populate: {path: 'car'}
            }).populate({
                path: "trip",
                populate: {path: 'departure'}
            }).populate({
                path: "trip",
                populate: {path: 'destination'}
            }).populate({
                path: "trip",
                populate: {path: 'time'}
            })

            if(!check) {
                resolve({
                    status: 'ERR',
                    message: 'No ticket'
                })
            }

            resolve({
                status: 'OK',
                message: 'Get ticket from user success!',
                data: check
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createTicket,
    updateTicket,
    deleteTicket,
    getAllTicketFromUser
}