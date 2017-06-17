<template>
  <div class="enquiry-unprocessed">
    <el-table :data='enquiryData'>
      <el-table-column prop='phone'
        label='电话'>
      </el-table-column>
      <el-table-column prop='uname'
        label='姓名'>
      </el-table-column>
      <el-table-column prop='date'
        label='日期'>
      </el-table-column>
      <el-table-column inline-template
        label='操作'>
        <div>
          <el-popover ref='deleteConfirm'
            placement="top"
            width="150"
            v-model="confirmDeletePopover">
            <p>确定退款？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini"
                type="text"
                @click="cancelDeleteInfo">取消
              </el-button>
              <el-button type="primary"
                size="mini"
                @click="handleDeleteInfo(row)">确定
              </el-button>
            </div>
          </el-popover>
          <el-button size='small'
            type='danger'
            @click='confirmDeletePopover = true'
            v-popover:deleteConfirm>
            删除
          </el-button>
        </div>
      </el-table-column>
    </el-table>
    <div class="user-pagination">
      <el-pagination layout='total, prev, pager, next, jumper'
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size='10'
        :total='total'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDeletePopover: false,
      enquiryData: [],
      currentPage: 1,
      total: 0
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(pageNume) {
      let page = pageNume || 1
      let reqURL = '/consult/findAll.action?status=1&page=' + page

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.enquiryData = data.rows
        this.total = data.total
      })
    },
    handleDeleteInfo(row) {
      let reqURL = '/consult/del.action'
      let data = { cid: row.consultid }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.cancelDeleteInfo()
          this.initData(this.currentPage)
        }
      })
    },
    cancelDeleteInfo() {
      this.confirmDeletePopover = true
      setTimeout(() => {
        this.confirmDeletePopover = false
      }, 0)
    },
    handleCurrentChange(val) {
      this.initData(val)
    }
  },

}
</script>

<style lang='stylus'>
.enquiry-unprocessed
  .user-pagination
    display: flex
    justify-content: center
    margin-top: 15px
</style>
