const express = require('express')
const { add, divide, multiply, subtract } = require('./src/controllers')
const checkNumbers = require('./src/middlewares/checkNumbers')
const httpStatus = require('http-status')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(httpStatus.OK).send('Express server is running!')
})
app.route('/add').get(checkNumbers, add)
app.route('/divide').get(checkNumbers, divide)
app.route('/multiply').get(checkNumbers, multiply)
app.route('/subtract').get(checkNumbers, subtract)

app.listen(3000, () => {
  console.log('Express server is running on http://localhost:3000')
})
