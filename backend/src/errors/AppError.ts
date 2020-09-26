class AppError {
  // usando o readonly (no ts) nao vamos conseguir setar as propriedades só fazendo error.message = 'alguma coisa'
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
