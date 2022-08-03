const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /sodas should return a list of sodas', async () => {
    const resp = await request(app).get('/sodas');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Inca Kola',
        country: 'Peru',
        color: 'Golden',
        image:
          'https://m.media-amazon.com/images/I/51slcDKrKDL._SY445_PIbundle-12,TopRight,0,0_SX236SY445SH20_.jpg',
      },
      {
        id: '2',
        name: 'Irn Bru',
        country: 'Scotland',
        color: 'Orange',
        image:
          'https://m.media-amazon.com/images/I/61jZROIca6L._SY445_PIbundle-6,TopRight,0,0_SX311SY445SH20_.jpg',
      },
      {
        id: '3',
        name: 'Faygo Red Pop',
        country: 'United States',
        color: 'Red',
        image: 'https://m.media-amazon.com/images/I/81PHQae4h1S._SX679_.jpg',
      },
    ]);
  });
  afterAll(() => {
    pool.end();
  });
});