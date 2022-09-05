import { BidRepo } from "../infrastructure/bid-repo";
import { BidController } from "../controllers/bid.controller";

test(`Given 5 users
        And 2 bids per user
        And a max of 4 top bids
      When calling topBidList
      It should return the 4 bigger bids
        And only show the max bid per user (each user will only be seen once)`, () => {
  const maxTopBids = 4;
  const bidController = new BidController(new BidRepo(), maxTopBids);
  const itemID = 1;
  const usersBids = [[4.2, 5.3], [1.2, 4.0], [2.1, 3.2], [1.1, 6.3], [5.0, 7.0]];
  usersBids.forEach((userBids, userID) => {
    bidController.bid(itemID, userID, userBids[0]);
    bidController.bid(itemID, userID, userBids[1]);
  });
  const expectedTopBidList = [
    { "4": 7.0 },
    { "3": 6.3 },
    { "0": 5.3 },
    { "1": 4.0 }
  ]
  const topBidList = bidController.topBidList(itemID);
  expect(topBidList).toEqual(expectedTopBidList);
});

test("A request for a top bid for an item without any bids submitted must be an empty string", () => {
  const bidController = new BidController(new BidRepo());
  const itemID = 1;
  expect(bidController.topBidList(itemID)).toBe("");
})