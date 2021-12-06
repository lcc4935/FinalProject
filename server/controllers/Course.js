const models = require('../models');

const { Course } = models;

//makerPage
const makerPage = (req, res) => {
  Course.CourseModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), courses: docs });
  });
};

//makeCourse - creates course class block
const makeCourse = (req, res) => {
  if (!req.body.department || !req.body.number) {
    return res.status(400).json({ error: 'Department and number are requires' });
  }

  const courseData = {
    name: req.body.name,
    department: req.body.department,
    number: req.body.number,
    credit: req.body.credit,
    days: req.body.days,
    times: req.body.times,
    owner: req.session.account._id,
  };

  const newCourse = new Course.CourseModel(courseData);

  const coursePromise = newCourse.save();

  coursePromise.then(() => res.json({ redirect: '/maker' }));

  coursePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Course already exists' });
    }
    return res.status(400).json({ error: 'An error has occurred' });
  });
  return coursePromise;
};

//getCourse - gets the course
const getCourses = (request, response) => {
  const req = request;
  const res = response;

  return Course.CourseModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ courses: docs });
  });
};

//deleteCourse - removes a course block
const deleteCourse = (request, response) => {
  const req = request;
  const res = response;
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  return Course.CourseModel.delete(req.body.name, (err, docs) => {
    console.dir(docs);
    if (docs.deletedCount === 0) {
      return res.status(400).json({ error: 'Course does not exist!' });
    }
    if (err) {
      return res.status(400).json({ error: 'An Error occured' });
    }
    return res.json({ courses: docs });
  });
};

// // want to change this to be, if button selected, can add more than 4 classes to schedule
// const upgradeCourse = (request, response) => {
//   const req = request;
//   const res = response;

//   return Course.CourseModel.upgrade((err, docs) => {
//     if (err) {
//       return res.status(400).json({ error: 'An Error occured' });
//     }
//     return res.json({ courses: docs });
//   });
// };

module.exports.makerPage = makerPage;
module.exports.getCourses = getCourses;
module.exports.make = makeCourse;
module.exports.delete = deleteCourse;
// module.exports.upgrade = upgradeCourse;