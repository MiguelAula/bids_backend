export interface IBidRepo {
  bid(itemID: number, userID: number, amount: number): void;
  getTopBids(itemID: number): { [userID: number]: number };
}