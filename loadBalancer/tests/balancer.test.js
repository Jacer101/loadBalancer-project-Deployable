//Check LoadBalancer health
const request = require("supertest");
const fs = require("fs");
const path = require("path");

const LB_URL = "http://localhost:8080";

describe("Load Balancer Response Test", () => {
  test("should respond to GET request", async () => {
    const response = await request(LB_URL).get("/health");
    expect(response.status).toBe(200);
  });
});

//File Test Setup
const testPath = path.join(__dirname, "test.txt");

beforeAll(() => {
  fs.writeFileSync(testPath, "Hello world!");
});
afterAll(() => {
  if (fs.existsSync(testPath)) fs.unlinkSync(testPath);
});

//Upload test
describe("Load Balancer Upload Test", () => {
  test("should upload file", async () => {
    const response = await request (LB_URL)
      .post("/upload")
      .attach("myFile", testPath);

    expect(response.status).toBe(200);

    //Check File's Existence
    const uploadedFilePath = path.join(__dirname, "../../../uploads", "test.txt");
    expect(fs.existsSync(uploadedFilePath)).toBe(true);
  });
});

