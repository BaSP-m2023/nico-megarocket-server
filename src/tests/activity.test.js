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

describe('GET /api/activity', () => {
  test('Get all activity return status 200', async () => {
    const response = await request(app).get('/api/activity').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/activ').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    jest.spyOn(Activity, 'find').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const response = await request(app).get('/api/activity').send();
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

describe('GET /api/activity/:id', () => {
  test('Get by Id activity return status 200', async () => {
    const response = await request(app).get('/api/activity/6465993bc7fee6b84bae2698').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Get Invalid ID status 400', async () => {
    const response = await request(app).get('/api/activity/6465993bc7fee6b84bae2696666').send();
    expect(response.status).toBe(400);
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
    const mock = {
      name: 'Test',
      description: 'Test test',
      isActive: false,
    };
    const response = await request(app).post('/api/activity').send(mock);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('Invalid data should return status 400', async () => {
    const mock = {
      name: '',
      description: 'Test test',
      isActive: false,
    };
    const response = await request(app).post('/api/activity').send(mock);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 500', async () => {
    const mock = {
      name: 'test',
      description: 'Test test',
      isActive: false,
    };
    jest.spyOn(Activity, 'create').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const response = await request(app).post('/api/activity').send(mock);
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
});
