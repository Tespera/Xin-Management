<template lang="html">
  <div>
    <el-dialog
      title=""
      size='full'
      v-model='loginVisible'
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :show-close='false'>
      <el-form
        :model='loginData'>
        <el-form-item label="密码" prop='account'>
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='pass'>
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginVisible: true,
      loginData: {
        account: '',
        pass: '',
      }
    }
  }
}
</script>

<style lang="css">
</style>
