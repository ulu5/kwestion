<template>
  <div class="question">
    <h1>Hello {{username}}, welcome to <span v-if="classroom == 'Nakatsu'">Mr.</span><span v-else>Ms.</span> {{classroom}}'s class questions! </h1>
    <question-list />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'classrooms',
  data () {
    return {
      classroom: this.$cookies.get('classroom'),
      username: this.$cookies.get('username'),
      userId: this.$cookies.get('userId')
    }
  },
  created () {
    if (!this.username || !this.classroom || !this.userId) {
      this.$router.push({name: 'home'})
    }
  },
  components: {
    QuestionList
  }
}
</script>
