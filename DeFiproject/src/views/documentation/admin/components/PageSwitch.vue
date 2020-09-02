<template>
  <el-row class="page-switch">
    <el-col>
      <span>Account Overview</span>
      <span class="f-r">
        Switch View
        <!-- <el-switch v-model="state" active-value="1" inactive-value="0" @change="showbox" /> -->
      </span>
      <div v-show="show" class="m-t">
        <box-chart />
        <plat-form />
      </div>

    </el-col>
  </el-row>
</template>

<script>
import BoxChart from './BoxChart'
import PlatForm from './PlatForms' 
export default {
  name: 'PageSwitch',
  components: { BoxChart, PlatForm },
  props: {

  },
  data() {
    return {
      show: true,
      state: '1'
    }
  },
  methods: {
    showbox() {
      this.show = !this.show
      // this.state = !this.state
      console.log('ss')
      this.$emit('closeme')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-switch {
  background-color: white;
  padding: 12px;
  .m-t {
    margin-top: 20px;
  }
  .f-r {
    float: right;
  }

}
</style>
