import express from "express";
import {
  handleLikeRestaurant,
  handleUnlikeRestaurant,
  getRestaurantLike,
  getUserLike,
} from "../controllers/like.controller.js";
const likeRouter = express.Router();
likeRouter.post("/like-restaurant", handleLikeRestaurant);
likeRouter.delete("/unlike-restaurant", handleUnlikeRestaurant);
likeRouter.get("/like-list-by-restaurant", getRestaurantLike);
likeRouter.get("/like-list-by-user", getUserLike);

export default likeRouter;
