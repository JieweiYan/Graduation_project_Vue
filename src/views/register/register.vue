<template>
  <div>
    <el-card class="box-card">
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="完善信息"></el-step>
      </el-steps>
      <div style="height: 50px"></div>
      <!-- <p style="text-align:center;font-size: 25px">注册</p>-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!--表单1-->
        <div v-if="active == 0">
          <el-form-item label="手机号" prop="telnum">
            <el-input v-model.number="ruleForm.telnum"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button @click="gotologin()" style="margin-right: 90px;">返回登录</el-button>
            <el-button type="primary" @click="next" style="margin-right: 90px;">下一步</el-button>
          </el-form-item>
        </div>
        <!--表单2-->
        <div v-if="active==1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="你的出生日期" required>
              <el-col :span="11">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="你的专业" prop="subject">
              <el-select v-model="ruleForm.subject" filterable placeholder="请选择专业">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入学年份" prop="start_year">
              <el-select v-model="ruleForm.start_year" placeholder="请选择年份">
                <el-option label="2017" value="2017"></el-option>
                <el-option label="2016" value="2016"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="你的班级" prop="class">
              <el-select v-model="ruleForm.class" placeholder="请选择班级">
                <el-option label="1班" value="class1"></el-option>
                <el-option label="2班" value="class2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="现居住地" prop="location">
              <el-input v-model="ruleForm.location"></el-input>
            </el-form-item>

            <el-form-item label="你的职业" prop="profession">
              <el-input v-model="ruleForm.profession"></el-input>
            </el-form-item>
            <el-form-item label="你的微信号" prop="wechatnum">
              <el-input v-model="ruleForm.wechatnum"></el-input>
            </el-form-item>
            <el-form-item label="一句话介绍" prop="introduce">
              <el-input v-model="ruleForm.introduce" maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="个人简介" prop="profile">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="ruleForm.profile" maxlength="150"
                        show-word-limit></el-input>
            </el-form-item>

            <el-form-item style="text-align: center">
              <el-button @click="pre()" style="margin-right: 100px;">上一步</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 100px;">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-form>

    </el-card>
  </div>

