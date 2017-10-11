<template>
  <div>
    <SearchView :toolbar_buttons="toolbar_buttons" :OnSearchClick="OnSearchClick" :search_input_placeholder="search_input_placeholder"></SearchView>
    <ListWithTreeView :TableColumn="TableColumn" :Accordion="accordion" :Data_Url="data_url" :Data_Pagesize="data_pagesize" :TableController="TableController" :SetData="SetData"></ListWithTreeView>
  </div>
</template>
<script>
  /* eslint-disable camelcase,indent */

  export default {
    name: 'List',
    data () {
      return {
        data_url: '/cms/ArticleCategory/',
        data_pagesize: 15,
        accordion: false,
        search_input_placeholder: '请输入关键词',
        TableColumn: [
          {label: 'ID', field: 'Id', width: 120, type: 'text'},
          {label: '分类名称', field: 'Name', type: 'text'},
          {label: '分类描述', field: 'Description', type: 'text'}
        ],
        TableController: [
          {
            button_text: '编辑',
            button_icon: 'edit',
            button_color: 'info',
            button_onclick: function (param_object, param_data) {
              param_object.$store.itemid = param_data.Id
              param_object.$store.parentid = param_data.ParentId
              param_object.$router.push('/cms/article_category/Edit')
            }
          },
          {
            button_text: '删除',
            button_icon: 'delete',
            button_color: 'danger',
            button_onclick: function (param_object, param_data, param_function) {
              param_object.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                param_function(param_data.Id)
              }).catch(() => {
                param_object.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
            }
          }
        ],
        toolbar_buttons: [
          {
            button_text: '添加',
            button_color: 'success',
            button_onclick: function (param_object) {
              param_object.$router.push('/cms/article_category/Edit')
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
        OnSearchClick: function (param_text) {
          alert(param_text)
        },
        SetData: function (param_response_data) {
          return param_response_data.CategoryInfo
        }
      }
    }
  }
</script>
<style>
</style>
