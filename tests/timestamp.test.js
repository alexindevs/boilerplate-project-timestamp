const request = require('supertest');
const app = require('../index.js');

describe('Timestamp Microservice API', () => {

  let server;

  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Server is running on port 3000');
      done();
    });
  });
  
  afterAll((done) => {
    server.close(() => {
      console.log('Server is closed');
      done();
    });
  });

  it('should return current time when date parameter is empty', async () => {
    const response = await request(app).get('/api/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('unix');
    expect(response.body).toHaveProperty('utc');
  });

  it('should return Unix timestamp and UTC string for a valid date', async () => {
    const response = await request(app).get('/api/1451001600000');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('unix');
    expect(response.body).toHaveProperty('utc');
    expect(response.body.unix).toBe(1451001600000);
    expect(response.body.utc).toBe('Fri, 25 Dec 2015 00:00:00 GMT');
  });

  it('should return an error object for an invalid date', async () => {
    const response = await request(app).get('/api/invalid-date');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid Date');
  });

  it('should return current time when date parameter is missing', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('unix');
    expect(response.body).toHaveProperty('utc');
  });
});
