<template>
  <div>
    <EditView :form_data="form_data" :form_controller="form_controller" ref="ref_editview" :EditType="this.$edittype" :DataUrl="data_url" :SetData="SetData"></EditView>

  </div>
</template>

<script>
  /* eslint-disable camelcase,object-property-newline,no-trailing-spaces,no-unused-vars */
  /* eslint-disable camelcase,object-property-newline */
  export default {
    name: 'Edit',
    data () {
      return {
        data_url: '/cms/Notice/',
        form_data: [
          {name: 'Name', label: '公告标题', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Description', label: '公告摘要', type: this.$edittype.TEXTAREA, isrequire: true, value: ''},
          {name: 'Content', label: '公告内容', type: this.$edittype.RICHTEXT, isrequire: true, value: '',
            config: {width: 500, height: 400}
          },
          {name: 'ShowOrder', label: '公告排序', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Image', label: '公告图片', type: this.$edittype.IMAGE, isrequire: true, value: '', config: {
            Folder: 'CMS/Notice/'
          }}
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
        this.$refs.ref_editview.LoadData(this.$server_root + this.data_url + 'ItemInfo/ItemId/' + this.$store.itemid)
      },
      SetData: function (param_response_data) {
        return param_response_data.NoticeInfo
      }
    }
  }
</script>
<style>
</style>
