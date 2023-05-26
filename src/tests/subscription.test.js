import request from 'supertest';

import app from '../app';
import Subscription from '../models/Subscription';
import subscriptionSeed from '../seeds/subscription';

const mockSubscription = {
  classId: '64667748fc13ae7f027543cc',
  members: ['6465537202739f6df0878cd1'],
  date: new Date('2022-10-29'),
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('POST /subscription', () => {
  test('should create a new subscription', async () => {
    const response = await request(app).post('/api/subscription').send(mockSubscription);

    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });

  test('should return 400 if required fields are missing', async () => {
    const invalidSubscription = {
      classId: '64667748fc13ae7f027543cc',
      date: new Date('2022-10-29'),
    };
    const response = await request(app).post('/api/subscription').send(invalidSubscription);

    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Should handle error with status 500', async () => {
    jest.spyOn(Subscription, 'create').mockImplementation(() => {
      throw new Error('Error saving Subscription');
    });
    const mockCreateSubscription = {
      classId: '64667748fc13ae7f027543cc',
      members: ['6465537202739f6df0878cd1'],
      date: new Date('2022-10-29'),
    };
    const response = await request(app).post('/api/subscription').send(mockCreateSubscription);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
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

describe('GET /subscription/:id', () => {
  test('should return 200 if subscription ID exists', async () => {
    const ExistentId = '6467f535fc13ae553d753ae8';
    const response = await request(app).get(`/api/subscription/${ExistentId}`).send();

    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('should return 400 if subscription ID is in bad format', async () => {
    const badFormatId = 'this_is_bad_format';
    const response = await request(app).get(`/api/subscription/${badFormatId}`).send();

    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('should return 404 if subscription ID does not exist', async () => {
    const nonExistentId = '6467f535fc13ae553d753ae5';
    const response = await request(app).get(`/api/subscription/${nonExistentId}`).send();

    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'find').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const response = await request(app).get('/api/subscription').send();
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

  test('Get all empty subscription return status 200', async () => {
    await Subscription.deleteMany({});
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
  test('should return status 500', async () => {
    jest.spyOn(Subscription, 'find').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const response = await request(app).get('/api/subscription').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
