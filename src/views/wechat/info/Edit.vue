<template>
  <div>
    <EditView :form_data="form_data" :form_controller="form_controller" :EditType="this.$edittype" :DataUrl="data_url" :SetData="SetData" ref="editview"></EditView>
  </div>
</template>

<script>
  /* eslint-disable camelcase,object-property-newline,no-trailing-spaces,no-unused-vars */
  /* eslint-disable camelcase,object-property-newline */
  export default {
    name: 'Edit',
    data () {
      return {
        data_url: '/wechat/WeChatInfo/',
        area: [],
        form_data: [
          {name: 'AppId', label: 'AppId', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'AppSecret', label: 'AppSecret', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Token', label: 'Token', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'AESKey', label: 'AESKey', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'MerchantId', label: '商户号', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'Signature', label: '签名', type: this.$edittype.TEXT, isrequire: true, value: ''},
          {name: 'PublicKey', label: '公钥', type: this.$edittype.TEXTAREA, isrequire: true, value: ''},
          {name: 'PrivateKey', label: '私钥', type: this.$edittype.TEXTAREA, isrequire: true, value: ''}
        ],
        form_controller: [
          {
            button_text: '保存',
            button_icon: '',
            button_color: 'primary',
            button_onclick: function (param_object, param_data) {
              param_object.SubmitForm(param_data)
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
        this.$store.itemid = 1
        this.$refs.editview.LoadData(this.$server_root + this.data_url + 'ItemInfo/ItemId/' + this.$store.itemid)
      },
      SetData: function (param_response_data) {
        return param_response_data.BaseInfo
      }
    }
  }
</script>
<style>
</style>
