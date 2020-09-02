<template>
  <div class="documentation-admin-container">
    <PanelGroup />
    <page-switch />
    <div v-show="show" @closeme="closeme">
      <BoxWallet />
      <BoxDeposits />
      <liquidity-pools />
    </div>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import BoxWallet from './components/BoxWallet'
import BoxDeposits from './components/BoxDeposits'
import LiquidityPools from './components/LiquidityPools'
import PageSwitch from './components/PageSwitch'
export default {
  name: 'DocumentationAdmin',
  components: { PanelGroup, BoxWallet,  PageSwitch },//BoxDeposits, LiquidityPools,
  data() {
    return {
      show: true
    }
  },
  methods: {
    closeme: function() {
      console.log('是')
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
