import { Request, Response } from "express";
import Product from "../modules/product.model";
import { validateProduct, ProductInput } from "../utils/product.validator";
import { sanitizeObject } from "../utils/sanitize";
import { InputValidator as v } from "../utils/InputValidator";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const cleanBody = sanitizeObject(req.body);
  if(v.hasSqlInjection(req.body) || v.hasHtmlTag(req.body) || v.hasScriptTag(req.body)){
    res.status(400).json({ message: "Injection has been detected!" });
    return;
  }
  const errors = validateProduct(cleanBody as ProductInput);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const product = await Product.create(cleanBody);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const cleanBody = sanitizeObject(req.body);
  const errors = validateProduct(cleanBody as ProductInput, true);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, cleanBody);
    if (!product) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};