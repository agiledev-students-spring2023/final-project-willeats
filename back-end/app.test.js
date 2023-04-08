const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const nock = require('nock');

chai.use(chaiHttp);
const expect = chai.expect;

// describe('GET /userpastreview', () => {
//   beforeEach(() => {
//     nock(process.env.API_USER_PAST_REVIEW)
//       .get(`?key=${process.env.API_KEY}`)
//       .reply(200, { data: 'mock data' });
//   });

//   it('should return a status code of 200', (done) => {
//     chai.request(app)
//       .get('/userpastreview')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         done();
//       });
//   });

//   it('should return a status code of 500 on error', (done) => {
//     nock.cleanAll(); // Clear existing mocks
//     nock(process.env.API_USER_PAST_REVIEW)
//       .get(`?key=${process.env.API_KEY}`)
//       .replyWithError('Something went wrong');

//     chai.request(app)
//       .get('/userpastreview')
//       .end((err, res) => {
//         expect(res.status).to.equal(500);
//         done();
//       });
//   });
// });

// describe('GET /userpastorder', () => {
//   beforeEach(() => {
//     nock(process.env.API_USER_PAST_ORDER)
//       .get(`?key=${process.env.API_KEY}`)
//       .reply(200, { data: 'mock data' });
//   });

//   it('should return a status code of 200', (done) => {
//     chai.request(app)
//       .get('/userpastorder')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         done();
//       });
//   });

//   it('should return a status code of 500 on error', (done) => {
//     nock.cleanAll(); // Clear existing mocks
//     nock(process.env.API_USER_PAST_ORDER)
//       .get(`?key=${process.env.API_KEY}`)
//       .replyWithError('Something went wrong');

//     chai.request(app)
//       .get('/userpastorder')
//       .end((err, res) => {
//         expect(res.status).to.equal(500);
//         done();
//       });
//   });
// });

// describe('POST /edituserreview', () => {
//   it('should return a status code of 200', (done) => {
//     chai.request(app)
//       .post('/edituserreview')
//       .send({ saveData: 'test' })
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         done();
//       });
//   });

//   it('should return a message of "edit successfully"', (done) => {
//     chai.request(app)
//       .post('/edituserreview')
//       .send({ saveData: 'test' })
//       .end((err, res) => {
//         expect(res.body.message).to.equal('edit successfully');
//         done();
//       });
//   });

// });

// describe('POST /createuserreview', () => {
//   it('should return a status code of 200', (done) => {
//     chai.request(app)
//       .post('/createuserreview')
//       .send({ saveData: 'test' })
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         done();
//       });
//   });

//   it('should return a message of "create successfully"', (done) => {
//     chai.request(app)
//       .post('/createuserreview')
//       .send({ saveData: 'test' })
//       .end((err, res) => {
//         expect(res.body.message).to.equal('create successfully');
//         done();
//       });
//   });

// });

// describe('Error handling for non-existent routes', () => {
//   it('should return a status code of 404 for non-existent GET route', (done) => {
//     chai.request(app)
//       .get('/nonexistentroute')
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//   });

//   it('should return a status code of 404 for non-existent POST route', (done) => {
//     chai.request(app)
//       .post('/nonexistentroute')
//       .send({ saveData: 'test' })
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//   });
// });