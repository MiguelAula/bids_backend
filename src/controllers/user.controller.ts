import { IUserRepo } from "../domain/user-repo.interface";
import { ISessionRepo } from "../domain/session-repo.interface";
import { SessionRepo } from "../infrastructure/session-repo";

export class UserController {
  private userRepo: IUserRepo;
  private sessionRepo: ISessionRepo

  constructor(userRepo: IUserRepo, sessionRepo?: ISessionRepo) {
    this.userRepo = userRepo;
    const defaultSessionFactory = new SessionRepo();
    this.sessionRepo = sessionRepo || defaultSessionFactory;
  }

  login(userId: number, sessionDuration?: number): string | Error {
    return this.userRepo.userExists(userId) ?
      this.sessionRepo.add(userId, sessionDuration) :
      new Error("Invalid user");
  }
  getUserIDFromSession(sessionKey: string): number | Error {
    if (this.sessionRepo.isValid(sessionKey)) {
      const userID = this.sessionRepo.get(sessionKey)?.userID;
      return userID !== undefined ? userID : Error("Invalid session key");
    } else {
      return Error("Expired session");
    }
  }
}
