import express from "express";
import {
    getRestaurantLikeList,
    getUserLikeList,
    handleLikeRestaurant,
    handleUnlikeRestaurant,
  } from "../controllers/like.controller.js";
const likeRouter = express.Router();
likeRouter.post("/like-restaurant", handleLikeRestaurant);
likeRouter.delete("/unlike-restaurant", handleUnlikeRestaurant);
likeRouter.get("/like-list-by-restaurant", getRestaurantLikeList);
likeRouter.get("/like-list-by-user", getUserLikeList);

export default likeRouter;
