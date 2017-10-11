<template>
  <div >
    <EditView :form_data="form_data" :form_controller="form_controller" :EditType="this.$edittype" :DataUrl="data_url" :SetData="SetData" ref="ref_editview"></EditView>
  </div>
</template>

<script>
  /* eslint-disable camelcase */

  export default {
    name: 'Edit',
    data () {
      return {
        data_url: '/system/UserRole/',
        form_data: [
          {
            name: 'Name',
            label: '名称',
            field: 'Name',
            type: this.$edittype.TEXT,
            isrequire: true,
            value: ''
          },
          {
            name: 'Remark',
            label: '备注',
            field: 'Remark',
            type: this.$edittype.TEXT,
            isrequire: true,
            value: ''
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
      },
      SetData: function (param_response_data) {
        console.log('2wwwww22', param_response_data)
        return param_response_data
      }
    }
  }

</script>
<style>
</style>
