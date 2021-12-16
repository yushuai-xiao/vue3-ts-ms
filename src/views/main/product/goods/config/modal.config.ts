import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  width: '50%',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '原价格',
      placeholder: '请输入旧价格'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '新价格',
      placeholder: '请输入新价格'
    },
    {
      field: 'desc',
      type: 'textarea',
      label: '商品描述',
      placeholder: '请输入商品描述'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { title: '可用', value: 1 },
        { title: '下架', value: 0 }
      ]
    },
    {
      field: 'imgUrl',
      type: 'input',
      label: '图片地址',
      placeholder: '请输入图片地址'
    },
    {
      field: 'inventoryCount',
      type: 'input',
      label: '库存',
      placeholder: '请输入库存数'
    },
    {
      field: 'saleCount',
      type: 'input',
      label: '销量',
      placeholder: '请输入销量'
    },
    {
      field: 'favorCount',
      type: 'input',
      label: '收藏',
      placeholder: '请输入销量'
    },
    {
      field: 'address',
      type: 'input',
      label: '商品地址',
      placeholder: '请输入商品地址'
    },
    {
      field: 'categoryId',
      type: 'select',
      label: '所属分类',
      placeholder: '请选择分类',
      options: []
    }
  ],
  colLayout: { span: 12 },
  itemStyle: {}
}
