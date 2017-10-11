<template>
  <div>
    <EditView :form_data="form_data" :form_controller="form_controller" :EditType="this.$edittype" :DataUrl="data_url" :SetData="SetData"></EditView>
  </div>
</template>

<script>
  /* eslint-disable camelcase,object-property-newline,no-trailing-spaces */
  /* eslint-disable camelcase,object-property-newline */
  export default {
    name: 'Edit',
    data () {
      return {
        data_url: '/cms/ArticleCategory/',
        form_data: [
          {name: 'Name', label: '分类标题', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Description', label: '分类描述', type: 'textarea', isrequire: true, value: ''},
          {name: 'Content', label: '分类内容', type: 'RichText', isrequire: true, value: '',
            config: {width: 500, height: 400}
          }
        ],
        form_controller: [
          {
            button_text: '保存',
            button_icon: '',
            button_color: 'primary',
            button_onclick: function (param_object, param_data) {
              param_object.SubmitForm()
            }
          },
          {
            button_text: '返回',
            button_icon: '',
            button_color: '',
            button_onclick: function (param_object, param_data) {
              param_object.$router.back()
            }
          }
        ]
      }
    },
    mounted: function () {
      this.loaded()
    },
    // 在 `methods` 对象中定义方法
    methods: {
      loaded: function () {
      },
      SetData: function (param_response_data) {
        return param_response_data.CategoryInfo
      }
    }
  }
</script>
<style>
</style>
