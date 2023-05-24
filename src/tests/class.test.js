import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

describe('GET BY ID /api/class/:id', () => {
  test('This should return an Id', async () => {
    const id = '64667748fc13ae7f027543cd';
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('This should return an Id invalid', async () => {
    const id = '646596b54fcb63fdd73b28a5';
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('This should return an Id invalid character', async () => {
    const id = '646596b54fcb63fdd73b28a589';
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Check invalid Route', async () => {
    const id = '646596b54fcb63fdd73b28a6';
    const response = await request(app).get(`/api/classes/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Server error. 500, internal server error', async () => {
    jest.spyOn(Class, 'findById').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const response = await request(app).get('/api/class/64667748fc13ae7f027543d9').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('PUT /api/class/:id', () => {
  test('This should edit element', async () => {
    const id = '64667748fc13ae7f027543d4';
    const data = {
      day: 'Sunday',
    };
    const response = await request(app).put(`/api/class/${id}`).send(data);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('For invalid ID', async () => {
    const id = '64667748fc13ae7f027543d9';
    const data = {
      day: 'Sunday',
    };
    const response = await request(app).put(`/api/class/${id}`).send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('This should return an Id invalid character', async () => {
    const id = '64667748fc13ae7f027543d49999999';
    const data = {
      hour: '18:30',
      day: 'Sunday',
      trainer: [
        '646596b54fcb63fdd73b28a6',
      ],
      activity: '64661bf03cfd3f20a4b7db44',
      slots: 4,
    };
    const response = await request(app).put(`/api/class/${id}`).send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('For invalid element', async () => {
    const id = '64667748fc13ae7f027543d4';
    const data = {
      day: 'Wen',
    };
    const response = await request(app).put(`/api/class/${id}`).send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('For invalid route', async () => {
    const id = '64667748fc13ae7f027543d4';
    const data = {
      day: 'Sunday',
    };
    const response = await request(app).put(`/api/classes/${id}`).send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Server error. 500, internal server error', async () => {
    jest.spyOn(Class, 'findByIdAndUpdate').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const response = await request(app).put('/api/class/64667748fc13ae7f027543d4').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/class/:id', () => {
  test('Delete a class by id', async () => {
    const newClass = await Class.create({
      hour: '19:00',
      day: 'Tuesday',
      trainer: [
        '646596b54fcb63fdd73b28a6',
      ],
      activity: '64666b5d1fb62f8171bb6517',
      slots: 9,
    });
    const response = await request(app).delete(`/api/class/${newClass.id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Invalid id. 404 error, id not found.', async () => {
    const response = await request(app).delete('/api/class/64667748fc13ae7f027543d9').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Invalid route. 404 wrong route.', async () => {
    const response = await request(app).delete('/api/classes/64667748fc13ae7f027543d4').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Invalid id. 404 error, id not found.', async () => {
    const response = await request(app).delete('/api/class/64667748fc13ae7f027543d9').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Get Invalid ID status 400', async () => {
    const response = await request(app).delete('/api/class/64667748fc13ae7f027543d49999').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Invalid route. 404 wrong route.', async () => {
    const response = await request(app).delete('/api/classes/64667748fc13ae7f027543d4').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Server error. 500, internal server error', async () => {
    jest.spyOn(Class, 'findByIdAndDelete').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
  });
  test('Server error. 500, internal server error', async () => {
    jest.spyOn(Class, 'findByIdAndDelete').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const response = await request(app).delete('/api/class/64667748fc13ae7f027543d4').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('GET /api/class', () => {
  test('This should return status 200', async () => {
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Invalid ID', async () => {
    const id = '64667748fc13ae7f027543d49999999';
    const response = await request(app).get(`/api/class/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('returns status 500 when there is an internal server error', async () => {
    jest.spyOn(Class, 'find').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(500);
  });
});

describe('POST /api/class', () => {
  test('This should create a class with status 201', async () => {
    const mockClass = {
      hour: '19:00',
      day: 'Tuesday',
      trainer: ['646596b54fcb63fdd73b28a6'],
      activity: '64666b5d1fb62f8171bb6517',
      slots: 9,
    };
    const response = await request(app).post('/api/class').send(mockClass);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('This should be error 400', async () => {
    jest.spyOn(Class, 'create').mockImplementation(() => {
      throw new Error('Error saving Class');
    });
    const response = await request(app).post('/api/class').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Server error. 500, internal server error', async () => {
    jest.spyOn(Class, 'create').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const mockClass = {
      hour: '19:00',
      day: 'Tuesday',
      trainer: ['646596b54fcb63fdd73b28a6'],
      activity: '64666b5d1fb62f8171bb6517',
      slots: 9,
    };
    const response = await request(app).post('/api/class').send(mockClass);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
