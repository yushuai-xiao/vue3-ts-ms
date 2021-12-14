export const contentTableConfig = {
  title: '部门列表',
  createBtn: '新建部门',
  propList: [
    { prop: 'id', label: '部门id', minWidth: '100' },
    { prop: 'name', label: '部门名称', minWidth: '100' },
    { prop: 'leader', label: '主管名称', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
