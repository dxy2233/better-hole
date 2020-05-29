<template>
  <div class="assets">
    <div class="search-box">
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
        设备名称
        <input type="text" v-model="tableForm.deviceName" />
      </label>
      <label>
        设备类型
        <input type="text" v-model="tableForm.deviceSort" />
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
      <baseCol prop="deviceSort" label="设备类型" />
      <baseCol prop="deviceType" label="设备厂家/型号" />
      <baseCol prop="position" label="机房位置" />
      <baseCol prop="cabinetNumber" label="机柜编号" />
      <baseCol prop="systemVersion" label="操作系统版本" />
      <baseCol prop="midVersion" label="中间件版本" />
      <baseCol prop="dbVersion" label="数据库版本" />
      <baseCol prop="ipAddress" label="私网IP地址" />
      <baseCol label="操作">
        <template #button="props">
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
  </div>
</template>

<script>
import { getDeviceList, deleteDeviceById } from '@/api/device'
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
      getDeviceList(this.tableForm).then((res) => {
        this.tableData = res.data
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
