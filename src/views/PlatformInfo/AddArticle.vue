<template>
  <div class="add-article">
    <h3 class="title">添加文章</h3>
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
      author: ''
    }
  },
  mounted() {
    let editor = new E('.editor')
    editor.create()
    this.editor = editor
  },
  methods: {
    handleSubmit() {
      let reqURL = '/news/addNews.action'
      let data = {
        ntitle: this.title,
        author: this.author,
        ncontent: this.editor.txt.html()
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.$router.push({ name: 'ArticleList' })
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

.add-article .title {
  padding: 0;
  margin: 0 0 15px 0;
}

.add-article .input-container {
  display: flex;
  justify-content: space-between;
}

.add-article .input-title,
.add-article .input-author {
  margin-bottom: 20px;
  width: 49.5%;
}

.add-article .editor {
  margin-bottom: 20px;
}
</style>
