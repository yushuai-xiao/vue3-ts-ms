import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门'
    },
    {
      field: 'leader',
      type: 'input',
      label: '主管姓名',
      placeholder: '请输入主管姓名'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
