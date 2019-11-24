<template>
  <div id="formula">

    <h1> {{msg}} </h1>
    <form @submit="validateInput">
      <input class="name-input" type="text" placeholder="Name" v-model="username" />
      <br />
      <select class="select-input" required v-model="classroom">
        <option disabled selected value> -- select a class -- </option>
        <option value="Taeoalii">Taeoalii</option>
        <option value="Richards">Richards</option>
        <option value="Herradura">Herradura</option>
        <option value="Balisacan">Balisacan</option>
        <option value="Nakatsu">Nakatsu</option>
      </select>
      <br />
      <input class="button" type="submit" value="Sign In" v-on:click="signIn" />
    </form>
    <p>
      {{this.showUser()}}
    </p>
    <div v-for="error in errors" v-bind:key="error" class="errors">
      {{error}}
    </div>
  </div>
</template>

<script>
// get all classrooms
// click on one takes you to a classroom
// store the username/classroom locally
export default {
  name: 'Signup',
  methods: {
    signIn(e) {
      // TODO: Validate input
      // TODO: save name/classroom
      if(!this.validateInput(e)) return;
      this.$router.push({ name: 'questions', params: { classroom: this.classroom }, query: { username: this.username } }) 
    },
    showUser() {
      if (this.username !== '' && this.username !== null) {
        return "Hello " + this.username + "!";
      }
      return '';
    },
    // TODO: validate the input
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
      return false;
    }
  },
  data() {
    return {
      username: '',
      classroom: '',
      errors: []
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
  }
  .select-input {
    width: 20%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
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
</style>