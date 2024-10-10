import express from "express";
import likeRouter from "./like.router.js";

const rootRouter = express.Router();
rootRouter.use("/like", likeRouter);

export default rootRouter;