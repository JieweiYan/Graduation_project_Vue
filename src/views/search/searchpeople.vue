<template>
  <div>
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="专业">
          <el-select v-model="form.subject" size="small" filterable placeholder="请选择专业" default-first-option=true>
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="form.startyear" placeholder="请选择年级" size="small">
            <el-option
                v-for="i in yearrepeat"
                :key="i"
                :label="i+'级'"
                :value="i+'级'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="form.class1" placeholder="请选择班级" size="small">
            <el-option
                v-for="item in classoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" size="small" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="align-content: center; padding: 5px" v-if="totleuser != 0">
      <el-row style="align-content: center; margin: 5px">
        <el-col :span="4">
          <p style="font-size: 14px; margin: 5px; font-weight: bold">姓名</p>
        </el-col>
        <el-col :span="4">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">专业班级</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">现居地</p>
          </div>
        </el-col>

        <el-col :span="2">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">职业</p>
          </div>
        </el-col>

        <el-col :span="3">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">微信号</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p style="font-size: 14px; margin: 5px; font-weight: bold">个人简介</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-if="totleuser != 0">
      <el-card class="box-card" shadow="never" v-for="(item, index) in userlist" >
        <el-row style="align-content: center; margin: 5px">
          <el-col :span="4">
            <div>
              <el-avatar :size="45" shape="square" @click.native="gotousercenter(index)"
                         v-bind:src="item.avatar"></el-avatar>
              <p style="font-size: 12px; margin: 5px ">{{ item.name }}</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <p style="font-size: 13px; margin: 5px">{{item.startyear}}{{item.subject}}{{item.class1}}</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div>
              <p style="font-size: 13px; margin: 5px">{{ item.location }}</p>
            </div>
          </el-col>

          <el-col :span="2">
            <div>
              <p style="font-size: 13px; margin: 5px">{{ item.profession }}</p>
            </div>
          </el-col>

          <el-col :span="3">
            <div>
              <p style="font-size: 13px; margin: 5px">{{ item.wechatnum }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <p style="font-size: 13px; margin: 5px">{{item.profile}}</p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-pagination
        style="margin: 15px"
        background
        :current-page="currentPage"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next"
        :total="totleuser">
    </el-pagination>


  </div>
</template>
<script>
export default {
  data() {
    return {
      totleuser:0,
      currentPage: 1,
      form: {
        name: '',
        subject: '',
        startyear:'',
        class1:'',
      },
      userlist:[{
        id:'',
        name:'',
        avatar:'',
        subject:'',
        startyear:'',
        class1:'',
        location:'',
        profession:'',
        wechatnum:'',
        profile:'',
      }],
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

      repeat: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
    }
  },
  methods: {
    onSubmit() {
      var this1 = this
      axios.post('http://localhost:8100/postcontent/searchpeoplenum', this.form).then(function (resp){
        console.log(resp.data)
        if(resp.data == 0){
          this1.$message({
            message: '啥也没搜到哦！试着换换关键词吧',
            type: 'warning'
          });
        }
        this1.totleuser = resp.data
      })
      axios.post('http://localhost:8100/postcontent/searchpeople/'+this1.currentPage, this.form).then(function (resp){
        this1.userlist = resp.data.records
      })
    },
    handleCurrentChange(val) {
      let this1 = this
      this.currentPage = val
      axios.post('http://localhost:8100/postcontent/searchpeoplenum', this.form).then(function (resp){
        console.log(resp.data)
        this1.totleuser = resp.data
      })
      axios.post('http://localhost:8100/postcontent/searchpeople/'+this1.currentPage, this.form).then(function (resp){
        console.log(resp.data)
        this1.userlist = resp.data.records
      })
    },
    gotousercenter(index) {
      this.$router.push({path:'/usercenter', query:{id:this.userlist[index].id}})
    }
  }
}
</script>
