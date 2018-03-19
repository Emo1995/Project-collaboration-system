<template>
    <div id="app">
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            <v-header></v-header>
            <side-nav></side-nav>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'CO协作平台'
    }
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  width: 100%;
}
#app {
    // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  .content {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: #F8F9FA;
    overflow: hidden;
    >:first-child {
      position: absolute;
      width: 100%;
      top: 70px;
      left: 220px;
      height: calc(100vh - 150px);
    }
    .sideBar {
      border: solid;
      position: absolute;
      top: 0;
    }
    .header {
      width: calc(100% - 220px);
      margin-left: 220px;
    }
    .input-faild {
      margin: 2rem 0;
    }
    .text-left {
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
  }
  ~.el-autocomplete-suggestion {
    .el-scrollbar {
      .el-scrollbar__view {
        li {
          display: block;
        }
      }
    }
  }
  ~.el-select-dropdown {
    min-width: 445px !important;
    .el-scrollbar {
      .el-scrollbar__view {
        li {
          display: block;
        }
      }
    }
  }
}
img {
  margin: 0;
}
* {
    margin: 0;
    padding: 0;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
}

a {
    text-decoration: none;
  i {
    font-size: 0.5rem;
    margin: 0;
  }
}
span, i {
  // margin: 0 !important;
}
</style>


<style lang="scss">
@import './assets/scss/index';
</style>

<!-- <template>
<div id="app">
  <transition name="slide-fade">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>
 -->
