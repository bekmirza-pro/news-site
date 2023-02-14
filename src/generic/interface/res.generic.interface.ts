export class CGeneric {
  message: string[];
  statusCode: number;
  data: any;
  error?: string;

  constructor(
    message: string[],
    statusCode: number,
    data: any,
    error?: string,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
  }
}
