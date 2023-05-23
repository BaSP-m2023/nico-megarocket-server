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
});

describe('PUT /api/member', () => {
  test('should update one Member', async () => {
    const response = await request(app).put(`/api/member/${mockedMemberId}`).send(modifiedMember);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toBeDefined();
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
    jest.spyOn(Member, 'findByIdAndDelete').mockRejectedValue(new Error('Something went wrong'));
    const response = await request(app).delete(`/api/member/${mockedMemberId}`).send(modifiedMember);
    expect(response.status).toBe(500);
  });
});

describe('GET /api/member', () => {
  test('Should not return elements', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
