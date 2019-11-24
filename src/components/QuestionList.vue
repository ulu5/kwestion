<template>
  <div id="question-lister">
    <input type="text" class="question-input" placeholder="Ask a question..." v-model="newQuestion" @keyup.enter="addQuestion" />
    <h2>Current Questions</h2>
    <div v-for="question in questions" :key="question.id" class="question-item">
      <div class="question-text">
{{ question.question }}
      </div>

{{ timeSince(question.timestamp) }}
    <div class="question-author">
<b>
{{ question.author }}
</b>
    </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionList',
  methods: {
    addQuestion() {

      // TODO: get ID from database
      // TODO: order by upvotes
      // TODO: display timestamp
      this.questions.push({
        id: this.questions.length + 1,
        question: this.newQuestion,
        author: this.author,
        classroom: this.classroom,
        timestamp: new Date().toISOString()
      })

      this.newQuestion = ''
    },

    // function to create a better timestamp visualizer for humans
    // e.g. 2 minutes ago, 2 days ago, etc.
    timeSince(date) {
      if (typeof date !== 'object') {
        date = new Date(date);
      }

      var seconds = Math.floor((new Date() - date) / 1000);
      var intervalType;

      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = 'year';
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = 'month';
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = 'day';
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }

      return interval + ' ' + intervalType + ' ago';
    }
  },
  // TODO: created fetch classroom questions
  props: {
    classroom: String,
    author: String
  },
  data() {
    return {
      newQuestion: '',
      questions: [
        {
          'id': 1,
          'question': "What's your favorite part of being a software engineer?",
          'timestamp': "2019-11-09T10:43:23Z",
          'author': "Andrew T.",
          'classroom': "taeoalii"
        },{
          'id': 2,
          'question': "What would you do if you weren't a software engineer?",
          'timestamp': "2019-08-09T10:43:23Z",
          'author': "Johnny X.",
          'classroom': "taeoalii"
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
  }
  .question-item {
    text-align: right;
    width: 60%;
    font-size: 18px;
    margin-bottom: 16px;
    border: 1px solid darkslategray;
    border-radius: 5px;
    padding: 5px 18px;
    margin: 5px;
  }
  .question-text {
    text-align: left;
    font-size: 18px;
  }
  .question-author {
    text-align: right;
    font-size: 14px;
    color: darkslategray;
  }
</style>