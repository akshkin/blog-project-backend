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
import { Clerk, ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const recipeRouter = express.Router();

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:title", getRecipeById);
recipeRouter.post("/", ClerkExpressWithAuth(), createRecipe);
recipeRouter.patch("/", ClerkExpressWithAuth(), updateRecipe);
recipeRouter.delete("/", ClerkExpressWithAuth(), deleteRecipe);
recipeRouter.get("/search/:searchQuery", getRecipesBySearch);

export { recipeRouter };
