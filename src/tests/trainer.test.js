import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainer';

beforeAll(async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

describe('GET /api/trainer', () => {
  test('Should return all elements', async () => {
    const response = await request(app).get('/api/trainer').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('GET BY ID /api/trainer/:id', () => {
  test('Should return a valid ID', async () => {
    const id = '6463fc86e024c468698af1d8';
    const response = await request(app).get(`/api/trainer/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Should return a invalid ID', async () => {
    const id = '6463fc86e024c468698af1d2';
    const response = await request(app).get(`/api/trainer/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Format ID invalid', async () => {
    const id = '6463fc86e024c468698af1d2dkasjdlsad';
    const response = await request(app).get(`/api/trainer/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Invalid route', async () => {
    const id = '6463fc86e024c468698af1d2';
    const response = await request(app).get(`/api/traines/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/trainer', () => {
  test('Should send data from API', async () => {
    const data = {
      firstName: 'Jose',
      lastName: 'Martinez',
      dni: 34876892,
      phone: '8376890267',
      email: 'algo@algo.com',
      city: 'Boston',
      salary: 324,
    };
    const response = await request(app).post('/api/trainer').send(data);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('Invalid data', async () => {
    const data = {
      firstName: 'Jose',
      lastName: 'Martinez',
      dni: 3487,
      phone: '8376890267',
      email: 'algo@a',
      city: 'Boston',
      salary: 324,
    };
    const response = await request(app).post('/api/trainer').send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});
