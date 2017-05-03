<template lang="html">
  <div class="maintain-setting platform-setting">
    <div class="home-carousel">
      <div class="home-carousel-header">
        <h3>首页轮播图管理</h3>
        <el-button
          type="text"
          icon="plus"
          @click="addMaintainHomeCarousel"></el-button>
      </div>
      <div
        class="carousel-container"
        v-for="item in homeCarouse">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeCarouse: []
    }
  },
  methods: {
    initData() {
      let reqURL = ''

      this.axios.get(reqURL).then(response => {
        let data = response.data

      })
    },
    addMaintainHomeCarousel() {
      let reqURL  = '/home/add.action'
      let data = {
        url: 'http://',
        type: 0,
        orders: 1
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        this.initData()
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
          this.initData()
        }
      })
    },
    removeCarouselImg(file, fileList) {
      this.activityRemove(file)
    },
    uploadCarouselSuccess() {
      this.initData()
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
  }
}
</script>

<style lang="css">
.maintain-setting {
  padding: 0px 20px;
}
</style>
