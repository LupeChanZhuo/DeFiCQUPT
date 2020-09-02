<template>
  <div class="modal-backdrop">
    <div class="modal" :style="mainStyles">
      <div class="modal-header">
        <h3>追踪账号</h3>
      </div>
      <from action="" method="post">
        <div class="modal-body">
        <input class="input-length" type="text" v-model="key" placeholder="请输入追踪账号" />
        <button @click="ETHAddress(key)">Go</button>
      </div>
      </from>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <!-- <button type="button" class="btn-confirm" @click="confirm">确认</button> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {

  },
  data() {
    return {
    }
  },
  methods: {
    ETHAddress(key) {
      this.$router.push({ query: { chan: key}})
      this.$router.push({ path:'/documentation/index', query: { nameaddress: key}})

      console.log("key",key)
    },
    closeSelf() {
      this.$emit('closeme')
    }

  }
}
</script>

<style>
  .modal-backdrop {
    position: fixed;
  z-index: 999999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x:auto;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    width: 700px;
  }
  .modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px;
    display: flex;
  }
  .modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
  .btn-close, .btn-confirm {
    border-radius: 8px;
    margin-left:16px;
    width:56px;
    height: 36px;
    border:none;
    cursor: pointer;
  }
  .btn-close {
    color: #313131;
    background-color:transparent;
  }
  .btn-confirm {
    color: #fff;
    background-color: #2d8cf0;
  }
  .input-length {
    width: 60%;
  }
</style>

