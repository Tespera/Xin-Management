<template lang="html">
  <div>
    <div class="right-header">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: 'details' }">商家列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'CarModels', query: { bid: $route.query.bid }}">车型</el-breadcrumb-item>
        <el-breadcrumb-item>车辆</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="store-table">
      <el-table
        :data='carInfo'>
        <el-table-column
          prop='data.mname'
          label='车名'>
        </el-table-column>
        <el-table-column
          prop='data.level'
          label='等级'>
        </el-table-column>
        <el-table-column
          prop='data.output'
          label='排量'>
        </el-table-column>
        <el-table-column
          prop='data.drive'
          label='驱动'>
        </el-table-column>
        <el-table-column
          prop='data.fuel'
          label='燃料'>
        </el-table-column>
        <el-table-column
          prop='data.transmission'
          label='变速箱'>
        </el-table-column>
        <el-table-column
          prop='data.country'
          label='国家'>
        </el-table-column>
        <el-table-column
          prop='data.produce'
          label='生产方式'>
        </el-table-column>
        <el-table-column
          prop='data.structure'
          label='结构'>
        </el-table-column>
        <el-table-column
          prop='data.seat'
          label='座位'>
        </el-table-column>
        <el-table-column
          prop='data.keyword'
          label='关键字'>
        </el-table-column>
        <el-table-column
          prop='data.guidegprice'
          label='指导价格'>
        </el-table-column>
        <el-table-column
          prop='data.gprice'
          label='参考价格'>
        </el-table-column>
        <el-table-column
          prop='data.mtitle'
          label='活动'>
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
      carInfo: [],
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
      let gid = query.gid
      let pageNum = num > 0 ? num : 1
      let reqURL = '/model/getall.action?gid=' + gid + '&page=' + pageNum

      this.axios.get(reqURL).then(response => {
        let data = response.data.data
        let carInfo = data.rows
        let pageSize = data.pageNumber
        let pageNum = data.total

        this.carInfo = carInfo
        this.pageSize = pageSize
        this.pageNum = pageNum
      })
    },
    handleCurrentChange(val) {
      this.initData(val)
    }
  }
}
</script>

<style lang="css">
</style>
