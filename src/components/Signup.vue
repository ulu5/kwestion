<template>
  <div id="formula">

    <h1> {{msg}} </h1>
    <form @submit="validateInput">
      <input type="text" placeholder="Name" v-model="username" />
      <br />
      <select required v-model="classroom">
        <option disabled selected value> -- select a class -- </option>
        <option value="Taeoalii">Taeoalii</option>
        <option value="Richards">Richards</option>
        <option value="Herradura">Herradura</option>
        <option value="Balisacan">Balisacan</option>
        <option value="Nakatsu">Nakatsu</option>
      </select>
      <br />
      <input type="submit" value="Sign In" v-on:click="signIn" />
    </form>
    <p>
      {{this.showUser()}}
    </p>
  </div>
</template>

<script>
// get all classrooms
// click on one takes you to a classroom
// store the username/classroom locally
export default {
  name: 'Signup',
  methods: {
    signIn() {
      // TODO: Validate input
      // TODO: save name/classroom
      this.$router.push({ name: 'questions', params: { classroom: this.classroom } }) 
    },
    showUser() {
      if (this.username !== '' && this.username !== null) {
        return "Hello " + this.username + "!";
      }
      return '';
    },
    validateInput(e) {
      if (this.username && this.classroom) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Please input your name!");
      }

      if (!this.classroom) {
        this.errors.push("Please select a classroom!");
      }

      e.preventDefault();
    }
  },
  data() {
    return {
      username: '',
      classroom: ''
    }
  },
  props: {
    msg: String
  }
}
</script>
