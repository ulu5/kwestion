<template>
  <div id="question-lister">
    <loading :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="true"></loading>
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
          <button @click="upvote(question.voted, question.id)" class="upvote-button">
            <img v-bind:class="{'upvoted':(question.voted)}" src="@/assets/upvote.png" height="25px" />
          </button>
          <p class="vote-count">{{ question.votes }}</p>
        </td>
      </tr>
    </div>
    </table>
  </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'QuestionList',
  components: {
    Loading
  },
  methods: {
    arraysEqual (a, b) {
      if (a === b) return true
      if (a == null || b == null) return false
      if (a.length !== b.length) return false

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
      }
      return true
    },
    addQuestion () {
      this.isLoading = true
      // post to backend
      this.axios.post('/questions', {
        userId: this.userId,
        classroom: this.classroom,
        question: this.newQuestion
      }).then((response) => {
        this.isLoading = false
        console.log(response)
        // save in cookie
        this.getQuestions()
      })
      this.newQuestion = ''
    },
    getQuestions (pauseLoading = false) {
      if (pauseLoading) {
        this.isLoading = true
      }
      this.axios.get('questions', {
        params: {
          userId: this.userId,
          classroom: this.classroom
        }
      }).then((response) => {
        console.log(response)
        if (response.status === 200 && !this.arraysEqual(this.questions, response.data.questions)) {
          this.questions = response.data.questions
          this.$forceUpdate()
        } else {
          console.log(response.status)
        }
        if (pauseLoading) {
          this.isLoading = false
        }
      })
    },
    setBg (isVoted, event) {
      if (isVoted) {
        event.target.style.backgroundColor = 'coral'
      } else {
        event.target.style.backgroundColor = 'transparent'
      }
    },
    upvote (isVoted, questionId) {
      this.isLoading = true
      // if voted for that question, then +1, else -1
      if (isVoted) {
        this.axios.post('questions/downvote', {
          userId: this.userId,
          classroom: this.classroom,
          questionId: questionId
        }).then((response) => {
          this.getQuestions(true)
        })
      } else {
        this.axios.post('questions/upvote', {
          userId: this.userId,
          classroom: this.classroom,
          questionId: questionId
        }).then((response) => {
          this.getQuestions(true)
        })
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
  beforeDestroy () {
    clearInterval(this.pollQuestions)
  },
  created () {
    this.getQuestions(true)
    setInterval(this.getQuestions, 15000)
  },
  data () {
    return {
      classroom: this.$cookies.get('classroom'),
      author: this.$cookies.get('username'),
      userId: this.$cookies.get('userId'),
      newQuestion: '',
      pollQuestions: null,
      isLoading: false,
      questions: [
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
  .upvoted {
    background-color: coral;
  }
</style>
