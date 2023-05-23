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
  test('Put subscription return status 404 id not found', async () => {
    const data = {
      date: new Date('2023-04-10'),
    };
    const response = await request(app).put('/api/subscriptionsss/6465993bc7fee6b84bae2698').send(data);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Put subscription return status 400 invalid Id', async () => {
    const data = {
      date: new Date('2023-04-10'),
    };
    const response = await request(app).put('/api/subscription/6467f535fc13ae553d753ae877').send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'findByIdAndUpdate').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const response = await request(app).put('/api/subscription/6465993bc7fee6b84bae2698').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/subscription/:id', () => {
  test('Delete subscription return status 200', async () => {
    const response = await request(app).delete('/api/subscription/6467f535fc13ae553d753ae8').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Delete subscription return status 404 Invalid route', async () => {
    const response = await request(app).delete('/api/subscriptionsss/6467f535fc13ae553d753ae8').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Delete subscription return status 404 Id not found', async () => {
    const response = await request(app).delete('/api/subscription/6465993bc7fee6b84bae2698').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Delete subscription return status 400 Invalid Id', async () => {
    const response = await request(app).delete('/api/subscription/6467f535fc13ae553d753ae877').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'findByIdAndDelete').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const response = await request(app).delete('/api/subscription/6465993bc7fee6b84bae2698').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('GET /api/subscription', () => {
  test('Get all subscription return status 200 ', async () => {
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Get all empty subscription return status 200', async () => {
    await Subscription.deleteMany({});
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
});
