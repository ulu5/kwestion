<template>
  <div class="question">
    <h1>Hello {{username}}, welcome to {{classroom}}'s class questions! </h1>
    <question-list v-bind:classroom="this.classroom" v-bind:author="this.username" />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'classrooms',
  data () {
    return {
      // TODO: get from cookies instead of route
      classroom: this.$route.params.classroom,
      username: this.$route.query.username
    }
  },
  created () {
    if (!this.username || !this.classroom) {
      this.$route.push({name: 'home'})
    }
  },
  components: {
    QuestionList
  }
}
</script>
