const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const nock = require('nock');

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /userpastreview', () => {
  beforeEach(() => {
    nock(process.env.API_USER_PAST_REVIEW)
      .get(`?key=${process.env.API_KEY}`)
      .reply(200, { data: 'mock data' });
  });

  it('should return a status code of 200', (done) => {
    chai.request(app)
      .get('/userpastreview')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a status code of 500 on error', (done) => {
    nock.cleanAll(); // Clear existing mocks
    nock(process.env.API_USER_PAST_REVIEW)
      .get(`?key=${process.env.API_KEY}`)
      .replyWithError('Something went wrong');

    chai.request(app)
      .get('/userpastreview')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});

describe('GET /userpastorder', () => {
  beforeEach(() => {
    nock(process.env.API_USER_PAST_ORDER)
      .get(`?key=${process.env.API_KEY}`)
      .reply(200, { data: 'mock data' });
  });

  it('should return a status code of 200', (done) => {
    chai.request(app)
      .get('/userpastorder')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a status code of 500 on error', (done) => {
    nock.cleanAll(); // Clear existing mocks
    nock(process.env.API_USER_PAST_ORDER)
      .get(`?key=${process.env.API_KEY}`)
      .replyWithError('Something went wrong');

    chai.request(app)
      .get('/userpastorder')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});

describe('POST /edituserreview', () => {
  it('should return a status code of 200', (done) => {
    chai.request(app)
      .post('/edituserreview')
      .send({ saveData: 'test' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a message of "edit successfully"', (done) => {
    chai.request(app)
      .post('/edituserreview')
      .send({ saveData: 'test' })
      .end((err, res) => {
        expect(res.body.message).to.equal('edit successfully');
        done();
      });
  });

});

describe('POST /createuserreview', () => {
  it('should return a status code of 200', (done) => {
    chai.request(app)
      .post('/createuserreview')
      .send({ saveData: 'test' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a message of "create successfully"', (done) => {
    chai.request(app)
      .post('/createuserreview')
      .send({ saveData: 'test' })
      .end((err, res) => {
        expect(res.body.message).to.equal('create successfully');
        done();
      });
  });

});

describe('Error handling for non-existent routes', () => {
  it('should return a status code of 404 for non-existent GET route', (done) => {
    chai.request(app)
      .get('/nonexistentroute')
      .end((err, res) => {
        expect(res.status).to.equal(404);

        done();
      });
  });

  // Failed test for /reviewDetails route
  it('should return an error message on GET /reviewDetails when the API call fails', (done) => {
    // Mock the axios.get call to return a 500 error
    nock('https://my.api.mockaroo.com')
      .get('/pastreview1234.json?key=3c15f680')
      .reply(500);
    chai.request(app)
      .get('/reviewDetails')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.text).to.equal('Error retrieving reviews');
        done();
      });
  });
});
describe('GET /getmenu', () => {
  // Success test
  it('should return menu data', async () => {
    const menuData = [{ name: 'Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese', price: 69 }, { name: 'Pizza', description: 'Thin crust pizza with your choice of toppings', price: 96 }];
    // Mock the axios.get call to return the menuData
    nock('https://my.api.mockaroo.com')
      .get('/menu.json?key=3c15f680')
      .reply(200, menuData);

    const res = await chai.request(app).get('/getmenu');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(menuData);
  });

  // Failure test
  it('should return an error message when the API call fails', async () => {
    // Mock the axios.get call to return a 500 error
    nock('https://my.api.mockaroo.com')
      .get('/menu.json?key=3c15f680')
      .reply(500);

    const res = await chai.request(app).get('/getmenu');
    expect(res.status).to.equal(500);
    expect(res.text).to.equal('An error occured');
  });
});

describe('POST /api/edit-menu-items/:id', () => {
  // Success test
  it('should update the menu item and return a success message', async () => {
    const itemId = '123';
    const updatedItem = { name: 'New Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese', price: 10.99 };

    const res = await chai.request(app).post(`/api/edit-menu-items/${itemId}`).send(updatedItem);
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: 'Menu item updated successfully.' });
    // Add additional assertions here to test the updated data was saved
  });

  // Success test for /reviewDetails route
  it('should return past review data on GET /reviewDetails', (done) => {
    const pastReviewData = [{ name: 'John', review: 'Great food!', rating: 5 }, { name: 'Jane', review: 'Service was a bit slow', rating: 3 }];
    // Mock the axios.get call to return the pastReviewData
    nock('https://my.api.mockaroo.com')
      .get('/pastreview1234.json?key=3c15f680')
      .reply(200, pastReviewData);
    chai.request(app)
      .get('/reviewDetails')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(pastReviewData);
        done();
      });
  });

  it('should return a status code of 404 for non-existent POST route', (done) => {
    chai.request(app)
      .post('/nonexistentroute')
      .send({ saveData: 'test' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('GET /getuser', () => {
  // Success test
  it('should return user data', async () => {
    const userData = [{ name: 'John', email: 'john@example.com' }, { name: 'Jane', email: 'jane@example.com' }];
    // Mock the axios.get call to return the userData
    nock('https://my.api.mockaroo.com')
      .get(`/user.json?key=${process.env.MOCKAROO_API_KEY_4}`)
      .reply(200, userData);

    const res = await chai.request(app).get('/getuser');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(userData);
  });

  // Failure test
  it('should return an error message when the API call fails', async () => {
    // Mock the axios.get call to return a 500 error
    nock('https://my.api.mockaroo.com')
      .get(`/user.json?key=${process.env.MOCKAROO_API_KEY_4}`)
      .reply(500);

    const res = await chai.request(app).get('/getuser');
    expect(res.status).to.equal(500);
    expect(res.text).to.equal('An error occured');
  });
});

describe('GET /getbusiness', () => {
  // Success test
  it('should return business data', async () => {
    const businessData = [{ name: 'Bob\'s Burgers', location: '123 Main St' }, { name: 'Patty\'s Pies', location: '456 Oak Ave' }];
    // Mock the axios.get call to return the businessData
    nock('https://my.api.mockaroo.com')
      .get(`/business.json?key=${process.env.MOCKAROO_API_KEY_4}`)
      .reply(200, businessData);

    const res = await chai.request(app).get('/getbusiness');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(businessData);
  });

  // Failure test
  it('should return an error message when the API call fails', async () => {
    // Mock the axios.get call to return a 500 error
    nock('https://my.api.mockaroo.com')
      .get(`/business.json?key=${process.env.MOCKAROO_API_KEY_4}`)
      .reply(500);

    const res = await chai.request(app).get('/getbusiness');
    expect(res.status).to.equal(500);
    expect(res.text).to.equal('An error occured');
  });
});