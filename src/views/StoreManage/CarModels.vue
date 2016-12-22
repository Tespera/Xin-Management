<template lang="html">
  <div>
    <div class="right-header">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: 'details' }">商家列表</el-breadcrumb-item>
        <el-breadcrumb-item>车型</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="store-table">
      <el-table
        :data='modelInfo'>
        <el-table-column
          prop='gname'
          label='车型'>
        </el-table-column>
        <el-table-column
          prop='bname'
          label='商家'>
        </el-table-column>
        <el-table-column
          prop='title'
          label='活动'>
        </el-table-column>
        <el-table-column
          inline-template
          label='价格区间'>
          <div>
            {{ row.minprice + '-' + row.maxprice}}
          </div>
        </el-table-column>
        <el-table-column
          prop='gdate'
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
              @click="handleCarEdit($index, row, column)">
              车辆
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
      modelInfo: [],
      pageSize: 0,
      pageNum: 0
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(num) {
      let query = this.$route.query
      let bid = query.bid
      let pageNum = num > 0 ? num : 1
      let reqURL = '/goods/getall.action?bid=' + bid + '&page=' + pageNum

      this.axios.get(reqURL).then(response => {
        let data = response.data
        let modeInfo = data.data.rows
        let pageSize = data.data.pageNumber
        let pageNum = data.data.total

        this.pageSize = pageSize
        this.pageNum = pageNum
        this.modelInfo = modeInfo
      })
    },
    dateFormatter(row) {
      let value = new Date(row.gdate)
      let blank = '/'
      let str = value.getFullYear() + blank + (value.getMonth() + 1) + blank + (value.getDate())
      return str
    },
    handleCarEdit($index, row, column) {
      this.$router.push({name: 'CarList', query: { gid: row.gid, bid: row.bid}})
    },
    handleCurrentChange(val) {
      this.initData(val)
    }
  }
}
</script>

<style lang="css">
</style>
