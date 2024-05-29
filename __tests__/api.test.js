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
        expect(res.body.msg).toBe("Invalid article id");
      });
  });
});

describe("GET: /api/articles", () => {
  test("200: should return all articles with the necessary info for each article", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
        expect(articles.length).toBe(13);
        expect(articles[0].title).toBe(
          "Eight pug gifs that remind me of mitch"
        );
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
          expect(article).not.toHaveProperty("body");
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
});

describe("GET: /api/articles/:article_id/comments", () => {
  test("200: should return an array of all comments for a given article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const comments = res.body.comments;
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            article_id: expect.any(Number),
            created_at: expect.any(String),
          });
          expect(comment.article_id).toBe(1);
        });
        expect(comments[0].body).toBe("I hate streaming noses");
      });
  });
  test("400: ERROR - responds with the error if the data type for id is incorrect", () => {
    return request(app)
      .get("/api/articles/nonsense/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("404: ERROR - responds with the Bad Request", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article id invalid");
      });
  });

  test("404: ERROR - responds with the error message if the article for a given article_id does not exists", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article id invalid");
      });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  test("201: should add a comment with the relevant article ID and respond with the newly added comment", () => {
    const comment = { username: "lurker", body: "test comment", article_id: 1 };

    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(201)
      .then((res) => {
        const comment = res.body.comment;
        expect(comment).toMatchObject({
          author: "lurker",
          body: "test comment",
        });
      });
  });
  test("400: ERROR - responds with the error if the data type for id is incorrect", () => {
    const comment = { username: "lurker", body: "test comment", article_id: 1 };

    return request(app)
      .post("/api/articles/nonsense/comments")
      .send(comment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("404: ERROR - responds with The article id does not exist if article_id not present", () => {
    const comment = { username: "lurker", body: "test comment", article_id: 1 };

    return request(app)
      .post("/api/articles/9999/comments")
      .send(comment)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("The article id does not exist");
      });
  });
});

describe("UPDATE: /api/articles/:article_id", () => {
  test("200: should update a given article by the number of votes and respond with updated article", () => {
    const articleVote = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/1")
      .send(articleVote)
      .expect(200)
      .then((res) => {
        const article = res.body.article;
        expect(article).toMatchObject({
          article_id: expect.any(Number),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: 101,
          article_img_url: expect.any(String),
        });
      });
  });
  test("400: ERROR - responds with the error if the data type for id is incorrect", () => {
    const articleVote = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/nonsense")
      .send(articleVote)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("404: ERROR - responds with The article id does not exist if article_id not present", () => {
    const articleVote = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/9999")
      .send(articleVote)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("The article id does not exist");
      });
  });
});
