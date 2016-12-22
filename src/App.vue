<template>
  <router-view></router-view>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'app',
  data () {
    return {

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
