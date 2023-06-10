import { Request, Response } from "express";
import { Recipe } from "../models/Recipe.model";
import { Review } from "../models/Review.model";

export const postReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { review, name, rating } = req.body.fields;

  try {
    const newReview = await Review.create({
      review: review,
      name: name,
      rating: rating,
      forRecipe: id,
    });

    return res
      .status(201)
      .json({ message: "Successfully submitted your review!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send review." });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Recipe.findById(id);
    if (!post) {
      return res.status(404).json({ error: "No post found" });
    }
    const reviews = await Review.find({ forRecipe: post._id });
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to load review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "No review found" });
    }
    await Review.findByIdAndDelete(id);
    return res.status(200).json({ message: " successfully deleted review" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to load review" });
  }
};
