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
  test('getting an admin by id in bad format should return status 400', async () => {
    const response = await request(app).get('/api/admins/617a9f7af043b719c23928').send();
    expect(response.status).toBe(400);
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

describe('PUT /api/admins/:id', () => {
  test('Should edit element', async () => {
    const id = '617a9f7af043b719c23928f1';
    const data = {
      firstName: 'Martina',
    };
    const response = await request(app).put(`/api/admins/${id}`).send(data);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Invalid edit element', async () => {
    const id = '617a9f7af043b719c23928f1';
    const data = {
      aaa: 'Raul',
    };
    const response = await request(app).put(`/api/admins/${id}`).send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Invalid route', async () => {
    const id = '617a9f7af043b719c23928f1';
    const data = {
      firstName: 'Martina',
    };
    const response = await request(app).put(`/api/addminss/${id}`).send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Invalid ID', async () => {
    const id = '617a9f7af043b719c23928ffff';
    const data = {
      firstName: 'Martina',
    };
    const response = await request(app).put(`/api/admins/${id}`).send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Valid ID but not exist', async () => {
    const id = '64667748fc13ae7f027631cd';
    const data = {
      email: 'probando2@gmail.com',
      password: 'Password124',
    };

    const response = await request(app).put(`/api/admins/${id}`).send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/admins/:id', () => {
  test('deletes an Admin by id', async () => {
    const newAdmin = await Admin.create({
      firstName: 'Ricardo',
      lastName: 'Mollo',
      dni: 27154585,
      phone: '3413555012',
      email: 'rmollo@example.com',
      city: 'Rosario',
      password: 'Arisj7584js7u',
    });
    const response = await request(app).delete(`/api/admins/${newAdmin.id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('invalid id: returns status 404 when super admin id is not found', async () => {
    const response = await request(app).delete('/api/admins/617a9f7af043b719c23928ff').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('invalid route: returns status 404 when route is wrong', async () => {
    const response = await request(app).delete('/api/addminss/64667748fc13ae7f027632cc').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('Invalid ID', async () => {
    const id = '617a9f7af043b719c23928ffff';
    const response = await request(app).delete(`/api/admins/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('server error: returns status 500 when there is an internal server error', async () => {
    jest.spyOn(Admin, 'findByIdAndDelete').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const response = await request(app).delete('/api/admins/617a9f7af043b719c23928f1').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });

  describe('GET /api/admins', () => {
    test('Get all admins return status 200 ', async () => {
      const response = await request(app).get('/api/admins').send();
      expect(response.status).toBe(200);
      expect(response.error).toBeFalsy();
    });
    test('Get empty admins return status 200', async () => {
      await Admin.deleteMany({});
      const response = await request(app).get('/api/admins').send();
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });
    test('returns status 500 when there is an internal server error', async () => {
      jest.spyOn(Admin, 'find').mockImplementation(() => {
        throw new Error('Internal Server Error');
      });
      const response = await request(app).get('/api/admins').send();
      expect(response.status).toBe(500);
    });
  });
});
