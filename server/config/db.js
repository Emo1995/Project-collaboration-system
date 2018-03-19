const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/test')
const db = mongoose.connection
mongoose.Promise = global.Promise
db.on('error', function () {
  console.log('Connect error')
})
db.once('open', function () {
  console.log('Mongodb started successfully')
})

const userSchema = mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  userPwd: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    required: true
  }
})

const demandsSchema = mongoose.Schema({
  did: Number,
  title: String,
  status: String,
  project: String,
  priority: String,
  startdate: Date,
  enddate: Date,
  owner: String,
  creator: String,
})

const projectsSchema = mongoose.Schema({
  id: Number,
  label: String,
  children: Array
})


const Models = {
  User: mongoose.model('User', userSchema),
  Demands: mongoose.model('Demands', demandsSchema),
  Projects: mongoose.model('Projects', projectsSchema)
}

module.exports = Models
