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

  describe("GET /marco", () => {
		it("should return status code 200 and have 'polo' in the body of the response", done => {
			request.get(marco, (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(body).toBe('polo');
				done();
			});
		});
	}); // end describe GET/marco

}); //end describe routes:static
