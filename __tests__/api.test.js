const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const app = require("../app");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET: /api/topics", () => {
  test("200: should return all list of topics along with the 200 status code", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).toBe(3);
        const testArr = res.body.topics;
        testArr.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404: ERROR - responds with the path is not found", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Route not found");
      });
  });
});

describe("GET: /api", () => {
  test("200: should return a full list of objects from the endpoints.json file", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const endpointsObj = res.body.endpoints;
        const endpointsArr = Object.values(endpointsObj);
        endpointsArr.forEach((endpoint) => {
          expect(endpoint).toMatchObject({
            description: expect.any(String),
            queries: expect.any(Array),
            exampleResponse: expect.any(Object),
          });
        });
      });
  });
  test("404: ERROR - responds with the path is not found", () => {
    return request(app)
      .get("/ap")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Route not found");
      });
  });
});
describe("GET: /api/articles/1", () => {
  test("200: should return an article by its id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const article = res.body.article;

        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
  test("400: ERROR - responds with the error if the data type for id is incorrect", () => {
    return request(app)
      .get("/api/articles/nonsense")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("404: ERROR - responds with the Bad Request", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((res) => {
        console.log(res.msg, "from test");
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});
