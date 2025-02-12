class CustomError extends Error {
  private readonly _code: string;

  constructor(params: { code: string; message: string }) {
    const { code, message } = params;

    super(message);
    this._code = code;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  get code(): string {
    return this._code;
  }
}

export default CustomError;
