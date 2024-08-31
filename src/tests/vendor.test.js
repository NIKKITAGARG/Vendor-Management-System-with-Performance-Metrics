const request = require('supertest');
const app = require('../index'); // Adjust the path to your server file

let token;

beforeAll(async () => {
  // Authenticate to get a token
  const res = await request(app)
    .post('/auth/login')
    .send({ username: 'testuser', password: 'password123' });
  
  token = res.body.token;
});

describe('Vendor API Endpoints', () => {
  it('should create a new vendor', async () => {
    const res = await request(app)
      .post('/vendors')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Vendor',
        contactDetails: '+1234567890',
        address: '123 Test Street'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Test Vendor');
  });

  it('should retrieve all vendors', async () => {
    const res = await request(app)
      .get('/vendors')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should retrieve a specific vendor', async () => {
    const vendorId = '66d2d921dbd6562c87b51353'; // Replace with a valid vendor ID
    const res = await request(app)
      .get(`/vendors/${vendorId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', vendorId);
  });

  it('should update a vendor', async () => {
    const vendorId = '66d2d921dbd6562c87b51353'; // Replace with a valid vendor ID
    const res = await request(app)
      .put(`/vendors/${vendorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ contactDetails: '+0987654321' });
    
    expect(res.status).toBe(200);
    expect(res.body.contactDetails).toBe('+0987654321');
  });

  it('should delete a vendor', async () => {
    const vendorId = '66d2d921dbd6562c87b51353'; // Replace with a valid vendor ID
    const res = await request(app)
      .delete(`/vendors/${vendorId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
  });
});
