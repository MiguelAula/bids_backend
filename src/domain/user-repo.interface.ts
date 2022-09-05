export interface IUserRepo {
  userExists(userId: number): boolean;
}