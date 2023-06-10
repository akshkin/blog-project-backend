import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesBySearch,
  updateRecipe,
} from "../controllers/Recipe.controller";

const recipeRouter = express.Router();

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:title", getRecipeById);
recipeRouter.post("/", createRecipe);
recipeRouter.patch("/", updateRecipe);
recipeRouter.delete("/", deleteRecipe);
recipeRouter.get("/search/:searchQuery", getRecipesBySearch);

export { recipeRouter };
