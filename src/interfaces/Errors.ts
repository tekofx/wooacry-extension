class NotOnCardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotOnCardError";
    Object.setPrototypeOf(this, NotOnCardError.prototype);
  }
}

class TabNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TabNotFoundError";
    Object.setPrototypeOf(this, TabNotFoundError.prototype);
  }
}

export { NotOnCardError, TabNotFoundError };
