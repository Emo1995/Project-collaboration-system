<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
    // beforeRouteEnter(to, from, next) {
    //     fetch('/api/siteA/world')
    //         .then(response => response.json())
    //         .then((result) => {
    //             next((vm) => {
    //             vm.name = result.name;
    //         });
    //     })
    // },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    next () {
      if (this.active++ > 3) this.active = 4
    }
  }
}
</script>
<style lang="scss">
</style>
