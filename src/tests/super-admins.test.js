import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});

describe('GET /api/super-admin', () => {
  test('Should return all elements of superAdmin', async () => {
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('GET BY ID /api/super-admin/:id', () => {
  test('Should return a superAdmin valid ID', async () => {
    const id = '64667748fc13ae7f027631cc';
    const response = await request(app).get(`/api/super-admin/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Should return a superAdmin invalid ID', async () => {
    const id = '64667748fc13ae7f027999cc';
    const response = await request(app).get(`/api/super-admin/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Invalid route', async () => {
    const id = '64667748fc13ae7f027631cc';
    const response = await request(app).get(`/api/superadmin/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/super-admin', () => {
  test('Should send data from API', async () => {
    const mockSuperAdmin = {
      email: 'octavito@gmail.com',
      password: 'Lasleonas1234',
    };
    const response = await request(app).post('/api/super-admin').send(mockSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('Invalid data', async () => {
    const mockSuperAdmin = {
      email: 'octavito sin email',
      password: 'lasleonas',
    };
    const response = await request(app).post('/api/super-admin').send(mockSuperAdmin);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});
