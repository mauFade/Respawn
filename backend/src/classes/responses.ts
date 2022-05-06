import { IError, ISuccess } from "../interfaces/responses";

class CError implements IError {
  /**
   * Classe que retorna erro
   * @param message Mensagem do erro
   * @param error Erro
   */
  constructor(public message: string, public error: string) {
    this.message = message;
    this.error = error;
  }
}

class CSuccess implements ISuccess {
  /**
   * Classe que retorna sucesso
   * @param success Status de sucesso
   * @param data Dados retornados
   */
  constructor(public success: boolean, public data: any) {
    this.success = success;
    this.data = data;
  }
}

export { CError, CSuccess };
