import express from "express";
import likeRouter from "./like.router.js";

const rootRouter = express.Router();
rootRouter.use("/like", likeRouter);
rootRouter.use("/rate", rateRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;
