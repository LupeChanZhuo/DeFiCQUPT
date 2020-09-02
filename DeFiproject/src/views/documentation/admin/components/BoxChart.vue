<template>
  <el-row :gutter="40" class="box-chart">
    <el-col :xs="24" :sm="8" :lg="8">
      <div v-if="BoxWalletdata.tablelist.length !=0" class="box-small">
        <p>Wallet</p>
      </div>
    </el-col>
    <!-- <el-col :xs="24" :sm="8" :lg="8">
      <div v-if="BoxWalletdata.tablelist.length !=0" class="box-small">
        <p>sdad</p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="8" :lg="8">
      <div v-if="BoxWalletdata.tablelist.length !=0" class="box-small">
        <p>sdad</p>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
import BoxWallet from './BoxWallet'
//import BoxDeposits from './BoxDeposits'
//import LiquidityPools from './LiquidityPools'

export default {
  name: 'BoxChart',
  components: {
    BoxWallet
    //BoxDeposits,
    //LiquidityPools
  },
  data() {
    return {
      BoxWalletdata: BoxWallet.data()
    }
  }
}
</script>

<style lang="scss" scoped>
.box-chart {
  .box-small {
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 15px;
  }
}
</style>
