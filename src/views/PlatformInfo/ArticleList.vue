<template>
  <div class="article-list">
    <div class="list-container">
      <div class="list-function">
        <div class="add-article"
          @click="$router.push({name: 'AddArticle'})">添加文章</div>
      </div>
      <div class="list-header article-item">
        <div class="catalog">
          类型
        </div>
        <h3 class="title">
          文章标题
        </h3>
      </div>
      <div class='article-item'
        v-for="item in articleList">
        <div class="catalog">
          {{ item.cname }}
        </div>
        <h3 class="title"
          @click='handlePreview(item)'>
          {{ item.ntitle }}
        </h3>
        <div class="function">
          <div class="cover"
            @click='handleCover(item)'>
            封面
          </div>
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
    <div class="pagination">
      <el-pagination small
        layout='prev, pager, next'
        :total='total'
        :page-size='10'
        @current-change='currentChange'>
      </el-pagination>
    </div>
    <el-dialog top='5%'
      :title='previeContent.ntitle'
      v-model="previewDialogVisbile">
      <div>作者：{{previeContent.author}}</div>
      <img class='article-cover'
        :src="$store.state.baseImgURL + previeContent.image"
        alt="pic">
      <div v-html='previeContent.ncontent'></div>
    </el-dialog>
    <el-dialog top='5%'
      size='tiny'
      title='上传封面'
      v-model="coverDialogVisbile">
      <el-upload v-if="coverDialogVisbile"
        :action="$store.state.baseURL + '/news/upload.action'"
        type='drag'
        name="uploadFile"
        :thumbnail-mode="true"
        :default-file-list="[{url: coverURL}]"
        :data="{ nid: coverNid }">
        <i class="el-icon-upload"></i>
        <div class="el-dragger__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      articleList: [],
      previewDialogVisbile: false,
      coverDialogVisbile: false,
      previeContent: {},
      coverNid: -1,
      coverURL: '',
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(page) {
      let currentPage = page || 1
      let reqURL = '/news/selectAll.action?page=' + currentPage
      let reqCatalogURL = '/NewCatalog/selectAll.action'

      this.axios.get(reqURL).then(response => {
        let data = response.data
        this.total = data.total
        this.articleList = data.rows

        this.axios.get(reqCatalogURL).then(response => {
          let data = response.data

          if (data.status == 200) {
            this.$store.commit('initArticleCatalogState', data.data)
            for (let item of this.articleList) {
              item.cname = this.catalogfilter(item.cid)
            }
          }

          this.articleList.splice()
        })
      })
    },
    currentChange(currentPage) {
      this.initData(currentPage)
    },
    catalogfilter(cid) {
      let arcitleCatalog = this.$store.state.arcitleCatalog

      for (let item of arcitleCatalog) {
        if (item.catid == cid) {
          return item.cname
        }
      }
    },
    handleCover(item) {
      this.coverNid = item.nid
      this.coverURL = this.$store.state.baseImgURL + item.image
      this.coverDialogVisbile = true
    },
    handlePreview(item) {
      this.previeContent = item
      this.previewDialogVisbile = true
    },
    handleDelete(nid) {
      let reqURL = '/news/deleteByNid.action'
      let data = { nid }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        let data = response.data
        if (data.status == 200) {
          this.initData()
        }
      })
    },
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

.article-list .article-item .catalog {
  min-width: 2em;
  margin-right: 5px;
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

.article-list .pagination {
  display: flex;
  padding-right: 30px;
  justify-content: center
}

.article-list .el-dialog__body {
  padding-top: 0px;
}

.article-list .el-dialog__body .article-cover {
  margin-top: 5px;
  max-width: 100%;
}

.article-list .el-dialog__body>div {
  margin-top: 5px;
}
</style>
