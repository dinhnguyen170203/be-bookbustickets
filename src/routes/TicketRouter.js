const express = require('express')
const router = express.Router()
const TicketController = require('../controllers/TicketController')


router.post("/create-ticket", TicketController.createTicket)
router.get("/get-all-ticket-from-user/:id", TicketController.getAllTicketFromUser)
router.post("/update-ticket", TicketController.updateTicket)
router.delete("/delete-ticket/:id", TicketController.deleteTicket)

module.exports = router