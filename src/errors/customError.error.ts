import ErrorEnum from './errorEnum';

class CustomError extends Error {
  private readonly _code: ErrorEnum;

  constructor(code: ErrorEnum, message: string) {
    super(message);
    this._code = code;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  get code(): string {
    return this._code;
  }
}

export default CustomError;
