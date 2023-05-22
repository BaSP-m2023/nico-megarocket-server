import request from 'supertest';
import subscriptionsSeed from '../seeds/subscription';

const app = require('../app');
const Subscription = require('../models/Subscription');

const mockSubscription = {
  classId: '64667748fc13ae7f027543cc',
  members: '6465537202739f6df0878cd1',
  date: new Date('2022-10-29'),
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionsSeed);
});

describe('POST /subscription', () => {
  test('should create a new subscription', async () => {
    const response = await request(app).post('/api/subscription').send(mockSubscription);

    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
});

describe('GET /api/subscription', () => {
  test('get all subscriptions should return status 200', async () => {
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('get all subscriptions with bad route should return status 404', async () => {
    const response = await request(app).get('/api/subscriptionnn').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET /subscription/:id', () => {
  test('should return 200 if subscription ID exists', async () => {
    const ExistentId = '6467f535fc13ae553d753ae9';
    const response = await request(app).get(`/api/subscription/${ExistentId}`).send();

    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('should return 500 if subscription ID is in bad format', async () => {
    const badFormatId = 'this_is_bad_format';
    const response = await request(app).get(`/api/subscription/${badFormatId}`).send();

    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });

  test('should return 404 if subscription ID does not exist', async () => {
    const nonExistentId = '6467f535fc13ae553d753ae5';
    const response = await request(app).get(`/api/subscription/${nonExistentId}`).send();

    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
