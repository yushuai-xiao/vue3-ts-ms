import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './types'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,

      roleList: [],
      roleCount: 0,

      goodsList: [],
      goodsCount: 0,

      menuList: [],
      menuCount: 0,
      // 部门信息
      departmentList: [],
      departmentCount: 0,
      // 商品分类信息
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    // 用户信息
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    // 角色信息
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    // 部门信息
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count
    },
    // 商品信息
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    // 菜单信息
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    // 菜单信息
    changeCategoryList(state, list: any[]) {
      state.categoryList = list
    },
    changeCategoryCount(state, count: number) {
      state.categoryCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // console.log(pageUrl)

      // 1.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data
      // console.log(pageResult.data)

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName->/user
      // id->/user/id
      const { pageName, id } = payload
      const pageUrl = `${pageName}/${id}`

      // 2.调用删除网络请求
      await deletePageData(pageUrl)

      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 编辑数据请求
      console.log(payload)
      const { pageName, editData, id } = payload
      console.log(pageName)

      const pageUrl = `/${pageName}/${id}`

      await editPageData(pageUrl, editData)

      // 2.请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
