import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

describe('GET /api/class', () => {
  test('This should return status 200', async () => {
    const response = await request(app).get('/api/class').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('GET BY ID /api/class/:id', () => {
  test('This should return an Id', async () => {
    const id = '64667748fc13ae7f027543d3';
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
  test('Check invalid Route', async () => {
    const id = '646596b54fcb63fdd73b28a6';
    const response = await request(app).get(`/api/classes/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
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
});
