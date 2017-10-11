<template>
  <div>
    <EditView :form_data="form_data" :form_controller="form_controller" :EditType="this.$edittype" :DataUrl="data_url" :SetData="SetData"></EditView>
  </div>
</template>

<script>
  /* eslint-disable camelcase,object-property-newline,no-trailing-spaces,no-unused-vars */
  /* eslint-disable camelcase,object-property-newline */
  export default {
    name: 'Edit',
    data () {
      return {
        data_url: '/cms/Article/',
        area: [],
        form_data: [
          {name: 'Title', label: '文章标题', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Abstract', label: '文章摘要', type: this.$edittype.TEXTAREA, isrequire: true, value: ''},
          {name: 'Content', label: '文章内容', type: this.$edittype.RICHTEXT, isrequire: true, value: '',
            config: {width: 500, height: 400}
          }
        ],
        form_controller: [
          {
            button_text: '保存',
            button_icon: '',
            button_color: 'primary',
            button_onclick: function (param_object, param_data) {
              param_object.SubmitForm(param_data)
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
        let self = this
        this.$tools.GetDataFromServer(
          this,
          this.$server_root + this.data_url + 'ItemInfo/ItemId/' + this.$store.itemid,
          function success (response) {
            for (let i = 0; i < self.form_data.length; i++) {
              if (self.form_data[i].type === self.$edittype.SELECT) {
                self.form_data[i].option = response.data[self.form_data[i].name]
              } else {
                self.form_data[i].value = response.data.ArticleInfo[self.form_data[i].name]
              }
            }
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      SetData: function (param_response_data) {
        return param_response_data.ArticleInfo
      }
    }
  }
</script>
<style>
</style>
