<template>
  <div class="pro_container">
    <el-form ref="form">
      <el-form-item label="项目搜索" class="search_input" label-width="100px">
        <el-input v-model="filterText"></el-input>
      </el-form-item>
      <el-form-item class="projectTree">
        <el-tree
          class="filter-tree"
          :data="allProjectList"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // beforeRouteEnter (to, from, next) {
  //   fetch('/api/CO/world')
  //   .then(response => response.json())
  //   .then((result) => {
  //     next((vm) => {
  //       vm.projectList = result.projectList
  //     })
  //   })
  // },
  created () {
    this.$api.GetProjects()
      .then(({data}) => {
        this.allProjectList = data
        // if (data.code === 401) { // 401 未授权
        //   this.$router.push('/login')
        //   this.$store.dispatch('UserLogout')
        // } else {
        //   this.userId = sessionStorage.getItem('userId')
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      filterText: '',
      allProjectList: [],
      // allProjectList: [{
      //   'id': '1',
      //   'label': '001 企业发展事业群',
      //   'children': [{
      //     'id': '4',
      //     'label': '011 风险管理部',
      //     'children': [{
      //       'id': '9',
      //       'label': '111 风险事件管理'
      //     }, {
      //       'id': '10',
      //       'label': '112 系统运营管理'
      //     }]
      //   }, {
      //     'id': '4',
      //     'label': '012 社交广告部',
      //     'children': [{
      //       'id': '9',
      //       'label': '121 市场公关中心'
      //     }, {
      //       'id': '10',
      //       'label': '122 信息流广告联合项目'
      //     }]
      //   }]
      // }, {
      //   'id': '2',
      //   'label': '002 互动娱乐事业部',
      //   'children': [{
      //     'id': '4',
      //     'label': '021 影视与版权业务部',
      //     'children': [{
      //       'id': '9',
      //       'label': '211 二次元项目'
      //     }, {
      //       'id': '10',
      //       'label': '212 漫画项目'
      //     }]
      //   }, {
      //     'id': '4',
      //     'label': '022 游戏平台产品部门',
      //     'children': [{
      //       'id': '9',
      //       'label': '221 飞机大战开发'
      //     }, {
      //       'id': '10',
      //       'label': '222 狂野飙车开发'
      //     }]
      //   }, {
      //     'id': '4',
      //     'label': '023 音乐平台产品部',
      //     'children': [{
      //       'id': '9',
      //       'label': '231 掌上音乐项目'
      //     }, {
      //       'id': '10',
      //       'label': '232 统一推送项目'
      //     }]
      //   }]
      // }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss">
.pro_container {
  padding-bottom: 0 !important;
  .search_input {
    width: 300px;
    height: 15px;
    margin-top: 15px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .projectTree {
    // height: calc(100vh - 145px);
    margin-top: 35px;
    overflow: auto;
    background-color: #fff;
    .el-tree {
      .el-tree-node__content, .el-tree-node>.el-tree-node :not(.el-tree-node__children){
          border-bottom: 1px solid #f2f2f2;
      }
      .el-tree-node__content {
        padding: 16px 0;
      }
      .el-tree-node__label {
        font-size: 14px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
      }
    }
    .el-tree-node__expand-icon {
      margin-left: 20px;
    }
  }
  ~.sideBar {
    display: block;
  }
  ~.header {
    display: block;
  }
}
</style>
