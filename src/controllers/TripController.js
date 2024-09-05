const TripService = require("../service/TripService")

const createTrip = async (req, res) => {
    try {
        let newTrip = req.body
        let responve = await TripService.createTrip(newTrip)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const updateTrip = async (req, res) => {
    try {
        let car = req.body
        let responve = await TripService.updateTrip(car)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const updateNumberOfSeats = async (req, res) => {
    try {
        let {id, number} = req.body
        let responve = await TripService.updateNumberOfSeats(id, number)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}


const deleteTrip = async (req, res) => {
    try {
        let id = req.params.id
        if(!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Trip id is  not required'
            })
        }
        let responve = await TripService.deleteTrip(id)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllTrip = async (req, res) => {
    try {
        let {limit, page, sort, filter} = req.query
        let responve = await TripService.getAllTrip(limit || 8, page || 0, sort, filter)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const searchTrips = async (req, res) => {
    try {
        let {departure, destination, day} = req.query
        let responve = await TripService.searchTrips(departure, destination, day)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const createTime = async (req, res) => {
    try {
        let newTime = req.body
        let responve = await TripService.createTime(newTime)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllTime = async (req, res) => {
    try {
        let responve = await TripService.getAllTime()
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}
module.exports = {
    createTrip,
    updateTrip,
    deleteTrip,
    getAllTrip,
    createTime,
    getAllTime,
    searchTrips,
    updateNumberOfSeats
}