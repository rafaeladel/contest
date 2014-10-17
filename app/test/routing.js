var expect = require("chai").expect;
var request = require("superagent");

describe("Hello World", function() {
    describe("Simple math", function() {
        it("Should return 404 error", function () {
            request
                .get("/qeqwe", function (res) {
                    expect(res).to.be.a("object");
                    console.log(res);
                    expect(res).to.have.property("status");
                    expect(res).to.have.deep.property("message");
                    expect(res.status).to.equal(404);
                    //expect(res.message).to.equal("Page");
                });
        });
    });
});