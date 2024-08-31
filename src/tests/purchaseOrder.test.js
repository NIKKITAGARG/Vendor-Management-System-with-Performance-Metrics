const request = require('supertest');
const app = require('../index'); 

let token;

beforeAll(async () => {
  // Authenticate to get a token
  const res = await request(app)
    .post('/auth/login')
    .send({ username: 'testuser', password: 'password123' });
  
  token = res.body.token;
});

describe('Purchase Order API Endpoints', () => {
  it('should create a new purchase order', async () => {
    const res = await request(app)
      .post('/purchase-orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        vendor: '66d2d921dbd6562c87b51353', // Replace with a valid vendor ID
        orderDate: '2024-08-30T00:00:00.000Z',
        deliveryDate: '2024-09-15T00:00:00.000Z',
        items: [
          { itemId: 'item001', description: 'High-quality widgets', quantity: 100, unitPrice: 15.50 },
          { itemId: 'item002', description: 'Premium widgets', quantity: 200, unitPrice: 25.00 }
        ],
        quantity: 300,
        status: 'completed',
        qualityRating: 4.5,
        issueDate: '2024-08-30T12:00:00.000Z',
        acknowledgmentDate: '2024-08-31T09:00:00.000Z'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('poNumber');
  });

  it('should retrieve all purchase orders', async () => {
    const res = await request(app)
      .get('/purchase-orders')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should retrieve a specific purchase order', async () => {
    const poId = '66d2c43f483c13c2cb558d95'; // Replace with a valid PO ID
    const res = await request(app)
      .get(`/purchase-orders/${poId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', poId);
  });

  it('should update a purchase order', async () => {
    const poId = '66d2c43f483c13c2cb558d95'; // Replace with a valid PO ID
    const res = await request(app)
      .put(`/purchase-orders/${poId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });
    
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  it('should delete a purchase order', async () => {
    const poId = '66d2c43f483c13c2cb558d95'; // Replace with a valid PO ID
    const res = await request(app)
      .delete(`/purchase-orders/${poId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
  });

  it('should acknowledge a purchase order', async () => {
    const poId = '66d2c43f483c13c2cb558d95'; // Replace with a valid PO ID
    const res = await request(app)
      .post(`/purchase-orders/${poId}/acknowledge`)
      .set('Authorization', `Bearer ${token}`)
      .send({ acknowledgmentDate: '2024-08-31T09:00:00.000Z' });
    
    expect(res.status).toBe(200);
    expect(res.body.acknowledgmentDate).toBe('2024-08-31T09:00:00.000Z');
  });
});
