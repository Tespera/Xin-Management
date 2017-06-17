<template>
  <div class="article-type">
    <div class="type-header">
      <div>文章分类</div>
      <div class="header-function">
        <el-button type="text"
          @click.native='handleAdd()'>
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </div>
    <div class="type-container">
      <div class="type-item"
        v-for="item in typeList">
        <div class='item-content'>
          <el-input v-model="item.cname"></el-input>
        </div>
        <div class="type-funciton">
          <el-button type="danger"
            @click.native='handleDelete(item.catid)'>删除
          </el-button>
          <el-button @click.native='handleChange(item.catid, item.cname)'>
            修改
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let reqURL = '/NewCatalog/selectAll.action'

      this.axios.get(reqURL).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.typeList = data.data
        }
      })
    },
    handleDelete(catid) {
      let reqURL = '/NewCatalog/delete.action'
      let data = { catid }

      this.axios.post(reqURL, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData()
        } else {
          this.$message.error('删除失败');
        }
      })
    },
    handleChange(catid, cname) {
      let reqURL = '/NewCatalog/updateNewCatalog.action'
      let data = {
        catid,
        cname
      }

      this.axios.post(reqURL, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        let data = response.data
        if (data.status === 200) {
          this.initData()
        } else {
          this.$message.error('修改失败');
        }
      })
    },
    handleAdd() {
      let reqURL = '/NewCatalog/addNewCatalog.action'
      let data = { cname: '新类型' }

      this.axios.post(reqURL, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        let data = response.data
        if (data.status === 200) {
          this.initData()
        } else {
          this.$message.error('添加失败');
        }
      })
    }
  }
}
</script>

<style lang='stylus'>
.article-type
  padding-top: 10px
  .type-header
    display: flex
    align-items: center
    padding-left: 10px
    margin-bottom: 5px
    .header-function
      margin-left: 5px
  .type-container
    max-width: 800px;
    .type-item
      display: flex
      align-items: center
      margin-bottom: 10px
      .item-content
        flex: 1
        .el-input
          max-width: 200px;
</style>
