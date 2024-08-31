const request = require('supertest');
const app = require('../index'); 

describe('Authentication API Endpoints', () => {
  it('should authenticate user and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
