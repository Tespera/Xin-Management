<template>
  <div class="add-article">
    <h3 class="title">添加文章</h3>
    <div class="input-container">
      <el-input class="input-title"
        v-model="title"
        placeholder="请输入文章标题"></el-input>
      <el-input class="input-author"
        v-model="author"
        placeholder="请输入文章作者"></el-input>
      <el-select v-model='cid'
        placeholder="请选择文章类型">
        <el-option v-for="item in options"
          :label='item.cname'
          :value='item.catid'>
        </el-option>
      </el-select>
    </div>
    <div class="description">
      <el-input class="input-description"
        v-model="description"
        placeholder="请输入文章摘要"></el-input>
    </div>
    <div class="editor"></div>
    <el-button type='primary'
      @click='handleSubmit()'>提交
    </el-button>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  data() {
    return {
      title: '',
      author: '',
      description: '',
      cid: '',
      options: []
    }
  },
  created() {
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
    editor.customConfig.uploadImgFileName = 'uploadFile'
    editor.customConfig.uploadImgHooks = {
      before(xhr, editor, files) {
        files.name = 'uploadFile'
      }
    }
    editor.create()
    this.editor = editor
  },
  methods: {
    handleSubmit() {
      let reqURL = '/news/addNews.action'
      let data = {
        ntitle: this.title,
        author: this.author,
        ncontent: this.editor.txt.html(),
        cid: this.cid
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.$router.push({ name: 'ArticleList' })
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
  }
}
</script>

<style>
.add-article {
  padding-top: 20px;
}

.add-article .w-e-text-container {
  z-index: 0;
}

.add-article .title {
  padding: 0;
  margin: 0 0 15px 0;
}

.add-article .input-container {
  display: flex;
  justify-content: space-between;
}

.add-article .input-title,
.add-article .input-author,
.add-article .el-select {
  margin-bottom: 10px;
  width: 32.8%;
}

.add-article .description {
  margin-bottom: 20px;
}

.add-article .editor {
  margin-bottom: 20px;
}
</style>
