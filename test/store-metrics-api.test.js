const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

//Assertion
chai.should();
chai.use(chaiHttp);

describe("POST /api/v1/metrics/create", () => {
  const domain = "test-domain";
  const fcp = 100;
  const ttfb = 200;
  const window_load = 300;
  const dom_load = 400;
  const resource_load = 500;
  const files = [];

  const saveMetricSuccess = "metric created successfully";
  const errorMessage = (type) => `${type} field can not be null`;

  it("Should NOT store metrics without domain param", (done) => {
    const body = {
      fcp,
      ttfb,
      window_load,
      dom_load,
      resource_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(400);

        expect(response).to.have.property("text");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.have.property("error");
        expect(response.body.message.error).to.equal(errorMessage("domain"));

        response.body.should.be.a("object");
        response.body.message.should.be.a("object");

        done();
      });
  });

  it("Should NOT store metrics without fcp param", (done) => {
    const body = {
      domain,
      ttfb,
      window_load,
      dom_load,
      resource_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(400);

        expect(response).to.have.property("text");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.have.property("error");
        expect(response.body.message.error).to.equal(errorMessage("fcp"));

        response.body.should.be.a("object");
        response.body.message.should.be.a("object");

        done();
      });
  });

  it("Should NOT store metrics without ttfb param", (done) => {
    const body = {
      domain,
      fcp,
      window_load,
      dom_load,
      resource_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(400);

        expect(response).to.have.property("text");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.have.property("error");
        expect(response.body.message.error).to.equal(errorMessage("ttfb"));

        response.body.should.be.a("object");
        response.body.message.should.be.a("object");

        done();
      });
  });

  it("Should NOT store metrics without window_load param", (done) => {
    const body = {
      domain,
      fcp,
      ttfb,
      dom_load,
      resource_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(400);

        expect(response).to.have.property("text");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.have.property("error");
        expect(response.body.message.error).to.equal(
          errorMessage("window_load")
        );

        response.body.should.be.a("object");
        response.body.message.should.be.a("object");

        done();
      });
  });

  it("Should NOT store metrics without dom_load param", (done) => {
    const body = {
      domain,
      fcp,
      ttfb,
      window_load,
      resource_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(400);

        expect(response).to.have.property("text");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.have.property("error");
        expect(response.body.message.error).to.equal(errorMessage("dom_load"));

        response.body.should.be.a("object");
        response.body.message.should.be.a("object");

        done();
      });
  });

  it("Should NOT store metrics without resource_load param", (done) => {
    const body = {
      domain,
      fcp,
      ttfb,
      window_load,
      dom_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(400);

        expect(response).to.have.property("text");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.have.property("error");
        expect(response.body.message.error).to.equal(
          errorMessage("resource_load")
        );

        response.body.should.be.a("object");
        response.body.message.should.be.a("object");

        done();
      });
  });

  it("Should store metrics with valid params", (done) => {
    const body = {
      domain,
      fcp,
      ttfb,
      window_load,
      dom_load,
      resource_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.data.should.be.a("object");
        expect(response.body.message).to.equal(saveMetricSuccess);

        done();
      });
  });

  it("Should retrieve stored metrics", (done) => {
    const body = {
      domain,
      fcp,
      ttfb,
      window_load,
      dom_load,
      resource_load,
      files,
    };

    chai
      .request(server)
      .post("/api/v1/metrics/create")
      .send(body)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.data.should.be.a("object");

        const { data } = response.body;

        expect(response.body.message).to.equal(saveMetricSuccess);
        expect(data.domain).to.equal(body.domain);
        expect(data.fcp).to.equal(body.fcp);
        expect(data.ttfb).to.equal(body.ttfb);
        expect(data.dom_load).to.equal(body.dom_load);
        expect(data.window_load).to.equal(body.window_load);
        expect(JSON.stringify(data.files)).to.equal(JSON.stringify(body.files)); // stringify for arrays equality
        done();
      });
  });
});
