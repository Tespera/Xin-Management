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
.store-manage .right-header {
  display: flex;
  height: 56px;
  align-items: center;
  padding-left: 20px;
}

.store-manage .detail-route {
  font-size: 13px;
  color: #475669;
  transition: color .15s linear;
}

.store-manage .detail-route:hover {
  color: #20a0ff;
}

.store-manage .store-table {
  padding: 0 20px;
}

.store-manage .store-pagination .el-pagination {
  text-align: center;
  margin-top: 15px;
  padding: 0 20px;
}
</style>
