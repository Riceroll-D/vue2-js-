<template>
  <div class="app-container">
    <!-- 个人信息 -->
    <el-form ref="fm" :model="userData" :rules="rules" label-width="100px">
      <!-- 部门 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="部门" prop="departmentName">
            <el-input
              v-model="userData.departmentName"
              @focus="showTree = true"
            />
            <!-- 部门选择 -->
            <el-dep-select :visible.sync="showTree" @current-select="getDept" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-date-picker
              v-model="userData.timeOfEntry"
              type="date"
              class="inputW"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- 放置上传图片 -->
            <!-- <el-image :src="userData.staffPhoto"></el-image> -->
            <!--
              需求：
              1. 回显已经上传的图片
              2. 能够重新选择上传并可以获取最新上传的图片地址
             -->
            <UploadImg :src.sync="userData.staffPhoto" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="updateDetail">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { saveUserDetailById } from '@/api/employees'

export default {
  props: {
    userData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 控制部门选择弹层
      showTree: false,
      rules: {
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'blur' }

        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 选择后修改部门数据
    getDept (node) {
      this.userData.departmentName = node.name
    },
    // 更新用户基本信息
    updateDetail () {
      this.$refs.fm.validate(async (isOk) => {
        if (isOk) {
          // 获取变化的数据=> 正常应该提供独立接口，传递修改的数据=》更新
          // const { username, id, mobile } = this.userData
          // await saveUserDetailById({ username, id, mobile })
          await saveUserDetailById(this.userData)
          this.$message.success('更新账户成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
