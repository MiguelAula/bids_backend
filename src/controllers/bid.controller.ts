import { IBidRepo } from "../domain/bid-repo.interface";

export class BidController {
  private bidRepo: IBidRepo;
  private maxTopBids: number;

  constructor(bidRepo: IBidRepo, maxTopBids?: number) {
    this.bidRepo = bidRepo;
    const defaultMaxTopBids = 15;
    this.maxTopBids = maxTopBids !== undefined ? maxTopBids : defaultMaxTopBids;
  }

  bid(itemID: number, userID: number, amount: number): void | Error {
    return this.bidRepo.bid(itemID, userID, amount);
  }

  topBidList(itemID: number): { [userID: number]: number }[] | "" {
    const topBidsDic = this.bidRepo.getTopBids(itemID);
    let topBids: { [userID: number]: number }[] = [];
    Object.keys(topBidsDic).map((userID) => {
      topBids.push({ [userID]: topBidsDic[userID] });
    });
    const sortedTopBids = topBids
      .sort((o1, o2) => {
        const bid1 = parseFloat(o1[Object.keys(o1)[0]]);
        const bid2 = parseFloat(o2[Object.keys(o2)[0]]);
        return bid2 - bid1;
      })
      .slice(0, this.maxTopBids);
    return sortedTopBids.length > 0 ? sortedTopBids : "";
  }
}