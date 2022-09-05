import { SessionRepo } from "../infrastructure/session-repo";
import { BidController } from "../controllers/bid.controller";
import { UserController } from "../controllers/user.controller";
import { UserRepo } from "../infrastructure/user-repo";
import { BidRepo } from "../infrastructure/bid-repo";

export function buildTestResources(sessionKeyBuilder: (userID: number) => string) {
  const userRepo = new UserRepo();
  const bidRepo = new BidRepo();
  const sessionRepo = new SessionRepo(sessionKeyBuilder);
  const userController = new UserController(userRepo, sessionRepo);
  const bidController = new BidController(bidRepo);
  return {
    userController,
    bidController
  }
}