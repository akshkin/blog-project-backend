import express from "express";
import { recipeRouter } from "./Recipe.routes";
import { reviewRouter } from "./Review.routes";

const router = express.Router();

router.use("/posts", recipeRouter);
router.use("/reviews", reviewRouter);

export { router };
