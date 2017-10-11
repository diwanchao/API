<template>
  <div>
    <SearchView :toolbar_buttons="toolbar_buttons" :OnSearchClick="OnSearchClick"
                :search_input_placeholder="search_input_placeholder"></SearchView>
    <ListView :TableColumn="TableColumn" :Data_Url="data_url" :Data_Pagesize="data_pagesize" :ListType="this.$listtype"
               :SetData="SetData"></ListView>
  </div>
</template>
<!-- ListView部分vue代码Start -->
<script>
  /* eslint-disable camelcase,key-spacing,object-property-newline,indent */
  export default {
    name: 'List',
    data () {
      return {
        data_url: '/wechat/WeChatOrder/',
        data_pagesize: 9,
        accordion: false,
        search_input_placeholder: '请输入关键词',
        TableColumn: [
          {label: '订单编号', field: 'CodeId', type: this.$listtype.TEXT},
          {label: '用户姓名', field: 'MemberName', type: this.$listtype.TEXT},
          {label: '订单金额', field: 'TotalPrices', type: this.$listtype.TEXT},
          {label: '支付状态', field: 'IsPay', type: this.$listtype.TEXT},
          {label: '用户电话', field: 'MemberPhone', type: this.$listtype.TEXT},
          {label: '身份证', field: 'MemberIdCard', type: this.$listtype.TEXT},
          {label: '创建时间', field: 'CreateTime', type: this.$listtype.TEXT}
        ],
        toolbar_buttons: [
          {
            button_text: '导出',
            button_color: 'info',
            button_onclick: function (param_object, param_data) {
              param_object.GetRow(param_data)
            }
          }
        ],
        SetData: function (param_response_data) {
          console.log('22222', param_response_data.OrderInfo)
          return param_response_data.OrderInfo
        },
        OnSearchClick: function (param_text) {
          alert(param_text)
        }
      }
    }
  }
</script>
<!-- ListView部分vue代码End -->
<style>
</style>
