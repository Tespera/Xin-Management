<template lang="html">
  <div>
    <el-row>
      <el-col
        :span='4'>
        <nav class="left-nav">

        </nav>
      </el-col>
      <el-col
        :span='20'>
        <main class="right-main">

        </main>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.left-nav {
  background-color: red;
  height: 30px;
}

.right-main {
  background-color: blue;
  height: 30px;
}
</style>
