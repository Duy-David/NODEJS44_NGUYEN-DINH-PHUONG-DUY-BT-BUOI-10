import express from "express";
import {
  getRatingListByRestaurant,
  getRatingListByUser,
  handleAddRating,
} from "../controllers/rate.controller.js";

const rateRouter = express.Router();
rateRouter.post("/add-rate", handleAddRating);
rateRouter.get("/get-rate-list-by-restaurant", getRatingListByRestaurant);
rateRouter.get("/get-rate-list-by-user", getRatingListByUser);

export default rateRouter;
