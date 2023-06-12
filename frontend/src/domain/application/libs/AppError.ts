type AuthErrorTypes = "USER_NOT_FOUND" | "EMAIL_NOT_VERIFIED";

class AppBaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthError extends AppBaseError {
  type: AuthErrorTypes;

  constructor(type: AuthErrorTypes) {
    super(type);
    this.type = type;
  }
}
