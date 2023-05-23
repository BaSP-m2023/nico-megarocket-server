/* eslint-disable no-underscore-dangle */

import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/member';

const mockedMemberId = memberSeed[0]._id;

const invalidMemberMockUp = {
  id: '64650c82fb9b0234915f4be6',
};

const modifiedMember = {
  firstName: 'Juan',
  lastName: 'Perez',
  dni: 37254615,
  birthday: '2005-08-12T03:00:00.000Z',
  phone: '1676778390',
  email: 'juanperez@yahoo.com',
  city: 'Cordoba',
  postalCode: '5000',
  isActive: true,
  membership: 'Classic',
};

beforeEach(async () => {
  await Member.collection.insertMany(memberSeed);
});

afterEach(async () => {
  await Member.collection.deleteMany();
  jest.restoreAllMocks();
});

describe('PUT /api/member', () => {
  test('should update one Member', async () => {
    const response = await request(app).put(`/api/member/${mockedMemberId}`).send(modifiedMember);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toBeDefined();
  });

  test('Invalid data', async () => {
    const data = {
      firstName: 'Juan',
      lastName: 'Perez',
      dni: 37254615,
      birthday: '2005-08-12T03:00:00.000Z',
      phone: '1676778390',
      email: 'juanperezyahoo',
      city: 'Cordoba',
    };
    const response = await request(app).post('/api/member').send(data);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('should send error 404 because this ID doesnt exist', async () => {
    const response = await request(app).put(`/api/member/${invalidMemberMockUp.id}`).send(modifiedMember);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Member with id: 64650c82fb9b0234915f4be6 was not found');
  });

  test('should send 500 error', async () => {
    jest.spyOn(Member, 'findByIdAndUpdate').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).put(`/api/member/${mockedMemberId}`).send(modifiedMember);
    expect(response.status).toBe(500);
  });
});

describe('DELETE /api/member', () => {
  test('should delete one member', async () => {
    const response = await request(app).delete(`/api/member/${mockedMemberId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBeUndefined();
  });

  test('should send 404 error because his ID is invalid', async () => {
    const response = await request(app).delete(`/api/member/${invalidMemberMockUp.id}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBeUndefined();
  });

  test('should send 500 error', async () => {
    jest.spyOn(Member, 'findById').mockImplementation(() => {
      throw new Error('Something went wrong');
    });
    const response = await request(app).delete(`/api/member/${mockedMemberId}`).send(modifiedMember);
    expect(response.status).toBe(500);
  });
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
  test('returns an error if required fields are missing', async () => {
    const data = {
      firstName: '',
      lastName: '',
      dni: '',
      birthday: '',
      phone: '',
      email: '',
      city: '',
      postalCode: '',
      isActive: '',
      membership: '',
    };

    const response = await request(app).post('/api/member').send(data);

    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('returns an error if there is a server error', async () => {
    jest.spyOn(Member, 'create').mockImplementation(() => {
      throw new Error('Server Error');
    });

    const data = {
      firstName: 'sad222',
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

    expect(response.status).toBe(500);
    expect(response.error).toBeTruthy();
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

describe('GET /api/member', () => {
  test('returns all members', async () => {
    const response = await request(app).get('/api/member').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('returns status 500 when there is an internal server error', async () => {
    jest.spyOn(Member, 'find').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });
    const response = await request(app).get('/api/member').send();
    expect(response.status).toBe(500);
  });
  test('returns status 404 when no members are found', async () => {
    jest.spyOn(Member, 'find').mockResolvedValue([]);
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Should not return elements', async () => {
    await Member.collection.deleteMany();
    const response = await request(app).get('/api/member').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.data).toBeFalsy();
  });
});
