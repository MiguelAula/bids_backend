import { IUserRepo } from "../domain/user-repo.interface";

/**
 * This is pretty much a mock repository:
 * 
 * The userExists function would access the user repository and check if the userId exists.
 * But since we are asked to create the users ad-hoc but there is no real need to store them, 
 * I will just assume all users with a valid userID exist and call it a day :D
 */
export class UserRepo implements IUserRepo {
  private isValidID(userID: number) {
    return Number.isInteger(userID) && userID >= 0;
  }
  userExists(userID: number) {
    return this.isValidID(userID);
  }
}