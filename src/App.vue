<template>
  <div id="app">
    <router-link to="/">
      <img alt="Kwestion logo" height="40px" src="http://freevector.co/wp-content/uploads/2013/11/25400-question-mark-on-a-circular-black-background1.png">
    </router-link>
    <router-view/>
  </div>
</template>

<script>
// get all classrooms
// click on one takes you to a classroom
// store the username/classroom locally
export default {
  name: 'App',
  props: {
    name: String,
    classroom: String
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
