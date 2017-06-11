<template>
  <div class="order-list maintain-order">
    <div class="order-tooltip">
      <el-select v-model="status"
        placeholder='请选择订单类型'>
        <el-option v-for="item in orderType"
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <el-table :data='orderData'>
      <el-table-column prop='bmname'
        label='商家名'>
      </el-table-column>
      <el-table-column prop='price'
        label='支付金额'>
      </el-table-column>
      <el-table-column prop='price'
        label='支付金额'>
      </el-table-column>
      <el-table-column inline-template
        label='使用状态'>
        <div>
          {{ !!row.ruid?'已使用':'未使用' }}
        </div>
      </el-table-column>
      <el-table-column prop='sname'
        label='服务名'>
      </el-table-column>
      <el-table-column prop='uname'
        label='用户名'>
      </el-table-column>
      <el-table-column prop='uphone'
        label='用户电话'>
      </el-table-column>
      <el-table-column prop='goodid'
        label='商品号'>
      </el-table-column>
      <el-table-column prop='qid'
        label='流水号'>
      </el-table-column>
      <el-table-column prop='date'
        label='生成日期'>
      </el-table-column>
      <el-table-column prop='bphone'
        label='商家电话'>
      </el-table-column>
      <el-table-column inline-template
        v-if="status == 1"
        label='操作'>
        <div>
          <el-popover ref='deleteConfirm'
            placement="top"
            width="150"
            v-model="confirmRefundPopover">
            <p>确定退款？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini"
                type="text"
                @click="cancelRefundInfo">取消
              </el-button>
              <el-button type="primary"
                size="mini"
                @click="handleRefundInfo(row)">确定
              </el-button>
            </div>
          </el-popover>
          <el-button size='small'
            type='danger'
            @click='confirmRefundPopover = true'
            v-popover:deleteConfirm>
            退款
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
      status: 0,
      total: 0,
      orderData: [],
      currentPage: 1,
      confirmRefundPopover: false,
      orderType: [
        {
          value: 0,
          label: '已付款',
        },
        {
          value: 1,
          label: '等待退款'
        },
        {
          value: 2,
          label: '订单完成'
        },
        {
          value: 3,
          label: '退款成功'
        },
        {
          value: -3,
          label: '异常订单'
        }
      ]
    }
  },
  watch: {
    status(val, oldval) {
      this.initData(this.currentPage)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(pageNum) {
      let status = this.status
      let page = pageNum || 1
      let reqURL = '/YcOreder/selectYcOreder.action?status=' + status + '&type=1&page=' + page

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.total = data.total
        this.orderData = data.rows
      })
    },
    handleCurrentChange(val) {
      this.initData(val)
    },
    handleSelectChange(val) {
      console.log(val)
    },
    cancelRefundInfo() {
      this.confirmRefundPopover = true
      setTimeout(() => {
        this.confirmRefundPopover = false
      }, 0)
    },
    handleRefundInfo(row) {
      let reqURL = '/YcOreder/payBlack.action'
      let data = {
        goodid: row.goodid,
        qid: row.qid
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.cancelRefundInfo()
          this.initData(this.currentPage)
        }
      })
    }
  }
}
</script>

<style lang='stylus'>
.order-list
  .order-tooltip
    padding: 0 5px;
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
    align-item: center;
    .el-select
     transform: translateY(1.5px)
     box-sizing: border-box;
     border-radius: 0;
     border-left: 1px solid #e0e6ed;
     input
      border: none
      border-radius: 0
      background-color: #EFF2F7
  .user-pagination .el-pagination
    text-align: center
    margin-top: 15px
</style>
