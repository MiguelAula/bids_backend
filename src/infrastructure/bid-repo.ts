import { MyCache } from "../cache";
import { IBidRepo } from "../domain/bid-repo.interface";

interface Bid {
  itemID: number,
  userID: number,
  amount: number
}

export class BidRepo implements IBidRepo {
  private cache = new MyCache<Bid[]>();

  bid(itemID: number, userID: number, amount: number): void {
    const itemBids = this.cache.get(itemID) || [];
    this.cache.set(itemID, [...itemBids, { itemID: itemID, userID: userID, amount: amount }]);
  }

  getTopBids(itemID: number): { [userID: number]: number } {
    const itemBids = this.cache.get(itemID) || [];
    let topBids: { [userID: number]: number } = {};
    itemBids.map(bid => {
      const topBidUser = topBids[bid.userID] || 0;
      if (bid.amount > topBidUser) {
        topBids[bid.userID] = bid.amount;
      }
    });
    return topBids;
  }
}