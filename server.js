const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./myconfig')

const app = express()
app.use(serveStatic(__dirname + "/dist"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// TODO: create a table map for classrooms to database tables
const tableMap = {
  // "Taeoalii": {
  //   "users": "users_taeoalii",
  //   "votes": "votes_taeoalii",
  //   "questions": "questions_taeoalii"
  // }
}

const defaultQuestions = [
  {
    'id': 1,
    'question': "What's your favorite part of being a software engineer?",
    'timestamp': '2019-11-09T10:43:23Z',
    'author': 'Sample Man',
    'votes': 3
  }, {
    'id': 2,
    'question': "What would you do if you weren't a software engineer?",
    'timestamp': '2019-08-09T10:43:23Z',
    'author': 'Sample Man',
    'votes': 5
  }
]

// upvote question
const upvoteQuestion = (request, response) => {
    // add to votes table
    const { userId, classroom, questionId } = request.body
    console.log('request to upvote question ' + questionId);
    
    if (!(classroom in tableMap)) {
      response.status(200).json({ status: 'success', message: 'tableMap not defined for classroom' })
      return
    }
    
    const insertQuery = `INSERT INTO ${tableMap[classroom]["votes"]} (user_id, question_id) VALUES ($1, $2)`
    pool.query(insertQuery, [userId, questionId], (error, result) => {
      if (error) {
        response.status(500).json({status: 'fail', message: error.message })
        return
      }
      console.log('executed query...')
      response.status(200).json({ status: 'success', message: 'upvote successful' })
    })
}

// remove upvote
const downvoteQuestion = (request, response) => {
    // remove from votes table
    const { userId, classroom, questionId } = request.body
    console.log('request to upvote question ' + questionId);

    if (!(classroom in tableMap)) {
      response.status(200).json({ status: 'success', message: 'tableMap not defined for classroom' })
      return
    }

    const deleteQuery = `DELETE FROM ${tableMap[classroom]["votes"]} WHERE user_id = $1 AND question_id = $2`

    pool.query(deleteQuery, [userId, questionId], (error, result) => {
      if (error) {
        response.status(500).json({status: 'fail', message: error.message })
        return
      }
      console.log('executed query...')
      response.status(200).json({ status: 'success', message: 'downvote successful' })
    })
}

app.route('/questions/upvote')
    .post(upvoteQuestion)

app.route('/questions/downvote')
    .post(downvoteQuestion)

// create question
const createQuestion = (request, response) => {
    const { userId, classroom, question } = request.body
    console.log('request to add question ' + userId)

    if (!(classroom in tableMap)) {
      response.status(200).json({ status: 'success', message: 'tableMap not defined for classroom', id: 0 })
      return
    }

    const insertQuery = `INSERT INTO ${tableMap[classroom]["questions"]} (question, timestamp, user_id) VALUES ($1, $2, $3) RETURNING id`
  
    pool.query(insertQuery, [question, new Date().toISOString(), userId], (error, result) => {
      if (error) {
        response.status(500).json({status: 'fail', message: error.message })
        return
      }
      console.log('executed query...')
      response.status(200).json({ status: 'success', message: 'Question added.', id: result.rows[0].id })
    })
}

/*
[{
  "author": "Author Name",
  "timestamp": "2019-01-10T23:31:32Z",
  "question": "What is the mattah with you?",
  "votes": 23,
  "voted": false,
  "id": 1
}]

*/

const getQuestions = (request, response) => {
  const { userId, classroom } = request.query
  console.log('request to get questions from ' + classroom + ' for user ' + userId);
  if (!userId || !classroom) {
    response.status(400).json({status: 'fail', message: 'Bad request, userId and classroom required'})
    return
  }

  if (!(classroom in tableMap)) {
    response.status(200).json({ status: 'success', message: 'tableMap not defined for classroom', questions: defaultQuestions })
    return
  }

  const selectQuery = `SELECT qa.id, qa.question, qa.timestamp, COUNT(distinct va.user_id) as votes, ua.name as author, bool_or(va.user_id is NOT NULL AND va.user_id = $1) as voted FROM ${tableMap[classroom]["questions"]} qa LEFT JOIN ${tableMap[classroom]["users"]} ua ON ua.id=qa.user_id LEFT JOIN ${tableMap[classroom]["votes"]} va ON va.question_id=qa.id GROUP BY qa.id, qa.question, qa.timestamp, va.question_id, ua.name`

  pool.query(selectQuery, [userId], (error, result) => {
    if (error) {
      response.status(500).json({status: 'fail', message: error.message })
      return
    }
    console.log('executed query...')
    response.status(200).json({ status: 'success', message: 'Retrieved questions.', questions: result.rows })
  })
}

app.route('/questions')
    .get(getQuestions)
    .post(createQuestion)

// add user
const addUser = (request, response) => {

  const { username, classroom } = request.body
  console.log('request to add user ' + username)

  if (!(classroom in tableMap)) {
    response.status(200).json({ status: 'success', message: 'tableMap not defined for classroom', id: 0 })
    return
  }

  const insertQuery = `INSERT INTO ${tableMap[classroom]["users"]} (name) VALUES ($1) RETURNING id`
  
  pool.query(insertQuery, [username], (error, result) => {
    if (error) {
      response.status(500).json({status: 'fail', message: error.message })
    }
    console.log('executed query...')
    response.status(200).json({ status: 'success', message: 'User added.', id: result.rows[0].id })
  })
}

app.route('/users')
  // POST endpoint
  .post(addUser)

// start server
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);