import request from 'supertest';
import adminsSeed from '../seeds/admins';

const app = require('../app');
const Admin = require('../models/Admins');

// const mockAdmin = {
//   firstName: 'Jose',
//   lastName: 'Daniele',
//   dni: 43491185,
//   phone: '3413755012',
//   email: 'josedaniele@example.com',
//   city: 'Rosario',
//   password: 'AUhiygwb12356',
// };

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeed);
});

describe('GET /api/admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GETBYID /api/admins/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/admins/617a9f7af043b719c23928f2').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/admin/617a9f7af043b719c23929f4').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    const response = await request(app).get('/api/admins/617a9f7af043b719c23928').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
