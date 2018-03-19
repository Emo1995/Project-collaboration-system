<template>
  <div class="sideBar">
    <div class="Theader">
        <h1 class="title">{{title}}</h1>
    </div>
  	<!-- <ul>
  		<li><router-link to="/CO/workTab">工作台</router-link></li>
      	<li><router-link to="/CO/allProject">所有项目</router-link></li>
      	<li><router-link to="/CO/myProject">我参与的</router-link></li>
      	<li><router-link to="/CO/knowledge">知识库</router-link></li>
      </ul> -->
    <el-row>
      <el-col :span="12">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#353f4f"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title"><router-link to="/workTab">工作台</router-link></span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title"><router-link to="/allProject">所有项目</router-link></span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-star-on"></i>
            <span slot="title"><router-link to="/myProject">我参与的</router-link></span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-edit-outline"></i>
            <span slot="title"><router-link to="/knowledge">知识库</router-link></span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'CO协作平台'
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
  .sideBar {
    .Theader {
      height: 65px;
      background-color: #242c38;
      .title {
          color: #fff;
          font-size: 26px;
          line-height: 65px;
          text-align: center;
      }
    }
    background-color: #353f4f !important;
    width: 220px;
    float: left;
    // min-height: 1155px;
    height: calc(100vh - 80px);
    .el-col {
      width: 100%;
      .el-menu {
        border-right: none;
        position: none !important;
        li {
          height: 60px;
          text-align: left;
          width: 100%;
          cursor: auto;
          a {
            color: #fff;
            font-size: 16px;
            &:hover {
                font-weight: 900;
            }
          }
        }
      }
    }
  }
</style>
