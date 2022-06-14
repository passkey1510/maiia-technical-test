import request from 'supertest';
import app from '../src/app';

describe('GET /api/random-url', () => {
  it('should return 404', (done) => {
    request(app).get('/api/random-url').expect(404, done);
  });
});
