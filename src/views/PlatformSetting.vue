<template lang="html">
  <div class="platform-setting"
    v-loading='loadingStatus'>
    <el-form label-width='75px' class="title-stage-form">
      <h3>平台活动管理</h3>
      <el-form-item label='平台活动'>
        <el-input v-model='titleStage.title2'>
        </el-input><el-button type='primary' @click="submitTitleInfo('title2', titleStage.title2)">修改</el-button>
      </el-form-item>
      <el-form-item label='12期利率'>
        <el-input v-model='titleStage.stages12'>
        </el-input><el-button @click="submitStageInfo('stages12', titleStage.stages12)" type='primary'>修改</el-button>
      </el-form-item>
      <el-form-item label='24期利率'>
        <el-input v-model='titleStage.stages24'>
        </el-input><el-button @click="submitStageInfo('stages24', titleStage.stages24)" type='primary'>修改</el-button>
      </el-form-item>
      <el-form-item label='36期利率'>
        <el-input v-model='titleStage.stages36'>
        </el-input><el-button @click="submitStageInfo('stages36', titleStage.stages36)" type='primary'>修改</el-button>
      </el-form-item>
    </el-form>
    <div class="activity">
      <h3>首页活动管理</h3>
      <el-form
        label-width='70px'>
        <el-form-item
          v-for="(item, index) in headLine"
          :label="'活动 ' + (index + 1) ">
          <el-input v-model='item.title'></el-input>
          <el-input v-model='item.url'></el-input>
          <el-button @click="activityModification(item)" type='primary'>修改</el-button>
          <el-button @click="activityRemove(item)" type='danger'>删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="activityAdd" type='primary'>添加活动</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="home-carousel">
      <div class="home-carousel-header">
        <h3>首页轮播图管理</h3>
        <el-button
          type="text"
          icon="plus"
          @click="addNewHomeCarousel"></el-button>
      </div>
      <div
        class="carousel-container"
        v-for="item in homeImage">
        <el-upload
          type='drag'
          name='uploadFile'
          :action="$store.state.baseURL + '/home/upload.action'"
          :on-success='uploadCarouselSuccess'
          :data="{ hid: item.hid }"
          :thumbnail-mode="true"
          :on-remove='removeCarouselImg'
          :default-file-list="[{name: item.image, url: $store.state.baseImgURL + item.image, hid: item.hid}]">
        </el-upload>
        <div class="carousel-function">
          <el-input v-model='item.url'></el-input>
          <el-button
            type='primary'
            @click="homeCarouselUrlChange(item)">修改</el-button>
        </div>
      </div>
    </div>
    <div class="home-carousel search-carousel">
      <div class="home-carousel-header">
        <h3>搜索页轮播图管理</h3>
        <el-button
          type="text"
          icon="plus"
          @click="addNewSearchCarousel"></el-button>
      </div>
      <div
        class="carousel-container"
        v-for="item in selectImage">
        <el-upload
          type='drag'
          name='uploadFile'
          :action="$store.state.baseURL + '/home/upload.action'"
          :data="{ hid: item.hid }"
          :thumbnail-mode="true"
          :on-remove='removeCarouselImg'
          :default-file-list="[{name: item.image, url: $store.state.baseImgURL + item.image, hid: item.hid}]">
        </el-upload>
        <div class="carousel-function">
          <el-input v-model='item.url'></el-input>
          <el-button
            type='primary'
            @click="homeCarouselUrlChange(item)">修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleStage: {},
      homeImage: [],
      selectImage: [],
      headLine: [],
      newActivity: {},
      dataReady: true,
      anotherDataReady: true
    }
  },
  computed: {
    loadingStatus() {
      return this.dataReady && this.anotherDataReady
    }
  },
  created () {
    this.initData()
    this.anotherInitData()
  },
  methods: {
    initData() {
      let reqURL = '/system/getall.action'

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.dataReady = false
        this.titleStage = data.data[0]
        console.log(this.titleStage);

      })
    },
    anotherInitData() {
      let reqURL = '/home/getall.action'

      this.axios.get(reqURL).then(response => {
        let data = response.data.data

        this.anotherDataReady = false
        this.homeImage = data.homeImage
        this.selectImage = data.selectImage
        this.headLine = data.headLine
      })
    },
    submitTitleInfo(key, val) {
      let reqURL = '/system/update.action'
      let id = this.titleStage.id
      let data = {id: id, [key]: val }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData()
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      })
    },
    submitStageInfo(key, val) {
      let reqURL = '/system/update.action'
      let id = this.titleStage.id
      let data = {id: id, [key]: val }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData()
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      })
    },
    activityModification(item) {
      let reqURL = '/home/update.action'

      this.axios.post(reqURL, item, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.anotherInitData()
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      })
    },
    activityRemove(item) {
      let reqURL = '/home/delete.action'
      let data = { hid: item.hid }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.anotherInitData()
        }
      })
    },
    activityAdd() {
      let reqURL  = '/home/add.action'
      let data = {
        title: '',
        url: '',
        type: 1,
        orders: 0
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        this.anotherInitData()
      })
    },
    homeCarouselUrlChange(item) {
      let reqURL = '/home/update.action'
      let data = {
        hid: item.hid,
        url: item.url
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.anotherInitData()
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
      })
    },
    addNewHomeCarousel() {
      let reqURL  = '/home/add.action'
      let data = {
        url: 'http://',
        type: 0,
        orders: 0
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        this.anotherInitData()
      })
    },
    addNewSearchCarousel() {
      let reqURL  = '/home/add.action'
      let data = {
        url: 'http://',
        type: 2,
        orders: 0
      }
      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        this.anotherInitData()
      })
    },
    removeCarouselImg(file, fileList) {
      this.activityRemove(file)
    },
    uploadCarouselSuccess() {
      this.anotherInitData()
    }
  }
}
</script>

<style lang="css">
.platform-setting {
  padding: 0px 0 0 20px;
  min-height: 100vh;
}

.platform-setting .title-stage-form {
  width: 500px;
}

.platform-setting .title-stage-form .el-form-item__content {
  display: flex;
}

.platform-setting .title-stage-form .el-input {
  margin-right: 12px;
  flex-grow: 1;
}

.platform-setting .activity {
  width: 570px;
  margin-top: 20px;
  border-top: 1px dashed #ccc;
}

.platform-setting .activity .el-form-item__content{
  display: flex;
}

.platform-setting .activity .el-input {
  margin-right: 12px;
  flex-grow: 1;
}

.platform-setting .home-carousel {
  border-top: 1px dashed #ccc;
  display: inline-block;
}

.platform-setting .home-carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
}

.platform-setting .home-carousel-header .el-icon-plus {

}

.platform-setting .carousel-container {
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
}

.platform-setting .carousel-container:last-of-type {
  margin-right: 0px;
}

.platform-setting .carousel-container .carousel-function{
  display: flex;
}

.platform-setting .carousel-function .el-input {
  flex-grow: 1;
  margin-right: 10px;
}

.platform-setting .search-carousel {
  margin-top: 15px;
}
</style>
