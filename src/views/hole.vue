<template>
  <div class="hole">
    <div class="search-box">
      <button @click="openDialog('漏洞录入')">
        <svg-icon icon-class="add" />手动录入
      </button>
      <button><svg-icon icon-class="import" />导入文件</button>
      <label>
        信息系统
        <select v-model="tableForm.systemId">
          <option
            v-for="(item, index) in systemListByUser"
            :key="index"
            :value="item.id"
            >{{ item.name }}</option
          >
        </select>
      </label>
      <label>
        漏洞标题
        <input type="text" v-model="tableForm.title" />
      </label>
      <label>
        危险级别
        <select v-model="tableForm.hazardLevel">
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
      </label>
      <label>
        漏洞状态
        <select v-model="tableForm.reformStatus">
          <option value="0">未整改</option>
          <option value="1">已整改</option>
          <option value="2">挂起</option>
        </select>
      </label>
      <button @click="init(true)"><svg-icon icon-class="search" />搜索</button>
    </div>

    <baseTable :tableData="tableData.list">
      <baseCol prop="systemName" label="信息系统" />
      <baseCol prop="title" label="漏洞标题" />
      <baseCol prop="ipAddress" label="IP地址" />
      <baseCol prop="port" label="端口" />
      <baseCol prop="createTime" label="上传时间" />
      <baseCol prop="hazardLevel" label="危险级别" />
      <baseCol prop="reformStatus" label="漏洞状态">
        <template #button="props">
          {{ props.row.reformStatus | reformStatusFilter }}
        </template>
      </baseCol>
      <baseCol prop="reformTime" label="整改时间" />
      <baseCol label="操作">
        <template #button="props">
          <button v-if="props.row.reformVisble" @click="openReform(props.row)">
            整改
          </button>
          <button
            v-if="props.row.editVisble"
            @click="openDialog('编辑漏洞', props.row)"
          >
            编辑
          </button>
          <button
            v-if="props.row.deleteVisble"
            class="remove"
            @click="remove(props.row.id)"
          >
            删除
          </button>
        </template>
      </baseCol>
    </baseTable>

    <basePagination
      :currentPage.sync="tableForm.startPage"
      :total="tableData.total"
      :pages="tableData.pages"
      @changeCurrentPage="init"
    />

    <!-- 上传文件input -->
    <input type="file" ref="holeFile" @change="upload($event)" />

    <!-- 漏洞录入 -->
    <baseDialog :visible.sync="dialog" top="20px">
      <template #title>{{ dialogTitle }}</template>
      <baseForm ref="holeForm" :form="form" :rules="rules">
        <baseFormItem label="信息系统" prop="systemId" required>
          <select v-model="form.systemId">
            <option
              v-for="(item, index) in systemListByUser"
              :key="index"
              :value="item.id"
              >{{ item.name }}</option
            >
          </select>
        </baseFormItem>
        <baseFormItem label="IP地址" prop="ipAddress" required>
          <input type="text" v-model="form.ipAddress" />
        </baseFormItem>
        <baseFormItem label="端口" prop="port" required>
          <input type="text" v-model="form.port" />
        </baseFormItem>
        <baseFormItem label="漏洞标题" prop="title" required>
          <input type="text" v-model="form.title" />
        </baseFormItem>
        <baseFormItem label="危险级别" prop="hazardLevel" required>
          <select v-model="form.hazardLevel">
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </baseFormItem>
        <baseFormItem label="影响系统" prop="influenceSystem" required>
          <textarea
            cols="20"
            rows="5"
            v-model="form.influenceSystem"
          ></textarea>
        </baseFormItem>
        <baseFormItem label="漏洞描述" prop="leakHazardDesc" required>
          <textarea cols="20" rows="5" v-model="form.leakHazardDesc"></textarea>
        </baseFormItem>
        <baseFormItem label="漏洞解决方案">
          <input type="text" v-model="form.leakSolve" />
        </baseFormItem>
        <baseFormItem label="漏洞类型" prop="leakType" required>
          <input type="text" v-model="form.leakType" />
        </baseFormItem>
        <baseFormItem label="漏洞链接">
          <input type="text" v-model="form.leakLink" />
        </baseFormItem>
        <baseFormItem label="参考链接">
          <input type="text" v-model="form.seeLink" />
        </baseFormItem>
        <baseFormItem label="验证信息">
          <input type="text" v-model="form.verifyMessage" />
        </baseFormItem>
        <baseFormItem label="厂商补丁">
          <input type="text" v-model="form.firmPatch" />
        </baseFormItem>
        <baseFormItem label="CVE编号">
          <input type="text" v-model="form.cevNum" />
        </baseFormItem>
        <baseFormItem label="漏洞附件">
          <button type="button" @click="uploadFile">点击上传附件</button>
          {{ form.attachmentName }}
        </baseFormItem>
        <button type="button" @click="submit">
          <svg-icon icon-class="save" />保存
        </button>
      </baseForm>
    </baseDialog>

    <!-- 整改 -->
    <baseDialog :visible.sync="dialogReform">
      <template #title>漏洞整改</template>
      <baseForm ref="reformForm" :form="reformForm" :rules="reformRules">
        <baseFormItem label="项目名称" required>
          <input type="text" v-model="reformForm.systemName" />
        </baseFormItem>
        <baseFormItem label="漏洞标题" required>
          <input type="text" v-model="reformForm.title" />
        </baseFormItem>
        <baseFormItem label="漏洞状态" prop="reformStatus" required>
          <select v-model="reformForm.reformStatus">
            <option value="0">未整改</option>
            <option value="1">已整改</option>
            <option value="2">挂起</option>
          </select>
        </baseFormItem>
        <button type="button" @click="submitReform">
          <svg-icon icon-class="save" />保存
        </button>
      </baseForm>
    </baseDialog>
  </div>
