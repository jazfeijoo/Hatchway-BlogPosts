const express = require('express');
const router = express.Router();
const axios = require('axios')

const blog_url = "https://api.hatchways.io/assessment/blog/posts"
const sortTypes = ['id', 'likes', 'popularity', 'reads']
const dirTypes = ['asc', 'desc']

/* GET users listing. */
router.get('/:tag', async (req, res, next) => {
  const tag = req.params.tag
  try{
      const { data } = await axios.get(blog_url, { params : { tag: tag }})
      res.status(200).send(data.posts)
  } catch (err){
      res.send(err)
  }
})  

module.exports = router;


