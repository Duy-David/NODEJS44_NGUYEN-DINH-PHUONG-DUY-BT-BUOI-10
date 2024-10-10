import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {
  BAD_REQUEST_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../common/status.js";

const model = initModels(sequelize);

export const handleAddRating = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;
    const rateAmount = Number(amount);

    // Check if user is exist
    const user = await model.users.findOne({ where: { user_id } });
    if (!user) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "User not found!",
      });
    }

    // Check if restaurant is exist
    const restaurant = await model.restaurants.findOne({ where: { res_id } });
    if (!restaurant) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "Restaurant not found!",
      });
    }

    // Check if rate amount is valid
    if (isNaN(rateAmount) || rateAmount < 1 || rateAmount > 5) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "Rate amount is not valid!",
      });
    }

    // Check if the user has already rated the restaurant
    const existingRating = await model.rate_res.findOne({
      where: { user_id, res_id },
    });
    if (existingRating) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "This user has already rated this restaurant!",
      });
    }

    // Handle rating restaurant
    const rating = await model.rate_res.create({
      user_id,
      res_id,
      amount: rateAmount,
      date_rate: new Date(),
    });

    return res.status(OK_STATUS).json({
      message: "Rating restaurant successfully!",
      data: rating,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};

export const getRatingListByRestaurant = async (req, res) => {
  try {
    const { res_id } = req.body;

    const ratingList = await model.rate_res.findAll({
      where: {
        res_id,
      },
    });

    return res.status(OK_STATUS).json({
      data: ratingList,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};

export const getRatingListByUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    const ratingList = await model.rate_res.findAll({
      where: {
        user_id,
      },
    });

    return res.status(OK_STATUS).json({
      data: ratingList,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};
