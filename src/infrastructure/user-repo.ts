import { IUserRepo } from "../domain/user-repo.interface";

export class UserRepo implements IUserRepo {
  userExists(userId: number) {
    /* This function would access the user repository and check if the userId exists.
      Since we are asked to create users ad-hoc, this is the same as assuming all userIds exist. */
    return true;
  }
}