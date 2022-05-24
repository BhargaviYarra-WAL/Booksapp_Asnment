const expect = require("chai").expect;

const request = require("supertest");

const app = require("../../../app.js");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJ1c2VybmFtZSI6ImFiYyJ9LCJpYXQiOjE2NTMwMzY3MDUsImV4cCI6MTY1MzAzNzkwNX0._G2ZXtr6GsIuE2RzEs3Bfh6Xuw2dyLLS9KFoDfu7Kjk";

describe("GET /category", () => {
  it("Ok, get category", (done) => {
    request(app)
      .get(`/category`)
      .then((res) => {
        const body = res.body;
        console.log(res);
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("POST /category", () => {
  it("OK post category", (done) => {
    const bookObj = {
      name: "Horror",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    request(app)
      .post(`/category`, {})
      .send(bookObj)
      .set({ token })
      .then((res) => {
        const body = res.body;
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
