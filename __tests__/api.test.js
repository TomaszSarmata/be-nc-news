const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const app = require("../app");

beforeEach(() => {
  console.log("seeding!");
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET: /api/topics", () => {
  test("200: should return all list of topics along with the 200 status code", () => {
    request(app).get("/api/topics").expect(200);
  });
});
