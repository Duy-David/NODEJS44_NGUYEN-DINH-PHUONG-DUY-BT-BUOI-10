import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { REQUEST_ERROR, SERVER_ERROR, OK } from "../common/status.js";

const model = initModels(sequelize);

export const handleAddRating = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;
    const rateAmount = Number(amount);

    const user = await model.users.findOne({ where: { user_id } });
    const restaurant = await model.restaurants.findOne({ where: { res_id } });
    if (!restaurant||!user) {
      return res.status(REQUEST_ERROR).json({
        message: "Not Found!",
      });
    }

    if (isNaN(rateAmount) || rateAmount < 1 || rateAmount > 5) {
      return res.status(REQUEST_ERROR).json({
        message: "Not valid!",
      });
    }

    const existingRating = await model.rate_res.findOne({
      where: { user_id, res_id },
    });

    if (existingRating) {
      return res.status(REQUEST_ERROR).json({
        message: "Existing this rate",
      });
    }

    const rating = await model.rate_res.create({
      user_id,
      res_id,
      amount: rateAmount,
      date_rate: new Date(),
    });

    return res.status(OK).json({
      message: "Rate successfully!",
      data: rating,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getRatingByRestaurant = async (req, res) => {
  try {
    const { res_id } = req.body;

    const rating = await model.rate_res.findAll({
      where: {
        res_id,
      },
    });

    return res.status(OK).json({ message: "Rate is successfully",
      data: rating,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getRatingByUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    const rating = await model.rate_res.findAll({
      where: {
        user_id,
      },
    });

    return res.status(OK).json({message: "Rate is successfully",
      data: rating,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ 
      error: error.message,
    });
  }
};
