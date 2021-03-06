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
    it('GET /api/posts/:tag --> returns array of posts that match a single tag', () => {
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
 
    //it accepts more than 1 tag... 
    it('GET /api/posts/:tag --> returns array of posts that match multiple tags', () => {
        return request(app)
        .get('/api/posts/tech,politics')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=> {
            expect.extend({
                toIncludeTags(posts, paramTags){
                    for (let i=0; i< posts.length; i++){
                        let post = posts[i]
                        let sum = 0
                        paramTags.forEach((pTag) => {sum += post.tags.indexOf(pTag)})
                        if ( sum <= (-1 * paramTags.length)){
                            return {
                                message: () =>
                                  `Not all posts' tags include query.params.tags`,
                                pass: false
                              }  
                        }
                    }
                    return {
                        message: () =>
                          `All posts' tags include query.params.tags`,
                        pass: true
                    }
                }
            })
            expect(response.body).toIncludeTags(['tech', 'politics']);          
        })
    })

    it('GET /api/posts/:tag/:sortBy? --> returns array of posts that are sorted by the approved types (id, likes, popularity,)', () => {
        return request(app)
        .get('/api/posts/tech/likes/desc')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=> {
            expect.extend({
                tobeSorted(posts, sortBy, orderBy){
                    for (let i=0; i< posts.length; i++){
                        let currPost = posts[i]
                        let nextPost = posts[i+1]
                        if (nextPost){
                            //if there is a next, check order...
                            if(orderBy === 'desc'){
                                if(currPost[sortBy] < nextPost[sortBy]){
                                    return {
                                        message: () =>
                                          `Posts are not sorted by descending order`,
                                        pass: false
                                      } 
                                }
                            } else {
                                if(currPost[sortBy] > nextPost[sortBy]){
                                    return {
                                        message: () =>
                                          `Posts are not sorted by ascending order`,
                                        pass: false
                                      } 
                                }
                            }
                        }
                    }
                    return {
                        message: () =>
                          `All posts are correctly sorted`,
                        pass: true
                    }
                } 
            })
            expect(response.body).tobeSorted('likes', 'desc');          
        })
    })
})