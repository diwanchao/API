<template>
  <div>
    <EditView :form_data="form_data" :form_controller="form_controller" :EditType="this.$edittype" :DataUrl="data_url" :SetData="SetData" ref="ref_editview"></EditView>
  </div>
</template>

<script>
  /* eslint-disable camelcase,object-property-newline,no-trailing-spaces,no-unused-vars */
  /* eslint-disable camelcase,object-property-newline */
  export default {
    name: 'Edit',
    data () {
      return {
        data_url: '/wechat/WeChatMenu/',
        area: [],
        form_data: [
          {name: 'ParentId', label: '', type: this.$edittype.HIDDEN, isrequire: true, value: ''},
          {name: 'Name', label: '菜单名称', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Type', label: '按钮类型', type: this.$edittype.SELECT, isrequire: true, value: '', event: {change: function (param_object, param_value) {
            if (param_value === 'click') {
              param_object.GetFormItem('Key').isshow = true
              param_object.GetFormItem('Url').isshow = false
            } else {
              param_object.GetFormItem('Key').isshow = false
              param_object.GetFormItem('Url').isshow = true
            }
          }},
            option: [
              {key: 'click', value: '关键词'},
              {key: 'view', value: '跳转链接'}
            ]
          },
          {name: 'Key', label: '关键词', type: this.$edittype.TEXT, isrequire: false, value: ''},
          {name: 'Url', label: '跳转链接', type: this.$edittype.TEXT, isrequire: false, value: ''},
          {name: 'Show', label: '是否开启', type: this.$edittype.RADIO, isrequire: true, value: 1,
            option: [
              {key: 1, value: '开启'},
              {key: 2, value: '关闭'}
            ]
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
        this.$refs.ref_editview.LoadData(this.$server_root + this.data_url + 'ItemInfo/ItemId/' + this.$store.itemid)
        this.$refs.ref_editview.GetFormItem('Key').isshow = false
        this.$refs.ref_editview.GetFormItem('Url').isshow = false
        this.form_data[0]['value'] = this.$store.parentid
      },
      SetData: function (param_response_data) {
        return param_response_data.MenuInfo
      }
    }
  }
</script>