</template>

<script>
import {
  getFlawList,
  flawReform,
  deleteById,
  flawFileUpload,
  save,
} from '@/api/flaw'
import { getSystemListByUser } from '@/api/system'

export default {
  name: 'Hole',
  filters: {
    reformStatusFilter(val) {
      switch (val) {
        case 0:
          return '未整改'
        case 1:
          return '已整改'
        case 2:
          return '挂起'
      }
    },
    imgName(val) {
      return val.slice(val.lastIndexOf('/') + 1)
    },
  },
  data() {
    return {
      tableForm: {
        startPage: 1,
        pageSize: 20,
        systemId: '',
        title: '',
        hazardLevel: '',
        reformStatus: '',
      },
      systemListByUser: [],
      tableData: {},
      dialog: false,
      dialogTitle: '',
      form: {
        systemId: '',
        title: '',
        ipAddress: '',
        port: '',
        hazardLevel: '',
        influenceSystem: '',
        leakHazardDesc: '',
        leakSolve: '',
        leakType: '',
        leakLink: '',
        seeLink: '',
        verifyMessage: '',
        firmPatch: '',
        cevNum: '',
        attachmentName: '',
        attachmentUrl: '',
      },
      rules: {
        systemId: [
          { required: true, message: '请输入信息系统', trigger: 'blur' },
        ],
        ipAddress: [
          { required: true, message: '请输入IP地址', trigger: 'blur' },
        ],
        port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
        title: [{ required: true, message: '请输入漏洞标题', trigger: 'blur' }],
        hazardLevel: [
          { required: true, message: '请选择危险级别', trigger: 'blur' },
        ],
        influenceSystem: [
          { required: true, message: '请输入影响系统', trigger: 'blur' },
        ],
        leakHazardDesc: [
          { required: true, message: '请输入漏洞描述', trigger: 'blur' },
        ],
        leakType: [
          { required: true, message: '请输入漏洞类型', trigger: 'blur' },
        ],
      },
      dialogReform: false,
      reformForm: {
        id: '',
        systemName: '',
        title: '',
        reformStatus: '',
      },
      reformRules: {
        reformStatus: [
          { required: true, message: '请选择漏洞状态', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.init()
    getSystemListByUser().then((res) => {
      this.systemListByUser = res.data
    })
  },
  methods: {
    init(isSearch) {
      if (isSearch) this.tableForm.startPage = 1
      getFlawList(this.tableForm).then((res) => {
        this.tableData = res.data
      })
    },
    openDialog(type, info) {
      this.dialogTitle = type
      if (info) this.form = JSON.parse(JSON.stringify(info))
      this.dialog = true
    },
    submit() {
      if (!this.$refs.holeForm.validate()) return
      save(this.form).then((res) => {
        this.dialog = false
        this.$message({ content: res.message, type: 'success' })
        this.init()
      })
    },
    remove(id) {
      this.$confirm('确认删除？', '提示').then(() => {
        deleteById(id).then((res) => {
          this.$message({ content: res.message, type: 'success' })
          this.init()
        })
      })
    },
    openReform(info) {
      this.reformForm = JSON.parse(JSON.stringify(info))
      this.dialogReform = true
    },
    submitReform() {
      this.$confirm('确认整改？', '提示').then(() => {
        flawReform(this.reformForm.id, this.reformForm.reformStatus).then(
          (res) => {
            this.$message({ content: res.message, type: 'success' })
            this.dialogReform = false
            this.init()
          }
        )
      })
    },
    uploadFile() {
      this.$refs.holeFile.dispatchEvent(new MouseEvent('click'))
    },
    upload(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      flawFileUpload(formData).then((res) => {
        this.form.attachmentName = res.data.name
        this.form.attachmentUrl = res.data.url
        this.$message({ content: res.message, type: 'success' })
      })
      this.$refs.holeFile.value = null
    },
  },
}
</script>

<style lang="scss" scoped></style>
