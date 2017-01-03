<template lang="html">
  <div class="store-manage">
    <div
      class="right-header"
      v-if="$route.name == 'StoreManage'">
      <span
        class="detail-route"
        @click="$router.push({ name: 'StoreDetils'})">商家列表</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="css">
.store-manage {
  padding: 0 20px;
}

.store-manage .right-header {
  display: flex;
  height: 56px;
  align-items: center;
}

.store-manage .detail-route {
  font-size: 13px;
  color: #475669;
  transition: color .15s linear;
}

.store-manage .detail-route:hover {
  color: #20a0ff;
}

.store-manage .store-tooltip {
  background-color: #EFF2F7;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #e0e6ed;
  border-bottom: 0;
  vertical-align: middle;
  color: #8492a6;
  /*color: #1f2d3d;*/
  /*font-size: 14px;*/
  display: flex;
  justify-content: flex-end;
  align-content: stretch;
}

.store-manage .store-tooltip .el-button--text {
  width: 40px;
  box-sizing: border-box;
  border-radius: 0;
  border-left: 1px solid #e0e6ed;
}

.store-manage .carouse-edit .el-dialog__body{
  display: flex;
  flex-wrap: wrap;
}

.store-manage .carouse-edit .el-upload {
  margin: 0 5px 6px;
  /*display: inline-block;*/
}

.store-manage .carouse-edit .el-upload:last-of-type {
  margin-bottom: 0;
}

.store-manage .store-table {

}

.store-manage .store-pagination .el-pagination {
  text-align: center;
  margin-top: 15px;
}
</style>
