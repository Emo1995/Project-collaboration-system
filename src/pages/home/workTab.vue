<template>
  <div class="work_container">
      <!-- <p>Hi, {{name}}</p>
      <button @click='show'>showMe</button> -->
      <!-- <component content="Hello"></component> -->
    <div class="menu-content">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">全部需求</el-menu-item>
        <el-menu-item index="2">我的待办</el-menu-item>
        <el-menu-item index="3">我的已办</el-menu-item>
      </el-menu>
      <el-button type="primary" size="small" class="create"><a href="/create">创建需求单</a><i class="el-icon-edit el-icon--right"></i></el-button>
      <!-- <div class="line"></div> -->
    </div>

    <template v-if="this.tabIndex == '2'">
      <div class="allDemand">
        <el-table
          :data="tableData2"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column
            prop="did"
            label="ID"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="220">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="project"
            label="项目"
            width="150">
          </el-table-column>
          <el-table-column
            prop="priority"
            label="优先级"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="owner"
            label="参与者"
            width="400">
          </el-table-column>
        </el-table>
      </div>
    </template>

    <template v-else-if="this.tabIndex == '3'">
        <div class="allDemand">
          <el-table
            :data="tableData3"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
              prop="did"
              label="ID"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              width="220">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="120">
            </el-table-column>
            <el-table-column
              prop="project"
              label="项目"
              width="150">
            </el-table-column>
            <el-table-column
              prop="priority"
              label="优先级"
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="150">
            </el-table-column>
            <el-table-column
              prop="owner"
              label="参与者"
              width="400">
            </el-table-column>
          </el-table>
        </div>
    </template>

    <template v-else>
      <div class="allDemand">
        <el-table
          :data="allDemandList"
          style="width: 80%"
          stripe
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column
            prop="did"
            label="ID"
            sortable
            width="100px">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="200">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '0'">已规划</span>
              <span v-else>开发中</span>
            </template>
            <!-- <template slot-scope="scope" v-if="scope.row.status === '2'">自测中</template>
            <template slot-scope="scope" v-if="scope.row.status === '3'">转测试</template>
            <template slot-scope="scope" v-if="scope.row.status === '4'">已完成</template> -->
          </el-table-column>
          <el-table-column
            prop="project"
            label="项目"
            width="150">
          </el-table-column>
          <el-table-column
            prop="priority"
            label="优先级"
            width="100"
            :filters="[{ text: 'low', value: 'low' }, { text: 'middle', value: 'middle' }, { text: 'high', value: 'high' }]"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.priority === 'high'"
                type="danger"
                close-transition>{{scope.row.priority}}</el-tag>
              <el-tag v-if="scope.row.priority === 'middle'"
                type="primary"
                close-transition>{{scope.row.priority}}</el-tag>
              <el-tag v-if="scope.row.priority === 'low'"
                type="info"
                close-transition>{{scope.row.priority}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="startdate"
            label="预计开始"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="enddate"
            label="预计结束"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="owner"
            label="参与者"
            width="200">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <router-link :to="{name: 'knowledge', params: {did: scope.row.did}}" target="_blank">查看</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </div>
</template>
<script>

import moment from 'moment'

export default {
  data () {
    return {
      activeIndex: '1',
      tabIndex: '',
      allDemandList: [],
      tableData2: [],
      tableData3: []
    }
  },
  created () {
    this.$api.GetDemands()
      .then(({data}) => {
        this.allDemandList = data
        this.allDemandList.forEach(d => { d.startdate = moment(d.startdate).format('YYYY-MM-DD') })
        this.allDemandList.forEach(d => { d.enddate = moment(d.enddate).format('YYYY-MM-DD') })

        // console.log(data)
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
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.tabIndex = key
    },
    formatter (row, column) {
      return row.address
    },
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss">
.work_container {
  overflow: auto;
  background-color: white;
  .menu-content {
    ul {
      .el-menu {
        border: solid;
      }
    }
    .create {
      position: absolute;
      top: 10px;
      right: 250px;
      height: 40px;
      span {
        margin: 0;
      }
      a {
        color: #fff;
        line-height: 6px;
        text-decoration: none;
      }
    }
  }
  .allDemand {    
    // width: 100%;
    // .el-table__body-wrapper {
    //   width: 100%;
    // }
    .el-table {
      width: 80%;
    }
  }
  .el-button {
    padding-top: 2px;
    font-size: 14px;
  }
  ul {
    background-color: #F8F9FA;
  }
  ~.sideBar {
    display: block;
  }
  ~.header {
    display: block;
  }
}
</style>
