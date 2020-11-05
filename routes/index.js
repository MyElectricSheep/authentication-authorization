var express = require('express');
var router = express.Router();
const Student = require('../models/Student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/student', async (req, res) => {
  const { first_name, last_name } = req.body
  // console.log(first_name, last_name)

  // Promise-based syntax
  // Student.create({ first_name, last_name })
  //   .then(data => res.json(data))
  //   .catch(err => console.error(err.message))

  // Async-Await Syntax
  try {
    const newStudent = await Student.create({ first_name, last_name })
    res.json(newStudent)
  } catch(e) {
    console.error(e.message)
  }
})

router.get('/student', (req, res) => {
  Student.find()
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
})


router.get('/student/:id', (req, res) => {
  const { id } = req.params
  Student.findById(id)
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
})

router.put('/student', (req, res) => {
  const { old_name, new_name } = req.body
  Student.updateOne({ last_name: old_name }, { last_name: new_name })
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
})

router.delete('/student', (req, res) => {
  const { condition, value } = req.body
  Student.deleteMany({[condition]: value})
    .then(data => res.json(data))
    .catch(err => console.error(err.message))
})


module.exports = router;
