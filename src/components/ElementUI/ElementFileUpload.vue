<template>
  <el-upload class="avatar-uploader"
             :action="ParentView.$server_root+'/system/common/UploadFile'"
             :data="item_data.config"
             :show-file-list="false"
             v-model="item_data.value"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
    <img v-if="item_data.value" :src="ParentView.$image_server_root + item_data.value" class="avatar">
    <i v-else class="el-icon-plus
                     avatar-uploader-icon"></i>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过6M</div>
  </el-upload>
</template>

<script>
  /* eslint-disable camelcase */
  export default {
    name: 'ElementFileUpload',
    props: {
      item_data: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {}
    },
    computed: {
      ParentView: function () {
        return this
      }
    },
    mounted: function () {
      this.loaded()
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
      },
      handleAvatarSuccess (res, file) {
        this.item_data.value = res.Image
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 6
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 6MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style>
  .hidden {
    display: none;
  }

  .avatar-uploader .el-upload {
    border: 2px dashed gray;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

