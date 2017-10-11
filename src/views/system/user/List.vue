<template>
  <div>
    <SearchView :toolbar_buttons="toolbar_buttons" :OnSearchClick="OnSearchClick" :search_input_placeholder="search_input_placeholder"></SearchView>
    <ListView :TableColumn="TableColumn" :Data_Url="data_url" :Data_Pagesize="data_pagesize" :ListType="this.$listtype" :TableController="TableController" :SetData="SetData"></ListView>
  </div>
</template>
<!-- ListView部分vue代码Start -->
<script>
  /* eslint-disable camelcase,key-spacing,object-property-newline,indent */
  export default {
    name: 'List',
    data () {
      return {
        data_url: '/system/User/',
        data_pagesize: 15,
        accordion: false,
        search_input_placeholder: '请输入关键词',
        TableColumn: [
          {label: 'ID', field: 'Id', width: 80, type: this.$listtype.TEXT},
          {label: '头像', field: 'Header', width: 110, type: this.$listtype.IMAGE, param: {width: 80, height: 80}},
          {label: '姓名', field: 'Name', type: this.$listtype.TEXT},
          {label: '性别', field: 'Sex', width: 120, type: this.$listtype.TAG, option:
            [
              {key: '1', value: '男', color: 'danger'},
              {key: '2', value: '女', color: 'success'}
            ]
          },
          {label: '电话', field: 'Phone', width: 180, type: this.$listtype.TEXT},
          {label: '角色', field: 'RoleName', width: 180, type: this.$listtype.TEXT}
        ],
        TableController: [
          {
            button_text: '编辑',
            button_icon: 'edit',
            button_color: 'info',
            button_onclick: function (param_object, param_data) {
              param_object.$store.itemid = param_data.Id
              param_object.$router.push('/system/User/Edit')
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
              console.log('j')
              param_object.$router.push('/system/User/New')
            }
          }
        ],
        SetData: function (param_response_data) {
          return param_response_data.UserInfo
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
