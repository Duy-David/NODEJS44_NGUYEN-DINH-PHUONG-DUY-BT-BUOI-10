import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { REQUEST_ERROR, SERVER_ERROR, OK, CREATED_OK } from "../common/status.js";

const model = initModels(sequelize);

export const handleLikeRestaurant = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    const user = await model.users.findOne({ where: { user_id } });
    const restaurant = await model.restaurants.findOne({ where: { res_id } });

    if (!user || !restaurant) {
      return res.status(REQUEST_ERROR).json({
        message: "Not found!",
      });
    }

    // Check if the user has already liked the restaurant
    const existingLike = await model.like_res.findOne({
      where: { user_id, res_id },
    });
    if (existingLike) {
      return res.status(REQUEST_ERROR).json({
        message: "Existing like between user and restaurant",
      });
    }

    // Handle like restaurant
    const like = await model.like_res.create({
      user_id,
      res_id,
      date_like: new Date(),
    });

    return res.status(CREATED_OK).json({
      message: "Like restaurant successfully!",
      data: like,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const handleUnlikeRestaurant = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    const deleteLike = await model.like_res.destroy({
      where: { user_id, res_id },
    });

    if (deleteLike) {
      return res.status(OK).json({
        message: "Unlike successfully!",
        data: deleteLike,
      });
    } else {
      return res.status(REQUEST_ERROR).json({
        message: " Unlike not successfully!!",
        data: deleteLike,
      });
    }
  } catch (error) {
    return res.status(SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getRestaurantLike = async (req, res) => {
  try {
    const { res_id } = req.body;

    const likeList = await model.like_res.findAll({
      where: {
        res_id,
      },
    });

    return res.status(OK).json({
      message: "Successfully!",
      data: likeList,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const getUserLike = async (req, res) => {
  try {
    const { user_id } = req.body;

    const likeList = await model.like_res.findAll({
      where: {
        user_id,
      },
    });

    return res.status(OK).json({
      message: "Successfully!",
      data: likeList,
    });
  } catch (error) {
    return res.status(SERVER_ERROR).json({
      error: error.message,
    });
  }
};
