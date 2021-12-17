export const contentTableConfig = {
  title: '用户列表',
  createBtn: '新建用户',
  propList: [
    { prop: 'userName', label: '用户名', minWidth: '100' },
    { prop: 'realName', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号码', minWidth: '100' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'roleName', label: '角色', minWidth: '100' },
    {
      prop: 'startTime',
      label: '创建时间',
      minWidth: '250',
      slotName: 'startTime'
    },
    {
      prop: 'lastModefiedTime',
      label: '更新时间',
      minWidth: '250',
      slotName: 'lastModefiedTime'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
