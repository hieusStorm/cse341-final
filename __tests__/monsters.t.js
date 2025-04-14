// to run npx jest
const express = require('express');
const request = require('supertest');
const routes = require('../routes');

const app = new express();
app.use('/', routes);

// Get Endpoints
describe("Get endpoints", function() {
    test('get all monsters', async () => {
        const res = await request(app).get('/monsters');
        expect(res.header['content-type']).tobe('application/json; charset=utf-8');
        expect(res.statusCode).tobe(200);
    });
    test('get a single mosnter', async () => {
       const res = await request(app).get('/monsters/67f15ad91745002f3dabfb8a');
       expect(res.header['content-type']).tobe('application/json; charset=utf-8');
       expect(res.statusCode).tobe(200)
       expect(res.json).toEqual({
        "_id": "67f15ad91745002f3dabfb8a",
        "name": "Rathalos",
        "elementWeakness": "dragon",
        "weakSpot": "head",
        "damageTypeWeak": "impact",
        "type": "Flying Wyvern"
      });
    });
});
