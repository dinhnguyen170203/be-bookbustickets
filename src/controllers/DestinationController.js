const DestinationService = require("../service/DestinationService")

const createDestination = async (req, res) => {
    try {
        let newDestination = req.body
        let responve = await DestinationService.createDestination(newDestination)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const updateDestination = async (req, res) => {
    try {
        let departure = req.body
        let responve = await DestinationService.updateDestination(departure)
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const deleteDestination = async (req, res) => {
    try {
        let id = req.params.id
        if(!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Departure id is  not required'
            })
        }
        let responve = await DestinationService.deleteDestination(id)
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

const getAllDestination = async (req, res) => {
    try {
        let responve = await DestinationService.getAllDestination()
        return res.status(200).json(responve)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

module.exports = {
    createDestination,
    updateDestination,
    deleteDestination,
    getAllDestination
}