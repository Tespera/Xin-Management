<template lang="html">
  <div class="coupon">
    <div class="coupon_list">
      <div class="coupon_list_header">
        <h3>优惠券列表</h3>
        <el-button
          type="text"
          icon="plus"
          @click="dialogAddVisible = true">
        </el-button>
      </div>
      <div
        class="coupon_container"
        v-for="item in cptCoupons">
        <div class="coupon_content">
          <h3>{{item.rname}}</h3>
          <span>优惠{{item.price}}元</span>
          <span>{{item.typestr}}</span>
        </div>
        <div class="coupon_function">
          <el-button
            type="danger"
            size="small"
            @click="handleCancel(item.rid)">删除</el-button>
        </div>
      </div>
    </div>
    <div class="coupon_rules">
      <div class="coupon_list_header">
        <h3>优惠券规则</h3>
      </div>
      <div
        class="coupon_rules_container"
        v-for="(item, index) in couponRule">
        <div class="coupon_rules_header">
          <h3>{{ item.rgname }}</h3>
          <el-button
            type="text"
            icon="plus"
            @click="addRuleHandle(index)">
          </el-button>
        </div>
          <div
            class="coupon_rule"
            v-for="(param, ruleIndex) in cptCouponRule[index]">
            <div class="coupon_rule_rids">
              <el-checkbox-group
                v-model='param.rids'>
                <el-checkbox
                  v-for="coupon in coupons"
                  :label='coupon.rid'
                  @click.native="couponRuleClicked(index)">
                  {{ coupon.rname }}/{{'优惠' + coupon.price + '元'}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="coupon_rule_condition">
              <el-input v-model.lazy='param.condition'></el-input>
              <el-button
                type="danger"
                @click.native="couponRuleRemove(index, ruleIndex)">删除
              </el-button>
              <el-button
                type="primary"
                @click.native="couponRuleClicked(index)">修改
              </el-button>
            </div>
          </div>
      </div>
    </div>
    <div class="add_coupons_dialog">
      <el-dialog
        title="添加优惠券"
        v-model="dialogAddVisible">
        <el-form
          :model='newCoupons'
          label-width="75px">
          <el-form-item label='描述'>
            <el-input v-model='newCoupons.rname'></el-input>
          </el-form-item>
          <el-form-item label='优惠金额'>
            <el-input v-model='newCoupons.price' type='number'></el-input>
          </el-form-item>
          <el-form-item label='使用范围'>
            <el-radio-group v-model="newCoupons.type">
              <el-radio-button :label="1" >清洗</el-radio-button>
              <el-radio-button :label="2" >保养</el-radio-button>
              <el-radio-button :label="3" >装饰</el-radio-button>
              <el-radio-button :label="0" >通用</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCoupon()">添加</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: [],
      newCoupons: {
        rname: '',
        price: '',
        type: -1
      },
      dialogAddVisible: false,
      couponRule: [],
    }
  },
  watch: {
    dialogAddVisible(val) {
      if (!val) {
        this.newCoupons = {
          rname: '',
          price: '',
          type: -1
        }
      }
    }
  },
  computed: {
    cptCoupons() {
      let arr = []

      for (let item of this.coupons) {
        let obj = item
        let type = item.type

        if (type == 0) {
          obj.typestr = '通用'
        } else if (type == 1) {
          obj.typestr = '清洗'
        } else if (type == 2) {
          obj.typestr = '保养'
        } else if (type == 3) {
          obj.typestr = '装饰'
        }
        arr.push(obj)
      }
      return arr
    },
    cptCouponRule() {
      let arr = []

      for(let item of this.couponRule) {
        let param = item.param

        param = JSON.parse(param);

        arr.push(param)
      }
      return arr
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData () {
      let reqURL = '/roll/getall.action'

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.coupons = data.data
      })

      let reqRuleURL = '/rollgrant/getall.action'

      this.axios.get(reqRuleURL).then(response => {
        let data = response.data
        this.couponRule = data.data
      })
    },
    handleCancel(rid) {
      let reqURL = '/roll/delete.action'
      let data = {
        rid: rid
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data

        if (data.status == 200) {
          this.initData()
          this.dialogAddVisible = false
        }
      })
    },
    addCoupon() {
      let reqURL = '/roll/add.action'
      let data = this.newCoupons

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then( response => {
        let data = response.data
        if (data.status == 200) {
          this.dialogAddVisible = false
          this.initData()
        }
      })
    },
    couponRuleClicked(index) {
      let reqURL = '/rollgrant/update.action'
      let obj = {}

      obj = this.couponRule[index]

      let that = this
      setTimeout(function () {
        obj.param = JSON.stringify(that.cptCouponRule[index])

        that.axios.post(reqURL, obj, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(response => {
          let data = response.data
          if (data.status == 200) {
            that.initData()
          }
        })
      }, 0);
    },
    addRuleHandle(index) {
      let arr = this.cptCouponRule[index]
      let tmpObj = {
        condition: '',
        rids: []
      }
      arr.push(tmpObj)
      this.couponRuleClicked(index)
    },
    couponRuleRemove(index, ruleIndex) {
      let arr = this.cptCouponRule[index]

      arr.splice(ruleIndex, 1)
      this.couponRuleClicked(index)
    }
  }
}
</script>

<style lang="css">
.coupon {
  padding: 0px 20px;
}

.coupon_list_header {
  display: flex;
}

.coupon_list_header button {
  margin-left: 10px;
  padding: 0;
}

.coupon .coupon_container {
  padding: 10px 20px;
  display: inline-flex;
  overflow: hidden;
  background-color: #81CCCD;
  color: #fff;
  border-radius: .5em;
  margin-right: 5px;
  margin-bottom: 5px;
}

.coupon .coupon_container h3 {
  margin: 0px 0 5px;
}

.coupon .coupon_container .coupon_content > span:nth-of-type(1) {
  margin-bottom: 5px;
}

.coupon .coupon_container .coupon_content > span {
  display: block;
}

.coupon .coupon_container .coupon_function {
  margin-left: 10px;
  display: block;
  align-self: flex-end;
}

.coupon_rules {
  display: inline-flex;
  flex-direction: column;
}

.coupon_rules .coupon_list_header h3 {
  margin: 14px 0 8px;
}

.coupon_rules_container {
  display: inline-block;
}

.coupon_rules_container .coupon_rules_header {
  border-bottom: 1px dashed #ccc;
  display: flex;
  align-items: center;
  margin-bottom: 7px;
}

.coupon_rules_container .coupon_rules_header button {
  /*padding: 0px 0;*/
}

.coupon_rules_container h3 {
  margin-top: 2px;
  padding-bottom: 2px;
  margin-bottom: 0px;
  margin-right: 5px;
}

.coupon_rule {
  border-bottom: 1px dashed #ccc;
  padding-bottom: 5px;
  margin-bottom: 7px;
}

.coupon_rule_condition {
  display: flex;
  margin: 5px 0;
}

.coupon_rule_condition .el-input {
  margin-right: 10px;
  flex-grow: 1;
  max-width: 700px;
}

</style>
