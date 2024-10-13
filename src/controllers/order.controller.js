import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { REQUEST_ERROR, SERVER_ERROR, OK } from "../common/status.js";
import { Op } from "sequelize";

const model = initModels(sequelize);

export const handleAddOrder = async (req, res) => {
  try {
    const { user_id, food_id, amount, code, arr_sub_id } = req.body;
    const foodAmount = Number(amount);

    const user = await model.users.findOne({ where: { user_id } });
    const food = await model.foods.findOne({ where: { food_id } });

    if (!user || !food) {
      return res.status(REQUEST_ERROR).json({
        message: "Not found!",
      });
    }

    if (isNaN(foodAmount) || !Array.isArray(arr_sub_id)) {
      return res.status(REQUEST_ERROR).json({
        message: "Not valid!",
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
      return res.status(REQUEST_ERROR).json({
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

    return res.status(OK).json({
      message: "Add successfully!",
      data: order,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({
      error: error.message,
    });
  }
};
