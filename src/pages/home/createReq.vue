<template>
	<div class="create_form">
		<el-form ref="remandForm" :rules="rules" :model="remandForm" label-width="100px">
			<el-form-item class="title">
  				<a>{{ model.title }}</a>
  			</el-form-item>
		  	<el-form-item label="标题" style="width: 80%" prop="title">
		    	<el-input v-model="remandForm.title" class="titleInput" placeholder="请输入标题"></el-input>
		  	</el-form-item>
		  	<el-form-item label="所属项目" style="width: 80%" prop="project">
		    	<el-select v-model="remandForm.project" placeholder="请选择">
		      		<el-option label="BOSS后台项目" value="BOSS后台项目"></el-option>
		      		<el-option label="漫画项目" value="漫画项目"></el-option>
		    	</el-select>
		  	</el-form-item>
        <el-form-item label="当前状态" style="width: 80%" prop="project">
          <el-select v-model="remandForm.status" placeholder="请选择">
              <el-option label="已规划" value="0"></el-option>
          </el-select>
        </el-form-item>
		  	<el-form-item label="当前处理人" style="width: 80%" prop="owner">
		  		<el-select
				    v-model="remandForm.owner"
				    multiple
				    filterable
				    allow-create
				    default-first-option
				    placeholder="请选择">
					<el-option
						v-for="item in ownerList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
		  	</el-form-item>
			<el-form-item label="时间" class="fixIcon" prop="enddate">
				<el-col :span="10">
					<el-date-picker type="date" placeholder="选择日期" v-model="remandForm.startdate"></el-date-picker>
				</el-col>
				<span class="line">-</span>
				<el-col :span="10">
          <el-date-picker type="date" placeholder="选择日期" v-model="remandForm.enddate"></el-date-picker>
        </el-col>
			</el-form-item>
			<el-form-item label="优先级" prop="priority">
				<el-radio-group v-model="remandForm.priority">
					<el-radio label="low"></el-radio>
					<el-radio label="middle"></el-radio>
					<el-radio label="high"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="创建人" class="demo-autocomplete" style="width: 80%" prop="creator">
	    		<!-- <el-input v-model="remandForm.creator" class="titleInput" placeholder="请输入标题"></el-input> -->
	    		<!-- <div class="sub-title">激活即列出输入建议</div> -->
		    <el-autocomplete
		      class="inline-input"
		      v-model="remandForm.creator"
		      :fetch-suggestions="querySearch"
		      placeholder="请输入创建人"
		      @select="handleSelect"
		    ></el-autocomplete>
	  	</el-form-item>
			<el-form-item>
				<v-editor v-model="remandForm.content"></v-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('remandForm')">立即创建</el-button>
				<el-button @click="goBack()">取消</el-button>
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
      fullscreenLoading: false,
      model: {
        title: '创建需求',
        id: '9823090'
      },
      ownerList: [{
        value: 'p_xuexin',
        label: 'p_xuexin'
      }, {
        value: 'p_wangping',
        label: 'p_wangping'
      }, {
        value: 'p_hantaijun',
        label: 'p_hantaijun'
      }],
      statusList: [{
        value: '1',
        label: '规划中'
      }],
      remandForm: {
        title: '',
        project: '',
        startdate: '',
        enddate: '',
        priority: '',
        content: '',
        owner: '',
        creator: '',
        status: '0',
        did: Date.parse(new Date()) / 1000
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        startdate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        enddate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        priority: [
          { required: true, message: '请选择优先级', trigger: 'blur' }
        ],
        owner: [
          { required: true, message: '请输入处理人', trigger: 'blur' }
        ],
        creator: [
          { required: true, message: '请输入创建人', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // onSubmit () {
    //   console.log('submit!')
    //   // alert(this.form.content)
    // },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': 'p_xuexin', 'address': '长宁区新渔路144号' },
        { 'value': 'p_hantaijun', 'address': '上海市长宁区淞虹路661号' },
        { 'value': 'p_xuefan', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': 'p_zhoujielun', 'address': '天山西路438号' },
        { 'value': 'p_zhangshurong', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': 'p_jiangtianle', 'address': '上海市长宁区金钟路633号' },
        { 'value': 'p_wangping', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': 'p_shilei', 'address': '上海市普陀区同普路1435号' },
        { 'value': 'p_yanghe', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': 'p_zhanchengrong', 'address': '上海市嘉定区新郁路817号' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    },
    onSubmit (formName) {
      // alert(this.remandForm.date1)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          this.remandForm.startdate = moment(this.remandForm.startdate).format('YYYY-MM-DD')
          this.remandForm.enddate = moment(this.remandForm.enddate).format('YYYY-MM-DD')

          const opt = this.remandForm
          this.$api.DemandAdd(opt)
            .then(({data}) => {
              const code = data.code
              if (code === 500) {
                this.fullscreenLoading = false
                this.$message.error('添加失败！')
                // this.$refs[formName].resetFields()
              } else if (code === 200) {
                this.fullscreenLoading = true
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                })
                // this.$store.dispatch('UserLogin', data.token)
                // this.$store.dispatch('UserId', data.userId)
                const redirect = decodeURIComponent(this.$route.query.redirect || '/workTab')

                setTimeout(() => {
                  this.$router.push({
                    path: redirect
                  })
                }, 1000)
              } else {
                this.alert_type = 'error'
                // this.ruleLogin.userPwd = ''
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
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>
<style lang="scss">
.create_form {
	width: calc(100% - 230px);
	height: 100%;
	float: left;
	overflow: auto;
	> form {
		width: 900px;
		.el-form-item {
			width: 100%;
			.el-select {
				width: 90%;
				.el-tag--small {
					line-height: 16px !important;
				}
			}
			.el-input {
				width: 80%;
			}
			.titleInput {
				width: 446.39px;
			}
			.el-col {
				// border: solid;
				width: 200px;
				.el-date-editor {
					width: 100%;
				}
			}
			.line {
				float: left;
				padding: 0px 20px;
			}
			.inline-input {
				width: 555px;
			}
		}
	}
	.title {
		margin-top: 10px;
		margin-left: -60px;
		a {
			font-size: 18px !important;
			font-weight: bold;
		}
	}
	.fixIcon {
		span, i {
		  margin: 0 !important;
		}
	}
  ~.sideBar {
    display: block;
  }
  ~.header {
    display: block;
  }
}
.el-select-dropdown {
	// width: 500 !important;
	// border: solid;
	// min-width: 500px !important;
	li {
		// display: block;
	}
}
</style>
