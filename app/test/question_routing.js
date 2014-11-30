var expect = require("chai").expect;
var app = require("../app");
var request = require("supertest");

describe("Questions api req", function () {
    var tempQuestion_id = null;
    
    it("Should return all questions", function (done) {
        request(app)
            .get("/api/questions")
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.body).to.be.a("Array");
                done();
            });
    });

    it("Should add return validation error", function(done) {
        request(app)
            .post("/api/questions")
            .send({ questionType: 0, answers: {
                    option1: {
                        content: "rafael", correct: true
                    }, 
                    option2: {
                        content: "rafael", correct: true
                    }
                }, 
                matches: []
            })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("name").to.equal("ValidationError");
                done();
            });
    });
    
    it("Should add new question", function(done) {
        request(app)
            .post("/api/questions")
            .send({ question: "What's your name", questionType: 0, answers: {
                    option1: {
                        content: "rafael", correct: true
                    }, 
                    option2: {
                        content: "rafael", correct: true
                    }
                }, matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("question").to.have.property("question").to.equal("What's your name");
                tempQuestion_id = res.body.question._id;
                done();
            });
    });
    
    it("Should edit question", function(done) {
        request(app)
            .put("/api/questions/" + tempQuestion_id )
            .send({ question: "How old are you", questionType: 0, answers: {}, matches: [] })
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("question").to.have.property("question").to.equal("How old are you");
                tempQuestion_id = res.body.question._id;
                done();
            });
    });
    
    it("Should delete a question", function(done) {
        request(app)
            .delete("/api/questions/" + tempQuestion_id)
            .end(function (err, res) {
                expect(res.headers["content-type"]).to.contain("application/json");
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property("success").to.equal(true);
                done();
            });
    });
});