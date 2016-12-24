<template lang="html">
  <div>
    <div class="right-header">
      <el-breadcrumb>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="store-tooltip">
      <el-button type='text' icon='plus' @click="dialogAddStoreVisible = true"></el-button>
    </div>
    <el-dialog title="添加商家" v-model='dialogAddStoreVisible'>
      <el-form
        :model="newStoreInfo"
        label-width="75px">
        <el-form-item label='商家名'>
          <el-input v-model="newStoreInfo.bname"></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="newStoreInfo.baddress"></el-input>
        </el-form-item>
        <el-form-item label='电话'>
          <el-input v-model="newStoreInfo.bphone"></el-input>
        </el-form-item>
        <el-form-item label='姓名'>
          <el-input v-model="newStoreInfo.uname"></el-input>
        </el-form-item>
        <el-form-item label='经度'>
          <el-input v-model="newStoreInfo.longitude"></el-input>
        </el-form-item>
        <el-form-item label='维度'>
          <el-input v-model="newStoreInfo.latitude"></el-input>
        </el-form-item>

        <el-form-item label='主营车型
'>
          <el-input v-model="dialogAddStoreVisible.majorbusiness"></el-input>
        </el-form-item>
        <el-form-item label='活动'>
          <el-input v-model="dialogAddStoreVisible.title1"></el-input>
        </el-form-item>
        <el-form-item label='主图'>
          <el-input v-model="dialogAddStoreVisible.bshowimage"></el-input>
        </el-form-item>
        <el-form-item label='热门'>
          <el-switch
            v-model='newStoreInfo.isHot'
            on-text='是'
            off-text='否'
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button @click="resetStoreInfo">重置</el-button>
        <el-button @click="submitStoreInfo">提交</el-button>
      </div>
    </el-dialog>
    <div class="store-table">
      <el-table
        :data='storeInfo'>
        <el-table-column
          prop='data.bname'
          label='商家名'>
        </el-table-column>
        <el-table-column
          prop='data.baddress'
          label='地址'>
        </el-table-column>
        <el-table-column
          prop='data.bphone'
          label='电话'>
        </el-table-column>
        <el-table-column
          prop='data.uname'
          label='姓名'>
        </el-table-column>
        <el-table-column
          prop='data.majorbusiness'
          label='主营车型'>
        </el-table-column>
        <el-table-column
          prop='data.title1'
          label='活动'>
        </el-table-column>
        <el-table-column
          prop='data.bdate'
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
      pageNum: 0,
      newStoreInfo: {
        bname: '',
        bimage: '',
        baddress: '',
        bphone: '',
        uname: '',
        isHot: false,
        longitude: '',
        latitude: '',
        majorbusiness: '',
        title1: '',
        bshowImage: ''
      },
      dialogAddStoreVisible: false
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
        let storesInfo = data.rows

        this.storeInfo = storesInfo
        this.pageNum = data.total
        this.pageSize = data.pageNumber

      })
    },
    resetStoreInfo() {
      let storeInfo = {
        bname: '',
        bimage: '',
        baddress: '',
        bphone: '',
        uname: '',
        isHot: '',
        longitude: '',
        latitude: '',
        majorbusiness: '',
        title1: '',
        bshowImage: ''
      }
      this.newStoreInfo = storeInfo
      console.log(this.newStoreInfo);
    },
    submitStoreInfo() {
      let that = this
      let body =

      this.axios({
        url: '/business/add.action',
        method: 'post',
        data: this.newStoreInfo,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        console.log(data);
      })
    },
    dateFormatter(row) {
      let value = new Date(row.data.bdate)
      let blank = '/'
      let str = value.getFullYear() + blank + (value.getMonth() + 1) + blank + (value.getDate())
      return str
    },
    handleModelEdit(index, row, column) {
      this.$router.push( {name: 'CarModels', query: {bid: row.data.bid }} )
    },
    handleCurrentChange(val) {
      this.initData(val)
    }
  }
}
</script>

<style lang="css">
</style>
