<template>
  <div class="system">
    <nav class="scroll-bar">
      <button @click="openDialog('新增单位')">
        <svg-icon icon-class="add" />新增单位
      </button>
      <baseTree
        ref="systemTree"
        :treeData="treeData"
        label="orgName"
        children="nextNodes"
        removeField="deleteVisble"
        @nodeClick="getTreeNode"
        @remove="treeNodeRemove"
      />
    </nav>
    <nav class="scroll-bar">
      <button v-show="nodeData.id" @click="openDialog('新增系统')">
        <svg-icon icon-class="add" />新增系统
      </button>
      <ul>
        <li
          v-for="(item, index) in systemData"
          :key="index"
          @click="clickSystem(item)"
          :class="{ active: item.id === activeSystem.id }"
        >
          {{ item.name }}
          <span class="afterward" @click="removeSystem(item.id)">删除</span>
        </li>
      </ul>
    </nav>
    <main>
      <div v-if="assetsTableData.list">
        <div class="caption">信息系统名称资产信息</div>
        <baseTable :tableData="assetsTableData.list">
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
        </baseTable>
        <basePagination
          :currentPage.sync="assetsTableForm.startPage"
          :total="assetsTableData.total"
          :pages="assetsTableData.pages"
          @changeCurrentPage="initAssets"
        />
      </div>
      <div v-if="holeTableData.list">
        <div class="caption">相关资产漏洞信息</div>
        <baseTable :tableData="holeTableData.list">
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
        </baseTable>
        <basePagination
          :currentPage.sync="holeTableForm.startPage"
          :total="holeTableData.total"
          :pages="holeTableData.pages"
          @changeCurrentPage="initHole"
        />
      </div>
    </main>

    <baseDialog :visible.sync="dialog">
      <template #title>{{ dialogTitle }}</template>
      <baseForm ref="systemForm" :form="form" :rules="rules">
        <div v-if="dialogTitle === '新增单位'">
          <baseFormItem label="单位名称" prop="orgName" required>
            <input type="text" v-model="form.orgName" />
          </baseFormItem>
          <baseFormItem label="上级节点" prop="parentId" required>
            <baseCascader v-model="form.parentId" :data="treeData" />
          </baseFormItem>
        </div>
        <div v-else>
          <baseFormItem label="单位名称" required>
            <input type="text" v-model="form.orgName" disabled />
          </baseFormItem>
          <baseFormItem label="系统名称" prop="name" required>
            <input type="text" v-model="form.name" />
          </baseFormItem>
        </div>
        <button type="button" @click="submit">
          <svg-icon icon-class="save" />保存
        </button>
      </baseForm>
    </baseDialog>
  </div>
</template>

<script>
import {
  getSystemOrgNodeTree,
  saveSystemOrgNode,
  deleteSystemOrgNodeById,
} from '@/api/systemOrgNode'
import { getSystemListByOrgId, save, deleteById } from '@/api/system'
import { getDeviceList } from '@/api/device'
import { getFlawList } from '@/api/flaw'

export default {
  name: 'System',
  data() {
    return {
      treeData: [],
      nodeData: {},
      systemData: [],
      dialog: false,
      dialogTitle: '',
      form: {
        orgName: '',
        parentId: '',
        // 系统
        orgName: '',
        name: '',
        orgId: '',
      },
      rules: {
        orgName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
        ],
        parentId: [
          { required: true, message: '请选择上级单位', trigger: 'change' },
        ],
        name: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
      },
      activeSystem: {},
      assetsTableForm: {
        startPage: 1,
        pageSize: 20,
        systemId: '',
      },
      assetsTableData: {},
      holeTableForm: {
        startPage: 1,
        pageSize: 20,
        systemId: '',
      },
      holeTableData: {},
    }
  },
  created() {
    getSystemOrgNodeTree().then((res) => {
      this.treeData = res.data
    })
  },
  methods: {
    getTreeNode(node) {
      this.assetsTableData = {}
      this.holeTableData = {}
      this.activeSystem = {}
      this.nodeData = node
      getSystemListByOrgId(node.id).then((res) => {
        this.systemData = res.data
      })
    },
    treeNodeRemove(val) {
      this.$confirm('确认删除？', '提示').then(() => {
        deleteSystemOrgNodeById(val.id).then((res) => {
          if (this.nodeData.id === val.id) this.nodeData = {}
          this.$message({ content: res.message, type: 'success' })
          getSystemOrgNodeTree().then((res) => {
            this.treeData = res.data
          })
        })
      })
    },
    openDialog(type) {
      this.dialogTitle = type
      if (this.dialogTitle === '新增系统') {
        this.form.orgId = this.nodeData.id
        this.form.orgName = this.nodeData.orgName
      }
      this.dialog = true
    },
    submit() {
      if (!this.$refs.systemForm.validate()) return
      if (this.dialogTitle === '新增单位') {
        saveSystemOrgNode(this.form).then((res) => {
          this.dialog = false
          this.$message({ content: res.message, type: 'success' })
          getSystemOrgNodeTree().then((res) => {
            this.treeData = res.data
          })
        })
      } else {
        save(this.form).then((res) => {
          this.dialog = false
          this.$message({ content: res.message, type: 'success' })
          getSystemListByOrgId(this.nodeData.id).then((res) => {
            this.systemData = res.data
          })
        })
      }
    },
    clickSystem(info) {
      this.activeSystem = info
      this.assetsTableForm.systemId = info.id
      this.initAssets()
      this.holeTableForm.systemId = info.id
      this.initHole()
    },
    removeSystem(id) {
      this.$confirm('确认删除？', '提示').then(() => {
        deleteById(id).then((res) => {
          this.$message({ content: res.message, type: 'success' })
          getSystemListByOrgId(this.nodeData.id).then((res) => {
            this.systemData = res.data
          })
        })
      })
    },
    initAssets(isSearch) {
      if (isSearch) this.assetsTableForm.startPage = 1
      getDeviceList(this.assetsTableForm).then((res) => {
        this.assetsTableData = res.data
      })
    },
    initHole(isSearch) {
      if (isSearch) this.holeTableForm.startPage = 1
      getFlawList(this.holeTableForm).then((res) => {
        this.holeTableData = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.system {
  margin: -20px;
  height: calc(100% + 40px);
  display: flex;
  > nav {
    width: 200px;
    overflow-y: auto;
    ul {
      li {
        padding: 5px 0 5px 20px;
        cursor: pointer;
        &:hover {
          color: #158ae7;
          background: #cee9f8;
        }
        .forward {
          text-align: center;
          background: #43acff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: inline-block;
          position: relative;
          top: 3px;
          margin-right: 5px;
          svg {
            position: absolute;
            left: 2px;
            top: 2px;
            font-size: 10px;
            color: #fff;
          }
        }
        .afterward {
          float: right;
          margin-right: 20px;
          color: #ff4949;
        }
      }
      .active {
        color: #0856a9;
      }
    }
    button {
      margin: 10px 20px;
      color: #fff;
      background: #045fc9;
      &:hover {
        background: #158ae7;
      }
    }
  }
  nav:nth-child(1) {
    background: rgba(232, 243, 255, 1);
  }
  nav:nth-child(2) {
    border: 1px solid #4884c2;
  }
  main {
    padding: 20px;
  }
}
</style>