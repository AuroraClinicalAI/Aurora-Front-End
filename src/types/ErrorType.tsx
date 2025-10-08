export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    // Llama al constructor de la clase base (Error)
    super(message);

    // Asigna el nombre del error para una mejor identificación al depurar
    this.name = 'ApiError';

    // Añadimos nuestra propiedad personalizada para el código de estado HTTP
    this.statusCode = statusCode;

    // Esto es opcional pero recomendado: mantiene un stack trace limpio
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
