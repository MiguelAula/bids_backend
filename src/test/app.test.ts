import request from "supertest";
import { App } from "../app";
import { buildTestResources } from "./test-resources";

const userID = 1111111111;
const sessionKey = "testSessionKey";
const itemID = 1;
const bid = 10;

let app: App;

beforeAll(() => {
  const sessionKeyBuilder = () => sessionKey;
  const res = buildTestResources(sessionKeyBuilder);
  app = new App(res);
});

test("GET /<userID>/login", async () => {
  const response = await request(app.getExpressApp())
    .get(`/${userID}/login`);
  expect(response.statusCode).toBe(200);
  expect(response.body.sessionKey).toBe(sessionKey);
});

test("POST /<itemID>/bid?sessionKey=<sessionKey>", async () => {
  const response = await request(app.getExpressApp())
    .post(`/${itemID}/bid?sessionKey=${sessionKey}`)
    .send({ bid: bid });
  expect(response.statusCode).toBe(200);
});

test("GET /<itemID>/topBidList", async () => {
  const response = await request(app.getExpressApp())
    .get(`/${itemID}/topBidList`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([{ [userID]: bid }]);
});