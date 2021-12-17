import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'

import { ILoginState } from './type'
import { IRootState } from '../type'
import { IAccount } from '@/service/login/type'

import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    // 由action提交
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // console.log(userMenus)
      // 注册动态路由，
      //  userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // console.log(routes)
      // routes = > router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
        // console.log(router)
      })
      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      // console.log(payload)
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)

      const { token } = loginResult
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化的请求（完整的role/department）
      dispatch('getInitialDataAction', null, { root: true })
      // 2.请求用户信息
      // const userInfoResult = await requestUserInfoById(id)

      // const userInfo = userInfoResult.data
      // commit('changeUserInfo', userInfo)
      // localCache.setCache('userInfo', userInfo)
      // console.log(userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId()

      const userMenus = userMenusResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)

      localCache.setCache('userMenus', userMenus)
      console.log(userMenus)

      // 跳到首页
      router.push('./main')
    },

    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)

        // 发送初始化的请求（完整的role/department）
        dispatch('getInitialDataAction', null, { root: true })
      }
      // const userInfo = localCache.getCache('userInfo')
      // if (userInfo) {
      //   commit('changeUserInfo', userInfo)
      // }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
