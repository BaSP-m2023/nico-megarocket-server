import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activity';

const mockActivity = {
  name: 'Test',
  description: 'Test test',
  isActive: false,
};

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});

describe('GET /api/activity', () => {
  test('Get all activity return status 200', async () => {
    const response = await request(app).get('/api/activity').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Get by Id activity return status 200', async () => {
    const response = await request(app).get('/api/activity/6465993bc7fee6b84bae2698').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('GET Routes invalid', () => {
  test('should return status 404', async () => {
    const response = await request(app).get('/api/activ').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Get Invalid ID', async () => {
    const response = await request(app).get('/api/activity/6465993bc7fee6b84bae2696666').send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
  test('Get ID not found status 404', async () => {
    const response = await request(app).get('/api/activity/64667748fc13ae7f027543cb').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/activity', () => {
  test('Post activity return status 201', async () => {
    const response = await request(app).post('/api/activity').send(mockActivity);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
});
