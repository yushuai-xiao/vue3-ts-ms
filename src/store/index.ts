import { getPageListData } from '@/service/main/system/system'
import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { IRootState, IStoreType } from './type'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xs',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
      entireCategory: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    },
    changeEntireCategory(state, list) {
      state.entireCategory = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      //  请求所有的菜单数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 请求所有商品分类信息
      const categoryResult = await getPageListData('/category/list', {})
      const { list: categoryList } = categoryResult.data
      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
      commit('changeEntireCategory', categoryList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
  // console.log('123456')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
