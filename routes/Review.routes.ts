import express from "express";

import {
  deleteReview,
  getReviews,
  postReview,
} from "../controllers/Review.controller";

const reviewRouter = express.Router();

reviewRouter.get("/:id", getReviews);
reviewRouter.post("/:id", postReview);
reviewRouter.delete("/", deleteReview);

export { reviewRouter };
