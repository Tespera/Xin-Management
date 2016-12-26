<template lang="html">
  <div>
    <div class="right-header">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: 'details' }">{{ bname }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'CarModels', query: { bid: $route.query.bid, bname: this.bname }}">{{ gname }}</el-breadcrumb-item>
        <el-breadcrumb-item>车型</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="store-tooltip">
      <el-button type='text' icon='plus' @click="dialogAddCarVisible = true"></el-button>
    </div>
    <el-dialog title="添加车型" v-model='dialogAddCarVisible'>
      <el-form
        :model="newCarInfo"
        label-width="75px">
        <el-form-item label='车名'>
          <el-input v-model="newCarInfo.mname"></el-input>
        </el-form-item>
        <el-form-item label='等级'>
          <el-input v-model="newCarInfo.level"></el-input>
        </el-form-item>
        <el-form-item label='排量'>
          <el-input v-model="newCarInfo.output"></el-input>
        </el-form-item>
        <el-form-item label='驱动'>
          <el-input v-model="newCarInfo.drive"></el-input>
        </el-form-item>
        <el-form-item label='燃料'>
          <el-input v-model="newCarInfo.fuel"></el-input>
        </el-form-item>
        <el-form-item label='变速箱'>
          <el-input v-model="newCarInfo.transmission"></el-input>
        </el-form-item>
        <el-form-item label='国家'>
          <el-input v-model="newCarInfo.country"></el-input>
        </el-form-item>
        <el-form-item label='生产方式'>
          <el-input v-model="newCarInfo.produce"></el-input>
        </el-form-item>
        <el-form-item label='结构'>
          <el-input v-model="newCarInfo.structure"></el-input>
        </el-form-item>
        <el-form-item label='座位'>
          <el-input v-model="newCarInfo.seat"></el-input>
        </el-form-item>
        <el-form-item label='关键字'>
          <el-input v-model="newCarInfo.keyword"></el-input>
        </el-form-item>
        <el-form-item label='指导价格'>
          <el-input v-model="newCarInfo.guidegprice"></el-input>
        </el-form-item>
        <el-form-item label='参考价格'>
          <el-input v-model="newCarInfo.gprice"></el-input>
        </el-form-item>
        <el-form-item label='活动'>
          <el-input v-model="newCarInfo.mtitle"></el-input>
        </el-form-item>
        <el-form-item label='主图'>
          <el-upload
            :action="$store.state.baseURL + '/simage/upload.action'"
            name='uploadFile'
            type="drag"
            :on-success="handleAddCarShowImg"
            :thumbnail-mode="true">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label='热门'>
          <el-switch
            v-model='newCarInfo.ishot'
            on-text='是'
            off-text='否'
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button @click="resetCarlInfo">重置</el-button>
        <el-button @click="submitCarInfo">提交</el-button>
      </div>
    </el-dialog>
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
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="store-detils-edit">
      <el-dialog title="车型详情" v-model='dialogCarListDetilsVisible' v-if="dialogCarListDetilsVisible">
        <el-form label-width='75px'>
          <el-form-item label='车名'>
            <el-input v-model='datailsCarListInfo.data.mname'></el-input>
          </el-form-item>
          <el-form-item label='等级'>
            <el-input v-model='datailsCarListInfo.data.level'></el-input>
          </el-form-item>
          <el-form-item label='排量'>
            <el-input v-model='datailsCarListInfo.data.output'></el-input>
          </el-form-item>
          <el-form-item label='驱动'>
            <el-input v-model='datailsCarListInfo.data.drive'></el-input>
          </el-form-item>
          <el-form-item label='燃料'>
            <el-input v-model='datailsCarListInfo.data.fuel'></el-input>
          </el-form-item>
          <el-form-item label='变速箱'>
            <el-input v-model='datailsCarListInfo.data.transmission'></el-input>
          </el-form-item>
          <el-form-item label='国家'>
            <el-input v-model='datailsCarListInfo.data.country'></el-input>
          </el-form-item>
          <el-form-item label='生产方式'>
            <el-input v-model='datailsCarListInfo.data.produce'></el-input>
          </el-form-item>
          <el-form-item label='结构'>
            <el-input v-model='datailsCarListInfo.data.structure'></el-input>
          </el-form-item>
          <el-form-item label='座位'>
            <el-input v-model='datailsCarListInfo.data.seat'></el-input>
          </el-form-item>
          <el-form-item label='关键字'>
            <el-input v-model='datailsCarListInfo.data.keyword'></el-input>
          </el-form-item>
          <el-form-item label='指导价格'>
            <el-input v-model='datailsCarListInfo.data.guidegprice'></el-input>
          </el-form-item>
          <el-form-item label='参考价格'>
            <el-input v-model='datailsCarListInfo.data.gprice'></el-input>
          </el-form-item>
          <el-form-item label='活动'>
            <el-input v-model='datailsCarListInfo.data.mtitle'></el-input>
          </el-form-item>
          <el-form-item label='主图'>
            <el-upload
              :action="$store.state.baseURL + '/update/image.action'"
              type="drag"
              name='uploadFile'
              :data="{imageName: datailsCarListInfo.data.mshowimage}"
              :on-success="handleChangeCarShowImg"
              :thumbnail-mode="true"
              :default-file-list="[{name: datailsCarListInfo.data.mshowimage, url: $store.state.baseImgURL + datailsCarListInfo.data.mshowimage }]">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label='热门'>
            <el-switch
              v-model='datailsCarListInfo.data.ishot'
              on-text='是'
              off-text='否'
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot='footer'>
          <el-button @click="submitCarListChange">修改</el-button>
        </div>
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
      carInfo: [],
      bname: '',
      gname: '',
      currentPage: 1,
      pageSize: 0,
      pageNum: 0,
      newCarInfo: {
        mname: '',
        level: '',
        output: '',
        drive: '',
        fuel: '',
        transmission: '',
        country: '',
        produce: '',
        structure: '',
        seat: '',
        keyword: '',
        guidegprice: '',
        gprice: '',
        mtitle: '',
        mshowimage: '',
        ishot: false,
        gid: this.$route.query.gid
      },
      datailsCarListInfo: {},
      confirmDeletePopover: false,
      dialogAddCarVisible: false,
      dialogCarListDetilsVisible: false,
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

      this.bname = query.bname
      this.gname = query.gname

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
    resetCarlInfo() {
      let carlInfo = {
        mname: '',
        level: '',
        output: '',
        drive: '',
        fuel: '',
        transmission: '',
        country: '',
        produce: '',
        structure: '',
        seat: '',
        keyword: '',
        guidegprice: '',
        gprice: '',
        mtitle: '',
        mshowimage: '',
        ishot: false,
        gid: this.$route.query.gid
      }
      this.newCarInfo = carlInfo
    },
    submitCarInfo() {
      this.axios({
        url: '/model/add.action',
        method: 'post',
        data: this.newCarInfo,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        console.log(data);
        if (data.status == 200) {
          let lastPage = Math.floor(this.pageNum / this.pageSize) + 1;

          if (this.pageNum % this.pageSize == 0) {
            this.pageNum = this.pageNum + 1
          }

          this.currentPage = lastPage
          this.dialogAddCarVisible = false
          this.initData(lastPage)
          this.resetCarlInfo()
        }
      })
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
      let mid = row.data.mid
      let reqURL = '/model/delete.action?mid=' + mid

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
      console.log(row);
      this.dialogCarListDetilsVisible = true
      let bimage = row.bimage
      let data = row.data
      let obj = {}

      obj.bimage = bimage
      obj.data = {}

      for (let key in data) {
        obj.data[key] = data[key]
      }

      this.datailsCarListInfo = obj
    },
    submitCarListChange() {
      let data = this.datailsCarListInfo.data

      this.axios({
        url: '/model/update.action',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData(this.currentPage)
          this.dialogCarListDetilsVisible = false;
        }
      })
    },
    handleAddCarShowImg(response, file, fileList) {
      this.newCarInfo.mshowimage = response.url
    },
    handleChangeCarShowImg(response, file, fileList) {
      this.datailsCarListInfo.data.mshowimage = response.url
    }
  }
}
</script>

<style lang="css">
</style>
