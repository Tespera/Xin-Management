<template lang="html">
  <div>
    <el-row>
      <el-col
        :span='4'>
        <left-nav></left-nav>
      </el-col>
      <el-col
        :span='20'>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftNav from '../components/Nav.vue'

export default {
  components: {
    LeftNav
  }
}
</script>

<style lang="css">
.right-main {
  background-color: blue;
  height: 30px;
}
</style>
