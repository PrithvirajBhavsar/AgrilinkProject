let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('./index.js');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST reports', () => {
    it('it should not POST a report with any blank value', (done) => {
        let report = {
            userID:"1234570",
            marketID:"4453234",
            marketName:"Surat mandi",
            cmdtyID:"64464333",
            cmdtyName:"Tomato",
            priceUnit:"Quintal",
            convFctr:"100",
            price:"1500"
        }
      chai.request(app)
          .post('/reports')
          .send(report)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

});

describe('/GET reports', () => {
    it('it should GET the report id', (done) => {
      chai.request(app)
          .get('/reports?reportID=626b4d4da67d28179456a921')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});
