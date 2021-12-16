import xsRequest from '@/service'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
  amountList = '/goods/amount/list'
}

export function getAmountList() {
  return xsRequest.get({
    url: DashboardAPI.amountList
  })
}
export function getCategoryGoodsCount() {
  return xsRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return xsRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return xsRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return xsRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
