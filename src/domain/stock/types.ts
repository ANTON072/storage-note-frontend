import * as yup from "yup";

import type { AppUser } from "../users/types";

export const stockSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  purchaseLocation: yup.string(),
  imageUrl: yup.string(),
  price: yup.string(),
  itemCount: yup.number().required().min(0),
  unitName: yup.string().required(),
  alertThreshold: yup.number().required().min(0),
  categoryId: yup.number().required(),
});

export type StockFormValues = yup.InferType<typeof stockSchema>;

export type StockResponse = StockFormValues & {
  id: number;
  isFavorite: boolean;
  createdBy: AppUser;
  updatedBy: AppUser;
  createdAt: string;
  updatedAt: string;
};
