const app = require('./app')
const port = 3000

app.listen(port, (err) => {
    if (err) {throw err}
    console.log('listening on port: ', port)
  })