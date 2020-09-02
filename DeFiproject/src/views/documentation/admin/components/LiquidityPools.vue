<template>
  <div v-if="tablelist.length != 0" class="box-chart">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <h3>Deposits</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24" class="box-chart-col">
        <table class="el-table">
          <thead>
            <tr>
              <th width="25%">Asset</th>
              <th width="25%">Balance</th>
              <th width="25%">APY</th>
              <th width="25%">Value</th>
            </tr>
          </thead>
          <tbody v-for="list in tablelist" :key="list.id">
            <tr>
              <td width="25%">{{ list.mc }}</td>
              <td width="25%">{{ list.hl }}</td>
              <td width="25%">{{ list.ye }}</td>
              <td width="25%">{{ list.hl * list.ye }}</td>
            </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LiquidityPools',
  data() {
    return {
      tablelist: [
        { id: 1, mc: 'eth', hl: 9.0, ye: 3.0 },
        { id: 2, mc: 'eth', hl: 2.0, ye: 3.0 },
        { id: 3, mc: 'eth', hl: 2.0, ye: 3.0 },
        { id: 4, mc: 'eth', hl: 2.0, ye: 3.0 },
        { id: 5, mc: 'eth', hl: 3.0, ye: 3.0 }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .box-chart {
    .box-chart-col {
      background-color: white;
      padding: 12px;
    }
  }
</style>
