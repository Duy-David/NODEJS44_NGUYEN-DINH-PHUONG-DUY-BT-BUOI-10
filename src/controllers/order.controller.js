import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {
  BAD_REQUEST_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../common/status.js";
import { Op } from "sequelize";

const model = initModels(sequelize);

export const handleAddOrder = async (req, res) => {
  try {
    const { user_id, food_id, amount, code, arr_sub_id } = req.body;
    const foodAmount = Number(amount);

    // Check if user is valid
    const user = await model.users.findOne({ where: { user_id } });
    if (!user) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "User not found!",
      });
    }

    // Check if food is valid
    const food = await model.foods.findOne({ where: { food_id } });
    if (!food) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "Food not found!",
      });
    }

    // Check if amount is valid
    if (isNaN(foodAmount) || foodAmount < 1 || foodAmount > 5) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "Food amount is not valid!",
      });
    }

    // Check if sub food ids is valid
    if (!Array.isArray(arr_sub_id)) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "Sub food array is not valid!",
      });
    }

    const subFoods = await model.sub_foods.findAll({
      where: {
        sub_id: {
          [Op.or]: arr_sub_id,
        },
      },
    });

    if (subFoods.length !== arr_sub_id.length) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "There is a sub food id is not valid!",
      });
    }

    // Add order
    const order = await model.orders.create({
      user_id,
      food_id,
      amount: foodAmount,
      code,
      arr_sub_id: arr_sub_id.join(","),
    });

    return res.status(OK_STATUS).json({
      message: "Add order successfully!",
      data: order,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};
