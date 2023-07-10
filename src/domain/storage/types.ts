import * as yup from "yup";

export const StorageSchema = yup.object({
  name: yup.string().min(5).max(20).required(),
});
