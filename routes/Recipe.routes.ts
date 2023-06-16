import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesBySearch,
  updateRecipe,
} from "../controllers/Recipe.controller";
import { adminAuth } from "../middleware/adminAuth";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const recipeRouter = express.Router();

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:title", getRecipeById);
recipeRouter.post("/", ClerkExpressWithAuth(), adminAuth, createRecipe);
recipeRouter.patch("/:id", ClerkExpressWithAuth(), adminAuth, updateRecipe);
recipeRouter.delete("/:id", ClerkExpressWithAuth(), adminAuth, deleteRecipe);
recipeRouter.get("/search/:searchQuery", getRecipesBySearch);

export { recipeRouter };
