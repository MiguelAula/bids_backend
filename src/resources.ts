import { BidController } from "./controllers/bid.controller";
import { UserController } from "./controllers/user.controller"
import { BidRepo } from "./infrastructure/bid-repo";
import { UserRepo } from "./infrastructure/user-repo"

export interface IAppResources {
  userController: UserController,
  bidController: BidController
}

export function buildResources(): IAppResources {
  const userRepo = new UserRepo();
  const userController = new UserController(userRepo);
  const bidRepo = new BidRepo();
  const bidController = new BidController(bidRepo);
  return {
    userController,
    bidController
  }
}