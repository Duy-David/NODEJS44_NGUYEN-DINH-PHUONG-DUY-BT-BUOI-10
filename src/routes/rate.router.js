import express from "express";
import {
  getRatingByRestaurant,
  getRatingByUser,
  handleAddRating,
} from "../controllers/rate.controller.js";

const rateRouter = express.Router();
rateRouter.post("/add-rate", handleAddRating);
rateRouter.get("/get-rate-list-by-restaurant", getRatingByRestaurant);
rateRouter.get("/get-rate-list-by-user", getRatingByUser);

export default rateRouter;
