<template>
  <div class="user-list">
    <div class="user-tooltip"></div>
    <el-table :data='userData'>
      <el-table-column prop='ulogin'
        label='登录名'>
      </el-table-column>
      <el-table-column prop='uphone'
        label='手机号'>
      </el-table-column>
      <el-table-column prop='uname'
        label='姓名'>
      </el-table-column>
      <el-table-column prop='uaddress'
        label='地址'>
      </el-table-column>
      <el-table-column prop='ulastlogin'
        label='最后登录时间'>
      </el-table-column>
      <el-table-column inline-template
        label='状态'>
        <div :class="['configure-hint', {active: !!row.status, 'no-active': !row.status}]">
        </div>
      </el-table-column>
      <el-table-column inline-template
        label='操作'
        width='260px'>
        <div>
          <el-popover ref='deleteConfirm'
            placement="top"
            width="150"
            v-model="confirmDeletePopover">
            <p>确定删除？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini"
                type="text"
                @click="cancelDeleteInfo">取消
              </el-button>
              <el-button type="primary"
                size="mini"
                @click="handleDeleteInfo($index, row, column)">确定
              </el-button>
            </div>
          </el-popover>
          <el-button size='small'
            type='danger'
            @click='confirmDeletePopover = true'
            v-popover:deleteConfirm>
            删除
          </el-button>
          <el-button size='small'
            @click='handleStatusToggle(row)'>
            {{ !!row.status?'禁用':'启用'}}
          </el-button>
          <el-button size='small'
            @click='handleCheckClick(row.uid)'>
            查看
          </el-button>
          <el-button size='small'
            @click='handleDistributClick(row.uid, row.rid)'>
            分配
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
    <el-dialog title='分配优惠券'
      v-model='distributDialogVisible'>
      <el-table :data='coupons'>
        <el-table-column prop='rname'
          label='名称'>
        </el-table-column>
        <el-table-column prop='price'
          label='优惠价格'>
        </el-table-column>
        <el-table-column inline-template
          label='类型'>
          <div>
            {{ couponsType(row.type) }}
          </div>
        </el-table-column>
        <el-table-column inline-template
          label='操作'>
          <div>
            <el-button size='small'
              @click='handeleDistribut(row.rid)'>
              分配
            </el-button>
          </div>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title='查看优惠券'
      v-model='checkDialogVisible'>
      <el-table :data='userCoupon'>
        <el-table-column prop='rname'
          label='名称'>
        </el-table-column>
        <el-table-column prop='price'
          label='优惠价格'>
        </el-table-column>
        <el-table-column prop='createdate'
          label='创建日期'>
        </el-table-column>
        <el-table-column prop='pastdate'
          label='过期日期'>
        </el-table-column>
        <el-table-column inline-template
          label='状态'>
          <div>
            {{ couponsStatusType(row.status) }}
          </div>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [],
      total: 0,
      confirmDeletePopover: false,
      currentPage: 1,
      coupons: [],
      distributDialogVisible: false,
      checkDialogVisible: false,
      distributUid: -1,
      distributRid: -1,
      userCoupon: []
    }
  },
  created() {
    this.initDate()
  },
  methods: {
    initDate(pageNum) {
      let page = pageNum || 1
      let reqURL = '/user/findAll.action?page=' + page

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.total = data.total
        this.userData = data.rows
      })

      let reqCoupons = '/roll/getall.action'

      this.axios.get(reqCoupons).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.coupons = data.data
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
      this.initDate(val)
    },
    handleDeleteInfo($index, row, column) {
      console.log(row)
      let reqURL = '/user/delete.action'
      let data = { uid: row.uid }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.cancelDeleteInfo()
          this.initDate(this.currentPage)
        }
      })
    },
    handleStatusToggle(row) {
      let reqURL = '/user/stopUser.action'
      let data = { uid: row.uid }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initDate(this.currentPage)
        }
      })
    },
    handeleDistribut(rid) {
      let reqURL = '/RollUser/add.action '
      let data = { 
        uid: this.distributUid,
        rid
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }
      })
    },
    handleCheckClick(uid) {
      let reqURL = '/RollUser/findByUid.action'
      let data = { uid }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.userCoupon = data.data
          this.checkDialogVisible = true
        }
      })
    },
    handleDistributClick(uid) {
      this.distributUid = uid
      this.distributDialogVisible = true
    },
    couponsType(type) {
      switch (type) {
        case 0:
          return '通用'
        case 1:
          return '清洗'
        case 2:
          return '保养'
        case 3:
          return '装饰'
        default:
          break;
      }
    },
    couponsStatusType(type) {
      switch (type) {
        case 0:
          return '待使用'
        case 1:
          return '已使用'
        case 2:
          return '已失效过期'
        case 3:
          return '占用中'
        default:
          break;
      }
    }
  }
}
</script>

<style lang='stylus'>
.user-list
  .user-tooltip
    background-color: #EFF2F7;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #e0e6ed;
    border-bottom: 0;
    vertical-align: middle;
    color: #8492a6;
    display: flex;
    justify-content: flex-end;
    align-content: stretch;
  .user-pagination .el-pagination
    text-align: center;
    margin-top: 15px;
</style>
