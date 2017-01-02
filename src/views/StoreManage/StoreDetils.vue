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
    <el-dialog
      title="添加商家"
      top='4%'
      v-model='dialogAddStoreVisible'>
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
        <el-form-item label='纬度'>
          <el-input v-model="newStoreInfo.latitude"></el-input>
        </el-form-item>
        <el-form-item label='主营车系'>
          <el-input v-model="newStoreInfo.majorbusiness"></el-input>
        </el-form-item>
        <el-form-item label='商家活动'>
          <el-input v-model="newStoreInfo.title1"></el-input>
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
        <el-form-item label='平台活动'>
          <el-switch
            v-model='newStoreInfo.isactivity'
            on-text='是'
            off-text='否'
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label='热门'>
          <el-switch
            v-model='newStoreInfo.ishot'
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
          label='主营车系'>
        </el-table-column>
        <el-table-column
          prop='data.title1'
          label='商家活动'>
        </el-table-column>
        <el-table-column
          prop='data.bdate'
          label='创建时间'
          :formatter='dateFormatter'>
        </el-table-column>
        <el-table-column
          inline-template
          label='操作'
          width='260'>
          <div>
            <el-popover
              ref='deleteConfirm'
              placement="top"
              width="150"
              v-model="confirmDeletePopover">
              <p>确定删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancelDeleteInfo">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDeleteInfo($index, row, column)">确定</el-button>
              </div>
            </el-popover>
            <el-button
              size='small'
              type="danger"
              @click="confirmDeletePopover = true"
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
            <el-button
              size='small'
              @click="handleModelEdit($index, row, column)">
              车系
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
            <el-input v-model='detailsStoreInfo.data.bname'></el-input>
          </el-form-item>
          <el-form-item label='地址'>
            <el-input v-model='detailsStoreInfo.data.baddress'></el-input>
          </el-form-item>
          <el-form-item label='电话'>
            <el-input v-model='detailsStoreInfo.data.bphone'></el-input>
          </el-form-item>
          <el-form-item label='姓名'>
            <el-input v-model='detailsStoreInfo.data.uname'></el-input>
          </el-form-item>
          <el-form-item label='经度'>
            <el-input v-model='detailsStoreInfo.data.longitude'></el-input>
          </el-form-item>
          <el-form-item label='纬度'>
            <el-input v-model='detailsStoreInfo.data.latitude'></el-input>
          </el-form-item>
          <el-form-item label='主营车系'>
            <el-input v-model='detailsStoreInfo.data.majorbusiness'></el-input>
          </el-form-item>
          <el-form-item label='商家活动'>
            <el-input v-model='detailsStoreInfo.data.title1'></el-input>
          </el-form-item>
          <el-form-item label='主图'>
            <el-upload
              :action="$store.state.baseURL + '/update/image.action'"
              type="drag"
              name='uploadFile'
              :data="{imageName: detailsStoreInfo.data.bshowimage}"
              :on-success="handleChangeStoreShowImg"
              :thumbnail-mode="true"
              :default-file-list="[{name: detailsStoreInfo.data.bshowimage, url: $store.state.baseImgURL + detailsStoreInfo.data.bshowimage }]">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label='平台活动'>
            <el-switch
              v-model='detailsStoreInfo.data.isactivity'
              on-text='是'
              off-text='否'
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label='热门'>
            <el-switch
              v-model='detailsStoreInfo.data.ishot'
              on-text='是'
              off-text='否'
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
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
            :default-file-list="[{name: item.image, url: $store.state.baseImgURL + item.image}]"
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
      storeInfo: [],
      currentPage: 1,
      pageSize: 0,
      pageNum: 0,
      newStoreInfo: {
        bname: '',
        bimage: '',
        baddress: '',
        bphone: '',
        uname: '',
        ishot: false,
        longitude: '',
        latitude: '',
        majorbusiness: '',
        title1: '',
        bshowimage: '',
        isactivity: false
      },
      dialogAddStoreVisible: false,
      dialogStoreDetilsVisible: false,
      dialogCarouseVisible: false,
      detailsStoreInfo: {},
      confirmDeletePopover: false,
      uploadHeader: {
        'Content-Type': 'multipart/form-data; boundary=fuckReaquestHeader'
      },
      currentCarouseImages: {}
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
        ishot: false,
        longitude: '',
        latitude: '',
        majorbusiness: '',
        title1: '',
        bshowimage: '',
        isactivity: false
      }
      this.newStoreInfo = storeInfo
    },
    submitStoreInfo() {
      this.axios({
        url: '/business/add.action',
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
    dateFormatter(row) {
      let value = new Date(row.data.bdate)
      let blank = '/'
      let str = value.getFullYear() + blank + (value.getMonth() + 1) + blank + (value.getDate())
      return str
    },
    cancelDeleteInfo() {
      this.confirmDeletePopover = true
      setTimeout(() => {
        this.confirmDeletePopover = false
      }, 0)
    },
    handleDeleteInfo($index, row, column) {
      let bid = row.data.bid
      let reqURL = '/business/delete.action?bid=' + bid

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
    handleEdit(index, row, column) {
      this.dialogStoreDetilsVisible = true;
      let bimage = row.bimage
      let data = row.data
      let obj = {}

      obj.bimage = bimage
      obj.data = {}

      for (let key in data) {
        if (key != 'bdate') {
          obj.data[key] = data[key]
        }
      }

      this.detailsStoreInfo = obj
    },
    handleCarouseEdit(index, row, column) {
      this.dialogCarouseVisible = true
      this.currentCarouseImages.bid = row.data.bid
      this.currentCarouseImages.index = index
    },
    handleModelEdit(index, row, column) {
      this.$router.push( {name: 'CarModels', query: {bid: row.data.bid, bname: row.data.bname}} )
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.initData(val)
    },
    submitStoreChange() {
      let data = this.detailsStoreInfo.data

      this.axios({
        url: '/business/update.action',
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
    handleAddStoreShowImg(response, file, fileList) {
      this.newStoreInfo.bshowimage = response.url
    },
    handleChangeStoreShowImg(response, file, fileList) {
      this.detailsStoreInfo.data.bshowimage = response.url
    },
    uploadCarouseSuccess(response, file, fileList) {
      this.initData(this.currentPage)
    }
  }
}
</script>

<style lang="css">
</style>
