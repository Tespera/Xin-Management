<template lang="html">
  <div class="store-maintain">
    <div class="right-header">
      <el-breadcrumb>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="store-tooltip">
      <el-button type='text' icon='plus' @click="dialogAddStoreVisible = true"></el-button>
    </div>
    <el-dialog
      title="添加商家"
      v-model='dialogAddStoreVisible'>
      <el-form
        :model="newStoreInfo"
        label-width="75px">
        <el-form-item label='商家名'>
          <el-input v-model='newStoreInfo.mbname'>
          </el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model='newStoreInfo.baddress'>
          </el-input>
        </el-form-item>
        <el-form-item label='电话'>
          <el-input v-model='newStoreInfo.bphone'>
          </el-input>
        </el-form-item>
        <el-form-item label='姓名'>
          <el-input v-model='newStoreInfo.uname'>
          </el-input>
        </el-form-item>
        <el-form-item label='经度'>
          <el-input v-model="newStoreInfo.longitude"></el-input>
        </el-form-item>
        <el-form-item label='纬度'>
          <el-input v-model="newStoreInfo.latitude"></el-input>
        </el-form-item>
        <el-form-item label='营业时间'>
          <el-input v-model='newStoreInfo.time'>
          </el-input>
        </el-form-item>
        <el-form-item label='主图'>
          <el-upload
            v-if="dialogAddStoreVisible"
            :action="$store.state.baseURL + '/simage/upload.action'"
            name='uploadFile'
            type="drag"
            :on-success="handleAddStoreShowImg"
            :thumbnail-mode="true">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button @click="resetStoreInfo">重置</el-button>
        <el-button @click="submitStoreInfo">提交</el-button>
      </div>
    </el-dialog>
    <div class="maintain-table">
      <el-table
        :data='storeData'>
        <el-table-column
          prop='mbname'
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
          prop='time'
          label='营业时间'>
        </el-table-column>
        <el-table-column
          inline-template
          label='操作'
          width='200'
          >
          <div>
            <el-popover
              ref='deleteConfirm'
              placement='top'
              width='150'
              v-model="confirmDeletePopover">
              <p>确定删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancelDeleteInfo">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDeleteInfo($index, row, column)">确定</el-button>
              </div>
            </el-popover>
            <el-button
              size='small'
              type='danger'
              v-popover:deleteConfirm>
              删除
            </el-button>
            <el-button
              size='small'
              @click="handleEdit($index, row, column)">
              详情
            </el-button>
            <el-button
              size='small'
              @click="handleCarouseEdit($index, row, column)">
              轮播
            </el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="store-detils-edit">
      <el-dialog
        title="商家详情"
        top='4%'
        v-model='dialogStoreDetilsVisible'
        v-if="dialogStoreDetilsVisible">
        <el-form label-width='75px'>
          <el-form-item label='商家名'>
            <el-input v-model='detailsStoreInfo.mbname'></el-input>
          </el-form-item>
          <el-form-item label='地址'>
            <el-input v-model='detailsStoreInfo.baddress'></el-input>
          </el-form-item>
          <el-form-item label='电话'>
            <el-input v-model='detailsStoreInfo.bphone'></el-input>
          </el-form-item>
          <el-form-item label='姓名'>
            <el-input v-model='detailsStoreInfo.uname'></el-input>
          </el-form-item>
          <el-form-item label='营业时间'>
            <el-input v-model='detailsStoreInfo.time'></el-input>
          </el-form-item>
          <el-form-item label='主图'>
            <el-upload
              :action="$store.state.baseURL + '/update/image.action'"
              type="drag"
              name='uploadFile'
              :data="{imageName: detailsStoreInfo.bshowimage}"
              :on-success="handleChangeStoreShowImg"
              :thumbnail-mode="true"
              :default-file-list="[{name: detailsStoreInfo.bshowimage, url: $store.state.baseImgURL + detailsStoreInfo.bshowimage }]">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot='footer'>
          <el-button @click="submitStoreChange">修改</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="carouse-edit">
      <el-dialog
        size='full'
        title='轮播图管理'
        v-model="dialogCarouseVisible"
        v-if="dialogCarouseVisible">
        <template
          v-for="item in storeInfo[currentCarouseImages.index].bImage">
          <el-upload
            type="drag"
            name="uploadFile"
            :action="$store.state.baseURL + '/images/upload.action'"
            :on-success='uploadCarouseSuccess'
            :default-file-list="[{name: item.image, url: $store.state.baseImgURL + item.image, iid: item.iid}]"
            :on-remove='removeCarouse'
            :data="{id: currentCarouseImages.bid, idName: 'bid', iid: item.iid}"
            :thumbnail-mode="true">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </template>
        <el-upload
          type="drag"
          name="uploadFile"
          :action="$store.state.baseURL + '/images/upload.action'"
          :data="{id: currentCarouseImages.bid, idName: 'bid', iid: '-1'}"
          :on-success='uploadCarouseSuccess'
          :thumbnail-mode="true">
          <i class="el-icon-upload"></i>
          <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-dialog>
    </div>
    <div class="store-pagination">
      <el-pagination
        layout='total, prev, pager, next, jumper'
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
      storeData: [],
      newStoreInfo: {},
      detailsStoreInfo: {},
      confirmDeletePopover: false,
      dialogAddStoreVisible: false,
      dialogCarouseVisible: false,
      dialogStoreDetilsVisible: false,
      currentPage: 1,
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
      let reqURL = '/maintainbusiness/getall.action?page=' + pageNum

      this.axios.get(reqURL).then(response => {
        let data = response.data

        this.storeData = data.rows
        this.pageNum = data.total
        this.pageSize = data.pageNumber

      })
    },
    cancelDeleteInfo() {
      this.confirmDeletePopover = true
      setTimeout(() => {
        this.confirmDeletePopover = false
      }, 0)
    },
    handleDeleteInfo(index, row, column) {
      let bid = row.mbid
      let reqURL = '/maintainbusiness/delete.action?mbid=' + bid

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

          if(pageXSize = this.pageNum) {
            if (this.pageNum % this.pageSize == 1 && this.currentPage!= 1) {
              this.initData(this.currentPage - 1)
            } else {
              this.initData(this.currentPage)
            }
          }
        }
      })
    },
    resetStoreInfo() {
      let storeInfo = {
        mbname: '',
        baddress: '',
        bphone: '',
        uname: '',
        longitude: '',
        latitude: '',
        time: ''
      }
      this.newStoreInfo = storeInfo
    },
    submitStoreInfo() {
      this.axios({
        url: '/maintainbusiness/add.action',
        method: 'post',
        data: this.newStoreInfo,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          let lastPage = Math.floor(this.pageNum / this.pageSize) + 1;

          if (this.pageNum % this.pageSize == 0) {
            this.pageNum = this.pageNum + 1
          }

          this.currentPage = lastPage
          this.dialogAddStoreVisible = false
          this.initData(lastPage)
          this.resetStoreInfo()
        }
      })
    },
    handleEdit(index, row, column) {
      this.dialogStoreDetilsVisible = true

      let data = row
      let obj = {}

      for (let key in data) {
        if(key != 'bdate') {
          obj[key] = data[key]
        }
      }

      this.detailsStoreInfo = obj
    },
    handleCarouseEdit(index, row, column) {
      this.dialogCarouseVisible = true
    },
    submitStoreChange() {
      let data = this.detailsStoreInfo

      this.axios({
        url: '/maintainbusiness/update.action',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData(this.currentPage)
          this.dialogStoreDetilsVisible = false;
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.initData(val)
    },
    handleAddStoreShowImg(response, file, fileList) {
      this.newStoreInfo.bshowimage = response.url
    },
    handleChangeStoreShowImg(response, file, fileList) {
      this.detailsStoreInfo.bshowimage = response.url
    },
  }
}
</script>

<style lang="css">
  .store-maintain {
    padding: 0 20px;
  }

  .store-maintain .right-header {
    display: flex;
    height: 56px;
    align-items: center;
  }

  .store-maintain .store-tooltip {
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
  }

  .store-maintain .store-tooltip .el-button--text {
    width: 40px;
    box-sizing: border-box;
    border-radius: 0;
    border-left: 1px solid #e0e6ed;
  }

  .store-maintain .store-pagination .el-pagination {
    text-align: center;
    margin-top: 15px;
}
</style>
