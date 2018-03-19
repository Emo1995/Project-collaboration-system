<template>
  <div class="mypro_container">
    <el-form ref="form">
      <el-form-item label="项目搜索" class="search_input" label-width="100px">
        <el-input v-model="filterText"></el-input>
      </el-form-item>
      <el-form-item class="projectTree">
        <el-tree
          class="filter-tree"
          :data="myProjectList"
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
    //       vm.myProjectList = result.myProjectList
    //     })
    //   })
    // },
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
    },
    data () {
      return {
        filterText: '',
        myProjectList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>

<style lang="scss">
.mypro_container {
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
        font-size: 16px;
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
