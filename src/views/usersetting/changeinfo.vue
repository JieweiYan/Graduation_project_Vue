<template>
  <div style="margin-left: 80px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             label-width="120px" class="demo-ruleForm" style="width: 600px">
      <div>
        <el-form-item label="你的真实姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item aria-colspan="11" label="你的专业" prop="subject" style="text-align: left;">
          <el-select v-model="ruleForm.subject" filterable placeholder="搜索专业">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入学年份" prop="start_year" style="text-align: left;">
          <el-select v-model="ruleForm.startyear" placeholder="请选择年份">
            <el-option
                v-for="i in yearrepeat"
                :key="i"
                :label="i+'年'"
                :value="i+'级'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="你的班级" prop="class" style="text-align: left;">
          <el-select v-model="ruleForm.class1" placeholder="请选择班级">
            <el-option
                v-for="item in classoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="你的出生日期" required>
          <el-col :span="11">
            <el-form-item prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
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
          <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 100px;">确认修改</el-button>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>
<script>
export default {
  data() {

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
        id:'',
        telnum: '',
        name: '',
        subject: '',
        startyear: '',
        class1: '',
        location: '',
        birthday: '',
        profession: '',
        wechatnum: '',
        introduce: '',
        profile: '',
        createTime: '',
        deleted: '',
        password: '',
        sex: '',
        updateTime: '',
      },
      yearrepeat:[1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
      classoptions:[{
        value: '1班',
        label: '1班'
      },{
        value: '2班',
        label: '2班'
      },{
        value: '3班',
        label: '3班'
      },{
        value: '4班',
        label: '4班'
      },{
        value: '5班',
        label: '5班'
      },{
        value: '6班',
        label: '6班'
      },{
        value: '7班',
        label: '7班'
      },{
        value: '8班',
        label: '8班'
      },{
        value: '9班',
        label: '9班'
      },{
        value: '10班',
        label: '10班'
      },{
        value: '11班',
        label: '11班'
      },{
        value: '12班',
        label: '12班'
      },{
        value: '13班',
        label: '13班'
      },{
        value: '14班',
        label: '14班'
      },{
        value: '15班',
        label: '15班'
      },{
        value: '16班',
        label: '16班'
      },{
        value: '17班',
        label: '17班'
      },{
        value: '18班',
        label: '18班'
      },{
        value: '19班',
        label: '19班'
      },{
        value: '20班',
        label: '20班'
      },],
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
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        subject: [
          {required: true, message: '请选择专业', trigger: 'change'}
        ],
        startyear: [
          {required: true, message: '请选择入学年份', trigger: 'change'}
        ],
        class1: [
          {required: true, message: '请选择班级', trigger: 'change'}
        ],
        birthday: [
          {type: 'date', required: true, message: '请选择出生日期', trigger: 'change'}
        ],
      }
    };
  },
  created(){
    const this1 = this
    let id = window.localStorage.getItem("id")
    let token = window.localStorage.getItem("token")
    axios.get('http://localhost:8100/user/findbyid/'+id+'/'+token).then(function (resp){
      this1.ruleForm = resp.data
    })
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm)
      let this1 = this
      let id = window.localStorage.getItem("id");
      let token = window.localStorage.getItem("token")
      axios.post('http://localhost:8100/user/update/'+id+'/'+token, this.ruleForm).then(function (resp) {
        if(resp.data == ""){
          window.localStorage.clear()
          this1.$router.go(0)
          this1.$message.error("出了一点小问题，请您重新登录哦！")
        }
        this1.$message({
          message: '修改成功！',
          type: 'success'
        });
        this1.$router.go(0)
      })
      },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    pre() {
      this.active--;
    }
  }
}
</script>
