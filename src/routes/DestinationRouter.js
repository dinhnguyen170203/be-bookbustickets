const express = require('express')
const router = express.Router()
const DestinationController = require("../controllers/DestinationController")

router.post('/create-destination', DestinationController.createDestination)
router.post('/update-destination', DestinationController.updateDestination)
router.delete('/delete-destination/:id', DestinationController.deleteDestination)
router.get("/get-all-destination", DestinationController.getAllDestination)

module.exports = router