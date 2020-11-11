const Course = require('../models/Course')

exports.create_course = (req, res) => {
    const { course_name, batch, organization } = req.body
    Course.create({course_name, batch, organization})
        .then(data => res.json(data))
        .catch(err => console.error(err))
}