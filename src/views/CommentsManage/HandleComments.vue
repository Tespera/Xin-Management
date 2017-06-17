<template>
  <div class="handle-comments">
    <el-table :data='commentsData'>
      <el-table-column prop='content'
        label='评论内容'>
      </el-table-column>
      <el-table-column prop='date'
        label='评论日期'>
      </el-table-column>
      <el-table-column prop='uname'
        label='用户名'>
      </el-table-column>
      <el-table-column prop='mbname'
        label='商家名'>
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
      total: 0,
      commentsData: [],
      confirmDeletePopover: false,
      currentPage: 1
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(pageNum) {
      let page = pageNum || 1
      let reqURL = '/comment/getAll.action?page=' + page

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.total = data.total
        this.commentsData = data.rows
      })
    },
    handleDeleteInfo(row) {
      let reqURL = '/comment/del.action'
      let data = { id: row.commentId }

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
  }
}
</script>

<style lang='stylus'>
.handle-comments
  .user-pagination
    display: flex
    justify-content: center
    margin-top: 15px
</style>
