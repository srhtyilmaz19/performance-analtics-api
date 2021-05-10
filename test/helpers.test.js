const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { checkIfPropIsValid } = require("../helpers/object-helper");

//Assertion
chai.should();
chai.use(chaiHttp);

describe("Test Helpers", () => {
  it("checkIfPropIsValid should return true for valid param", (done) => {
    const obj = {
      name: "Serhat YILMAZ",
      age: 25,
    };

    const person = {
      key: "name",
      type: "string",
    };
    const result = checkIfPropIsValid(obj, person);

    result.should.be.a("object");
    expect(result.value).to.equal(true);
    expect(result.status).to.equal(200);

    done();
  });

  it("checkIfPropIsValid should return false with status code 422 for unmatched typed", (done) => {
    const obj = {
      name: "Serhat YILMAZ",
      age: 25,
    };

    const person = {
      key: "name",
      type: "number",
    };
    const result = checkIfPropIsValid(obj, person);

    result.should.be.a("object");
    expect(result.value).to.equal(false);
    expect(result.status).to.equal(422);

    done();
  });

  it("checkIfPropIsValid should return false with status code 400 for missing key", (done) => {
    const obj = {
      age: 25,
    };

    const person = {
      key: "name",
      type: "number",
    };
    const result = checkIfPropIsValid(obj, person);

    result.should.be.a("object");
    expect(result.value).to.equal(false);
    expect(result.status).to.equal(400);

    done();
  });
});
