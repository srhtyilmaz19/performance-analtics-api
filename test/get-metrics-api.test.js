const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

//Assertion
chai.should();
chai.use(chaiHttp);

describe("POST /api/v1/metrics", () => {
  //Test get metrics api !
  const successMessage = "metrics retrieved successfully";
  it("Should NOT get metrics without domain param", (done) => {
    chai
      .request(server)
      .post("/api/v1/metrics")
      .send()
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a("object");
        response.body.message.should.be.a("array");
        response.body.message[0].should.be.a("object");

        expect(response.body).to.have.property("message");
        expect(response.body.message[0]).to.have.property("msg");
        expect(response.body.message[0].msg).to.equal(
          "Domain field can not be null"
        );
        done();
      });
  });

  it("Should get metrics of domain by default time range", (done) => {
    const body = {
      domain: "localhost",
    };

    chai
      .request(server)
      .post("/api/v1/metrics")
      .send(body)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.data.should.be.a("object");
        expect(response.body.message).to.equal(successMessage);
        done();
      });
  });

  it("Should get metrics of domain of last 30 min by default time range", (done) => {
    const body = {
      domain: "localhost",
    };
    const startDate = Math.floor(Date.now() / 1000) - 30 * 60;
    const endDate = Math.floor(Date.now() / 1000);

    chai
      .request(server)
      .post("/api/v1/metrics")
      .send(body)
      .end((err, response) => {
        expect(response.body.data.endDate).to.equal(endDate);
        expect(response.body.data.startDate).to.equal(startDate);

        done();
      });
  });

  it("Should get metrics of domain by given time range", (done) => {
    const start_date = Math.round(new Date(2012, 0, 1).getTime() / 1000);
    const end_date = Math.round(new Date(2012, 5, 20).getTime() / 1000);

    const body = {
      domain: "localhost",
      start_date,
      end_date,
    };

    chai
      .request(server)
      .post("/api/v1/metrics")
      .send(body)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.data.should.be.a("object");
        expect(response.body.message).to.equal(successMessage);
        done();
      });
  });

  it("Should match retrieved metrics with given time range", (done) => {
    const start_date = Math.round(new Date(2012, 0, 1).getTime() / 1000);
    const end_date = Math.round(new Date(2012, 5, 20).getTime() / 1000);

    const body = {
      domain: "localhost",
      start_date,
      end_date,
    };

    chai
      .request(server)
      .post("/api/v1/metrics")
      .send(body)
      .end((err, response) => {
        expect(response.body.data.endDate).to.equal(end_date);
        expect(response.body.data.startDate).to.equal(start_date);
        done();
      });
  });
});
