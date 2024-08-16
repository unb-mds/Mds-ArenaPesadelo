export default class ApiError {
  public readonly code: number = 400;

  public readonly message: string = '';

  constructor(message: string, code?: number) {
    this.message = message;
    this.code = code || 400;
  }
}
