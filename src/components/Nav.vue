<template lang="html">
  <div class="left-nav">
    <div class="nav-header">
      <h1>管理系统</h1>
    </div>
    <el-menu
      :default-active='defaultActive'
      :router="true">
      <el-menu-item
        index='1'
        :route="{ name: 'StoreDetils'}">
        <i class="el-icon-document"></i>4S店管理
      </el-menu-item>
      <el-menu-item
        index='2'
        :route="{ name: 'Platform'}">
        <i class="el-icon-setting"></i>平台管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: '0'
    }
  },
  created() {
    let currentPath = this.$route.meta.navIndex
    if(!!currentPath) {
      this.defaultActive = currentPath
    }
  }
}
</script>

<style lang="css">
.nav-header {
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.nav-header h1 {
  font-weight: normal;
}

.left-nav {
  background-color: #eff2f7;
  flex-grow: 1;
  min-height: 100vh;
}
</style>
