<template>
  <div class="detail_form">
    <el-form :inline="true" :model="model">
      <el-form-item class="title">
        <p>{{ model.title }}</p>
      </el-form-item>
      <el-steps label="步骤" class="step" :active="active" finish-status="success">
        <el-step title="规划中"></el-step>
        <el-step title="开发中"></el-step>
        <el-step title="自测中"></el-step>
        <el-step title="转测试"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>
      <!-- </div> -->
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button style="margin-top: 12px;">确定流转</el-button><br><br><br>
    <!-- </el-form-item> -->
      <el-form-item label="ID:" class="content_item">
        {{ model.did }}
      </el-form-item>
      <el-form-item label="状态:" class="content_item">
        <template v-if="model.status === '0'">规划中</template>
        <template v-if="model.status === '1'">开发中</template>
        <template v-if="model.status === '2'">自测中</template>
        <template v-if="model.status === '3'">转测试</template>
        <template v-if="model.status === '4'">已完成</template>
      </el-form-item>
      <el-form-item label="所属项目:" class="content_item">
        {{ model.project }}
      </el-form-item><br>
      <el-form-item label="预计开始:" class="content_item">
        {{ model.startdate }}
      </el-form-item>
      <el-form-item label="截止时间:" class="content_item">
        {{ model.enddate }}
      </el-form-item><br>
      <el-form-item label="参与人员:" class="content_item">
        {{ model.owner }}
      </el-form-item>
      <el-form-item label="创建人:" class="content_item">
        {{ model.creator }}
      </el-form-item>
      <!-- <el-form-item label="需求目标" class="demand">
        <div>{{ model.demand }}</div>
      </el-form-item> -->
      <el-form-item label="图片:">
        <img :src="model.imgUrl">
      </el-form-item>
      <el-form-item label="参与讨论">
        <el-input type="textarea" class="commu"
          placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submitBtn" @click="open">提交评论</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      active: 0,
      model: {
        title: '',
        did: '',
        status: '',
        // demand: '\n· 增加广告业务类型，便于后续数据整合分析；\n· 增加满足弹的广告投放能力，为活动运营提供支持；\n需求概述\n· 创建新的满足弹配置时，必选广告业务类型，列表支持按业务类型筛选；\n· 创建新的满足弹配置时，参与对象支持指定频道展现；\n· 创建新的满足弹配置时，参与对象支持指定作品id展现.',
        project: '',
        startdate: '',
        enddate: '',
        priority: '',
        owner: '',
        creator: '',
        imgUrl: 'http://file.tapd.oa.com//tfl/captures/2017-10/tapd_10120891_base64_1508989797_15.png'
      }
    }
  },
  created () {
    const opt = {
      did: this.$route.params.did
    }
    this.$api.GetDemand(opt)
      .then(({data}) => {
        // console.log(sessionStorage.getItem('userId'))
        console.log(data.did)
        this.model.did = data.did
        this.model.title = data.title
        this.model.status = data.status
        this.model.priority = data.priority
        this.model.project = data.project
        this.model.did = data.did
        this.model.startdate = moment(data.startdate).format('YYYY-MM-DD')
        this.model.enddate = moment(data.enddate).format('YYYY-MM-DD')
        this.model.owner = data.owner
        this.model.creator = data.creator
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    open () {
      this.$message({
        message: '评论成功！',
        type: 'success'
      })
    },
    next () {
      if (this.active++ > 4) this.active = 5
    }
  }
}
</script>
<style lang="scss">
.detail_form {
  overflow: auto;
  .title {
    margin-top: 10px;
    p {
      font-size: 18px !important;
      font-weight: bold;
    }
  }
  .content_item{
    width: 180px !important;
  }
  .owner_item {
    width: 400px !important;
  }
  .step {
    width: 50%;
    margin-left: 30px;
    // .el-form-item__content {
    //  width: 60%;
    // }
    ~button {
      margin-left: 30px;
      display: block;
      margin-bottom: 10px;
    }
  }
  .el-button {
    float: left;
  }
  label {
    font-weight: 600;
  }
  .el-form-item {
    img {
      width: 80%;
    }
    .el-textarea__inner {
      width: 500px;
      height: 100px !important;
    }
    .submitBtn {
      margin-left: 67px;
    }
    margin-left: 30px;
    width: 90%;
  }
  .demand {
    white-space: pre-wrap;
    .el-form-item__content {
      margin-left: -70px;
    }
  }
  .el-step__line-inner {
    margin-top: 1px;
    border-width: 2px;
  }
  ~.sideBar {
      display: block;
  }
  ~.header {
      display: block;
  }
}
</style>
