import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subscriptionSeed from '../seeds/subscription';

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
});

describe('PUT /api/subscription/:id', () => {
  test('Put subscription return status 200', async () => {
    const data = {
      date: new Date('2023-04-10'),
    };
    const response = await request(app).put('/api/subscription/6467f535fc13ae553d753ae8').send(data);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Put subscription return status 400 invalid data', async () => {
    const data = {
      members: 12345,
    };
    const response = await request(app).put('/api/subscription/6467f535fc13ae553d753ae8').send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Put subscription return status 404 invalid route', async () => {
    const data = {
      date: new Date('2023-04-10'),
    };
    const response = await request(app).put('/api/subscriptionsss/6467f535fc13ae553d753ae8').send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Put subscription return status 500 invalid Id', async () => {
    const data = {
      date: new Date('2023-04-10'),
    };
    const response = await request(app).put('/api/subscription/6467f535fc13ae553d753ae877').send(data);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
