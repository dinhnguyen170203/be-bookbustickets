const StatisticService = require('../services/StatisticsService');

const getAllStatistics = async (req, res) => {
  try {
    let response = await StatisticService.getAllStatistics();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: 'ERROR FROM SERVER',
    });
  }
};

module.exports = {
  getAllStatistics,
};
