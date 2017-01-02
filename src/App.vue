<template>
  <router-view></router-view>
</template>

<script>
import Nav from './components/Nav.vue'
import Cookies from 'js-cookie'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  beforeCreate() {
    let logged = Cookies.get('logged')
    
    if(!!logged) {
      this.$store.commit('changeLoggedState', logged)
    }

    if(this.$route.path !== '/login' && !this.$store.state.logged) {
      this.$router.push({path: '/login', query: {redirect: this.$route.fullPath}})
    }
  }
}
</script>

<style>
body {
  font-family: 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'STHeitiSC-Light', 'Arial', sans-serif;
  user-select: none;
}

body, h1{
  padding: 0;
  margin: 0;
}
</style>
