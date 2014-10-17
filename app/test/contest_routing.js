var expect = require("chai").expect;
var app = require("../app");
var request = require("supertest");

describe("Contests api req", function () {
    var tempContest_id = null;
    
    it("Should return all contests", function (done) {
        request(app)
            .get("/api/contests")
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.body).to.be.a("Array");
                done();
            });
    });

    it("Should add return validation error", function(done) {
        request(app)
            .post("/api/contests")
            .send({ questions: [], matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("name").to.equal("ValidationError");
                done();
            });
    });
    
    it("Should add new contest", function(done) {
        request(app)
            .post("/api/contests")
            .send({ title: "rafael", questions: [], matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("contest").to.have.property("title").to.equal("rafael");
                tempContest_id = res.body.contest._id;
                done();
            });
    });
    
    it("Should edit contest", function(done) {
        request(app)
            .put("/api/contests/" + tempContest_id )
            .send({ title: "adel", questions: [], matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("contest").to.have.property("title").to.equal("adel");
                tempContest_id = res.body.contest._id;
                done();
            });
    });
    
    it("Should delete a contest", function(done) {
        request(app)
            .delete("/api/contests/" + tempContest_id)
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("success").to.equal(true);
                done();
            });
    });
});