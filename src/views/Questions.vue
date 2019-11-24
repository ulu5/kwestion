<template>
  <div class="question">
    <h1>Welcome {{classroom}}'s Class! </h1>
    <question-list v-bind:classroom="this.classroom" v-bind:author="this.username" />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'questions',
  data () {
    return {
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
