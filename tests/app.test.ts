import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../src/app.js';

describe('API', () => {
  it('GET / returns welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to the API');
  });

  it('GET /api/health returns ok', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('GET /api/users returns array', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/users creates a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Charlie',
        email: 'charlie@example.com',
        active: true,
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Charlie');
    expect(response.body.email).toBe('charlie@example.com');
  });

  it('GET /api/users/1 returns a user', async () => {
    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });
});
