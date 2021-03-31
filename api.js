const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.send('api entry')
})

router.get('/name', function (req, res) {
  res.send('Yihsiu')
})

module.exports = router