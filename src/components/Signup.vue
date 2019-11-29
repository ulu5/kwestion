<template>
  <div id="formula">
    <loading :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="true"></loading>
    <h1> {{msg}} </h1>
    <i>This app was created for demo purposes for Kapolei Elementary School.</i>
    <br />
    <br />
    <input class="name-input" type="text" placeholder="Name" v-model="username" />
    <br />
    <select class="select-input" required v-model="classroom">
      <option disabled selected value> -- select a class -- </option>
      <option value="Balisacan">Ms. Balisacan</option>
      <option value="Herradura">Ms. Herradura</option>
      <option value="Nakatsu">Mr. Nakatsu</option>
      <option value="Richards">Ms. Richards</option>
      <option value="Taeoalii">Ms. Taeoalii</option>
    </select>
    <br />
    <input class="button" type="submit" value="Sign In" v-on:click="signIn" :disabled="this.signInDisabled" />
    <p>
      {{this.showUser()}}
    </p>
    <div v-for="error in errors" v-bind:key="error" class="errors">
      {{error}}
    </div>
  </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Signup',
  components: {
    Loading
  },
  methods: {
    signIn (e) {
      this.signInDisabled = true
      this.isLoading = true
      console.log(this)
      // TODO: disable button after pushed
      if (!this.validateInput(e)) {
        console.log(e)
        this.isLoading = false
        this.signInDisabled = false
        return
      }
      // post to backend
      this.axios.post('/users', {
        username: this.username,
        classroom: this.classroom
      }).then((response) => {
        console.log(response)
        // save in cookie
        this.$cookies.set('userId', response.data.id)
        this.$cookies.set('username', this.username)
        this.$cookies.set('classroom', this.classroom)
        this.$router.push({ name: 'classrooms' })
      })
    },
    showUser () {
      if (this.username !== '' && this.username !== null) {
        return 'Hello ' + this.username + '!'
      }
      return ''
    },
    validateInput (e) {
      if (this.username && this.classroom) {
        return true
      }

      this.errors = []

      if (!this.name) {
        this.errors.push('Please input your name!')
      }

      if (!this.classroom) {
        this.errors.push('Please select a classroom!')
      }

      e.preventDefault()
      return false
    }
  },
  created () {
    // if cookies are set, redirect
    if (this.$cookies.isKey('userId') &&
      this.$cookies.isKey('username') &&
      this.$cookies.isKey('classroom')) {
      this.$router.push({ name: 'classrooms' })
      return
    }

    const requiredCookies = ['userId', 'username', 'classroom']

    requiredCookies.forEach((cookie, idx) => {
      if (this.$cookies.isKey(cookie)) {
        this.$cookies.remove(cookie)
      }
    })
  },
  data () {
    return {
      username: '',
      classroom: '',
      errors: [],
      signInDisabled: false,
      isLoading: false
    }
  },
  props: {
    msg: String
  }
}
</script>

<style>
  .name-input {
    width: 20%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border-radius: 5px;
  }
  .select-input {
    width: 20%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .select-input select {
    padding: 5px 8px;
    width: 130%;
    border: none;
    box-shadow: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
  }
  .select-input select:focus {
    outline: none;
}
  .errors {
    width: 20%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    text-align: center;
    color: red;
  }
  .button {
    background-color: #4CAF50; /* Green */
    border: none;
    border-radius: 5px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  .button :disabled {
    background-color: gray;
    color: slategray;
  }
</style>
