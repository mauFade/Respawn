interface IError {
  message: string;
  error: string;
}

interface ISuccess {
  success: boolean;
  data: any;
}

export { IError, ISuccess };
