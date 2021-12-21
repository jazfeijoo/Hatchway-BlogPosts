# BLOGPOSTS

## Overview 
This is a simple back-end server for practicing CRUD operations for JSON APIs.  

## Building
npm install

## Testing
npm test

## Starting
npm start

## Tech Stack & Dependencies 
- Node.js 
- Express.js for back-end server 
- Axios for making HTTP requests 
- Jest for JS test runner
- Supertest, an HTTP assertions library, for API test cases

## Implementation of main GET route 
The instructions require the main API route to be able to make multiple HTTP requests for each "tag" specified in the request. After all get requests are made, the client should receive a JSON that has cleaned out all duplicate blog posts. As such, I used a hash map to reference for each axios get call. This allows me to avoid adding duplicates to the final response data instead of making all get requests first and then having to remove duplicate data. Overall, Big O time complexity is minimized since the response (final data) does not have to be looped over again for a "clean-up" of duplicates.

#### Instructions
![here](https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/instructions/b-3/Back-end%20Assessment%20-%20Blog%20Posts-TZW3TH2D4VFVDPKH4D6C.pdf)
