<template>
  <div class="defilist-admin-container">
    <panel-group />
    <box-card />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import BoxCard from './components/BoxCard'
export default {
  name: 'DeFiListAdmin',
  components: {
    BoxCard,
    PanelGroup
  },
  data() {
    return {
    }
  }
}

</script>
<style lang="scss" scoped>
.defilist-admin-container{
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
