type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  field: string
  label: string
  rules?: any[]
  placeholder?: any
  isHidden?: boolean

  // 针对select
  options?: any[]
  // 针对特殊属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
