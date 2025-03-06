export class CustomErrors extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super();
  }

  static badRequest(message: string) {
    return new CustomErrors(400, message);
  }

  static internalErrorServer(message: string, code?: number) {
    if (code === 5)
      return new CustomErrors(500, message + "no entity to update");
    return new CustomErrors(500, message);
  }

  static UnAuthorized(message: string) {
    return new CustomErrors(401, message);
  }
}
