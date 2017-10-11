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
        data_url: '/system/User/',
        form_data: [
          {
            name: 'Name',
            label: '姓名',
            field: 'Name',
            type: this.$edittype.TEXT,
            isrequire: true,
            value: ''
          },
          {
            name: 'Account',
            label: '账号',
            field: 'Account',
            type: this.$edittype.TEXT,
            isrequire: true,
            disabled: true,
            value: ''
          },
          {
            name: 'Password',
            label: '密码',
            field: 'Password',
            type: this.$edittype.TEXT,
            isrequire: true,
            value: ''
          },
          {
            name: 'Sex',
            label: '性别',
            field: 'Sex',
            width: 120,
            type: this.$edittype.RADIO,
            isrequire: true,
            value: '',
            option:
            [
              {key: '1', value: '男', color: 'danger'},
              {key: '2', value: '女', color: 'success'}
            ]
          },
          {
            name: 'Phone',
            label: '电话',
            field: 'Phone',
            width: 100,
            type: this.$edittype.TEXT,
            isrequire: true,
            value: ''
          },
          {
            name: 'RoleId',
            label: '角色',
            field: 'RoleId',
            width: 180,
            type: this.$edittype.SELECT,
            isrequire: true,
            value: '',
            option: []
          },
          {
            name: 'Email',
            label: '邮箱',
            field: 'Email',
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
        let self = this
        this.$refs.ref_editview.LoadData(this.$server_root + this.data_url + 'ItemInfo/ItemId/' + this.$store.itemid)
        this.$tools.GetDataFromServer(
          this,
          this.$server_root + '/system/UserRole/ListItem',
          function success (response) {
            let array_roleinfo = response.data.RoleInfo.Itemlist
            for (let i = 0; i < self.form_data.length; i++) {
              if (self.form_data[i].name === 'RoleId') {
                self.form_data[i].option = []
                for (let j = 0; j < array_roleinfo.length; j++) {
                  self.form_data[i].option.push({value: array_roleinfo[j].Name, key: array_roleinfo[j].Id})
                }
              }
            }
          },
          function error (error) {
            console.log(error)
          }
        )
      },
      SetData: function (param_response_data) {
        return param_response_data.UserInfo
      }
    }
  }

</script>
<style>
</style>
