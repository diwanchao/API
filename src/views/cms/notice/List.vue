<template>
  <div>
    <SearchView :Toolbar_buttons="toolbar_buttons" :Data_Url="data_url" :Data_Pagesize="data_pagesize" :SetData="SetData" :Search_input_placeholder="search_input_placeholder"></SearchView>
    <ListView :TableColumn="TableColumn" :Data_Url="data_url" :Data_Pagesize="data_pagesize" ref="list" :TableController="TableController" :SetData="SetData" :Accordion="accordion"></ListView>
  </div>
</template>
<!-- ListView部分vue代码Start -->
<script>
  /* eslint-disable camelcase,key-spacing,object-property-newline,indent */
  export default {
    name: 'List',
    data () {
      return {
        data_url: '/cms/Notice/',
        data_pagesize: 15,
        accordion: false,
        search_input_placeholder: '请输入关键词',
        TableColumn: [
          {label: 'ID', field: 'Id', width: 80, type: 'Text'},
          {label: '缩略图', field: 'Image', width: 110, type: 'Image', param: {width: 80, height: 80}},
          {label: '公告标题', field: 'Name', width: 120, type: 'Text'},
          {label: '公告描述', field: 'Description', type: 'Text'},
          {label: '公告创建时间', field: 'CreateTime', width: 180, type: 'Text'}
        ],
        TableController: [
          {
            button_text: '编辑',
            button_icon: 'edit',
            button_color: 'info',
            button_onclick: function (param_object, param_data) {
              param_object.$store.itemid = param_data.Id
              param_object.$store.parentid = param_data.ParentId
              param_object.$router.push('/cms/notice/Edit')
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
              param_object.$router.push('/cms/notice/Edit')
            }
          }
        ],
        SetData: function (param_response_data) {
          return param_response_data.NoticeInfo
        },
        OnSearchClick: function (param_text, param_key) {
          this.$refs.list.SetSearchData(param_text, param_key)
        }
      }
    }
  }
</script>
<!-- ListView部分vue代码End -->
<style>
</style>
