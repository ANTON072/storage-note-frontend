import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup.string().required(),
});

export type CategoryFormValues = yup.InferType<typeof categorySchema>;

export type CategoryResponse = CategoryFormValues & {
  id: number;
  createdAt: string;
};
