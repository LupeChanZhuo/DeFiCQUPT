<template>
  <div class="documentation-admin-container">
  <!--   <PanelGroup /> -->
    <BoxChart />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import BoxChart from './components/BoxChart'
export default {
  name: 'DocumentationAdmin',
  components: { PanelGroup, BoxChart }
}
</script>

<style lang="scss" scoped>
.documentation-admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
