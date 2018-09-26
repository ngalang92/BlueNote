const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const marco = "http://localhost:3000/marco";

describe("routes : static", () => {


  describe("GET /", () => {

    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", () => {

      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");

        done();
      });
    });

  }); //end describe GET


  describe('GET /about', () => {
    it("should return 'About Us' in the body of the response", (done) => {
      request.get(base + "/about", (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us");
        done();
      });
    });
	}); // end GET About Us

}); //end describe routes:static
