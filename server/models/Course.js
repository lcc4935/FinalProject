const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let CourseModel = {};

// mongoose.Types.ObjectID is a function that converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  department: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  number: {
    type: Number,
    min: 0,
    required: true,
  },

  credit: {
    type: Number,
    min: 1,
    required: true,
  },

  days: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  times: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

CourseSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  department: doc.department,
  number: doc.number,
  credit: doc.credit,
  days: doc.days,
  times: doc.times,
});

CourseSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return CourseModel.find(search).select('name department number credit days times').lean().exec(callback);
};

CourseSchema.statics.delete = (namef, callback) => {
  CourseModel.deleteOne({ name: namef }).exec(callback);
};

// CourseSchema.statics.upgrade = (namef, callback) => {
//   // CourseModel.deleteOne({ name: namef }).exec(callback);
// };

CourseModel = mongoose.model('Course', CourseSchema);

module.exports.CourseModel = CourseModel;
module.exports.CourseSchema = CourseSchema;
