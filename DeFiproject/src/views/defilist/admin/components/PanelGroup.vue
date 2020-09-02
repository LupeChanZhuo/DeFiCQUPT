<template>
  <el-row class="panel-group panel-group-bottom">
    <el-col :xs="24" :sm="18" :lg="18">
      <div class="btn btn-group">
        <el-button type="button" class="btn btn-default">资产</el-button>
        <el-button type="button" class="btn btn-default">交易</el-button>
        <el-button type="button" class="btn btn-default">理财</el-button>
        <el-button type="button" class="btn btn-default">贷款</el-button>
        <el-button type="button" class="btn btn-default">交易</el-button>
        <el-button type="button" class="btn btn-default">保险</el-button>
      </div>
    </el-col>
    <el-col :xs="12" :sm="6" :lg="6">
      <div class="input-group input-group-sm">
        <span class="input-group-addon">@</span>
        <el-input type="text" class="form-control" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ProjectGroup'
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .panel-group-bottom {
    margin-bottom: 32px;
  }
}
</style>
