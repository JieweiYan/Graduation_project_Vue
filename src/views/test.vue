<template>
  <div>
    <el-form>
      <el-form-item label="详情图片" class="pic">
        <el-upload
            id="selectfiles"
            :file-list="filesList"
            list-type="picture-card"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="(file)=>myUploadPic( file,'fileUrl')"
            :before-upload="beforeUpload"
            multiple
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>
