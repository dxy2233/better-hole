import Vue from 'vue'
import {
  message,
  confirm,
  baseTable,
  baseCol,
  basePagination,
  baseDialog,
  baseForm,
  baseFormItem,
  baseCascader,
  baseTree,
} from 'better-three-ui'
import 'better-three-ui/dist/better-three-ui.css'
import loading from '@/components/loading'

const components = [
  baseTable,
  baseCol,
  basePagination,
  baseDialog,
  baseForm,
  baseFormItem,
  baseCascader,
  baseTree,
]
components.forEach((item) => {
  Vue.component('base' + item.name, item)
})
Vue.use(message)
Vue.use(confirm)
Vue.use(loading)
