<template>
  <el-row class="Box-Logo-cantainer">
    <el-col :xs="24" :sm="24" :lg="24" class="box-logo">
      Logo
    </el-col>
  </el-row>
</template>
<script>
export default {
  name:'BoxLogo',
  
}
</script>

<style lang="scss" scoped>
.Box-Logo-cantainer {
  margin-top: 18px;
  margin-bottom: 32px;
  .box-logo {
    height: 80px;
    background-color: white;
  }
}
</style>
