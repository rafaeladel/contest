var expect = require("chai").expect;
var app = require("../app");
var request = require("supertest");

describe("Simple api req", function () {
    it("Should return 404 error", function (done) {
        request(app)
            .get("/test")
            .expect(404)
            .end(function (err, res) {
                expect(res).to.be.a("object");
                expect(res.body).to.have.property("message");
                expect(res.body.status).to.equal(404);
                expect(res.body.message).to.equal("Page not found");
                done();
            });
    });
});