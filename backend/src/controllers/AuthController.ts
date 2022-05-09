// Import interfaces
import { Request, Response } from "express";

// Import models
import User from "../models/User";

// Import classes
import { CSuccess, CError } from "../classes/responses";

class AuthenticationInstant {
  /**
   * Rota de login
   * @param email Email
   * @param password Senha
   * @returns sucesso
   */
  async create(request: Request, response: Response) {
    try {
      // Recebe email e senha do corpo da requisição
      const { email, password }: { email: string; password: string } = Object(
        request["body"]
      );

      // Caso não houver email ou senha
      if (!email || !password) {
        // Retorna erro
        return response
          .status(403)
          .send(
            new CError("Error at method create.", "All fields are required.")
          );
      }

      // Busca pelo usuário cujo email foi passado
      const user = await User.findOne({
        where: { email: email },
        attributes: ["email", "password"],
      });

      // Caso não encontre um email ou a senha inserida esteja errada
      if (!user || password !== user["password"]) {
        // Retorna erro
        return response
          .status(404)
          .send(new CError("Error at method create.", "Bad request."));
      }

      return response.status(200).send(new CSuccess(true, user));

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method create.", error: error });
    }
  }
}

export default new AuthenticationInstant();
