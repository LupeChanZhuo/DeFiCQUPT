<template>
  <!--<div>-->
  <!--<component :is="currentRole" />-->
  <!--</div>-->
  <div class="defi-container">
    <el-row class="bg p">
      <el-col>
        <h2><img :src="getImg(platdata.metadata.name)" style="height: 25px" class="m-r">
         {{ platdata.metadata.name }}</h2>
      </el-col>
      <el-col>
        <table class="el-table ">
          <thead>
            <tr>
              <th>supperlied </th>
              <th>balance</th>
              <th>apy</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(second, i) in secondfloor[0][1]" :key="i">
              <td>{{ second.base.metadata.name }}</td>
              <!--<td></td>-->
              <td>{{ thirdfloor[i].Balance }}</td>
              <td>apy</td>
              <td>value</td>
            </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>

    <el-row :gutter="40" class="bg p" >
      <el-col :xs="24" :sm="12" :lg="8" v-for="(second, i) in secondfloor[0][1]" :key="i">
        <div v-if="thirdfloor[i].Underlying !== undefined && thirdfloor[i].Underlying.length > 0">
           <div>
          <h4> {{ second.base.metadata.name }}</h4>
        </div>
        <div >
          <table class="el-table " >
            <thead>
              <tr>
                 <th>supperlied </th>
                <th>balance</th>
                <th>apy</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(third, index) in thirdfloor[i].Underlying"  :key="index"  >
                <!-- <td>{{ third[0].Component }}</td> -->
                <!-- <td>{{ third[0].Amount }}</td> -->
                <td>{{ thirdfloor[i].Underlying[index].Component }}</td>
                <td>{{ thirdfloor[i].Underlying[index].Amount }}</td>
                <td>apy</td>
                <td>value</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
       
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDeFiList from './admin'
// import editorDeFiList from './editor'

export default {
  name: 'DeFiList',
  components: { adminDeFiList },
  // components: { adminDeFiList },
  data() {
    return {
      currentRole: 'adminDeFiList',
      platdata: this.$route.params.name,
      // platdata: this.$route.query.name,
      secondfloor: [],
      thirdfloor: []
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.datashow()
  },
  methods: {
    getImg(deifName) {
      console.log("deifName==="+deifName)
      return require("../documentation/admin/img/"+deifName+".png")
    },
    datashow() {

      const BN = require('bignumber.js')
      // (async() => {
      //
      // })()
      // 计算真实余额
      function getNormalizedNumber(number, decimals) {
        return new BN(number).dividedBy(
          new BN(10).pow(decimals)
        )
      }

      var protocol = this.platdata
      // var secondfloor = new Array()
      // secondfloor.push( protocol.adapterBalances )
      this.secondfloor =  protocol.adapterBalances
      var thirdfloor = new Array()
      protocol.adapterBalances.forEach((protocolBalances) => {
        // Each adapter could either be an Asset or Debt on the protocol
        console.log('Balance type:', protocolBalances.metadata.adapterType)
        // secondfloor.push(protocolBalances.balances)
        // this.secondfloor = secondfloor
        // this.secondfloor = protocolBalances.balances

        protocolBalances.balances.forEach((balance) => {
          // Inside of each adapter there is an info about the asset and the balance
          const position = {
            'Token': balance.base.metadata.name,
            'Balance': getNormalizedNumber(balance.base.amount.toString(), balance.base.metadata.decimals).toString()
          }
         
          // If asset is a derivative then there will be underlying assets
          if (balance.underlying.length > 0) {
            const underlying = []
            balance.underlying.forEach((asset) => {
              underlying.push({
                'Component': asset.metadata.name,
                'Amount': getNormalizedNumber(
                  asset.amount.toString(), asset.metadata.decimals
                ).toString()
              })
            })
            position['Underlying'] = underlying
          }
           thirdfloor.push(position)
          this.thirdfloor = thirdfloor
          console.log('Position:', position)
        })
      })
    }
  }


  // created() {
  //   if (!this.roles.includes('admin')) {
  //     this.currentRole = 'editorDeFiList'
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.defi-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  /*background-color: white;*/
  .bg {
    background-color: white;
  }
  .p {
    padding: 18px;
  }
  .f-l {
    float: left;
  }
  .f-r {
    float: right;
  }
  .m-r {
    margin-right: 10px;
  }
}
</style>
