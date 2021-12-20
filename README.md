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
- Express.js for back-end server 
- Jest for JS test runner
- Supertest, an HTTP assertions library, for API test cases
- Axios for making HTTP requests 

## Implementation of main GET route 
The instructions require the main API route to be able to make multiple HTTP requests for each "tag" specified in the request. After all get requests are made, the client should receive a JSON that has cleaned out all duplicate blog posts. As such, I used a hash map each axios get call. This allows me to avoid adding duplicates to the final response data instead of making all get requests first and then having to remove duplicate data. 

#### Instructions

https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/instructions/b-3/Back-end%20Assessment%20-%20Blog%20Posts-TZW3TH2D4VFVDPKH4D6C.pdf
