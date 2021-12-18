const express = require('express');
const router = express.Router();
const axios = require('axios')
const createError = require('http-errors')

const blog_url = "https://api.hatchways.io/assessment/blog/posts"
const sortTypes = ['id', 'likes', 'popularity', 'reads']
const dirTypes = ['asc', 'desc']

router.get('/', function(req, res, next) {
  res.status(400).json({"error": "Tags parameter is required"})
});

/* GET users listing. */
router.get('/:tags/:sortBy?/:direction?', async (req, res, next) => {
  try{
    const tags = req.params.tags
    const tagsArr = tags.split(',')    
    const sortBy = req.params.sortBy
    const dirSort = req.params.direction 
    let final = []
    let map = {}

    if(sortBy && !sortTypes.includes(sortBy)){
      res.status(400).json({"error": "sortBy parameter is invalid"})
    } 

    if(dirSort && !dirTypes.includes(dirSort)){
      res.status(400).json({"error": "sortBy parameter is invalid"})
    }

    for (let i=0;i<tagsArr.length; i++){
      let currTag = tagsArr[i]
      await axios
        .get(blog_url, { params : { tag: currTag }})
        .then((res) => {
          res.data.posts.forEach((post)=> {
            if (!map[post.id]){
              map[post.id] = 1
              final.push(post)
            }
          })
        })
    }
    if (sortBy){
      final.sort((a,b) => {
        if (dirSort === dirTypes[1]){
          return b[sortBy] - a[sortBy]  
        }
        return a[sortBy] - b[sortBy]
      })
    }
    res.status(200).json(final)
  } catch (err){
      res.send(err)
  }
})  

module.exports = router;


