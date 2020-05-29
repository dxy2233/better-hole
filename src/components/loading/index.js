import LoadingComponents from './loading.vue'

export default function (Vue) {
  let power = false,
    loadingCon,
    instance
  Vue.prototype.$loading = (options) => {
    if (!power) {
      loadingCon = Vue.extend(LoadingComponents)
      instance = new loadingCon().$mount()
    }
    power = true
    document.body.appendChild(instance.$el)
    instance.show = options
  }
}
