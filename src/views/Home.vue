<template>
  <div class="home">
    <signup msg="Welcome to Kwestion, please sign in below."/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/Signup.vue'

export default {
  name: 'home',
  components: {
    Signup
  }
}
</script>
