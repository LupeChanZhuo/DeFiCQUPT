<template>
  <el-row :gutter="32" class="box-card-2">
    <el-col :xs="24" :sm="24" :lg="12" class="card-box-col">
      <div class="card-box">
        <div>
          <span>资产总览</span>
        </div>
        <hr>
        <div>
          <div class="col-3">
            <p>净资产</p>
            {{ totalValue }}
          </div>
          <div style="clear:both" class="col-2">
            <p>总资产</p>
            {{ totalValue }}
          </div>
          <div class="col-2">
            <p>总负债</p>
            {{ debt }}
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <router-link to="/documentation/index">
          资产总览
        </router-link>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12" class="card-box-col">
      <div class="card-box">
        <div>
          <span>推荐项目</span>
        </div>
        <hr>
        <div v-for="(p, i) in projects" :key="i">
          <h5>DODO<br>
            <small>DODO 是基于 PMM 主动做市商算法的链上流动性基础设施，提供合约可填充的流动性{{ p }}</small>
          </h5>
        </div>
      </div>
      <div class="card-bottom">
        <router-link to="/defilist/index">
          项目探索
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import requestUtil from '@/utils/request'
export default {
  name: 'BoxCard2',
  data() {
    return {
      totalValue:'0',
      debt: '0',
      projects: [1, 'gasfdjhfg']
    }
  },
  methods: {
    getTokenbalance() {
      window.console.log("dd")
    requestUtil({
      baseURL:'http://localhost:8080',
      url: '/DefiServer/main/getTokenbalance',
      method: 'post',
      data: { //post请求用 data
        ETHStr:'0x1062a747393198f70f71ec65a582423dba7e5ab3',
        
      }
    }).then(response => {
      //赋值  注！！！数组不可以按下标赋值！！
       window.console.log("dd12")
      var _this = this
      _this.Tokenbalance = response.data
      _this.totalValue=response.totalValue
      window.console.log("dd"+response.totalValue)
    })
  }
},
 created() {
    //this.getTokenbalance()
}
}

</script>

<style lang="scss" scoped>
.box-card-2 {
  .card-box-col {
    margin-bottom: 32px;
  }
  .card-box {
    background-color: white;
    height: 300px;
    padding: 15px;
    .col-3 {
      width: 33%;
      float: left;
    }
    .col-2 {
      width: 50%;
      float: left;
    }
  }
  .card-bottom {
    background-color: wheat;
    padding: 15px;
    height: 35px;
    text-align: center;
  }
}
</style>
