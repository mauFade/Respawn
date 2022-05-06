// Imports interfaces
import { Request, Response } from "express";

// Import models
import User from "../models/User";

// Import classes
import { CError, CSuccess } from "../classes/responses";
class UserInstant {
  /**
   * Rota para criação de um novo usuário
   * @param name Nome do usuário
   * @param email Email do usuário
   * @param gamertag Apelido do usuário
   * @param password Senha do usuário
   * @param cellphone Celular do usuário
   * @param city Cidade do usuário
   * @param country País do usuário
   * @returns Novo usuário criado
   */
  async create(request: Request, response: Response) {
    try {
      // Recebe dados para criação do corpo da requisição
      const {
        name,
        email,
        gamertag,
        password,
        cellphone,
        city,
        country,
      }: {
        name: string;
        email: string;
        gamertag: string;
        password: string;
        cellphone: string;
        city: string;
        country: string;
      } = Object(request["body"]);

      // Caso algum dos dados não tenha sido enviado
      if (
        !name ||
        !email ||
        !gamertag ||
        !password ||
        !cellphone ||
        !city ||
        !country
      ) {
        // Retorna erro
        return response
          .status(403)
          .send(
            new CError("Error at method create.", "All fields are required.")
          );
      }

      // Busca um usuário no banco com o mesmo email
      const sameEmail = await User.findOne({ where: { email: email } });

      // Caso já houver algum usuário com este email
      if (sameEmail) {
        // Retorna erro
        return response
          .status(403)
          .send(
            new CError(
              "Error at method create.",
              "This email is already in use."
            )
          );
      }

      // Busca um usuário no banco com a mesma gamertag
      const sameGamertag = await User.findOne({
        where: { gamertag: gamertag },
      });

      // Caso já houver um usuário com a mesma gamertag
      if (sameGamertag) {
        // Retorna erro
        return response
          .status(403)
          .send(
            new CError(
              "Error at method create.",
              "This gamertag is already in use."
            )
          );
      }

      // Busca um usuário no banco com o mesmo celular
      const samePhone = await User.findOne({ where: { cellphone: cellphone } });

      // Caso já houver um usuário com o mesmo celular
      if (samePhone) {
        // Retorna erro
        return response
          .status(403)
          .send(
            new CError(
              "Error at method create.",
              "This gamertag is already in use."
            )
          );
      }

      // Cria o usuário
      const user = await User.create({
        name,
        email,
        gamertag,
        password,
        cellphone,
        city,
        country,
      });

      // Retorna sucesso
      return response.status(200).send(new CSuccess(true, user));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method create.", error: error });
    }
  }

  /**
   * Rota para listagem de todos os usuários
   * @returns Users
   */
  async read(request: Request, response: Response) {
    try {
      // Busca os usuários do banco
      const users = await User.findAll();

      // Retorna os usuários
      return response.status(200).send(new CSuccess(true, users));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method read.", error: error });
    }
  }
  /**
   * Rota para fazer update de dados de um determinado usuário
   * @param newName Novo nome do usuário
   * @param newEmail Novo email do usuário
   * @param newGamertag Novo apelido do usuário
   * @param newPassword Nova senha do usuário
   * @param newCellphone Novo celular do usuário
   * @param newCity Nova cidade do usuário
   * @param newCountry Novo país do usuário
   * @returns Usuário com dados atualizados
   */
  async update(request: Request, response: Response) {
    try {
      // Recebe dados a serem atulizados do corpo da requisição
      const {
        newName,
        newEmail,
        newGamertag,
        newPassword,
        newCellphone,
        newCity,
        newCountry,
      }: {
        newName?: string;
        newEmail?: string;
        newGamertag?: string;
        newPassword?: string;
        newCellphone?: string;
        newCity?: string;
        newCountry?: string;
      } = Object(request["body"]);

      // Recebe email do usuário cujos dados estão sendo atualizados na query
      const { userEmail }: { userEmail: string } = Object(request["query"]);

      // Caso não seja enviado um email
      if (!userEmail) {
        // Retorna erro
        return response
          .status(500)
          .send(
            new CError(
              "Error at method update.",
              "Email of user witch data is being updated is necessary."
            )
          );
      }

      // Busca um usuário com esse email
      const targetUser = await User.findOne({ where: { email: userEmail } });

      // caso não encontre um usuário com esse email
      if (!targetUser) {
        // Retorna erro
        return response
          .status(404)
          .send(
            new CError(
              "Error at method update.",
              "No user found with this email."
            )
          );
      }

      // Atualiza os dados
      const updatedUser = await User.update(
        {
          name: newName,
          email: newEmail,
          gamertag: newGamertag,
          password: newPassword,
          cellphone: newCellphone,
          city: newCity,
          country: newCountry,
        },
        {
          where: { email: userEmail },
        }
      );

      // Retorna sucesso
      return response.status(200).send(new CSuccess(true, updatedUser));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method update.", error: error });
    }
  }

  /**
   * Rota para apagar um usuário
   * @returns Usuário excluído
   */
  async delete(request: Request, response: Response) {
    try {
      // Recebe email do usuário que está sendo excluído da query
      const { userEmail }: { userEmail: string } = Object(request["query"]);

      // Se não for enviado um email
      if (!userEmail) {
        // Retorna erro
        return response
          .status(403)
          .send(new CError("Error at method delete.", "No email sent."));
      }

      // Busca um usuário do banco
      const targetUser = await User.findOne({ where: { email: userEmail } });

      // Caso não encontrar um usuário
      if (!targetUser) {
        // Retorna erro
        return response
          .status(404)
          .send(new CError("Error at method delete.", "User not found."));
      }

      // Apaga o usuário
      const deletedUser = await User.destroy({
        where: { email: userEmail },
      });

      // Retorna sucesso
      return response
        .status(200)
        .send(new CSuccess(true, "User deleted successfully!"));

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method delete.", error: error });
    }
  }
}

export default new UserInstant();
