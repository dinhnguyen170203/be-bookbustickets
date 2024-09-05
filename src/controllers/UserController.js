const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  try {
    let user = req.body;
    let responve = await UserService.createUser(user);
    return res.status(200).json(responve);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const fileData = req.file;

    let user = req.body;
    let responve = await UserService.updateUser(user, fileData);
    return res.status(200).json(responve);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    if (!userId) {
      return res.status(404).json({
        status: 'ERR',
        message: 'UserId is  not required',
      });
    }
    let responve = await UserService.deleteUser(userId);
    return res.status(200).json(responve);
  } catch (e) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    let { limit, page, sort, filter } = req.query;
    let responve = await UserService.getAllUser(limit || 8, page || 0, sort, filter);
    return res.status(200).json(responve);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
};
