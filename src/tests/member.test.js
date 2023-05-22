import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/member';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});

describe('POST /api/member', () => {
  test('a member or members must be post', async () => {
    const data = {
      firstName: 'Carlos',
      lastName: 'Fernandez',
      dni: 37185888,
      birthday: '2000-04-11T03:00:00.000Z',
      phone: '5487965213',
      email: 'nekro@yahoo.com',
      city: 'Rosario',
      postalCode: '2000',
      isActive: true,
      membership: 'Classic',
    };
    const response = await request(app).post('/api/member').send(data);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
});

describe('GET /api/member', () => {
  test('returns all members', async () => {
    const response = await request(app).get('/api/member').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('GET BY ID /api/member/:id', () => {
  test('Must return a valid id', async () => {
    const id = '64667a84a1350cc48de5d447';
    const response = await request(app).get(`/api/member/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('Must return a invalid id', async () => {
    const id = '6463fc86e024c468656af1d2';
    const response = await request(app).get(`/api/member/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Invalid format id', async () => {
    const id = '6463fc86e024c468698af1d2dkasjdlsadaaaa';
    const response = await request(app).get(`/api/member/${id}`).send();
    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
  });
  test('Invalid route', async () => {
    const id = '6463fc86e024c468656af1d2';
    const response = await request(app).get(`/api/member/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
