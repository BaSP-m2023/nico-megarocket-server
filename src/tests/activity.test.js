import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitySeed from '../seeds/activity';

beforeAll(async () => {
  await Activity.collection.insertMany(activitySeed);
});

describe('PUT/api/activity/:id', () => {
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
  test('Error, isActive is not a string', async () => {
    const id = '64662e65a1350cc48de5d410';
    const mock = {
      name: 'zumba',
      description: 'dancing',
      isActive: 'yes',
    };
    const response = await request(app).put(`/api/activity/${id}`).send(mock);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('System error', async () => {
    jest.spyOn(Activity, 'findByIdAndUpdate').mockImplementation(() => {
      throw new Error('Error updating Activity');
    });
    const id = '64662e65a1350cc48de5d410';
    const response = await request(app).put(`/api/activity/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE/api/activity/:id', () => {
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
  test('System error', async () => {
    jest.spyOn(Activity, 'findByIdAndDelete').mockImplementation(() => {
      throw new Error('Error deleting Activity');
    });
    const id = '64662e65a1350cc48de5d410';
    const response = await request(app).delete(`/api/activity/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
