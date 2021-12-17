<template>
  <div class="page-modal">
    <el-dialog
      :title="modalConfig.title"
      v-model="dialogVisible"
      :width="modalConfig?.width ? modalConfig.width : '30%'"
      center
      destroy-on-close
    >
      <xs-form v-bind="modalConfig" v-model="formData"></xs-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import XsForm from '@/base-ui/form'

import { useStore } from 'vuex'
export default defineComponent({
  components: {
    XsForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 处理id
      if (props.pageName === 'user') {
        const { id } = formData.value
        console.log(id)
        const userId = id
        delete formData.value.id
        formData.value['userId'] = userId
      }
      if (props.pageName === 'department') {
        const { depName } = formData.value
        const name = depName
        delete formData.value.depName
        formData.value['name'] = name
      }

      // console.log(formData.value)
      props.defaultInfo.id
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        // console.log(props.pageName)
        console.log(props.otherInfo)
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          // props.otherInfo,在角色菜单中，给角色赋予的权限
          editData: { ...formData.value, ...props.otherInfo },
          userId: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log(formData.value)
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
