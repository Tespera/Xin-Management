<template lang="html">
  <div class="left-nav">
    <div class="nav-header">
      <h1>管理系统</h1>
    </div>
      <el-menu
        :default-active='defaultActive'
        :default-openeds='defaultOpeneds'>
        <el-submenu index='1'>
          <template slot='title'>
            <!-- <i class="el-icon-message"></i> -->
            购车模块
          </template>
          <el-menu-item
            index='1-1'
            @click.native="handleClick('StoreDetils')">
            <i class="el-icon-setting"></i>4S店管理
          </el-menu-item>
          <el-menu-item
            index='1-2'
            @click.native="handleClick('Platform')">
            <i class="el-icon-setting"></i>平台管理
          </el-menu-item>
        </el-submenu>
        <el-submenu index='2'>
          <template slot='title'>
            <!-- <i class="el-icon-message"></i> -->
            养车模块
          </template>
          <el-menu-item
            index='2-1'
            @click.native="handleClick('StoreMaintain')">
            <i class="el-icon-setting"></i>养车门店
          </el-menu-item>
          <el-menu-item
            index='2-2'
            @click.native="handleClick('Coupon')">
            <i class="el-icon-setting"></i>优惠券管理
          </el-menu-item>
          <el-menu-item
            index='2-3'
            @click.native="handleClick('MaintainSetting')">
            <i class="el-icon-setting"></i>养车管理
          </el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: '0',
      defaultOpeneds: ['1', '2']
    }
  },
  created() {
    // let currentPath = this.$route.meta.navIndex
    // if(!!currentPath) {
    //   this.defaultActive = currentPath
    // }
  },
  methods: {
    handleClick(path) {
      this.$router.push({ name: path})
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
