<template>
  <div class="article-list">
    <div class="list-container">
      <div class="list-function">
        <div class="add-article"
          @click="$router.push({name: 'AddArticle'})">添加文章</div>
      </div>
      <div class='article-item'
        v-for="item in articleList">
        <h3 class="title"
          @click='handlePreview(item)'>
          {{ item.ntitle }}
        </h3>
        <div class="function">
          <div class="edit"
            @click="$router.push({name: 'EditArticle', query: { nid:item.nid }})">
            编辑
          </div>
          <div class="delete"
            @click='handleDelete(item.nid)'>
            删除
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title='previeContent.ntitle'
      v-model="previewDialogVisbile">
      <div v-html='previeContent.ncontent'>
  
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
      previewDialogVisbile: false,
      previeContent: {}
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let reqURL = '/news/selectAll.action'

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.articleList = data.data
      })
    },
    handlePreview(item) {
      this.previeContent = item
      this.previewDialogVisbile = true
    },
    handleDelete(nid) {
      let reqURL = '/news/deleteByNid.action'
      let data = { nid }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData()
        }
      })
    }
  }
}
</script>

<style>
.article-list .list-container {
  /*padding-right: 20px;*/
  max-width: 1000px;
}

/*.article-list .list-container .list-function {
  padding-top: 20px;
}*/

.article-list .list-function>div {
  cursor: pointer
}

.article-list .list-container .article-item {
  display: flex;
  padding: 20px 0 0;
}

.article-list .article-item .title {
  flex-grow: 1;
  padding: 0;
  margin: 0;
  font-weight: normal;
  cursor: pointer;
  font-size: 1em;
}

.article-list .article-item .title:hover {
  text-decoration: underline;
}

.article-list .article-item .function {
  display: flex
}

.article-list .function div {
  margin: 0 5px;
  cursor: pointer;
}
</style>
