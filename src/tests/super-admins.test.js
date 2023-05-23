import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});

describe('PUT /api/super-admin/:id', () => {
  test('Should edit element', async () => {
    const id = '64667748fc13ae7f027631cc';
    const data = {
      email: 'probando2@gmail.com',
      password: 'Password124',
    };
    const response = await request(app).put(`/api/super-admin/${id}`).send(data);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Invalid edit element', async () => {
    const id = '64667748fc13ae7f027631cc';
    const data = {
      firstName: 'Raul',
    };
    const response = await request(app).put(`/api/super-admin/${id}`).send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Invalid route', async () => {
    const id = '64667748fc13ae7f027631cc';
    const data = {
      email: 'probando2@gmail.com',
      password: 'Password124',
    };
    const response = await request(app).put(`/api/superadmin/${id}`).send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Invalid ID', async () => {
    const id = '64667748fc13ae7f027631ccasd';
    const data = {
      email: 'probando2@gmail.com',
      password: 'Password124',
    };
    const response = await request(app).put(`/api/super-admin/${id}`).send(data);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/super-admin/:id', () => {
  test('deletes a SuperAdmin by id', async () => {
    const superAdmin = await SuperAdmin.create({ email: 'probando1@gmail.com', password: 'Password123' });
    const response = await request(app).delete(`/api/super-admin/${superAdmin._id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('invalid id: returns status 404 when super admin id is not found', async () => {
    const response = await request(app).delete('/api/super-admin/64667748fc13ae7f027632cc').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('invalid route: returns status 404 when route is wrong', async () => {
    const response = await request(app).delete('/api/superadmin/64667748fc13ae7f027632cc').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('server error: returns status 500 when there is an internal server error', async () => {
    jest.spyOn(SuperAdmin, 'findByIdAndDelete').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const response = await request(app).delete('/api/super-admin/64667748fc13ae7f027632cc').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
