// Import modules
import { Request, Response } from "express";

// Import models
import Post from "../models/Post";

// Import classes
import { CSuccess, CError } from "../classes/responses";

class PostInstant {
  /**
   * Rota para criação de um novo post
   * @param name Título do post
   * @param description Corpo deo post
   * @param specificGame Jogo específico do qual se trata o post. Defaults to general type
   * @returns Created post
   */
  async create(request: Request, response: Response) {
    try {
      // Recebe dados do post do corpo da requisição
      const {
        name,
        description,
        specificGame,
      }: {
        name: string;
        description: string;
        specificGame: string;
      } = Object(request["body"]);

      // Caso não seja enviado algum dado necessário
      if (!name || !description) {
        // Retorna erro
        return response.status(403).send({
          message: "Error at method create.",
          error: "Name and description are required.",
        });
      }

      // Cria post no banco
      const post = await Post.create({
        name: name,
        description: description,
        specificGame: specificGame,
      });

      // Retorna sucesso
      return response.status(200).send(new CSuccess(true, post));

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method create.", error: error });
    }
  }

  /**
   * Rota para leitura dos posts como uma timeline
   * @returns Posts timeline
   */
  async read(request: Request, response: Response) {
    try {
      // Busca todos os posts no banco
      const posts = await Post.findAll();

      // Rtorna os posts
      return response.status(200).send({ success: true, data: posts });
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method read.", error: error });
    }
  }

  /**
   * Rota para fazer update de um post
   * @param newName Novo título
   * @param newDescription Novo corpo
   * @param newSpecificGame Novoa jogo específico
   */
  async update(request: Request, response: Response) {
    try {
      // Recebe os novos dado do corpo da requisição
      const {
        newName,
        newDescription,
        newSpecificGame,
      }: {
        newName: string;
        newDescription: string;
        newSpecificGame: string;
      } = Object(request["body"]);

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method update.", error: error });
    }
  }
}

export default new PostInstant();
