/**
 * Interface de dados de posts
 */

interface IPost {
  id?: number;
  name: string;
  description: string;
  specificGame?: string;
  likesCount?: number;
}

export default IPost;
