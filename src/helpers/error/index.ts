export type DefaultErrorInput = {
  name: string;
  code: number;
  message: string;
  path?: string;
};

export class DefaultError extends Error {
  code: number;
  path: string | undefined;

  constructor({ name, code, message, path }: DefaultErrorInput) {
    super(message);
    this.name = name;
    this.code = code;
    this.path = path;
  }
}

export class AuthError extends DefaultError {
  constructor(message: string = "Unauthorized", path?: string) {
    super({ name: "AuthError", code: 401, message, path });
  }
}

export class ForbiddenError extends DefaultError {
  constructor(message: string) {
    super({ name: "ForbiddenError", code: 403, message });
  }
}

export class NotFoundError extends DefaultError {
  constructor(message: string) {
    super({ name: "NotFoundError", code: 404, message });
  }
}

export class ValidationError extends DefaultError {
  constructor(message: string, path?: string) {
    super({ name: "ValidationError", code: 400, message: message, path });
  }
}

export class UnknownError extends DefaultError {
  constructor() {
    super({ name: "UnknownError", code: 418, message: "Unknown error" });
  }
}

export class ConflictError extends DefaultError {
  constructor(message: string) {
    super({ name: "ConflictError", code: 409, message });
  }
}
