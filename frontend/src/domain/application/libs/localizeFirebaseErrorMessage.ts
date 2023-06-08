export const localizeFirebaseErrorMessage = (errorMessage: string) => {
  if (errorMessage.includes("email-already-in-use")) {
    return "このメールアドレスはすでに登録されています";
  }

  return errorMessage;
};
