interface ProductInput {
  name?: unknown;
  quantity?: unknown;
  price?: unknown;
  image?: unknown;
}

interface ValidationError {
  field: string;
  message: string;
}

export const validateProduct = (body: ProductInput, isUpdate: boolean = false): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
    errors.push({ field: "name", message: "Product name is required" });
  }

  if (body.quantity === undefined || typeof body.quantity !== "number" || body.quantity < 0) {
    errors.push({ field: "quantity", message: "Quantity must be a non-negative number" });
  }

  if (body.price === undefined || typeof body.price !== "number" || body.price < 0) {
    errors.push({ field: "price", message: "Price must be a non-negative number" });
  }

  if (body.image !== undefined && typeof body.image !== "string") {
    errors.push({ field: "image", message: "Image must be a string URL" });
  }

  return errors;
};