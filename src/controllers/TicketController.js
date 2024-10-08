const TicketService = require('../services/TicketService');

const createTicket = async (req, res) => {
  try {
    let newTicket = req.body;
    let responve = await TicketService.createTicket(newTicket);
    return res.status(200).json(responve);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    let ticket = req.body;
    let responve = await TicketService.updateTicket(ticket);
    return res.status(200).json(responve);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Ticket id is  not required',
      });
    }
    let responve = await TicketService.deleteTicket(id);
    return res.status(200).json(responve);
  } catch (e) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllTicketFromUser = async (req, res) => {
  try {
    let { id } = req.params;
    let responve = await TicketService.getAllTicketFromUser(id);
    return res.status(200).json(responve);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllTicket = async (req, res) => {
  try {
    let { limit, page, sort, filter } = req.query;
    let response = await TicketService.getAllTicket(limit || 6, page || 0, sort, filter);
    return res.status(200).json(response);
  } catch (error) {
    console.log('err getAllTicket.Controller', error);
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};
module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTicketFromUser,
  getAllTicket,
};
