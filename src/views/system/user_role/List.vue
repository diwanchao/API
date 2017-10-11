<template>
  <div>
    <SearchView :toolbar_buttons="toolbar_buttons" :OnSearchClick="OnSearchClick"
                :search_input_placeholder="search_input_placeholder"></SearchView>
    <ListView :TableColumn="TableColumn" :Data_Url="data_url" :Data_Pagesize="data_pagesize" :ListType="this.$listtype"
              :TableController="TableController" :SetData="SetData"></ListView>
  </div>
</template>
<!-- ListView部分vue代码Start -->
<script>
  /* eslint-disable camelcase,key-spacing,object-property-newline,indent */
  export default {
    name: 'List',
    data () {
      return {
        data_url: '/system/UserRole/',
        data_pagesize: 3,
        accordion: false,
        search_input_placeholder: '请输入关键词',
        TableColumn: [
          {label: 'ID', field: 'Id', width: 80, type: this.$listtype.TEXT},
          {label: '名称', field: 'Name', type: this.$listtype.TEXT},
          {label: '备注', field: 'Remark', type: this.$listtype.TEXT}
        ],
        TableController: [
          {
            button_text: '权限',
            button_icon: 'setting',
            button_color: 'warning',
            button_onclick: function (param_object, param_data) {
              param_object.$store.itemid = param_data.Id
              param_object.$store.parentid = param_data.ParentId
              param_object.$router.push('/system/user_role/Access')
            }
          },
          {
            button_text: '编辑',
            button_icon: 'edit',
            button_color: 'info',
            button_onclick: function (param_object, param_data) {
              param_object.$store.itemid = param_data.Id
              param_object.$store.parentid = param_data.ParentId
              param_object.$router.push('/system/user_role/Edit')
            }
          },
          {
            button_text: '删除',
            button_icon: 'delete',
            button_color: 'danger',
            button_onclick: function (param_object, param_data) {
              param_object.DeleteRow(param_data)
            }
          }
        ],
        toolbar_buttons: [
          {
            button_text: '新增',
            button_color: 'success',
            button_onclick: function (param_object) {
              param_object.$store.itemid = null
              param_object.$router.push('/system/user_role/Edit')
            }
          },
          {
            button_text: '导出',
            button_color: 'info',
            button_onclick: function (param_object) {
              param_object.$router.push('/')
            }
          }
        ],
        SetData: function (param_response_data) {
          return param_response_data.RoleInfo
        },
        OnSearchClick: function (param_text) {
          alert(param_text)
        }
      }
    }
  }
</script>
<!-- ListView部分vue代码End -->
<style>
</style>
