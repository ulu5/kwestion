const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./myconfig')

const app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// TODO: create a table map for classrooms to database tables

// upvote question
const upvoteQuestion = (request, response) => {
    // add to votes table
    const { userId, classroom, questionId } = request.body
    console.log('request to upvote question ' + questionId);
    const insertQuery = 'INSERT INTO votes_andrew (user_id, question_id) VALUES ($1, $2)'
  
    pool.query(insertQuery, [userId, questionId], (error, result) => {
      if (error) {
        throw error
      }
      console.log('executed query...')
      response.status(200).json({ status: 'success', message: 'User added.', id: result.rows[0].id })
    })
}

// remove upvote
const downvoteQuestion = (request, response) => {
    // remove from votes table
}

app.route('/questions/upvote')
    .post(upvoteQuestion)

app.route('/questions/downvote')
    .post(downvoteQuestion)

// create question
const createQuestion = (request, response) => {
    const { username, classroom, question } = request.body
    console.log('request to add question ' + username);
    const insertQuery = 'INSERT INTO users_andrew (name) VALUES ($1) RETURNING id'
  
    pool.query(insertQuery, [username], (error, result) => {
      if (error) {
        throw error
      }
      console.log('executed query...')
      response.status(200).json({ status: 'success', message: 'User added.', id: result.rows[0].id })
    })
}

// view questions
const getQuestions = (request, response) => {

}

app.route('/questions')
    .get(getQuestions)
    .post(createQuestion)

// view user
const getUser = (request, response) => {

}

// add user
const addUser = (request, response) => {

  const { username, classroom } = request.body
  console.log('request to add user ' + username);
  const insertQuery = 'INSERT INTO users_andrew (name) VALUES ($1) RETURNING id'

  pool.query(insertQuery, [username], (error, result) => {
    if (error) {
      throw error
    }
    console.log('executed query...')
    response.status(200).json({ status: 'success', message: 'User added.', id: result.rows[0].id })
  })
}

app.route('/users')
  // POST endpoint
  .post(addUser)

app.route('/users/:id')
    .get(getUser)

// start server
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);