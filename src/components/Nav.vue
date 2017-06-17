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
            购车模块
          </template>
          <el-menu-item
            index='1-1'
            @click.native="handleClick('StoreDetils')">
            4S店管理
          </el-menu-item>
          <el-menu-item
            index='1-2'
            @click.native="handleClick('Platform')">
            平台管理
          </el-menu-item>
        </el-submenu>
        <el-submenu index='2'>
          <template slot='title'>
            养车模块
          </template>
          <el-menu-item
            index='2-1'
            @click.native="handleClick('StoreMaintain')">
            养车门店
          </el-menu-item>
          <el-menu-item
            index='2-3'
            @click.native="handleClick('MaintainSetting')">
            养车管理
          </el-menu-item>
          <el-menu-item
            index='2-2'
            @click.native="handleClick('Coupon')">
            优惠券管理
          </el-menu-item>
        </el-submenu>
        <el-submenu index='3'>
          <template slot='title'>
            新闻资讯
          </template>
            <el-menu-item
            index='3-1'
            @click.native="handleClick('ArticleList')">
            文章管理
          </el-menu-item>
          <el-menu-item
            index='3-2'
            @click.native="handleClick('ArticleType')">
            文章类型
          </el-menu-item>
        </el-submenu>
        <el-submenu index='4'>
          <template slot='title'>
            订单管理
          </template>
            <el-menu-item
            index='4-1'
            @click.native="handleClick('OrderList')">
            订车订单
          </el-menu-item>
          <el-menu-item
            index='4-2'
            @click.native="handleClick('MaintainOrder')">
            养车订单
          </el-menu-item>
        </el-submenu>
        <el-submenu index='5'>
          <template slot='title'>
            用户管理
          </template>
            <el-menu-item
            index='5-1'
            @click.native="handleClick('UserList')">
            用户列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index='6'>
          <template slot='title'>
            询价管理
          </template>
          <el-menu-item
            index='6-1'
            @click.native="handleClick('EnquiryUnprocessed')">
            未处理
          </el-menu-item>
          <el-menu-item
            index='6-2'
            @click.native="handleClick('EnquiryProcessed')">
            已处理
          </el-menu-item>
        </el-submenu>
        <el-submenu index='7'>
          <template slot='title'>
            评论管理
          </template>
          <el-menu-item
            index='7-1'
            @click.native="handleClick('HandleComments')">
            评论管理
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
      defaultOpeneds: []
    }
  },
  created() {
    let currentPath = this.$route.meta.navIndex
    if (!!currentPath) {
      this.defaultActive = currentPath
    }
  },
  methods: {
    handleClick(path) {
      this.$router.push({ name: path })
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
