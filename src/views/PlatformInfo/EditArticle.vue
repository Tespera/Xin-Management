<template>
  <div class="edit-article add-article">
    <h3 class="title">编辑文章</h3>
    <div class="input-container">
      <el-input class="input-title"
        v-model="title"
        placeholder="请输入文章标题"></el-input>
      <div class="editor"></div>
      <el-input class="input-author"
        v-model="author"
        placeholder="请输入文章作者"></el-input>
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
      title: '',
      author: ''
    }
  },
  created() {
    this.initData()
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

        this.title = data.ntitle
        this.author = data.author
        this.editor.txt.html(data.ncontent)
      })
    },
    handleModification() {
      
    }
  }
}
</script>

<style>

</style>
