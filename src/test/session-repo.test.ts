import { SessionRepo } from "../infrastructure/session-repo";

test("Session within expiration limit is valid", async () => {
  const sessionRepo = new SessionRepo();
  const userID = 1;
  const sessionKey = sessionRepo.add(userID, 10);
  expect(sessionRepo.isValid(sessionKey)).toBeTruthy();
});

test("Session after expiration limit is NOT valid", async () => {
  const sessionRepo = new SessionRepo();
  const userID = 1;
  const sessionKey = sessionRepo.add(userID, 0);
  expect(sessionRepo.isValid(sessionKey)).toBeFalsy();
});