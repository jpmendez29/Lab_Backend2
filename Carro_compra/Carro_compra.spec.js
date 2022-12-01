import { App } from "../app";
import request from "supertest";
describe("#Carro", () => {
  let app;
  let token = "";
  beforeAll(async () => {
    app = App();
    const username = "test" + Math.random().toString(24).split(2, 7);
    await request(app)
      .post("/users/CreateUs")
      .send({
        us: username,
        email: username + "@test.com",
        pasw: "12345",
      });
    token = (
      await request(app).post("/users/login").send({
        us: username,
        pasw: "12345",
      })
    ).body;
  });

  describe("POST /categories/", () => {
    it("should create a car", async () => {});
  });

  describe("GET /car/", () => {
    it("get records", async () => {
      const resp = await request(app)
        .get("/car/")
        .set("Authorization", `Bearer ${token}`);
      expect(resp.statusCode).toBe(200);
      expect(Array.isArray(resp.body)).toBe(true);
    });
  });

  describe("PATCH /categories/", () => {
    it("should update a car", async () => {});
  });

  describe("DELETE /car/", () => {
    it("should delete a car", async () => {});
  });
});
