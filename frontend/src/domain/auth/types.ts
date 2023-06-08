import * as yup from "yup";

export const passwordLoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .required(),
});

export type PasswordLoginValues = yup.InferType<typeof passwordLoginSchema>;
