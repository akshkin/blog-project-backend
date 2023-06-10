import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const RecipeScehma = new Schema({
  createdBy: {
    type: String,
  },
  image: {
    base64: {
      type: String,
      required: true,
    },
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  method: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const Recipe = mongoose.model("Recipe", RecipeScehma);
