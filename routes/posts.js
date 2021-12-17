const express = require('express');
const router = express.Router();
const axios = require('axios')
const createError = require('http-errors')

const blog_url = "https://api.hatchways.io/assessment/blog/posts"
const sortTypes = ['id', 'likes', 'popularity', 'reads']
const dirTypes = ['asc', 'desc']

// router.get('/posts/:tag', async (req, res, next) => {
//   const tag = req.params.tag
//   try{
//       const { data } = await axios.get(blog_url, { params : { tag: tag }})
//       res.status(200).send(data.posts)
//   } catch (err){
//       res.send(err)
//   }
// })  

/* GET users listing. */
router.get('/:tags', async (req, res, next) => {
  try{
    const tags = req.params.tags
    const tagsArr = tags.split(',')
    let final = []
    for (let i=0;i<tagsArr.length; i++){
      let currTag = tagsArr[i]
      console.log('TAG:', currTag)
      final = final.concat( await axios
        .get(blog_url, { params : { tag: currTag }})
        .then((res) => {return res.data.posts})
      )
    }  
     res.status(200).json(final)
  } catch (err){
      res.send(err)
  }
})  

// const tagsData = tagsArr.map(async(tag) => {
//   const tagData = await axios
//   .get(blog_url, { params : { tag: tag }})
//   .then((res) => {
//     return res.data
//   })

    // tagsArr.forEach(async(tag)=> {
//   const tagData = await axios.get(blog_url, { params : { tag: tag }})
//   console.log('TAG DATA:', tagData.data)
//   tagsData.concat(tagData.data.posts)
// })

module.exports = router;


