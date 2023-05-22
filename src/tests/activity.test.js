import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activity';

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});

describe('PUT/app/activity', () => {
  test('Update an activity correctly', async () => {
    const id = '64662e65a1350cc48de5d410';
    const mock = {
      name: 'zumba',
      description: 'dancing',
      isActive: true,
    };
    const response = await request(app).put(`/api/activity/${id}`).send(mock);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('Error, ID not found', async () => {
    const id = '64662e65a1350cc48de5d417';
    const mock = {
      name: 'zumba',
      description: 'dancing',
      isActive: true,
    };
    const response = await request(app).put(`/api/activity/${id}`).send(mock);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Error, invalid route', async () => {
    const id = '64662e65a1350cc48de5d410';
    const mock = {
      name: 'zumba',
      description: 'dancing',
      isActive: true,
    };
    const response = await request(app).put(`/api/activities/${id}`).send(mock);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE/app/activity', () => {
  test('Delete an activity correctly', async () => {
    const id = '64662e65a1350cc48de5d410';
    const response = await request(app).delete(`/api/activity/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Error, invalid ID/does not exist', async () => {
    const id = '6466ggl7fc13a';
    const response = await request(app).delete(`/api/activity/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('Error, invalid route', async () => {
    const id = '64662e65a1350cc48de5d410';
    const response = await request(app).delete(`/api/activities/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
