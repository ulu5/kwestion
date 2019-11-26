<template>
  <div id="question-lister">
    <input type="text" class="question-input" placeholder="Ask a question..." v-model="newQuestion" @keyup.enter="addQuestion" />
    <h2>Current Questions</h2>
    <table class="question-table">
    <div v-for="question in questions" :key="question.id">
      <tr>
        <td class="question-box">
          {{ question.question }}
          <br>
          <div class="question-time">
            {{ timeSince(question.timestamp) }}
          </div>
          <div class="question-author">
            {{ question.author }}
          </div>
        </td>
        <td class="question-vote">
          <button @click="upvote(question.id)" class="upvote-button">
            <img class="upvote-img" @load="setBg(question.id, $event)" src="@/assets/upvote.png" height="25px" :id="'upvote_' + question.id" :ref="'upvote_' + question.id" />
          </button>
          <p class="vote-count">{{ question.votes }}</p>
        </td>
      </tr>
    </div>
    </table>
  </div>
</template>

<script>
export default {
  name: 'QuestionList',
  methods: {
    addQuestion () {
      // TODO: get ID from database
      // TODO: order by upvotes
      var questionId = this.questions.length + 1
      this.questions.push({
        id: questionId,
        question: this.newQuestion,
        author: this.author,
        classroom: this.classroom,
        timestamp: new Date().toISOString(),
        votes: 1
      })

      this.votes.add(questionId)
      this.newQuestion = ''
    },
    setBg (questionId, event) {
      if (this.votes.has(questionId)) {
        event.target.style.backgroundColor = 'coral'
      } else {
        event.target.style.backgroundColor = 'transparent'
      }
    },
    upvote (questionId) {
      // if voted for that question, then +1, else -1
      if (this.votes.has(questionId)) {
        this.questions[questionId - 1].votes -= 1
        this.votes.delete(questionId)
        this.$refs['upvote_' + questionId][0].style.backgroundColor = 'transparent'
      } else {
        this.questions[questionId - 1].votes += 1
        this.votes.add(questionId)
        this.$refs['upvote_' + questionId][0].style.backgroundColor = 'coral'
      }
    },

    // function to create a better timestamp visualizer for humans
    // e.g. 2 minutes ago, 2 days ago, etc.
    timeSince (date) {
      if (typeof date !== 'object') {
        date = new Date(date)
      }

      var seconds = Math.floor((new Date() - date) / 1000)
      var intervalType

      var interval = Math.floor(seconds / 31536000)
      if (interval >= 1) {
        intervalType = 'year'
      } else {
        interval = Math.floor(seconds / 2592000)
        if (interval >= 1) {
          intervalType = 'month'
        } else {
          interval = Math.floor(seconds / 86400)
          if (interval >= 1) {
            intervalType = 'day'
          } else {
            interval = Math.floor(seconds / 3600)
            if (interval >= 1) {
              intervalType = 'hour'
            } else {
              interval = Math.floor(seconds / 60)
              if (interval >= 1) {
                intervalType = 'minute'
              } else {
                interval = seconds
                intervalType = 'second'
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += 's'
      }

      return interval + ' ' + intervalType + ' ago'
    }
  },
  created () {
    // TODO: if cookies are not set, redirect
    // TODO: fetch classroom questions
    // TODO: open websocket to refresh questions every 30 seconds
  },
  props: {
    classroom: String,
    author: String
  },
  data () {
    return {
      newQuestion: '',
      votes: new Set(),
      questions: [
        {
          'id': 1,
          'question': "What's your favorite part of being a software engineer?",
          'timestamp': '2019-11-09T10:43:23Z',
          'author': 'Andrew T.',
          'classroom': 'taeoalii',
          'votes': 12
        }, {
          'id': 2,
          'question': "What would you do if you weren't a software engineer?",
          'timestamp': '2019-08-09T10:43:23Z',
          'author': 'Johnny X.',
          'classroom': 'taeoalii',
          'votes': 5
        }
      ]
    }
  }
}
</script>

<style>
  .question-input {
    width: 60%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border-radius: 5px;
  }
  table, td, tr {
    table-layout: fixed;
    width: 100%;
    text-align: left;
  }
  .question-time {
    text-align: left;
    float: left;
    font-style: italic;
    font-size: 14px;
  }
  .question-author {
    float: right;
    font-style: italic;
    font-size: 14px;
  }
  .question-vote {
    text-align: center;
    padding: 0px 40px;
  }
  .question-box {
    font-size: 18px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0px 20px;
  }
  .upvote-button {
    border: 0px;
  }
  .upvote-img {
    background-color: coral;
  }
</style>
