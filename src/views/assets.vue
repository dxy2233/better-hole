<template>
  <div class="assets">
    <div class="search-box">
      <label>
        信息系统
        <select v-model="tableForm.systemId">
          <option value="全部">全部</option>
          <option
            v-for="(item, index) in systemListByUser"
            :key="index"
            :value="item.id"
            >{{ item.name }}</option
          >
        </select>
      </label>
      <label>
        设备名称
        <input type="text" v-model="tableForm.deviceName" />
      </label>
      <label>
        设备类型
        <select v-model="tableForm.deviceSort">
          <option value="全部">全部</option>
          <option
            v-for="(item, index) in deviceTypeList"
            :key="index"
            :value="item.key"
            >{{ item.value }}</option
          >
        </select>
      </label>
      <label>
        设备厂家/型号
        <input type="text" v-model="tableForm.deviceType" />
      </label>
      <button @click="init(true)"><svg-icon icon-class="search" />搜索</button>
    </div>

    <baseTable :tableData="tableData.list">
      <baseCol prop="serialNumber" label="序号" />
      <baseCol prop="systemName" label="信息系统" />
      <baseCol prop="importName" label="导入人" />
      <baseCol prop="deviceName" label="设备名称" />
      <baseCol prop="deviceSort" label="设备类型">
        <template #button="props">
          {{
            deviceTypeList
              .filter((item) => item.key === props.row.deviceSort)
              .map((item) => item.value)[0]
          }}
        </template>
      </baseCol>
      <baseCol prop="deviceType" label="设备厂家/型号" />
      <baseCol prop="position" label="机房位置" />
      <baseCol prop="cabinetNumber" label="机柜编号" />
      <baseCol prop="systemVersion" label="操作系统版本" />
      <baseCol prop="midVersion" label="中间件版本" />
      <baseCol prop="dbVersion" label="数据库版本" />
      <baseCol prop="ipAddress" label="IP地址" />
      <baseCol label="操作">
        <template #button="props">
          <button v-if="props.row.editVisible" @click="openDialog(props.row)">
            编辑
          </button>
          <button
            v-if="props.row.deleteVisible"
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

    <baseDialog
      :visible.sync="dialog"
      @closed="closedDialog('form', 'assetsForm')"
    >
      <template #title>编辑资产信息</template>
      <baseForm ref="assetsForm" :form="form" :rules="rules">
        <baseFormItem label="信息系统" required>
          <input type="text" v-model="form.systemName" disabled />
        </baseFormItem>
        <baseFormItem label="导入人" required>
          <input type="text" v-model="form.importName" disabled />
        </baseFormItem>
        <baseFormItem label="设备名称" prop="deviceName" required>
          <input type="text" v-model="form.deviceName" />
        </baseFormItem>
        <baseFormItem label="设备类型" prop="deviceSort" required>
          <select v-model="form.deviceSort">
            <option
              v-for="(item, index) in deviceTypeList"
              :key="index"
              :value="item.key"
              >{{ item.value }}</option
            >
          </select>
        </baseFormItem>
        <baseFormItem label="设备厂家/型号" prop="deviceType" required>
          <input type="text" v-model="form.deviceType" />
        </baseFormItem>
        <baseFormItem label="机房位置">
          <input type="text" v-model="form.position" />
        </baseFormItem>
        <baseFormItem label="机柜编号">
          <input type="text" v-model="form.cabinetNumber" />
        </baseFormItem>
        <baseFormItem
          v-if="form.deviceSort === '1'"
          key="sysOne"
          label="操作系统版本"
          prop="systemVersion"
          required
        >
          <input type="text" v-model="form.systemVersion" />
        </baseFormItem>
        <baseFormItem v-else key="sysTwo" label="操作系统版本">
          <input type="text" v-model="form.systemVersion" />
        </baseFormItem>
        <baseFormItem label="中间件版本">
          <input type="text" v-model="form.midVersion" />
          <!-- <select v-if="fromSelectDatas[1]" v-model="form.midVersion">
            <option
              v-for="(item, index) in fromSelectDatas[1].enumListBOS"
              :key="index"
              :value="item.key"
              >{{ item.value }}</option
            >
          </select> -->
        </baseFormItem>
        <baseFormItem label="数据库版本">
          <input type="text" v-model="form.dbVersion" />
          <!-- <select v-if="fromSelectDatas[2]" v-model="form.dbVersion">
            <option
              v-for="(item, index) in fromSelectDatas[2].enumListBOS"
              :key="index"
              :value="item.key"
              >{{ item.value }}</option
            >
          </select> -->
        </baseFormItem>
        <baseFormItem label="IP地址" prop="ipAddress" required>
          <input type="text" v-model="form.ipAddress" disabled />
        </baseFormItem>
        <baseFormItem label="端口">
          <input type="text" v-model="form.port" disabled />
        </baseFormItem>
        <baseFormItem label="应用WEB URL地址">
          <input type="text" v-model="form.url" />
        </baseFormItem>
        <baseFormItem label="备注">
          <input type="text" v-model="form.remark" />
        </baseFormItem>
        <button type="button" @click="submit">
          <svg-icon icon-class="save" />保存
        </button>
      </baseForm>
    </baseDialog>
  </div>
</template>

<script>
import {
  getDeviceList,
  deleteDeviceById,
  save,
  getDeviceTypeList,
} from '@/api/device'
import { getSystemListByUser } from '@/api/system'

export default {
  name: 'Assets',
  data() {
    return {
      tableForm: {
        startPage: 1,
        pageSize: 20,
        systemId: '',
        deviceName: '',
        deviceSort: '',
        deviceType: '',
      },
      systemListByUser: [],
      tableData: {},
      deviceTypeList: [],
      form: {
        deviceName: '',
        deviceSort: '',
        deviceType: '',
        position: '',
        cabinetNumber: '',
        systemVersion: '',
        midVersion: '',
        dbVersion: '',
        ipAddress: '',
        port: '',
        url: '',
        remark: '',
      },
      rules: {
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ],
        deviceSort: [
          { required: true, message: '请输入设备类型', trigger: 'change' },
        ],
        deviceType: [
          { required: true, message: '请输入设备厂家/型号', trigger: 'blur' },
        ],
        ipAddress: [
          { required: true, message: '请输入IP地址', trigger: 'blur' },
        ],
        systemVersion: [
          { required: true, message: '请输入操作系统版本', trigger: 'blur' },
        ],
      },
      dialog: false,
    }
  },
  created() {
    this.init()
    getSystemListByUser().then((res) => {
      this.systemListByUser = res.data
    })
    getDeviceTypeList().then((res) => {
      this.deviceTypeList = res.data
    })
  },
  methods: {
    init(isSearch) {
      if (isSearch) this.tableForm.startPage = 1
      getDeviceList(this.tableForm).then((res) => {
        this.tableData = res.data
      })
    },
    openDialog(info) {
      this.form = JSON.parse(JSON.stringify(info))
      this.dialog = true
    },
    closedDialog(key, refName) {
      // Object.assign(this.$data[key], this.$options.data()[key])
      this.$refs[refName].clearErr()
    },
    submit() {
      if (!this.$refs.assetsForm.validate()) return
      save(this.form).then((res) => {
        this.dialog = false
        this.$message({ content: res.message, type: 'success' })
        this.init()
      })
    },
    remove(id) {
      this.$confirm('确认删除？', '提示').then(() => {
        deleteDeviceById(id).then((res) => {
          this.$message({ content: res.message, type: 'success' })
          this.init()
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
