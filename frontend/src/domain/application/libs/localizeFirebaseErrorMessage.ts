export const localizeFirebaseErrorMessage = (errorMessage: string) => {
  if (errorMessage.includes("email-already-in-use")) {
    return "このメールアドレスはすでに登録されています";
  }

  if (errorMessage.includes("user-not-found")) {
    return "このメールアドレスは登録されていません";
  }

  if (errorMessage.includes("wrong-password")) {
    return "パスワードに誤りがあります";
  }

  return errorMessage;
};
