import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  // },
  rating: {
    type: Number,
  },
  review: {
    type: String,
    required: true,
  },
  forRecipe: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
});

export const Review = mongoose.model("Review", ReviewSchema);
