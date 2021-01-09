<template>
  <el-card class="box-card">
    <div slot="header">
      <span>{{ name }}</span>
      <el-button style="float: right; padding: 3px 0" type="text">确认修改</el-button>
      <ip-card></ip-card>
    </div>
    <div class="item">
      <div><span>ip:</span></div>
      <div class="ipInput">
        <el-input class="ip"></el-input>
        <span>.</span>
        <el-input class="ip"></el-input>
        <span> . </span>
        <el-input class="ip"></el-input>
        <span> . </span>
        <el-input class="ip"></el-input>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ipcard",
  props:['name']

}
</script>

<style scoped>
.item {
  display: flex;
  height: 90px;
  width: 530px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.ipInput {
  width: 430px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}

.ip {
  width: 100px;
}
</style>