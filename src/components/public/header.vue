<template>
  <div class="header">
    <div class="headWrap">
      <el-dropdown>
        <span class="el-dropdown-link">
        欢迎您，{{ userId }}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><a>首&nbsp;&nbsp;页</a></el-dropdown-item>
          <el-dropdown-item><a @click="signOut">退&nbsp;&nbsp;出</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userId: ''
    }
  },
  created () {
    this.$api.GetUser()
      .then(({data}) => {
        if (data.code === 401) { // 401 未授权
          this.$router.push('/login')
          this.$store.dispatch('UserLogout')
        } else {
          this.userId = sessionStorage.getItem('userId')
          // console.log(sessionStorage)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    signOut () {
      this.$store.dispatch('UserLogout')
      if (!this.$store.state.token) {
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '登出成功'
        })
      } else {
        this.$message({
          type: 'info',
          message: '登出失败'
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .header {
    height: 70px;
    width: 100%;
    background-color: #fff !important;
    text-align: center;
    overflow: hidden;
    .el-dropdown {
      float: right;
      margin-top: 22px;
      margin-right: 60px;
      color: #444;
      vertical-align: middle;
    }
  }
  #app {
    ~ul {
      width: 120px;
      text-align: center;
      li {
        width:100px;
        height: 40px;
        a {
          display: inline-block;
          text-align: center;
        }
      }
      > :first-child {
        border-bottom: solid thin #d7d1e0;
      }
      .el-dropdown-menu__item {
        &:hover {
          background-color: #fff !important;
          color: #66b1ff;
        }
        a {
          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>

