<template>
  <div>
    <SearchView :Toolbar_buttons="toolbar_buttons" :Data_Url="data_url" :Data_Pagesize="data_pagesize" :SetData="SetData" :Search_input_placeholder="search_input_placeholder"></SearchView>
    <ListWithTreeView :TableColumn="TableColumn" :Data_Url="data_url" :Data_Pagesize="data_pagesize" ref="treelist" :TableController="TableController" :SetData="SetData" :Accordion="accordion"></ListWithTreeView>
  </div>
</template>
<!-- ListView部分vue代码Start -->
<script>
  /* eslint-disable camelcase,key-spacing,object-property-newline,indent */
  export default {
    name: 'List',
    data () {
      return {
        data_url: '/cms/Article/',
        data_pagesize: 15,
        accordion: false,
        search_input_placeholder: '请输入关键词',
        TableColumn: [
          {label: 'ID', field: 'Id', width: 80, type: 'Text'},
          {label: '缩略图', field: 'Imageurl', width: 110, type: 'Image', param: {width: 80, height: 80}},
          {label: '文章标题', field: 'Title', width: 120, type: 'Text'},
          {label: '文章描述', field: 'Abstract', type: 'Text'},
          {label: '文章创建时间', field: 'Createtime', width: 180, type: 'Text'},
          {label: '关键词', field: 'Keywords', width: 120, type: 'Tag', tag_data:
            [
              {key: '1', value: '正确', color: 'success'},
              {key: '2', value: '错误', color: 'danger'}
            ]
          },
          {label: '点击', field: 'FavoriteNum', width: 70, type: 'Text'}
        ],
        TableController: [
          {
            button_text: '编辑',
            button_icon: 'edit',
            button_color: 'info',
            button_onclick: function (param_object, param_data) {
              param_object.$store.itemid = param_data.Id
              param_object.$store.parentid = param_data.ParentId
              param_object.$router.push('/cms/article/Edit')
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
              param_object.$router.push('/cms/article/Edit')
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
          return param_response_data.ArticleInfo
        },
        OnSearchClick: function (param_text, param_key) {
          this.$refs.treelist.SetSearchData(param_text, param_key)
        }
      }
    }
  }
</script>
<!-- ListView部分vue代码End -->
<style>
</style>
