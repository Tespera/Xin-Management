<template lang="html">
  <div class="login-page">
    <el-dialog
      title=""
      size='full'
      v-model='loginVisible'
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :show-close='false'>
      <div class="login-area">
        <h3>管理员登录</h3>
        <el-form
          ref="loginForm"
          :model='loginData'>
          <el-form-item label="账号" prop='account'>
            <el-input v-model="loginData.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='pass'>
            <el-input type="password" v-model="loginData.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="button-area">
            <el-button
              type='text'
              @click="handleSubmit"
              @keyup.enter="handleSubmit"
              >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
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
  },
  methods: {
    handleSubmit() {
      let redirect = this.$route.query.redirect
      let reqURL = '/car/login.action'
      let data = {
        buser: this.loginData.account,
        bpassword: this.loginData.pass,
        type: 0
      }

      this.axios.post(reqURL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response => {
        let data = response.data
        let status = data.status

        if(status == 200) {
          this.$refs.loginForm.resetFields()
          this.$store.commit('changeLoggedState', true)

          if(redirect !=='/login' && redirect !=='' && !!redirect) {
            this.$router.push(redirect)
          } else {
            this.$router.push({path:'/'})
          }
        }
      })
    },
  }
}
</script>

<style lang="css">
.login-page .el-dialog {
  background: #67B26F;
  background: linear-gradient(to top, #67B26F , #4ca2cd);
}

.login-page .el-dialog__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login-page .login-area {
  margin-top: 140px;
  background-color: #fff;
  box-shadow: 0 0 10px  rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  padding: 5px 15px;
}

.login-page .el-form {
  width: 300px;
}

.login-page .button-area {
  /*text-align: right;*/
}
</style>
