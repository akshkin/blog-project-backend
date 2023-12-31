import mongoose from "mongoose";
import { Request, Response } from "express";
import { Recipe } from "../models/Recipe.model";

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    return res.status(200).json(recipes);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ error: "Could not fetch posts" });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  const title = req.params.title;
  try {
    const recipe = await Recipe.findOne({ title: title });

    return res.status(200).json(recipe);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ error: "Could not find recipe" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  const { title, description, image, date, ingredients, method } =
    req.body.post;

  if (
    !title ||
    title.trim() === "" ||
    !description ||
    description.trim() === "" ||
    !image ||
    !date ||
    !ingredients.length ||
    !method.length
  ) {
    return res.status(422).json({ message: "All fields are required." });
  }

  const existingRecipe = await Recipe.findOne({ title });

  if (existingRecipe) {
    return res.status(400).json({
      error:
        "Recipe with this title already exists. Please provide a new title.",
    });
  }

  try {
    const newRecipe = await Recipe.create({
      title,
      description,
      image,
      date,
      ingredients,
      method,
    });

    return res.status(201).json({ message: "Recipe created." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to connect to database" });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, image, date, ingredients, method } =
    req.body.post;

  try {
    const thisRecipe = await Recipe.findById({ _id: id });
    if (!thisRecipe) {
      return res.status(404).json({ error: "No recipe found" });
    }

    if (
      !title ||
      title === "" ||
      !description ||
      description === "" ||
      !date ||
      !ingredients.length ||
      !method.length ||
      !image
    ) {
      return res.status(422).json({ error: "All fields are required" });
    }

    const postWithSameTitle = await Recipe.findOne({
      _id: { $ne: thisRecipe._id },
      title: title,
    });

    if (postWithSameTitle) {
      return res.status(400).json({
        error:
          "Recipe with this title already exists. Please provide a new title.",
      });
    }
    const updatedPost = await Recipe.findByIdAndUpdate(id, {
      title,
      description,
      image,
      date,
      ingredients,
      method,
    });
    console.log(updatedPost);

    return res.status(200).json({ message: "Successfully updated recipe!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update recipe." });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const thisRecipe = await Recipe.findById(id);
    if (!thisRecipe) {
      return res.status(404).json({ message: "No recipe found" });
    }

    await Recipe.findByIdAndDelete(id);

    return res.status(200).json({ message: "Successfully deleted recipe!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not delete recipe." });
  }
};

export const getRecipesBySearch = async (req: Request, res: Response) => {
  const { searchQuery } = req.params;
  try {
    const recipes = await Recipe.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Could not load results" });
  }
};
