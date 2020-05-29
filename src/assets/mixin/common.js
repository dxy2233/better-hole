import store from '@/store'
import { mapGetters } from 'vuex'

export const orgTree = {
  computed: {
    ...mapGetters(['systemOrgNodeTree']),
  },
  created() {
    if (this.systemOrgNodeTree.length === 0)
      store.dispatch('publicData/getOrgTree')
  },
}
