/**
 * Interface de dados de usuário
 */

interface IUser {
  id: number;
  name: string;
  email: string;
  gamertag: string;
  password: string;
  cellphone: string;
  city: string;
  country: string;
}

export default IUser;
