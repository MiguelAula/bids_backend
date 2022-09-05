import { UserRepo } from "../infrastructure/user-repo";
import { UserController } from "../controllers/user.controller";
import { SessionRepo } from "../infrastructure/session-repo";

test("login succeeds for a valid userID (uint)", async () => {
  const userController = new UserController(new UserRepo(), new SessionRepo(() => "testSessionKey"));
  const userID = 1;
  const sessionKeyOrError = userController.login(userID);
  expect(sessionKeyOrError).toBe("testSessionKey");
});

test("login fails for an invalid userID", async () => {
  const userController = new UserController(new UserRepo());
  const userID = -1;
  const sessionKeyOrError = userController.login(userID);
  expect(sessionKeyOrError).toEqual(Error("Invalid user"));
});

test("getUserIDFromSession returns the userID when the session is active", async () => {
  const userController = new UserController(new UserRepo());
  const userID = 1;
  const sessionKeyOrError = userController.login(userID);
  if (typeof sessionKeyOrError === "string") {
    const sessionKey = sessionKeyOrError;
    expect(userController.getUserIDFromSession(sessionKey)).toBe(userID);
  } else {
    fail("This should never happen");
  }
});

test("getUserIDFromSession returns ExpiredSession error when the session is expired", async () => {
  const userController = new UserController(new UserRepo());
  const userID = 1;
  const sessionKeyOrError = userController.login(userID, 0);
  if (typeof sessionKeyOrError === "string") {
    const sessionKey = sessionKeyOrError;
    expect(userController.getUserIDFromSession(sessionKey)).toEqual(Error("Expired session"));
  } else {
    fail("This should never happen");
  }
});