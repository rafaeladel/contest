var expect = require("chai").expect;
var app = require("../app");
var request = require("supertest");

describe("Matches api req", function () {
    var tempMatch_id = null;
    
    it("Should return all matches", function (done) {
        request(app)
            .get("/api/matches")
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.body).to.be.a("Array");
                done();
            });
    });

    it("Should add new match", function(done) {
        request(app)
            .post("/api/matches")
            .send({ questions: [], users: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("match").to.have.property("questions").to.be.a("Array");
                expect(res.body).to.have.property("match").to.have.property("users").to.be.a("Array");
                tempMatch_id = res.body.match._id;
                done();
            });
    });
    
    it("Should edit match", function(done) {
        request(app)
            .put("/api/matches/" + tempMatch_id )
            .send({ questions: [], matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                //expect(res.body).to.have.property("match").to.have.property("title").to.equal("adel");
                tempMatch_id = res.body.match._id;
                done();
            });
    });
    
    it("Should delete a match", function(done) {
        request(app)
            .delete("/api/matches/" + tempMatch_id)
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("success").to.equal(true);
                done();
            });
    });
});