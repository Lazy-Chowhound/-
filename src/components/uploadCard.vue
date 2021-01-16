<template>
  <el-card class="box-card">
    <div class="item">
      <el-upload class="upload-demo" drag :action="getUrl()" multiple v-bind:on-success="uploadSuccess"
                 v-bind:on-error="uploadFail" v-bind:limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="font-size: 13px;margin-top: 3px">请上传.txt配置文件
        </div>
      </el-upload>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "uploadCard",
  props: ['address'],
  methods: {
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    uploadFail(err, file, fileList) {
      console.log(err, file, fileList);
      this.$message.error('文件上传失败');
    },
    getUrl() {
      return this.address;
    }
  },
}
</script>

<style scoped>
.item {
  height: 220px;
  width: 530px;
  text-align: center;
}
</style>