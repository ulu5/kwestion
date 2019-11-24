<template>
  <div class="question">
    <h1>Welcome {{classroom}}'s Class! </h1>
    <question-list v-bind:classroom="this.classroom" />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'questions',
  data() {
    return {
      classroom: this.$route.params.classroom
    }
  },
  created() {
  },
  components: {
    QuestionList
  }
}
</script>