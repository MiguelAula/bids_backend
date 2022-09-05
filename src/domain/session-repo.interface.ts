export interface ISession {
  key: string;
  userID: number;
  expires: number;
}

export interface ISessionRepo {
  add: (userId: number, expiresIn?: number) => string;
  isValid: (sessionKey: string) => boolean;
  get: (sessionKey: string) => ISession;
}