const request = require('supertest')
const app = require('./app')

describe('GET api/ping', () => {
    //TEST CASE: GET PING
    it('GET /api/ping --> returns json with a boolean value of true', () => {
        return request(app)
        .get('/api/ping')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean)
                })
            )
        })
    })

    //TEST CASE: GET POSTS
})

describe('GET api/posts', () => {
    //TEST CASE: GET PING
    it('GET /api/posts/:tag --> returns array of posts that match the tag', () => {
        return request(app)
        .get('/api/posts/tech')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=> {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        author: expect.any(String),
                        likes: expect.any(Number),
                        reads: expect.any(Number),
                        tags: expect.arrayContaining([expect.any(String)]) //SHOULD EXPECT tech in the TAGS section... ADD THIS!
                    })
                ])
            )
        })
    })

    //TEST CASE: GET POSTS
})