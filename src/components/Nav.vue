<template lang="html">
  <div class="left-nav">
    <div class="nav-header">
      <h1>管理系统</h1>
    </div>
    <el-menu
      :router="true">
      <el-menu-item
        index='2'
        :route="{ name: 'StoreManage'}">
        <i class="el-icon-document"></i>查询
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
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
  min-height: 100vh;
}
</style>
