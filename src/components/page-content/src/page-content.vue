<template>
  <div class="page-content">
    <xs-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandle>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >{{ contentTableConfig.createBtn }}</el-button
        >
        <el-button @click="handleRefreshClick">
          <el-icon><refresh /></el-icon
        ></el-button>
      </template>

      <!-- 2.列中的插槽 ,固定给的操作，-->
      <template #status="scope">
        <template v-if="scope.row.enable">
          <el-button
            plain
            size="mini"
            :type="scope.row.enable ? 'success' : 'danger'"
            >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
          >
        </template>
        <template v-else>
          <el-button
            plain
            size="mini"
            :type="scope.row.status ? 'success' : 'danger'"
            >{{ scope.row.status ? '可用' : '下架' }}</el-button
          >
        </template>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            ><el-icon><edit /></el-icon>编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon-color="red"
            title="确认删除此条数据吗？"
            v-if="isDelete"
            @confirm="handleDeleteClick(scope.row)"
          >
            <template #reference>
              <el-button icon="el-icon-delete" size="mini" type="text"
                ><el-icon><delete-filled /></el-icon>删除</el-button
              >
            </template>
          </el-popconfirm>
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </xs-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

import XsTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

import { Refresh, Edit, DeleteFilled } from '@element-plus/icons'
export default defineComponent({
  components: {
    XsTable,
    Refresh,
    Edit,
    DeleteFilled
  },
  props: {
    // 配置信息
    contentTableConfig: {
      type: Object,
      require: true
    },
    // 页面名称
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作权限，封装一个hook，进行请求
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求，配置路径和传入数据内容
    const getPageData = (queryInfo: any = {}) => {
      // console.log(queryInfo)
      // 如果没有查询权限，就不能请求
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          // 从分页器中拿出数据，进行数据的请求
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()
    // 3.从vuex中获取数据,传到table.vue中进行渲染
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    const handleRefreshClick = () => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName
      })
    }
    // 4.获取其他的动态插槽名称，从配置文件的对象中遍历寻找
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    // 5.删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      // console.log(props.pageName)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      getPageData,
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      handleRefreshClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
