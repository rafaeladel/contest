var expect = require("chai").expect;
var app = require("../app");
var request = require("supertest");

describe("Users api req", function () {
    var tempUser_id = null;
    
    it("Should return all users", function (done) {
        request(app)
            .get("/api/users")
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.body).to.be.a("Array");
                done();
            });
    });

    it("Should add return validation error", function(done) {
        request(app)
            .post("/api/users")
            .send({ password: "123456" , matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("name").to.equal("ValidationError");
                done();
            });
    });
    
    it("Should add new user", function(done) {
        request(app)
            .post("/api/users")
            .send({ username: "rafael", password: "123456" , matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("user").to.have.property("username").to.equal("rafael");
                tempUser_id = res.body.user._id;
                done();
            });
    });
    
    it("Should edit user", function(done) {
        request(app)
            .put("/api/users/" + tempUser_id )
            .send({ username: "adel", password: "123456" , matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("user").to.have.property("username").to.equal("adel");
                tempUser_id = res.body.user._id;
                done();
            });
    });
    
    it("Should delete a user", function(done) {
        request(app)
            .delete("/api/users/" + tempUser_id)
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("success").to.equal(true);
                done();
            });
    });
});