</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入电话号码'));
        } else {
          if (value > 99999999999 || value < 10000000000) {
            callback(new Error('请输入正确的电话号码'));
          } else {
            callback();
          }
        }
      }, 1000)
    };

    return {
      active: 0,
      ruleForm: {
        telnum: '',
        pass: '',
        checkPass: '',
        name: '',
        sex: '',
        date: '',
        subject: '',
        start_year: '',
        class: '',
        location: '',
        profession: '',
        wechatnum: '',
        introduce: '',
        profile: '',
      },
      options: [{
        value: '选项1',
        label: '哲学类'
      }, {
        value: '选项2',
        label: '汉语言文学'
      }, {
        value: '选项3',
        label: '汉语国际教育'
      }, {
        value: '选项4',
        label: '历史学'
      }, {
        value: '选项5',
        label: '档案学'
      }, {
        value: '选项6',
        label: '新闻传播学类'
      }, {
        value: '选项7',
        label: '广播电视学'
      }, {
        value: '选项8',
        label: '广告学'
      }, {
        value: '选项9',
        label: '戏剧影视文学'
      }, {
        value: '选项10',
        label: '播音与主持艺术'
      }, {
        value: '选项11',
        label: '广播电视编导'
      }, {
        value: '选项12',
        label: '外国语言文字类'
      }, {
        value: '选项13',
        label: '俄语'
      }, {
        value: '选项14',
        label: '德语'
      }, {
        value: '选项15',
        label: '法语'
      }, {
        value: '选项16',
        label: '西班牙语'
      }, {
        value: '选项17',
        label: '翻译'
      }, {
        value: '选项18',
        label: '日语'
      }, {
        value: '选项19',
        label: '音乐与舞蹈学类'
      }, {
        value: '选项20',
        label: '舞蹈表演'
      }, {
        value: '选项21',
        label: '舞蹈学'
      }, {
        value: '选项22',
        label: '表演'
      }, {
        value: '选项23',
        label: '动画'
      }, {
        value: '选项24',
        label: '绘画'
      }, {
        value: '选项25',
        label: '工业设计'
      }, {
        value: '选项26',
        label: '艺术设计学'
      }, {
        value: '选项27',
        label: '视觉传达设计'
      }, {
        value: '选项28',
        label: '环境设计'
      }, {
        value: '选项29',
        label: '产品设计'
      }, {
        value: '选项30',
        label: '服装与服饰设计'
      }, {
        value: '选项31',
        label: '法学类'
      }, {
        value: '选项32',
        label: '知识产权'
      }, {
        value: '选项33',
        label: '社会学类'
      }, {
        value: '选项34',
        label: '应用心理学'
      }, {
        value: '选项35',
        label: '公共事业管理'
      }, {
        value: '选项36',
        label: '行政管理'
      }, {
        value: '选项37',
        label: '人力资源管理'
      }, {
        value: '选项38',
        label: '公共关系学'
      }, {
        value: '选项39',
        label: '劳动与社会保障'
      }, {
        value: '选项40',
        label: '经济学类'
      }, {
        value: '选项41',
        label: '经济统计学'
      }, {
        value: '选项42',
        label: '金融学'
      }, {
        value: '选项43',
        label: '国际经济与贸易'
      }, {
        value: '选项44',
        label: '国际商务'
      }, {
        value: '选项45',
        label: '工商管理'
      }, {
        value: '选项46',
        label: '市场营销'
      }, {
        value: '选项47',
        label: '会计学'
      }, {
        value: '选项48',
        label: '财务管理'
      }, {
        value: '选项49',
        label: '工业工程'
      }, {
        value: '选项50',
        label: '旅游管理类'
      }, {
        value: '选项51',
        label: '文化产业管理'
      }, {
        value: '选项52',
        label: '教育学类'
      }, {
        value: '选项53',
        label: '体育教育'
      }, {
        value: '选项54',
        label: '运动训练'
      }, {
        value: '选项55',
        label: '管理科学与工程类'
      }, {
        value: '选项56',
        label: '信息管理与信息系统'
      }, {
        value: '选项57',
        label: '物流管理'
      }, {
        value: '选项58',
        label: '电子商务'
      }, {
        value: '选项59',
        label: '数学类'
      }, {
        value: '选项60',
        label: '信息与计算科学'
      }, {
        value: '选项61',
        label: '物理学'
      }, {
        value: '选项62',
        label: '金融数学'
      }, {
        value: '选项63',
        label: '应用物理学'
      }, {
        value: '选项64',
        label: '光电信息科学与工程'
      }, {
        value: '选项65',
        label: '化学类'
      }, {
        value: '选项66',
        label: '应用化学'
      }, {
        value: '选项67',
        label: '生物科学类'
      }, {
        value: '选项68',
        label: '生物技术'
      }, {
        value: '选项69',
        label: '生态学'
      }, {
        value: '选项70',
        label: '水产养殖学'
      }, {
        value: '选项71',
        label: '食品科学与工程类'
      }, {
        value: '选项72',
        label: '食品质量与安全'
      }, {
        value: '选项73',
        label: '生物工程'
      }, {
        value: '选项74',
        label: '材料类'
      }, {
        value: '选项75',
        label: '材料物理'
      }, {
        value: '选项76',
        label: '高分子材料与工程'
      }, {
        value: '选项77',
        label: '新能源材料与器件'
      }, {
        value: '选项78',
        label: '机械类'
      }, {
        value: '选项79',
        label: '化学工程与工艺'
      }, {
        value: '选项80',
        label: '制药工程'
      }, {
        value: '选项81',
        label: '资源循环科学与工程'
      }, {
        value: '选项82',
        label: '环境科学与工程'
      }, {
        value: '选项83',
        label: '环境工程'
      }, {
        value: '选项84',
        label: '环境科学'
      }, {
        value: '选项85',
        label: '安全工程'
      }, {
        value: '选项86',
        label: '机械类'
      }, {
        value: '选项87',
        label: '材料成型及控制工程'
      }, {
        value: '选项88',
        label: '车辆工程'
      }, {
        value: '选项89',
        label: '能源与动力工程'
      }, {
        value: '选项90',
        label: '土木类'
      }, {
        value: '选项91',
        label: '建筑环境与能源应用工程'
      }, {
        value: '选项92',
        label: '给水排水科学与工程'
      }, {
        value: '选项93',
        label: '水利水电工程'
      }, {
        value: '选项94',
        label: '建筑学（五年）'
      }, {
        value: '选项95',
        label: '城乡规划（五年）'
      }, {
        value: '选项96',
        label: '工程管理'
      }, {
        value: '选项97',
        label: '工程力学'
      }, {
        value: '选项98',
        label: '仪器类'
      }, {
        value: '选项99',
        label: '电气工程及其自动化'
      }, {
        value: '选项100',
        label: '电子信息工程'
      }, {
        value: '选项101',
        label: '通信工程'
      }, {
        value: '选项102',
        label: '自动化'
      }, {
        value: '选项103',
        label: '计算机科学与技术'
      }, {
        value: '选项104',
        label: '网络工程'
      }, {
        value: '选项105',
        label: '物联网工程'
      }, {
        value: '选项106',
        label: '数字媒体技术'
      }, {
        value: '选项107',
        label: '数据科学与大数据技术'
      }, {
        value: '选项108',
        label: '生物医学工程'
      }, {
        value: '选项109',
        label: '计算机类'
      }, {
        value: '选项110',
        label: '信息安全'
      }, {
        value: '选项111',
        label: '基础医学类'
      }, {
        value: '选项112',
        label: '临床医学（五年）'
      }, {
        value: '选项113',
        label: '麻醉学（五年）'
      }, {
        value: '选项114',
        label: '医学影像学（五年）'
      }, {
        value: '选项115',
        label: '眼视光医学（五年）'
      }, {
        value: '选项116',
        label: '口腔医学（五年）'
      }, {
        value: '选项117',
        label: '预防医学（五年）'
      }, {
        value: '选项118',
        label: '药学'
      }, {
        value: '选项119',
        label: '临床药学'
      }, {
        value: '选项120',
        label: '医学检验技术'
      }, {
        value: '选项121',
        label: '医学影像技术'
      }, {
        value: '选项122',
        label: '眼视光学'
      }, {
        value: '选项123',
        label: '卫生检验与检疫'
      }, {
        value: '选项124',
        label: '康复治疗学'
      }, {
        value: '选项125',
        label: '护理学'
      }],
      rules: {
        telnum: [
          {required: true, validator: validatePass3, trigger: 'blur'}
        ],

        pass: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        subject: [
          {required: true, message: '请选择专业', trigger: 'change'}
        ],
        start_year: [
          {required: true, message: '请选择入学年份', trigger: 'change'}
        ],
        class: [
          {required: true, message: '请选择班级', trigger: 'change'}
        ],
        date: [
          {type: 'date', required: true, message: '请选择出生日期', trigger: 'change'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.ruleForm.sex != "" && this.ruleForm.subject != "" && this.ruleForm.start_year != "" && this.ruleForm.class != "") {
        console.log(this.ruleForm)
        const this1 = this
        axios.post('http://localhost:8100/user/insert', this.ruleForm).then(function (resp) {
          console.log(resp)
        })
      }
      else {
        alert("必填项还没填哦！")
      }
    },
    gotologin() {
      this.$router.push('/login')
    },
    next() {
      if (this.ruleForm.telnum != "" && this.ruleForm.username != "" && this.ruleForm.pass != "" && this.ruleForm.checkPass != "")
        this.active++
      else {
        alert("必填项还没填哦！")
      }
    },
    pre() {
      this.active--;
    }
  }
}
</script>

<style>
.box-card {
  width: 600px;
  border-radius: 5px;
  margin: 100px auto;
}

</style>
