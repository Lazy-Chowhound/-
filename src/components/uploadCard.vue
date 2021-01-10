<template>
  <el-card class="box-card">
    <div class="item">
      <el-upload class="upload-demo" drag action=" " multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="font-size: 13px;margin-top: 3px">请上传.txt文件</div>
      </el-upload>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "uploadCard"
}
</script>

<style scoped>
.item {
  height: 190px;
  width: 530px;
  text-align: center;
}
</style>