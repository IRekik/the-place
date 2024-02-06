import supertest from 'supertest';
import app from '../../src/index';
import { Server } from 'http';

let server: Server;
const request = supertest(app);

beforeAll((done) => {
    server = app.listen(3002, done);
});

afterAll((done) => {
    if (server) {
        server.close(done);
    }
});

export { request };