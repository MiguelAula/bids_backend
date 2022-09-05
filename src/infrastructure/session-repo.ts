import { MyCache } from "../cache";
import { ISession, ISessionRepo } from "../domain/session-repo.interface";

export class SessionRepo implements ISessionRepo {
  private cache: MyCache<ISession>;
  private sessionKeyBuilder: (userId: number) => string;

  constructor(sessionKeyBuilder?: (userId: number) => string) {
    const defaultSessionKeyBuilder = (userId: number) => require('crypto').createHash('md5').update(`${userId}-${Date.now()}`).digest("hex");
    this.sessionKeyBuilder = sessionKeyBuilder !== undefined ? sessionKeyBuilder : defaultSessionKeyBuilder;
    const defaultTtl = 60 * 10;
    const defaultCheckperiod = 30;
    this.cache = new MyCache<ISession>(defaultTtl, defaultCheckperiod);
  }
  add(userID: number, expiresIn?: number): string {
    const sessionKey = this.sessionKeyBuilder(userID);
    const defaultExpiresIn = 1000 * 60 * 10;
    const now = Date.now();
    const sessionTtl = expiresIn !== undefined ? expiresIn : defaultExpiresIn
    const session: ISession = {
      key: sessionKey,
      userID: userID,
      expires: (now + sessionTtl)
    }
    this.cache.set(sessionKey, session);
    return sessionKey;
  }
  isValid(sessionKey: string): boolean {
    const session = this.cache.get(sessionKey);
    const now = Date.now();
    return session !== undefined && session.expires > now;
  }
  get(sessionKey: string): ISession {
    return this.cache.get(sessionKey);
  }
}