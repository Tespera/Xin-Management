<template lang="html">
  <div>
    <div class="right-header">
      <el-breadcrumb>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="store-table">
      <el-table
        :data='storeInfo'>
        <el-table-column
          prop='bname'
          label='商家名'>
        </el-table-column>
        <el-table-column
          prop='baddress'
          label='地址'>
        </el-table-column>
        <el-table-column
          prop='bphone'
          label='电话'>
        </el-table-column>
        <el-table-column
          prop='uname'
          label='姓名'>
        </el-table-column>
        <el-table-column
          prop='majorbusiness'
          label='主营车型'>
        </el-table-column>
        <el-table-column
          prop='title1'
          label='活动'>
        </el-table-column>
        <el-table-column
          prop='bdate'
          label='创建时间'
          :formatter='dateFormatter'>
        </el-table-column>
        <el-table-column
          inline-template
          label='操作'
          width='140'>
          <div>
            <el-button
              size='small'
              @click="handleEdit($index, row, column)">
              详情
            </el-button>
            <el-button
              size='small'
              @click="handleModelEdit($index, row, column)">
              车型
            </el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="store-pagination">
      <el-pagination
        layout='total, prev, pager, next, jumper'
        @current-change="handleCurrentChange"
        :page-size='pageSize'
        :total='pageNum'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeInfo: [],
      pageSize: 0,
      pageNum: 0
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(page) {
      let pageNum = page > 0 ? page : 1
      let reqURL = "/business/getall.action?page=" + pageNum

      this.axios.get(reqURL).then(response => {
        let data = response.data
        let storesInfo = data.data.rows

        this.storeInfo = storesInfo
        this.pageNum = data.data.total
        this.pageSize = data.data.pageNumber

      })
    },
    dateFormatter(row) {
      let value = new Date(row.bdate)
      let blank = '/'
      let str = value.getFullYear() + blank + (value.getMonth() + 1) + blank + (value.getDate())
      return str
    },
    handleModelEdit(index, row, column) {
      this.$router.push( {name: 'CarModels', query: {bid: row.bid }} )
    },
    handleCurrentChange(val) {
      this.initData(val)
    }
  }
}
</script>

<style lang="css">
</style>
