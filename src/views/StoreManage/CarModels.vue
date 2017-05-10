<template>
  <div>
    <div class="right-header">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: 'details' }">{{ bname }}</el-breadcrumb-item>
        <el-breadcrumb-item>车系</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="store-tooltip">
      <el-button type='text'
        icon='search'
        @click='dialogCopyModelVisible = true'></el-button>
      <el-button type='text'
        icon='plus'
        @click="dialogAddModelVisible = true"></el-button>
    </div>
    <el-dialog title="搜索车系"
      v-model="dialogCopyModelVisible">
      <el-autocomplete placeholder="请输入车系名"
        v-model='selectedModel'
        :fetch-suggestions='querySearch'
        :trigger-on-focus="false"
        @select='handleModelSelect'>
      </el-autocomplete>
    </el-dialog>
    <el-dialog title="添加车系"
      v-model='dialogAddModelVisible'>
      <el-form :model="newModelInfo"
        label-width="75px">
        <el-form-item label='车系'>
          <el-input v-model="newModelInfo.gname"></el-input>
        </el-form-item>
        <el-form-item label='活动'>
          <el-input v-model="newModelInfo.title"></el-input>
        </el-form-item>
        <!--<el-form-item label='最低价格'>
                          <el-input v-model="newModelInfo.minprice"></el-input>
                        </el-form-item>
                        <el-form-item label='最高价格'>
                          <el-input v-model="newModelInfo.maxprice"></el-input>
                        </el-form-item>-->
        <el-form-item label='主图'>
          <el-upload v-if="dialogAddModelVisible"
            :action="$store.state.baseURL + '/simage/upload.action'"
            name='uploadFile'
            type="drag"
            :on-success="handleAddModelShowImg"
            :thumbnail-mode="true">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label='热门'>
          <el-switch v-model='newModelInfo.ishot'
            on-text='是'
            off-text='否'
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button @click="resetModelInfo">重置</el-button>
        <el-button @click="submitModelInfo">提交</el-button>
      </div>
    </el-dialog>
    <div class="store-table">
      <el-table :data='modelInfo'>
        <el-table-column prop='data.gname'
          label='车系'>
        </el-table-column>
        <el-table-column prop='data.title'
          label='活动'>
        </el-table-column>
        <el-table-column inline-template
          label='价格区间'>
          <div>
            {{ row.data.minprice + '-' + row.data.maxprice}}
          </div>
        </el-table-column>
        <el-table-column prop='data.gdate'
          label='创建时间'
          :formatter='dateFormatter'>
        </el-table-column>
        <el-table-column inline-template
          label='操作'
          width='260'>
          <div>
            <el-popover ref='deleteConfirm'
              placement="top"
              width="150"
              v-model="confirmDeletePopover">
              <p>确定删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini"
                  type="text"
                  @click="cancelDeleteInfo">取消</el-button>
                <el-button type="primary"
                  size="mini"
                  @click="handleDeleteInfo($index, row, column)">确定</el-button>
              </div>
            </el-popover>
            <el-button size='small'
              type='danger'
              @click='confirmDeletePopover = true'
              v-popover:deleteConfirm>
              删除
            </el-button>
            <el-button size='small'
              @click="handleEdit($index, row, column)">
              详情
            </el-button>
            <el-button size='small'
              @click="handleCarouseEdit($index, row, column)">
              轮播
            </el-button>
            <el-button size='small'
              @click="handleCarEdit($index, row, column)">
              车型
            </el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="store-detils-edit">
      <el-dialog title="车系详情"
        v-model='dialogModelDetilsVisible'
        v-if="dialogModelDetilsVisible">
        <el-form label-width='75px'>
          <el-form-item label='车系'>
            <el-input v-model='detailsModeslInfo.data.gname'></el-input>
          </el-form-item>
          <el-form-item label='活动'>
            <el-input v-model='detailsModeslInfo.data.title'></el-input>
          </el-form-item>
          <!--<el-form-item label='最低价格'>
                    <el-input v-model='detailsModeslInfo.data.minprice'></el-input>
                  </el-form-item>
                  <el-form-item label='最高价格'>
                    <el-input v-model='detailsModeslInfo.data.maxprice'></el-input>
                  </el-form-item>-->
          <el-form-item label='主图'>
            <el-upload :action="$store.state.baseURL + '/update/image.action'"
              type="drag"
              name='uploadFile'
              :data="{imageName: detailsModeslInfo.data.gshowimage}"
              :on-success="handleChangeModelShowImg"
              :thumbnail-mode="true"
              :default-file-list="[{name: detailsModeslInfo.data.bshowimage, url: $store.state.baseImgURL + detailsModeslInfo.data.gshowimage }]">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label='热门'>
            <el-switch v-model='detailsModeslInfo.data.ishot'
              on-text='是'
              off-text='否'
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot='footer'>
          <el-button @click="submitModelChange">修改</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="carouse-edit">
      <el-dialog size='full'
        title='轮播图管理'
        v-model="dialogCarouseVisible"
        v-if="dialogCarouseVisible">
        <template v-for="item in modelInfo[currentCarouseImages.index].bImage">
          <el-upload type="drag"
            name="uploadFile"
            :action="$store.state.baseURL + '/images/upload.action'"
            :on-success='uploadCarouseSuccess'
            :default-file-list="[{name: item.image, url: $store.state.baseImgURL + item.image, iid: item.iid}]"
            :on-remove='removeCarouse'
            :data="{id: currentCarouseImages.gid, idName: 'gid', iid: item.iid}"
            :thumbnail-mode="true">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </template>
        <el-upload type="drag"
          name="uploadFile"
          :action="$store.state.baseURL + '/images/upload.action'"
          :data="{id: currentCarouseImages.gid, idName: 'gid', iid: '-1'}"
          :on-success='uploadCarouseSuccess'
          :thumbnail-mode="true">
          <i class="el-icon-upload"></i>
          <div class="el-dragger__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-dialog>
    </div>
    <div class="store-pagination">
      <el-pagination layout='total, prev, pager, next, jumper'
        @current-change="handleCurrentChange"
        :current-page="currentPage"
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
      bname: '',
      currentPage: 1,
      pageSize: 0,
      pageNum: 0,
      newModelInfo: {
        gname: '',
        title: '',
        minprice: '',
        maxprice: '',
        gshowimage: '',
        bid: this.$route.query.bid,
        ishot: false
      },
      detailsModeslInfo: {},
      currentCarouseImages: {},
      dialogAddModelVisible: false,
      dialogModelDetilsVisible: false,
      dialogCopyModelVisible: false,
      dialogCarouseVisible: false,
      confirmDeletePopover: false,
      selectedModel: ''
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
      this.bname = query.bname

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
    querySearch(queryString, cb) {
      let reqURL = '/goods/getLikeGname.action'
      let data = {
        gname: queryString
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        let arr = data.data.map(obj => {
          let tmpObj = {
            value: obj.gname,
            gid: obj.gid,
            bid: obj.bid
          }
          return tmpObj
        })
        cb(arr)
      })
    },
    handleModelSelect(item) {
      let reqURL = '/goods/addNewBidGoods.action'
      let data = {
        gid: item.gid,
        bid: this.$route.query.bid
      }

      this.$confirm('是否添加 ' + item.value + ' 全部车型', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.axios.post(reqURL, data, {
        //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // }).then(response => {
        //   let data = response.data 
        // })
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }).catch(() => {

      })
    },
    resetModelInfo() {
      let modelInfo = {
        gname: '',
        title: '',
        minprice: '',
        maxprice: '',
        gshowimage: '',
        bid: this.$route.query.bid,
        ishot: false
      }
      this.newModelInfo = modelInfo
    },
    submitModelInfo() {
      this.axios({
        url: '/goods/add.action',
        method: 'post',
        data: this.newModelInfo,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          let lastPage = Math.floor(this.pageNum / this.pageSize) + 1;

          if (this.pageNum % this.pageSize == 0) {
            this.pageNum = this.pageNum + 1
          }

          this.currentPage = lastPage
          this.dialogAddModelVisible = false
          this.initData(lastPage)
          this.resetModelInfo()
        }
      })
    },
    dateFormatter(row) {
      let value = new Date(row.data.gdate)
      let blank = '/'
      let str = value.getFullYear() + blank + (value.getMonth() + 1) + blank + (value.getDate())
      return str
    },
    handleCarEdit($index, row, column) {
      this.$router.push({ name: 'CarList', query: { gid: row.data.gid, bid: row.data.bid, bname: this.bname, gname: row.data.gname } })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.initData(val)
    },
    cancelDeleteInfo() {
      this.confirmDeletePopover = true
      setTimeout(() => {
        this.confirmDeletePopover = false
      }, 0)
    },
    handleDeleteInfo($index, row, column) {
      let gid = row.data.gid
      let reqURL = '/goods/delete.action?gid=' + gid

      this.confirmDeletePopover = true
      setTimeout(() => {
        this.confirmDeletePopover = false
      }, 0)

      this.axios.get(reqURL).then(response => {
        let data = response.data
        if (data.status == 200) {
          let currentPage
          let pageXSize = this.currentPage * this.pageSize

          if (pageXSize < this.pageNum) {
            this.initData(this.currentPage)
          }

          if (pageXSize = this.pageNum) {
            if (this.pageNum % this.pageSize == 1 && this.currentPage != 1) {
              this.initData(this.currentPage - 1)
            } else {
              this.initData(this.currentPage)
            }
          }
        }
      })
    },
    handleEdit(index, row, column) {
      this.dialogModelDetilsVisible = true;
      let bimage = row.bimage
      let data = row.data
      let obj = {}

      obj.bimage = bimage
      obj.data = {}

      for (let key in data) {
        if (key != 'gdate') {
          obj.data[key] = data[key]
        }
      }

      this.detailsModeslInfo = obj
    },
    submitModelChange() {
      let data = this.detailsModeslInfo.data

      this.axios({
        url: '/goods/update.action',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData(this.currentPage)
          this.dialogModelDetilsVisible = false;
        }
      })
    },
    handleCarouseEdit(index, row, column) {
      this.dialogCarouseVisible = true
      this.currentCarouseImages.gid = row.data.gid
      this.currentCarouseImages.index = index
    },
    handleAddModelShowImg(response, file, fileList) {
      this.newModelInfo.gshowimage = response.url
    },
    handleChangeModelShowImg(response, file, fileList) {
      this.detailsModeslInfo.data.gshowimage = response.url
    },
    uploadCarouseSuccess(response, file, fileList) {
      this.initData(this.currentPage)
    },
    removeCarouse(file) {
      let reqURL = '/images/delete.action'
      let data = {
        iid: file.iid
      }
      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        this.initData(this.currentPage)
      })
    }
  }
}
</script>

<style>
.store-tooltip .el-button {
  margin-left: 0;
}
</style>
