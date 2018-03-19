<template lang="html">

<div class="reg_container">

  <div class="form">
    <el-form :model="ruleRegister" :rules="rules" ref="ruleRegister">
      <h1 class="text-center">{{ module_name }}</h1>

      <el-form-item prop="userId">
        <el-input type="text" v-model.number="ruleRegister.userId" name="userId" auto-complete="off" icon="fa-user" placeholder="Enter your ID">
          </el-input>
      </el-form-item>

      <el-form-item prop="userPwd">
        <el-input type="password" v-model="ruleRegister.userPwd" name="userPwd" auto-complete="off" icon="fa-key" placeholder="Enter your password">
          </el-input>
      </el-form-item>

      <el-form-item prop="check_pwd">
        <el-input type="password" v-model="ruleRegister.check_pwd" name="check_pwd" auto-complete="off" icon="fa-key" placeholder="Enter your password again">
          </el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="but-faild" type="primary" @click="submitForm('ruleRegister')">{{ module_name }}</el-button>
      </el-form-item>

      <el-alert :title="alert_title" :type="alert_type" :description="alert_description" show-icon v-if="is_show">
        </el-alert>

      <el-form-item class="text-right">
        <router-link to="login">Login&nbsp&nbsp<i class="el-icon-d-arrow-right"></i></router-link>
      </el-form-item>
    </el-form>
  </div>
</div>

</template>

<script>

export default {
  name: 'Register',
  data () {
    const validateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Plase enter your ID'))
      } else {
        let reg = /^([0-9]){9}$/
        if (!reg.test(this.ruleRegister.userId)) {
          callback(new Error('9 digit; ID is numbers'))
        } else {
          callback()
        }
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Plase enter your password'))
      } else {
        let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/
        if (!reg.test(this.ruleRegister.userPwd)) {
          callback(new Error('8~20 digit; numbers and letters and special characters'))
        }
        if (this.ruleRegister.check_pwd !== '') {
          this.$refs.ruleRegister.validateField('check_pwd')
          callback()
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Plase enter your password again'))
      } else if (value !== this.ruleRegister.userPwd) {
        callback(new Error('The password for the two time is inconsistent'))
      } else {
        callback()
      }
    }
    return {
      module_name: 'Register',
      is_show: false,
      alert_title: '',
      alert_description: '',
      alert_type: '',
      ruleRegister: {
        userId: '',
        userPwd: '',
        check_pwd: ''
      },
      rules: {
        userId: [
          { validator: validateId, trigger: ' blur' }
        ],
        userPwd: [
          { validator: validatePass, trigger: ' blur' }
        ],
        check_pwd: [
          { validator: validatePass2, trigger: ' blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const opt = this.ruleRegister
          this.$api.UserAdd(opt)
            .then(({data}) => {
              const code = data.code
              if (code === 50) {
                this.alert_type = 'error'
                this.$refs[formName].resetFields()
                setTimeout(() => {
                  this.$router.push({
                    path: 'login'
                  })
                }, 500)
              } else if (code === 200) {
                this.alert_type = 'success'
                this.$refs[formName].resetFields()
                setTimeout(() => {
                  this.$router.push({
                    path: 'login'
                  })
                }, 500)
              } else {
                this.alert_type = 'error'
              }
              const msg = data.msg
              const tip = data.tip
              this.alert_title = msg
              this.alert_description = tip
              this.is_show = true
            }).catch((err) => {
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
  .reg_container {
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
  }
  .content {
  }
  .sideBar {
    display: none;
  }
  .header {
    display: none;
  }
</style>
