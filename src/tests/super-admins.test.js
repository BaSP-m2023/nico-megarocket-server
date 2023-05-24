import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superAdminSeed);
});

describe('GET BY ID /api/super-admin/:id', () => {
  test('Should return a superAdmin valid ID', async () => {
    const id = '64667748fc13ae7f027631cc';
    const response = await request(app).get(`/api/super-admin/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Should return a superAdmin invalid ID', async () => {
    const id = '646554f202739f6df0878888';
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
  test('Should handle error with status 500', async () => {
    jest.spyOn(SuperAdmin, 'findById').mockImplementation(() => {
      throw new Error('Error finding SuperAdmin by ID');
    });
    const id = '64667748fc13ae7f027631cc';
    const response = await request(app).get(`/api/super-admin/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
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
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Valid ID but not exist', async () => {
    const id = '64667748fc13ae7f027631cd';
    const data = {
      email: 'probando2@gmail.com',
      password: 'Password124',
    };
    const response = await request(app).put(`/api/super.admin/${id}`).send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Should handle error with status 500', async () => {
    jest.spyOn(SuperAdmin, 'findById').mockImplementation(() => {
      throw new Error('Error finding SuperAdmin by ID');
    });
    const id = '64667748fc13ae7f027631cc';
    const response = await request(app).get(`/api/super-admin/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('GET /api/super-admin', () => {
  test('Should return all elements of superAdmin', async () => {
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Get empty admins return status 200', async () => {
    await SuperAdmin.deleteMany({});
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
  test('Should handle error with status 500', async () => {
    jest.spyOn(SuperAdmin, 'find').mockImplementation(() => {
      throw new Error('Error finding SuperAdmin');
    });
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/super-admin/:id', () => {
  test('deletes a SuperAdmin by id', async () => {
    const superAdmin = await SuperAdmin.create({ email: 'probando1@gmail.com', password: 'Password123' });
    const response = await request(app).delete(`/api/super-admin/${superAdmin.id}`).send();
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
  test('Invalid ID', async () => {
    const id = '617a9f7af043b719c23928ffff';
    const response = await request(app).delete(`/api/super-admin/${id}`).send();
    expect(response.status).toBe(400);
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
  test('Should handle error with status 500', async () => {
    jest.spyOn(SuperAdmin, 'create').mockImplementation(() => {
      throw new Error('Error saving SuperAdmin');
    });
    const mockSuperAdmin = {
      email: 'octavito@gmail.com',
      password: 'Lasleonas1234',
    };
    const response = await request(app).post('/api/super-admin').send(mockSuperAdmin);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
