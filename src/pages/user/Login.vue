<template lang="html">
  <div class="login_container">
    <div class="form">
      <el-form
        :model="ruleLogin"
        :rules="rules"
        ref="ruleLogin">
        <h1 class="text-center">{{ module_name }}</h1>

        <el-form-item prop="userId">
          <el-input
            type="text"
            v-model.number="ruleLogin.userId"
            name="userId"
            auto-complete="off"
            icon="fa-user"
            placeholder="请输入ID">
            </el-input>
        </el-form-item>

        <el-form-item prop="userPwd">
          <el-input
            type="password"
            v-model="ruleLogin.userPwd"
            name="userPwd"
            auto-complete="off"
            icon="fa-key"
            placeholder="请输入密码">
            </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="but-faild" type="primary" @click="submitForm('ruleLogin')">{{ module_name }}</el-button>
        </el-form-item>

        <el-alert
          :title="alert_title"
          :type="alert_type"
          :description="alert_description"
          show-icon
          v-if="is_show">
        </el-alert>

        <el-form-item class="text-right">
          <router-link to="reg">Register&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></router-link>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      module_name: 'Login',
      is_show: false,
      alert_title: '',
      alert_description: '',
      alert_type: '',
      ruleLogin: {
        userId: '',
        userPwd: ''
      },
      rules: {
        userId: [
          { required: true, message: '请输入ID' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const opt = this.ruleLogin
          this.$api.UserLogin(opt)
            .then(({data}) => {
              const code = data.code
              if (code === 50) {
                this.alert_type = 'error'
                this.$refs[formName].resetFields()
                setTimeout(() => {
                  this.$router.push({
                    path: 'reg'
                  })
                }, 500)
              } else if (code === 200) {
                this.alert_type = 'success'
                this.$store.dispatch('UserLogin', data.token)
                this.$store.dispatch('UserId', data.userId)
                const redirect = decodeURIComponent(this.$route.query.redirect || '/workTab')

                setTimeout(() => {
                  this.$router.push({
                    path: redirect
                  })
                }, 100)

                this.ruleLogin.userPwd = ''
              } else {
                this.alert_type = 'error'
                this.ruleLogin.userPwd = ''
              }
              const msg = data.msg
              const tip = data.tip
              this.alert_title = msg
              this.alert_description = tip
              this.is_show = true
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.alert_type = 'error'
          this.alert_title = 'Error Submit'
          this.alert_description = 'Fill in again'
          this.is_show = true
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .login_container {
    margin-top: 100px;
    margin-left: -220px;
    .form {
      > form {
        width: 20rem;
        margin: 0 auto;
        .but-faild {
          width: 100%;
        }
      }
    }
    ~.sideBar {
      display: none;
    }
    ~.header {
      display: none;
    }
  }
  .content {
  }
</style>
