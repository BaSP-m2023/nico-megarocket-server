import request from 'supertest';
import adminsSeed from '../seeds/admins';

const app = require('../app');
const Admin = require('../models/Admins');

const mockAdmin = {
  firstName: 'Jose',
  lastName: 'Daniele',
  dni: 43491185,
  phone: '3413755012',
  email: 'josedaniele@example.com',
  city: 'Rosario',
  password: 'AUhiygwb12356',
};
const mockAdminBad = {
  firstName: 'Jos2',
  lastName: 'Daniel9',
  dni: 'HBUi6',
  phone: '3413755012',
  email: 'josedaniele',
  city: 'Rosario',
  password: 'AUhiygw',
};

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeed);
});

describe('GET /api/admins', () => {
  test('get all admins should return status 200', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('get all admins with bad route should return status 404', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GETBYID /api/admins/:id', () => {
  test('get an admin by id should return status 200', async () => {
    const response = await request(app).get('/api/admins/617a9f7af043b719c23928f2').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('get an admin for nonexistent id should return status 404', async () => {
    const response = await request(app).get('/api/admin/617a9f7af043b719c23929f4').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('getting an admin by id in bad format should return status 500', async () => {
    const response = await request(app).get('/api/admins/617a9f7af043b719c23928').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/admins', () => {
  test('creating an admin should return status 201', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('create an admin with a bad body should return status 400', async () => {
    const response = await request(app).post('/api/admins').send(mockAdminBad);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});
