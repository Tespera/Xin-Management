<template>
  <div class="edit-article add-article">
    <h3 class="title">编辑文章</h3>
    <div class="input-container">
      <el-input class="input-title"
        v-model="articleData.ntitle"
        placeholder="请输入文章标题"></el-input>
      <div class="editor"></div>
      <el-input class="input-author"
        v-model="articleData.author"
        placeholder="请输入文章作者"></el-input>
      <el-select v-model='articleData.cid'
        placeholder="请选择文章类型">
        <el-option v-for="item in options"
          :label='item.cname'
          :value='item.catid'>
        </el-option>
      </el-select>
    </div>
    <div class="description">
      <el-input class="input-description"
        v-model="articleData.description"
        placeholder="请输入文章摘要"></el-input>
    </div>
    <div class="editor"></div>
    <el-button type='primary'
      @click='handleModification()'>修改
    </el-button>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  data() {
    return {
      articleData: {},
      options: []
    }
  },
  created() {
    this.initData()
    let arcitleCatalog = this.$store.state.arcitleCatalog
    if (!arcitleCatalog[0]) {
      this.getArcitleCatalog()
    } else {
      this.options = arcitleCatalog
    }
  },
  mounted() {
    let editor = new E('.editor')
    editor.customConfig.uploadImgServer = this.$store.state.baseURL + '/news/cupload.action'
    editor.create()
    this.editor = editor
  },
  methods: {
    initData() {
      let reqURL = '/news/get.action?nid=' + this.$route.query.nid

      this.axios.get(reqURL).then(response => {
        let data = response.data.data

        this.articleData = data
        this.editor.txt.html(data.ncontent)
      })
    },
    handleModification() {
      let reqURL = '/news/updateNews.action'
      let articleData = this.articleData

      let data = {
        nid: articleData.nid,
        ntitle: articleData.ntitle,
        ncontent: this.editor.txt.html(),
        author: articleData.author,
        cid: articleData.cid,
        description: articleData.description
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
    getArcitleCatalog() {
      let reqURL = '/NewCatalog/selectAll.action'

      this.axios.get(reqURL).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.options = data.data
          this.$store.commit('initArticleCatalogState', data.data)
        }
      })
    }
  },
}
</script>

<style>

</style>
