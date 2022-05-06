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
        return response
          .status(403)
          .send(
            new CError(
              "Error at method create.",
              "Post name and description are required."
            )
          );
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
      return response.status(200).send(new CSuccess(true, posts));
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
   * @param id ID do post
   * @returns Updated post
   */
  async update(request: Request, response: Response) {
    try {
      // Recebe os novos dado do corpo da requisição
      const {
        newName,
        newDescription,
        newSpecificGame,
      }: {
        newName?: string;
        newDescription?: string;
        newSpecificGame?: string;
      } = Object(request["body"]);

      // Recebe id do post pela query
      const { id }: { id: number } = Object(request["query"]);

      // Caso não envie um id
      if (!id) {
        // Retorna erro
        return response
          .status(403)
          .send(new CError("Error at method update.", "No post id sent."));
      }

      // Busca o post com o id enviado
      const targetPost = await Post.findOne({ where: { id: id } });

      // Caso não encontre um post com esse id
      if (!targetPost) {
        // Retorna erro
        return response
          .status(404)
          .send(new CError("Error at method update.", "Post not found."));
      }

      // Atualiza o post
      const updatedPost = await Post.update(
        {
          name: newName,
          description: newDescription,
          specificGame: newSpecificGame,
        },
        {
          where: { id: id },
        }
      );

      // Retorna sucesso
      return response
        .status(200)
        .send(new CSuccess(true, "Post updated successfully."));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send({ message: "Error at method update.", error: error });
    }
  }

  /**
   * Rota para fazer delete de um post
   * @param id ID do post
   * @returns Deleted post
   */
  async delete(request: Request, response: Response) {
    try {
      // Recebe id do post pela query
      const { id }: { id: number } = Object(request["query"]);

      // Caso não seja enviado um id
      if (!id) {
        // Retorna erro
        return response
          .status(403)
          .send(new CError("Error at method delete.", "No post id provided."));
      }

      // Busca um post no banco
      const post = await Post.findOne({ where: { id: id } });

      // se não encontrar nenhum post
      if (!post) {
        // Retorna erro
        return response
          .status(404)
          .send(new CError("Error at method delete.", "Post not found."));
      }

      // Exclui o post
      await Post.destroy({ where: { id: id } });

      // Retorna sucesso
      return response
        .status(200)
        .send(new CSuccess(true, "Post deleted successfully"));

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
