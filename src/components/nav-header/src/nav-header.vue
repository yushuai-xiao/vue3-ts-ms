<template>
  <div class="nav-header">
    <i class="fold-Menu" @click="handleFoldClick"
      ><el-icon v-if="isFold" :size="30">
        <expand />
      </el-icon>
      <el-icon v-else :size="30">
        <fold />
      </el-icon>
    </i>
    <div class="content">
      <xs-breadcrumbs :breadcrumbs="breadcrumbs"></xs-breadcrumbs>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons'

import XsBreadcrumbs from '@/base-ui/breadcrumb'

import UserInfo from './user-info.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    Fold,
    Expand,
    XsBreadcrumbs,
    UserInfo
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 面包屑数据：[{name:,path}]
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  // justify-content: center;
  align-content: center;
  .fold-menu {
    // font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
