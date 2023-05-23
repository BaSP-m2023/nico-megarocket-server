import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
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
    const id = '64667748fc13ae7f027543d44';
    const data = {
      day: 'Sunday',
    };
    const response = await request(app).put(`/api/class/${id}`).send(data);
    expect(response.status).toBe(500);
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
test('Server error. 500, internal server error', async () => {
  jest.spyOn(Class, 'findByIdAndDelete').mockImplementation(() => {
    throw new Error('Internal Server Error');
  });
  const response = await request(app).delete('/api/class/64667748fc13ae7f027543d4').send();
  expect(response.status).toBe(500);
  expect(response.error).toBeTruthy();
});

describe('GET /api/class', () => {
  test('Get all. Status 200', async () => {
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Get empty. Status 200', async () => {
    await Class.deleteMany({});
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
});
